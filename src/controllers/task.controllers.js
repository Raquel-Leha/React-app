import Task from "../models/task.model.js";
import User from "../models/user.model.js";

export const getTasks = async (req, res) => {
  //Buscamos las tareas cuyo id coincida con el req.user.id 
  const tasks = await Task.find({
    user: req.user.id,
  }).populate("user");
  res.json(tasks);
};

export const createTasks = async (req, res) => {

  
  const { title, description, date, email } = req.body;

  if (email !== "email@gmail.com") {

    //Buscamos al usuario con el que se quiere compartir la tarea (id, email, username)
    //y lo guardamos en user2
    const user2 = await User.findOne({
      email: email,
    });
    //Buscamos el usuario que crea la tarea compartida y lo guardamos en user1
    const user1 = await User.findById(req.user.id)
    

    const newTask = new Task({
      title,
      description,
      date,
      user: [req.user.id, user2._id],
      email: [user1.username, user2.username]
    });

    const savedTask = await newTask.save();

    /*const newTask2 = new Task({
      title,
      description,
      date,
      user: user2._id,
      email : user1.email,
    });

    const savedTask2 = await newTask2.save();*/

    res.json(savedTask);
  } else {
    const newTask = new Task({
      title,
      description,
      date,
      user: [req.user.id],
      email: [email]
    });

    const savedTask = await newTask.save();
    res.json(savedTask);
  }
};

export const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id).populate("user");
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

export const deleteTasks = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  return res.status(204);
};

export const updateTasks = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};
