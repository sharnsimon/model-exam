var express = require('express')
var router = express.Router();
var passport = require('passport')
var jwt = require('jsonwebtoken')

let departmentController = require('../controllers/department.controller')
let employeeController = require('../controllers/employee.controller')
let dateformatController = require('../controllers/dateFormat.controller');
let timesheetController = require('../controllers/timesheet.controller')
const authenticationController= require('../controllers/authentication.controller');
require('../middleware/passport')(passport)
router.post('/addDepartment',departmentController.addDepartment)
// router.post('/addEmployee',employeeController)

router.get('/getInfo',employeeController.getInfo)
router.get('/getEmployeeInfo',employeeController.getEmployeeInfo)
router.get('/dateformat',dateformatController.dateFormat)
router.get('/tokenAuth',passport.authenticate('jwt',{session:false}),
    function(req,res,next){
        console.log("hello",req.user.username);
        res.send('done '+req.user.username )
    })
router.get('/login',authenticationController.login)
router.post('/toAuthenticate',authenticationController.toAuthenticate)




router.get('/getTimesheet',timesheetController.getTimesheet)
router.get('/getTimesheetDuration',timesheetController.getTimesheetDuration)
router.post('/addTimesheet',timesheetController.addTimesheet)
router.get('/getAllDetails',timesheetController.getAllDetails)

module.exports=router;
