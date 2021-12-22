const { Decimal128 } = require('bson')
const {Schema, model}=require('mongoose')

const inscripciones=new Schema({
    project_id: {
        type: String,
       // unique:true,
        required: true,
      },
      user_id: {
        type: String,
       // unique:true,
        required: true,
      },
      status: {
        type: String,
        enum: ['acepted', 'rejected','Pending'],
        default:"Pending",
        required: true,
      },
      enrollmentDate: {
        type: Date,
        required: true,
      },
      egressDate: {
        type: Date,
        required: true,
      },
      role: {
        type: String,
        required: true
    }
    
})
module.exports = model('inscripciones2',inscripciones,"inscripciones2")
