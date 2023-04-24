const { ReE,ReS,to} = require('../global_functions')

const authenticationService = require('../services/authentication.service')
const Authenticate = require('../models').authenticate
const toAuthenticate = async function(req,res){
    let [err,auth] = await to(authenticationService.authService(req.body))
    if(err) return ReE(res,err,422)
    if(auth) return ReS(res,auth,200)
}

module.exports.toAuthenticate = toAuthenticate

const login = async function(req,res){
    let employeeDetails = {}
    let [err,user] = await to(Authenticate.findOne({
        where:{
            username : req.body.username
        }
    }));
    if (err) return ReE(res,err,422);
    console.log('user Password',user);
    let [err1,token] = await to(user.getJWT())
    if(err1) return ReE(res,err1,422);
    if(user && token){
        employeeDetails['user'] =user;
        employeeDetails['token'] = token;
    }
    if(employeeDetails) return ReS(res,employeeDetails,200);
}

module.exports.login = login;