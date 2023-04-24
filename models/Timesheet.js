module.exports = (sequelize,DataTypes)=>{
    const Model = sequelize.define('timesheet',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        employeeId:{
            type:DataTypes.INTEGER
        },
        date:{
            type:DataTypes.DATE
        },
        description:{
            type:DataTypes.STRING
        },
        status:{
            type:DataTypes.STRING
        }
    },{
        tableName:'timesheet',
        timestamps:true,
        underscored:false
    })
    return Model
}
