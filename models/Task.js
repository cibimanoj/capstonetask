import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, 'Please provide task'],
      maxlength: 100,
    },
    assignee: {
      type: String,
      required: [true, 'Please provide assignee name'],
      maxlength: 50,
    },
    status: {
      type: String,
      enum: ['todo', 'inprogress', 'completed'],
      default: 'todo',
    },

    taskType: {
      type: String,
      enum: ['minor', 'major', 'critical', 'blocker'],
      default: 'critical',
    },
    domain: {
      type: String,
      default: 'mern stack',
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Task', TaskSchema)