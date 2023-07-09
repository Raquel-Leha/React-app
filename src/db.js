import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://rlopezn833:los3pilares@cluster0.khyodqw.mongodb.net/tasks');
    console.log('Base de datos conectada');
  } catch (error) {
    console.log(error);
  }
};
