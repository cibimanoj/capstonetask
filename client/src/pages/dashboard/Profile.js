import { useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user, updateUser, isLoading } = useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [designation, setDesignation] = useState(user?.designation);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !designation) {
      // test and remove temporary
      toast.warn("All fields required", {
       position: "top-center",
       autoClose: 3000,
      hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
        draggable: true,
        progress: undefined,
     });

      return;
    } else {
      toast.success("User Updated successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    updateUser({ name, email, lastName, designation });
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile </h3>
        {/* name */}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            labelText="last name"
            type="text"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormRow
            type="text"
            name="designation"
            value={designation}
            handleChange={(e) => setDesignation(e.target.value)}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
          <ToastContainer />
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
