const Department = require('../models').department
const {to,ReS,ReE} = require('../global_functions')
const addDepartment = async function(req, res){
    let [err,dept] = await to(
    
    )
if (err) return ReE(res,err,422)
if(dept) return ReS(res,dept,200)

}
module.exports.addDepartment = addDepartment

// const getInfo = async function(req,res){
//     let [infer,inf] = await to(employeeService.getDetails(req.body))
//     if(infer) return ReE(res,infer,422)
//     if(inf) return ReS(res,inf,200)
// }

// const getInfo = async function(req,res){
//     let [inferr, info] = await to(Employee.findAll(
//         {
//             include:{
//                 model:Department,
//                 attributes:['deptname'],
//                 where:{
//                     deptname:{
//                     [Op.in]:req.body.departmentArray
//                 }
//             }
//             },
//             where:{
//               empname:{
//                     [Op.substring]:req.body.searchString
//                 }
//             }
//         }
//     ))
//     if(inferr) return ReE(res,inferr,422)
//     if(info) return ReS(res,info,200)


//     let[filerr,filter]=await to(Employee.findAll({
//         include:{
//             model:Department,
//             attributes:['deptname'],
//             where:{
//                 deptname:{
//                     [Op.eq]:'CSE'
//                 }
            
//             },

//         },
//         attributes:['id','empname','salaryDetails'],
//         order:[['id','DESC']],
        
        
//     }))
//     if(filerr) return ReE(res,filerr,422)
//     if(filter) return ReS(res,filter,200)




