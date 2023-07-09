import { createContext, useContext, useState } from "react";
import { createTask, getTasks, getTask, deleteTask, updateTask } from "../api/tasks";

//Creamos un contexto para las tareas que va a venir de la funcion
//createContext de React

const TaskContext = createContext();

//Exportamos un hook llamado useTasks que va a ser igual al uso del contexto

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }

  return context;
};

//Exportamos la funcion TasksProvider que será el contenedor para todos los
//componentes que pueden acceder

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasksR = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTaskR = async (task) => {
    const res = await createTask(task);
    console.log(res);
  };

  const deleteTaskR = async (id) => {
    const res = await deleteTask(id);
    console.log(res);
  };

  const getTaskR = async (id) => {
    const res = await getTask(id);
    return res.data;
  }

  const updateTaskR = async (id, task) => {
    const res = await updateTask(id, task);

  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTaskR,
        getTasksR,
        deleteTaskR,
        getTaskR,
        updateTaskR
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
