const Queue = require("bull");
const jobQueue = new Queue('job-queue');

const addJobToQueue = async(jobId) => {
    await jobQueue.add({id:jobId});
};

module.exports = {
    addJobToQueue
};