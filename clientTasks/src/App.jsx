import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { AuthProvider } from "./context/AuthContext";
import Tasks from "./pages/Tasks/Tasks";
import FormTasks from "./pages/FormTasks/FormTasks";
import Home from "./pages/Home/Home";
import Profile from "./pages/profile";
import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/TasksContext";
import Header from "./components/Header/Header";

function App() {


  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/register" element={<Register></Register>} />

            <Route element={<ProtectedRoute />}>
              <Route path="/tasks" element={<Tasks></Tasks>} />
              <Route path="/add-task" element={<FormTasks></FormTasks>} />
              <Route path="/tasks/:id" element={<FormTasks></FormTasks>} />
              <Route path="/profile" element={<Profile></Profile>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
