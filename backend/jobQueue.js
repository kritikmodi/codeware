const Queue = require("bull");
const jobQueue = new Queue('job-queue');

const NUM_WORKERS = 5;

const Job = require('./models/Job');

jobQueue.process(NUM_WORKERS, async ({data}) => {
    console.log(data);
    const {id : jobId} = data;
    const job = await Job.findById(jobId);
    if(job === undefined){
        throw Error("Job not found!");
    }
    console.log("Fetched Job", job);
    return true;
});

jobQueue.on('failed', (error) => {
    console.log(error.data.id, "failed", error.failedReason);
});

const addJobToQueue = async(jobId) => {
    await jobQueue.add({id:jobId});
};

module.exports = {
    addJobToQueue
};
