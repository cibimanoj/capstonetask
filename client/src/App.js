import React from "react";
import { Welcome, Register, Error,ProtectedRoute } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AllTasks,
  AddTask,
  Stats,
  SharedLayout,
  Profile,
} from "./pages/dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><SharedLayout/></ProtectedRoute>}>
        <Route index element={<Stats/>} />
          <Route path="all-tasks" element={<AllTasks />}></Route>
          <Route path="add-task" element={<AddTask />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
