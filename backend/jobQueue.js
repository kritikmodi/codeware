const Queue = require("bull");
const jobQueue = new Queue('job-queue');

const NUM_WORKERS = 5;

const Job = require('./models/Job');

jobQueue.process(NUM_WORKERS, async ({data}) => {
    console.log(data);
});

const addJobToQueue = async(jobId) => {
    await jobQueue.add({id:jobId});
};

module.exports = {
    addJobToQueue
};
