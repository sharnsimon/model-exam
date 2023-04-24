const Employee = require('../models').employee
const Department = require('../models').department
const {to,ReS,ReE} = require('../global_functions')
const {fn,Op} = require('sequelize')
const employeeService = require('../services/employee.service')
const { get } = require('../routes/router')


const getInfo = async function(req,res){
    let [infer,inf] = await to(employeeService.getDetails(req.body))
    if(infer) return ReE(res,infer,422)
    if(inf) return ReS(res,inf,200)

}



module.exports.getInfo = getInfo

const getEmployeeInfo = async function(req,res){
    let[err,emp] = await to(employeeService.fullDetails(req.body.format))
    if(err) return ReE(res,err,422)
    if(emp) return ReS(res,emp,200)
}

module.exports.getEmployeeInfo = getEmployeeInfo