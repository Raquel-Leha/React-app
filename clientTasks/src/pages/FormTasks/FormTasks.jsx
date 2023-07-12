import { useForm } from "react-hook-form";
import { useTasks } from "../../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./FormTasks.css";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const FormTasks = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createTaskR, getTaskR, updateTaskR } = useTasks();
  const [ emailValue, setEmailValue ]  = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {

      if (params.id) {

        const task = await getTaskR(params.id);
        setEmailValue(task.email);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).utc().format("YYYY/MM/DD"));
  
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const dataValidEdit = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
      email: emailValue,
    };

    const dataValidAdd = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
      email: data.email ? data.email : "email@gmail.com"

    
    };
 

    if (params.id) {
      updateTaskR(params.id, dataValidEdit);
    } else {
      createTaskR(dataValidAdd);
    }
    navigate("/tasks");
  });

  return (
    <div className="div-container">
      <form className="main-container" onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            placeholder="Título"
            {...register("title")}
            className="div-input"
            autoFocus
          />
        </div>

        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            rows="3"
            placeholder="Descripción"
            {...register("description")}
            className="div-input"
          ></textarea>
        </div>

        <div>
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            placeholder="Fecha"
            {...register("date")}
            className="div-input"
          />
        </div>

        <div>
          <p>¡Comparte la tarea con otra persona!</p>
          <input
            type="email"
            placeholder="Email de tu amig@"
            {...register("email")}
            className="div-input"
          />
        </div>

        <button className="button-div">Añadir tarea</button>
      </form>
    </div>
  );
};

export default FormTasks;
