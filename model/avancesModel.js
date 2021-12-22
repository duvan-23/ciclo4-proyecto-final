const {Schema, model}=require('mongoose')

const avances2=new Schema({
    project_id: {
        type: String,
        // required: true, 
    },
    addDate: {
        type:Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    observations: {
        type: String,
        required: true,
    }

})

module.exports = model('avances3', avances2, "avances3")