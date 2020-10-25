# Databricks notebook source
from pyspark.sql.functions import col, date_format, avg, udf

# File location and type
file_location = "/FileStore/tables/GlobalLandTemperaturesByCity.csv"
file_type = "csv"

# CSV options
infer_schema = "true"
first_row_is_header = "true"
delimiter = ","

# The applied options are for CSV files. For other file types, these will be ignored.
df = spark.read.format(file_type) \
  .option("inferSchema", infer_schema) \
  .option("header", first_row_is_header) \
  .option("sep", delimiter) \
  .load(file_location)

# COMMAND ----------

# DBTITLE 1,Select columns
heatMapDf = df.select(["dt", "AverageTemperature", "City", "Latitude", "Longitude"])

# COMMAND ----------

# DBTITLE 1,Replace null with 0
heatMapDfWithoutNull=heatMapDf.na.fill(0,"AverageTemperature")

# COMMAND ----------

# DBTITLE 1,Reformat date
annualHeatMapDf = heatMapDfWithoutNull.select("City", "Latitude", "Longitude", date_format(col("dt"), "yyyy").alias("year"), "AverageTemperature")

# COMMAND ----------

annualHeatMapDf = annualHeatMapDf.drop("City")

# COMMAND ----------

# DBTITLE 1,Group by city and year
finalDf = annualHeatMapDf.groupBy("year", "Longitude", "Latitude").agg({"AverageTemperature": "avg"})

# COMMAND ----------

# DBTITLE 1,Get the 10 hottest city
from pyspark.sql.types import StructType, StructField, StringType

data_schema = StructType([StructField("year", StringType(), True), StructField("Longitude", StringType(), True), StructField("Latitude", StringType(), True), StructField("avg(AverageTemperature)", StringType(), True)])

@udf 
def getHottestCities(pdf):
  return pdf.sort_values('avg(AverageTemperature)',ascending=False,inplace=True).head(10)

# COMMAND ----------

#finalDf = finalDf.groupBy("year", "City", "Longitude", "Latitude").applyInPandas(getHottestCities, schema=data_schema)

# COMMAND ----------

# DBTITLE 1,Rename column
finalDf = finalDf.withColumnRenamed("avg(AverageTemperature)", "temp")
finalDf = finalDf.withColumnRenamed("Longitude", "longitude")
finalDf = finalDf.withColumnRenamed("Latitude", "latitude")

# COMMAND ----------

# DBTITLE 1,Longitude latitude UDF
@udf 
def longitudeConversion(longitude):
  if longitude[-1] == "E":
    return longitude
  else:
    return float(longitude)*(-1)
  
@udf 
def latitudeConversion(latitude):
  if latitude[-1] == "N":
    return latitude
  else:
    return float(latitude)*(-1)

@udf
def tempConversion(temp):
  return math.floor((float(temp)+40)/10) + 1

# COMMAND ----------

# finalDf = finalDf.withColumn("Longitude", longitudeConversion("Longitude"))
# finalDf = finalDf.withColumn("Latitude", latitudeConversion("Latitude"))
# finalDf = finalDf.withColumn("AverageAnnualTemp", tempConversion("AverageAnnualTemp"))

# COMMAND ----------

print(finalDf.toJSON().collect())

# COMMAND ----------

finalDf.write.mode("overwrite").json("C:/Users/lenovo/Desktop")
