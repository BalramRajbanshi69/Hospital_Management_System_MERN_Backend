const mongoose = require('mongoose');
const { Schema } = mongoose;
const appointmentSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        
    },
    phone:{
        type:String,
        required:[true,'Phone number is required']
    },
    gender:{
        type:String,
        required:true,
        enum:['male','female','others']
    },
    date:{
        type:Date,
        required:true
    },
    time: {
        type: String,
        required: true,
        enum: [
            '9:00AM', '10:00AM', '11:00AM', '12:00PM',
            '1:00PM', '2:00PM', '3:00PM', '4:00PM',
            '5:00PM', '6:00PM', '7:00PM'
        ],
    },
    doctor: {
        type: String,
        required: true,
        enum: ['doctor1', 'doctor2', 'doctor3', 'doctor4', 'doctor5', 
               'doctor6', 'doctor7', 'doctor8', 'doctor9', 'doctor10']
    },
     department: {
        type: String,
        required: true,
        enum: [
            'Neurology', 'Bones', 'Oncology', 'Otorhinolaryngology',
            'Dermatology', 'Ophthalmology', 'Cardiovascular', 'Pulmonology',
            'Renal Medicine', 'Gastroenterology', 'Urology', 'Gynaelogy'
        ]
    },
    message:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


const DoctorAppointment = mongoose.model('DoctorAppointment',appointmentSchema);
module.exports = DoctorAppointment;