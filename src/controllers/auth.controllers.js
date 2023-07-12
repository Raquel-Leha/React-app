import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  //El cliente manda al back el username, el email y el usuario
  const { username, email, password } = req.body;

  try {
    const userFound = await User.findOne({email});
    if(userFound)
       return res.status(400).json(["El email ya existe"]);
    //Encriptamos la contraseña con el método hash de bcrypt
    const passwordHash = await bcrypt.hash(password, 10);


    //Guardamos en newUser al nuevo usuario con los datos que nos proporciona el cliente

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    //Salvamos la información en la base de datos

    const userSaved = await newUser.save();

    // Guardamos en la variable token el nuevo token creado a partir del id 
    //que la base de datos proporciona a cada new User
    const token = await createAccessToken({ id: userSaved._id });

    //El back devuelve el token al cliente
    //En las Cookies del navegador guardamos el token generado en el back
    res.cookie("token", token);

    //El back devuelve al cliente un objeto con el id, el username y el email del nuevo usuario
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
     res.status(500).json({message: error.message});
  }
};


export const login = async (req, res) => {
  //El cliente hace login con el email y la contraseña
  const { email, password } = req.body;

  try {

    //Primero buscamos al usuario por el email

    const userFound = await User.findOne({email});
    if(!userFound) return res.status(400).json(["User not found"]);

    //Y si lo encontramos comparamos la contraseña enviada con la contraseña 
    //que hemos guardado encriptada en el back

    const isMatch = await bcrypt.compare(password, userFound.password);
    if(!isMatch) return res.status(400).json(["Incorrect password"]);

    //Guardamos en token el token generado por el back con el id del usuario
    const token = await createAccessToken({ id: userFound._id });
    //El back devuelve el token al cliente
    //En las Cookies del navegador guardamos el token generado en el back
    res.cookie("token", token);

    ///El back devuelve al cliente un objeto con el id, el username y el email del nuevo usuario
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
     res.status(500).json({message: error.message});
  }
};

export const logout = async (req, res) => {

  //Eliminamos el token guardado en las cookies
  res.cookie('token', "", {
    expires: new Date(0)
  })
  return res.sendStatus(200);

};


//No está en uso todavía...
export const profile = async (req, res) => {


  const userFound = await User.findById(req.user.id)
  console.log(userFound);

  if(!userFound) return res.status(400).json({message: "User not found"});

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email
  })
};


export const verify = async (req,res) => {
  const { token } = req.cookies;

  if(!token) return res.status(401).json({message: "No autorizado, nada autorizado"});

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if(err) return res.status(401).json({message: "No autorizado, no autorizado"})

    const userFound = await User.findById(user.id);
    if(!userFound) return res.status(401).json({message: "sin No autorizado"})

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    })
  })
}






