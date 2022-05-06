import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Task";
import TaskInfo from "./TaskInfo";
import moment from "moment";

const Task = ({ _id, assignee, task, domain, taskType, createdAt, status }) => {
  const { setEditTask, deleteTask } = useAppContext();

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{task.charAt(0)}</div>
        <div className="info">
          <h5>{task}</h5>
          <p>{assignee}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <TaskInfo icon={<FaLocationArrow />} text={domain} />
          <TaskInfo icon={<FaCalendarAlt />} text={date} />
          <TaskInfo icon={<FaBriefcase />} text={taskType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        {/* footer content */}
        <footer>
          <div className="actions">
            <Link
              to="/add-task"
              onClick={() => setEditTask(_id)}
              className="btn edit-btn"
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteTask(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Task;
