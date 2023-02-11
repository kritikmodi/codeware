const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    language: {
        type: String,
        required: true,
        enum: ["cpp", "py"]
    },
    filepath: {
        type: String,
        required: true
    }
});

const Job = new mongoose.model('job', JobSchema);

module.exports = Job;