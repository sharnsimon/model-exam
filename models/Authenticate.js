const crypto = require('crypto')
const bcrypt = require('bcrypt')
const{ to } = require('../global_functions')
const cryptoService = require('../services/crypto.service')
const jwt =  require('jsonwebtoken')
module.exports = (sequelize,DataTypes)=>{
    const Model = sequelize.define('authenticate',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        username:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING
        }

    },{
        tableName:'authenticate',
        paranoid:true,
        underscored:false
    });

    Model.beforeSave(async(user,details)=>{
        let err;
        if(user.changed('password')){
            let salt,hash;
            let rounds = crypto.randomInt(4,10);
            // console.log(rounds);
            [err,salt] = await to(bcrypt.genSalt(rounds));
            if(err){
                console.log("error adding salt"+err.message);
            }
            [err,hash] = await to(bcrypt.hash(user.password,salt));
            if(err){
                console.log("err creating hash" + err.message);
            }
            user.password=hash;
        }
        
    })
    
    Model.prototype.getJWT= async function(){
        //console.log("hello");
        let err, encryptedToken;
        const token = "Bearer " + jwt.sign({
            id:this.id,
            username:this.username
        },CONFIG.jwt_encryption,{expiresIn : CONFIG.jwt_expiration});
        //console.log(token);
        [err,encryptedToken] = await to(cryptoService.encrypt(token));
        //console.log(encryptedToken);
        if(err) return TE(err);
        return encryptedToken;
    };



    return Model
}