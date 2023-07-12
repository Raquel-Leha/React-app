import { useTasks } from "../../context/TasksContext";
import { Link } from "react-router-dom";
import days from "dayjs";
import utc from "dayjs/plugin/utc";
import "./TaskCard.css";
days.extend(utc);

const TaskCard = ({ task }) => {
  const { deleteTaskR, getTasksR } = useTasks();
  return (
    <div className="div-card">


      <div className="div-title">
        <h1>{task.title}</h1>
      </div>


      <div className="div-description">
      <p>{task.description}</p>
      </div>

      <div className="div-date">
      <p>{days(task.date).utc().format("DD/MM/YYYY")}</p>
      </div>
       

       <div className="div-email">
       <p>
        {task.email !== "email@gmail.com"
          ? `Tarea compartida entre : ${task.email[0]} y ${task.email[1]}`
          : "Tarea no compartida"}
      </p>
       </div>
  
      <div className="container-buttons">
        <button
          onClick={() => {
            deleteTaskR(task._id);
            getTasksR();
          }}
        >
          Eliminar
        </button>

        <button>
          <Link to={`/tasks/${task._id}`}>Editar</Link>
        </button>
      </div>


    </div>
  );
};

export default TaskCard;
