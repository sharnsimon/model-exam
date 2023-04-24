const { ReE,ReS,to } = require('../global_functions')
const dataFormatService = require('../services/dataFormat.services')



const dateFormat = function(req,res){
   var date= dataFormatService.formatDate(req.body.date,req.body.format)
    if(date) return ReS(res,{date},200)
}

module.exports.dateFormat = dateFormat