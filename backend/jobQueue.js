const Queue = require("bull");
const jobQueue = new Queue('job-queue');

const NUM_WORKERS = 5;

jobQueue.process(NUM_WORKERS, () => {
    
});

const addJobToQueue = async(jobId) => {
    await jobQueue.add({id:jobId});
};

module.exports = {
    addJobToQueue
};
