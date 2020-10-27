# Databricks notebook source
from pyspark.sql.functions import col, date_format, avg, udf
from pyspark.sql import Window
from pyspark.sql.functions import row_number, desc, floor

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
heatMapDf = df.select(["dt", "AverageTemperature", "Latitude", "Longitude"])

# COMMAND ----------

# DBTITLE 1,Replace null with 0
heatMapDfWithoutNull=heatMapDf.na.fill(0,"AverageTemperature")

# COMMAND ----------

# DBTITLE 1,Reformat date
annualHeatMapDf = heatMapDfWithoutNull.select("Latitude", "Longitude", date_format(col("dt"), "yyyy").alias("year"), "AverageTemperature")

# COMMAND ----------

# DBTITLE 1,Group by city and year
annualHeatMapDf = annualHeatMapDf.groupBy("year", "Longitude", "Latitude").agg({"AverageTemperature": "avg"})

# COMMAND ----------

annualHeatMapDf = annualHeatMapDf.withColumnRenamed("avg(AverageTemperature)", "temperature")

# COMMAND ----------

# DBTITLE 1,Get the 20 hottest cities
windowSpec = Window.partitionBy("year").orderBy(desc("temperature"))
hottestCitiesDf = annualHeatMapDf.withColumn("row_number",row_number().over(windowSpec))
hottestCitiesDf = hottestCitiesDf.where(col("row_number")<=20)
hottestCitiesDf = hottestCitiesDf.drop("row_number")

# COMMAND ----------

# DBTITLE 1,Longitude latitude temperature UDF
@udf 
def longitudeConversion(longitude):
  if longitude[-1] == "E":
    return longitude[0:-1]
  else:
    return float(longitude[0:-1])*(-1)
  
@udf 
def latitudeConversion(latitude):
  if latitude[-1] == "N":
    return latitude[0:-1]
  else:
    return float(latitude[0:-1])*(-1)

# COMMAND ----------

hottestCitiesDf = hottestCitiesDf.withColumn("Longitude", longitudeConversion("Longitude").alias("longitude"))\
                                 .withColumn("Latitude", latitudeConversion("Latitude").alias("latitude"))

# COMMAND ----------

array = hottestCitiesDf.toJSON().collect()
print(hottestCitiesDf.toJSON().collect())

# COMMAND ----------

dbutils.fs.put("dbfs:/FileStore/tables/temp.txt", "{}".format(array))
#array.write.format("text").mode("overwrite").save("dbfs:/FileStore/tables/temp.txt")
