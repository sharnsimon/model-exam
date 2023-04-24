const moment = require('moment')

const formatDate = function(inputDate,inputFormat){
    return moment(inputDate).format(inputFormat)
}

module.exports.formatDate = formatDate

