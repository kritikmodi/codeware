const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({

});

const Job = new mongoose.model('job', JobSchema);

module.exports = Job;