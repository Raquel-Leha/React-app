import { useEffect, useState } from "react";
import { useTasks } from "../../context/TasksContext";
import TaskCard from "../../components/TaskCard/TaskCard";
import Filter from "../../components/Filter/Filter";

import "./Tasks.css";

const Tasks = () => {
  const { getTasksR, tasks } = useTasks();
  const [ valueFilter, setValueFilter] = useState("");
  

  useEffect(() => {
    getTasksR();
  }, []);

  const filteredValue = tasks.filter((task)=> task.title.toLowerCase().includes(valueFilter.toLowerCase()));


  return (
    <>
      <Filter setValueFilter={setValueFilter}/>
      <div className="father-container">
        {filteredValue.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </>
  );
};

export default Tasks;
