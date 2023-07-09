import { useEffect } from "react"
import { useTasks } from "../context/TasksContext"
import TaskCard from "../components/TaskCard";

const Tasks = () => {

  const { getTasksR, tasks} = useTasks();

  useEffect(()=> {
    getTasksR()
  }, [])

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 gap-2">
    {tasks.map((task) => (
      <TaskCard task={task} key={task._id}/>
  
    ))}
      
    </div>
  )
}

export default Tasks
