const Employee = require('../models').employee
const Department = require('../models').department
const {to,TE} = require('../global_functions')
const {fn,Op} = require('sequelize')
const dataFormatService = require('../services/dataFormat.services')

const addEmployee= async function(details){
    let [err,emp] = await to(Employee.create(details))
    if(err) return TE(err.message)
    if(emp) return emp
}

module.exports.addEmployee = addEmployee

const getDetails = async function(infom){
    
    let [inferr,info] = await to(Employee.findAll({
        include:{
            model:Department,
            attributes:['deptname'],
            where:{
                deptname:{
                    [Op.in]:infom.departmentArray
                }
            }
        },
        where:{
            empname:{
                [Op.substring]:infom.searchString
            }
        }
    }))
    if(inferr) return TE(inferr.message)
    
   let filteremp = info.filter((employee)=>{
    return employee.department.deptname === 'CSE'
   }).sort((a,b)=>b.id-a.id)

   if(info&&info.length){
        let netPay = info.map((pay)=>{
            if(pay.department.deptname==='ECE'){
            let sal=pay.salaryDetails;
            let PF = sal.PF?sal.PF:0;
            let PT = sal.PT?sal.PT:0;
            let ESI = sal.ESI?sal.ESI:0;
            let cess=sal.cess?sal.cess:0;
            let basic=sal.basic?sal.basic:0;
            let HRA=sal.HRA?sal.HRA:0;
            let incomeTax=sal.incomeTax?sal.incomeTax:0;
            let specialAllowance=sal.specialAllowance?sal.specialAllowance:0;
            let netSal = ((basic+HRA+specialAllowance)-(PF+PT+ESI)-(incomeTax+cess))
            return {pay,netSal}
   }}).filter(sal=>sal!=null);
        if(info&&filteremp&&netPay) return {info,filteremp,netPay}
    }
    
}

module.exports.getDetails =getDetails


const fullDetails =async function(format){

    let [emperr,emp] = await to(Employee.findAndCountAll())
    console.log(typeof(emp))
    if(emperr) return TE(emperr.message)
    if(emp.rows&&emp.rows.length){
        // let data = emp.rows.map((empdet)=>{
        //     var dob,doj 
        //     dob = dataFormatService.formatDate(empdet.dateOfBirth,format)
        //     doj = dataFormatService.formatDate(empdet.dateOfJoin,format)
        //     return {empdet,dob,doj}
        // })
        // return {data}
        emp.rows.forEach(element => {
            var dob,doj
            dob= dataFormatService.formatDate(element.dateOfBirth,format)
            doj =dataFormatService.formatDate(element.dateOfJoin,format)
            element.dataValues.formatedDOB=dob
            element.dataValues.formatedDOJ=doj
        });
        return emp
    }

    }


module.exports.fullDetails=fullDetails