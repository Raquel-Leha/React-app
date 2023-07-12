import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import  "./Header.css"

function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header>
      <nav className="div-nav">
        <Link to="/">
          <button>Organizador de Tareas</button>
        </Link>
        <div className="container">
          {isAuthenticated ? (
            <>
              <div className="div-welcome">Bienvenid@ {user.username}!</div>

              <button>
                <Link
                  to="/add-task"
                  className="bg-indigo-500 px-4 py-1 rounded-sm"
                >
                  Añadir tarea
                </Link>
              </button>
              <button>
                <Link
                  to="/"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Link>
              </button>
            </>
          ) : (
            <>
              <button>
                <Link
                  to="/login"
                
                >
                  Login
                </Link>
              </button>

              <button>
                <Link
                  to="/register"
                 
                >
                  Registrarse
                </Link>
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
