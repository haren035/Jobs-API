const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')


const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs, count: jobs.length })
}


//GET JOB
const getJob = async (req, res) => {
    const {
        user: { userId },        //const userId = req.user.userId
        params: { id: jobId },  //const jobId = req.params.id -> const { params: { id: userId } } = req
    } = req
    
    const job= await Job.findOne({
        _id: jobId,
        createdBy: userId,
    })
    
    
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job})
}

//CREATE JOB
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

//UPDATE JOB
const updateJob = async (req, res) => {

    const {
        body: { company, position},
        user: { userId },
        params: { id: jobId },
    } = req


    if( company === '' || position === '') {
        throw new BadRequestError('Company or Position fields cannot be empty')
    }
    const job = await Job.findByIdAndUpdate(
        { _id: jobId, createdBy: userId }, 
        req.body,
        { new:true, runValidators:true }
        )

    
    if (!job) { 
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
} 

//DELETE JOB
const deleteJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
    } = req

    const job = await Job.findByIdAndRemove({
        _id:jobId,
        createdBy:userId
    })

    if (!job) { 
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).send("Delettion Success!")

}



module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}