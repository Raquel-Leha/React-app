import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import "./Login";


function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if(isAuthenticated) navigate ('/tasks');

  }, [isAuthenticated]);

  return (
    <div>
      <div>
        {signinErrors.map((error, i) => (
          <div  className="errors-style" key={i}>
            {error}
          </div>
        ))}
        <form className = "form-div" onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          {errors.email && <p className="errors-style">El email es necesario</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
          />
          {errors.password && (
            <p className="errors-style">La contraseña es necesaria</p>
          )}
          <button type="submit">Login</button>
        </form>
        <p className="p-text">
          ¿No tienes cuenta de usuario? <button><Link to="/register" className="link-style">Registrarse</Link></button>
        </p>
      </div>
    </div>
  );
}

export default Login;
