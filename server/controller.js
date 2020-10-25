const tempData = require("./tempData");

exports.tempController = async (req, res, next) => {
    try {
        const year = req.params.year || 2006;
        let resData = [];

        for (const point of tempData){
            if (parseInt(point["year"]) == year){
                resData.push(point);
            }
        };

        const response = {
            status: "OK", 
            data : resData
        };

        res.status(200).json(response);

    } catch (err) {
        next(err);
    }
}