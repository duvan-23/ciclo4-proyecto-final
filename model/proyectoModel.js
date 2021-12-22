const { Decimal128 } = require('bson')
const {Schema, model}=require('mongoose')

const proyectos=new Schema({
    name: {
        type: String,
        unique:true,
        required: true,
      },
      generalObjective: {
        type: String,
        required: true,
      },
      specificObjectives: {
        type: [],
        required: true,
      },
      budget: {
        type: Number,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      leader_id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default:"INACTIVE",
        required: true,
      },
      phase: {
        type: String,
        required: true,
        default:"Null",
      },
      integrantes:[String]
    
})
module.exports = model('proyectos3',proyectos,"proyectos3")
