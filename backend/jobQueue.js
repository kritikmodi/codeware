const Queue = require("bull");
const jobQueue = new Queue('job-queue');

const addJobToQueue = async(jobId) => {
    await jobQueue.add({jobId});
}