module.exports = (sequelize,DataTypes)=>{

    const Model = sequelize.define('employee',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        empname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        salaryDetails:{
            type:DataTypes.JSON
        },
        departmentId:{
            type:DataTypes.INTEGER
        },
        dateOfBirth:{
            type:DataTypes.DATE
        },
        dateOfJoin:{
            type:DataTypes.DATE
        },
        password:{
            type:DataTypes.STRING
        }

    },{
        tableName:'employee',
        timestamps:true,
        paranoid:true,
        underscored:false
    })

    Model.beforeSave(async(user,options)=>{
        
    })

    
    Model.associate= function(models){
        this.departmentId = this.belongsTo(models.department)
    }

return Model
}