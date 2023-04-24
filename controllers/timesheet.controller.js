const{to,ReS,ReE}=require('../global_functions')
const { get } = require('../routes/router')
const timesheetService = require('../services/timesheet.service')
const addTimesheet = async function(req,res){
    let [err,time] = await to(timesheetService.addTimeDet(req.body))
    if(err) return ReE(res,err,422)
    if(time) return ReS(res,time,200)
}
module.exports.addTimesheet = addTimesheet

const getTimesheet = async function(req,res){
    let [errr,timedat] = await to(timesheetService.getTimeDat(req.body))
    if(errr) return ReE(res,errr,422)
    if(timedat) return ReS(res,timedat,200)
}

module.exports.getTimesheet = getTimesheet

const getTimesheetDuration = async function(req,res){

    let [err1,duration ] = await to(timesheetService.timeDuration(req.body))
    if(err1) return ReE(res,err1,422)
    if(duration)return ReS(res,duration,200)
}   

module.exports.getTimesheetDuration = getTimesheetDuration

const getAllDetails =  async function(req,res){

    let[err2,durStat] = await to(timesheetService.timeDurationStatus(req.body))
    if(err2) return ReE(res,err,422)
    if(durStat) return ReS(res,durStat,200)
}

module.exports.getAllDetails = getAllDetails