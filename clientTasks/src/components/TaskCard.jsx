import { useTasks } from "../context/TasksContext";
import {Link} from 'react-router-dom'
import days from 'dayjs'
import utc from 'dayjs/plugin/utc'
days.extend(utc)

const TaskCard = ({ task }) => {

    const {deleteTaskR, getTasksR} = useTasks();
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
       <header className="flex justify-between">
       <h1 className="text-2xl font-bold ">{task.title}</h1>
      <div className="flex gap-x-2 items-center">
        <button onClick={()=>{
            deleteTaskR(task._id);
            getTasksR();
        }}>Eliminar</button>
        
        <Link to = {`/tasks/${task._id}`}>Editar</Link>
      </div>
       </header>
   
      <p className="text-slate-300">{task.description}</p>
      <p>{days(task.date).utc().format('DD/MM/YYYY')}</p>
    </div>
  );
};

export default TaskCard;
