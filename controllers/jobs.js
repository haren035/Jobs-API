const getAllJobs = async (req, res) => {
    res.send('get all the jobs')
}

const getJob = async (req, res) => {
    res.send('get job')
}
const createJob = async (req, res) => {
    res.send('create jobs')
}
const updateJob = async (req, res) => {
    res.send('update jobs')
}
const deleteJob = async (req, res) => {
    res.send('delete job')
}



module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}