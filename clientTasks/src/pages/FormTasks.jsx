import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const FormTasks = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createTaskR, getTaskR, updateTaskR } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTaskR(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).utc().format('YYYY/MM/DD'));
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
      email: data.email ? data.email : "email@gmail.com"
    };
    

    if (params.id) {
      updateTaskR(params.id, dataValid);
    } else {
      createTaskR(dataValid);
    }
    navigate("/tasks");
  });

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          autoFocus
        />
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          rows="3"
          placeholder="Description"
          {...register("description")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></textarea>

        <label htmlFor="fecha">Fecha</label>
        <input
          type="date"
          placeholder="Fecha"
          {...register("date")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
         <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />

        <button className="bg-indigo-500 px-3 py-2 rounded-md">
          Añadir tarea
        </button>
      </form>
    </div>
  );
};

export default FormTasks;
