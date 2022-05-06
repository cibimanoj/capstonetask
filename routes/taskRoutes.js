import express from "express"
const router = express.Router()
import { createTask,deleteTask,updateTask,getAllTask,showStats } from "../controllers/taskControl.js"


router.route('/').post(createTask).get(getAllTask)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteTask).patch(updateTask)

export default router