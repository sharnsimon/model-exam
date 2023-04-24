const {TE,to} = require('../global_functions')
const Authenticate =  require('../models').authenticate

const authService = async function(data){
    let [err,det] = await to(Authenticate.create({
        id:data.id,
        username:data.username,
        password:data.password
    }))
    console.log('details',det);
    if(err)TE(err.message);
    return det;
}

module.exports.authService =authService