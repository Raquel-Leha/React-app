import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header>
      <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
        <Link to="/">
          <h1 className="text-2xl font-bold">Organizador de Tareas</h1>
        </Link>
        <ul className="flex gap-x-2">
          {isAuthenticated ? (
            <>
              <li>Bienvenid@ {user.username}!</li>

              <li>
                <Link
                  to="/add-task"
                  className="bg-indigo-500 px-4 py-1 rounded-sm"
                >
                  Añadir tarea
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="bg-indigo-500 px-4 py-1 rounded-sm"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="bg-indigo-500 px-4 py-1 rounded-sm"
                >
                  Registrarse
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
