import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import Tasks from "./pages/Tasks";
import FormTasks from "./pages/FormTasks";
import Home from "./pages/Home";
import Profile from "./pages/profile";
import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/TasksContext";
import Header from "./components/Header";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
        <main className="container mx-auto px-10">
        <Header/>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/register" element={<Register></Register>} />
            

            <Route element={<ProtectedRoute/>}>
              <Route path="/tasks" element={<Tasks></Tasks>} />
              <Route path="/add-task" element={<FormTasks></FormTasks>} />
              <Route path="/tasks/:id" element={<FormTasks></FormTasks>} />
              <Route path="/profile" element={<Profile></Profile>} />
            </Route>
          </Routes>
        </main>
     
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
