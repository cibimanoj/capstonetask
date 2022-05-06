import { FormRow, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTask = () => {
  const {
    isLoading,
    isEditing,
    assignee,
    task,
    domain,
    taskTypeOptions,
    taskType,
    status,
    statusOptions,
    handleChange,
    clearValue,
    createTask,
    editTask
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (! task|| !assignee || !domain) {
      toast.warn('All fields required', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      return
    }
    if (isEditing) {
      toast.success('Task Updated', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      editTask()
      return
    }else{
      toast.success('Task Created', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      createTask()
    }
    
  };

  const handleTaskInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit task" : "add task"} </h3>

        {/* assignee*/}
        <div className="form-center">
          <FormRow
            type="text"
            name="task"
            value={task}
            handleChange={handleTaskInput}
          />
          {/* task*/}
          <FormRow
            type="text"
            name="assignee"
            value={assignee}
            handleChange={handleTaskInput}
          />
          {/*domain */}
          <FormRow
            type="text"
            name="domain"
            value={domain}
            handleChange={handleTaskInput}
          />
          {/* task type */}
          {/* job status */}

          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleTaskInput}
            list={statusOptions}
          />

          {/* job type */}
          <FormRowSelect
            labelText="type"
            name="taskType"
            value={taskType}
            handleChange={handleTaskInput}
            list={taskTypeOptions}
          />

          {/* job status */}

          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValue();
              }}
            >
              clear
            </button>
            <ToastContainer />
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddTask;
