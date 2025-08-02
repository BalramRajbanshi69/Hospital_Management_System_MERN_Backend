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
        type:String,
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
        enum: [
            'Dr. Sarah Johnson',  // Added space after Dr.
            'Dr. James Wilson',
            'Dr. Emily Williams',
            'Dr. Michael Chen',
            'Dr. Lisa Anderson',
            'Dr. Robert Taylor',
            'Dr. Maria Garcia',
            'Dr. David Kim',
            'Dr. Jennifer Lee',
            'Dr. Thomas Brown'
        ]
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