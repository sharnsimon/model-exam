const Timesheet = require('../models').timesheet
const {to,TE} = require('../global_functions')
const {Op} = require('sequelize')
const sequelize = require('sequelize')
const addTimeDet = async function(data){
        let [err,timedat] = await to(Timesheet.create({
        employeeId : data.employeeId,
        date: data.date,
        description:data.description,
        status:data.status
    }))
    if(err) return TE(err)
    return timedat
}
module.exports.addTimeDet = addTimeDet

const getTimeDat = async function(data){
    let constraint = {}
    if(data&&data.length){
        constraint.status =  {
            [Op.in]:data.statusArray
        }
    }
        let[errr,timedet] = await to(Timesheet.findAll({
            where:constraint
            
        }))
        console.log(timedet)
        if(errr) return TE(errr.message);
        return timedet;
    
}
module.exports.getTimeDat=getTimeDat;

const timeDuration = async function(data){
let condition = {};
let currentDate;
let oldDate;
if(Object.keys(data).length!=0){
    
    if(data.durationArray.includes('Last 30 days')){
        
        currentDate = new Date()
        currentDate =currentDate.getDate()
        console.log(currentDate)
        oldDate = new Date()
        oldDate.setDate(currentDate-30)
        console.log(oldDate)
    }
    condition = {
        
        [Op.or]:[{date:{
            [Op.between]:[currentDate,oldDate]
        }},
        sequelize.where(sequelize.fn('YEAR',sequelize.col('date')),{[Op.in]:data.durationArray})
    ]
    };
}
    let [errr,timedur] = await to(Timesheet.findAll({
        where:condition
    }));
    console.log('check123',errr);
    if(errr) return TE(errr.message)
    return timedur;

}
module.exports.timeDuration = timeDuration
const timeDurationStatus = async function(data){
    let condition = {};
    let currentDate;
    let oldDate;
    if(Object.keys(data).length!=0){
        
        if(data.durationArray.includes('Last 30 days')){
            
            currentDate = new Date()
            currentDate =currentDate.getDate()
            console.log(currentDate)
            oldDate = new Date()
            oldDate.setDate(currentDate-30)
            console.log(oldDate)
        }
        condition = {

            
            status:{
                [Op.in]:data.statusArray
            },
            [Op.or]:[{date:{
                [Op.between]:[currentDate,oldDate]
            }},
            sequelize.where(sequelize.fn('YEAR',sequelize.col('date')),{[Op.in]:data.durationArray})
        ]
        };
    }
        let [errr,timedur] = await to(Timesheet.findAll({
            where:condition
        }));
        console.log('check123',errr);
        if(errr) return TE(errr.message)
        return timedur;
    
    }
    module.exports.timeDurationStatus = timeDurationStatus
    











// const getTimeDat = async function(data){
//     let constraint = {}
//     if(data&&data.length){
//         constraint.status =  {
//             [Op.in]:data.statusArray
//         }
//     }
//         let[errr,timedet] = await to(Timesheet.findAll({
//             where:constraint
            
//         }))
//         console.log(timedet)
//         if(errr) return TE(errr.message);
//         return timedet;
    
// }
// module.exports.getTimeDat=getTimeDat;

// const timeDuration = async function(data){
//     condition = {}
//     let currentDate = new Date();
//     currentDate.setDate(currentDate.getDate());
//     console.log(currentDate)
//     let oldDate = new Date();
//     oldDate.setDate(oldDate.getDate()-30)
//     console.log(oldDate)
//     if(data.durationArray==='Last 30 days'){
//         condition.date = {
//             [Op.between] : [currentDate,oldDate]
//         }
//     }
//     else
//     {
//         if(data&&data.length){
//             condition.date = sequelize.where(
//                 sequelize.fn('YEAR', sequelize.col('date')),
//                 Op.eq,
//                 data.durationArray
//               )}

//     let[durerr,duration] = await to(Timesheet.findAll({
//                 where:condition
//             }))
//         if(durerr) TE(durerr,message)
//         return duration
//     }
   
module.exports.timeDuration = timeDuration
