import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        default:'Female'

    },
    nationality: {
        type: String,
        required: true,
        enum:[ 'Ugandan', 'Kenyan', 'Tanzanian', 'Burundian', 'Rwandese', 'Somali','South Sudanese' ]


},
    settlement: {
        type: String,
        required:true,
        enum : ['Gulu settlement camp','Arua settlement camp','Mbarara settlement camp','Kasese settlement camp','Busia settlement camp','Mbale settlement camp','Kigezi settlement camp']

    },
    lastname:{
        type:String,
        required:true
    },
    placeofbirth:{
        type:String,
        required:true
    },
    maritalstatus:{
        type:String,
        required:true,
        enum:['Single','Married','Divorced','Widowed','Separated']
    },
    joindate:{
        type:Date,
        required:true
    }

});

const Form = mongoose.model('Form', formSchema);

export default Form;