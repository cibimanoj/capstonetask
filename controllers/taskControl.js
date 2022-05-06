import Task from "../models/Task.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import mongoose from "mongoose";
import moment from "moment";
//create task
const createTask = async (req, res) => {
  const { task, assignee } = req.body;
  if (!task || !assignee) {
    throw new BadRequestError("Please Provide All Values");
  }
  req.body.createdBy = req.user.userId;
  const tasks = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ tasks });
};

//delete task
const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    throw new CustomError.NotFoundError(`No task with id : ${taskId}`);
  }
  await task.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! task removed" });
};

const updateTask = async (req, res) => {
  const { id: taskId } = req.params;
  const { task, assignee } = req.body;
  if (!task || !assignee) {
    throw new BadRequestError("Please Provide All Values");
  }
  const tasks = await Task.findOne({ _id: taskId });

  if (!tasks) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }
  const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  // tasks.task=task
  //tasks.assignee=assignee
  // tasks.domain=domain
  // tasks.status=status
  //await tasks.save()

  res.status(StatusCodes.OK).json({ updatedTask });
};

const getAllTask = async (req, res) => {
  const { search, status, taskType, sort } = req.query
  const queryObject = {
    createdBy: req.user.userId,
  }
  if (status && status !== 'all') {
    queryObject.status = status
  }
  if (taskType && taskType !== 'all') {
    queryObject.taskType = taskType
  }
  if (search) {
    queryObject.task = { $regex: search, $options: 'i' }
  }

  let result = Task.find(queryObject)
  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('task')
  }
  if (sort === 'z-a') {
    result = result.sort('-task')
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit



  result = result.skip(skip).limit(limit)

  const tasks = await result
  const totalTasks = await Task.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalTasks / limit)

  res
    .status(StatusCodes.OK)
    .json({ tasks, totalTasks,numOfPages})
};
const showStats = async (req, res) => {
  let stats = await Task.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ])
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})
  const defaultStats = {
    todo: stats.todo || 0,
    inprogress: stats.inprogress || 0,
    completed: stats.completed || 0,
  }
  let monthlyTasks =  await Task.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: {
            $year: '$createdAt',
          },
          month: {
            $month: '$createdAt',
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])
  monthlyTasks = monthlyTasks
  .map((item) => {
    const {
      _id: { year, month },
      count,
    } = item
    // accepts 0-11
    const date = moment()
      .month(month - 1)
      .year(year)
      .format('MMM Y')
    return { date, count }
  })
  .reverse()
  res.status(StatusCodes.OK).json({ defaultStats, monthlyTasks })
};

export { createTask, updateTask, deleteTask, getAllTask, showStats };
