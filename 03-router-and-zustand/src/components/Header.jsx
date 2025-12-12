import { NavLink } from "react-router";
import { Link } from "./Link";
import { useAuthStore } from "../store/authStore";
import { useFavoriteStore } from "../store/favoriteStore";

export function Header () {
  const { isLoggedIn } = useAuthStore();
  const { countFavorites } = useFavoriteStore();

  const numberOfFavorites = countFavorites();

  const HeaderUserButton = () => {
    const { isLoggedIn, login, logout } = useAuthStore();

    return isLoggedIn
      ? <button onClick={logout} className="button-apply-job">Cerrar sesión</button>
      : <button onClick={login} className="button-apply-job">Iniciar sesión</button>
  }
   
  return( 
      <header>
        <Link href="/" style={{ textDecoration: 'none'}}>
          <h1 style={{ color: 'white' }}>
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              > 
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            DevJobs
          </h1>
        </Link>

        <nav>
          {/**
           * NavLink nos permite detectar si el componente esta "activo"
           * segun la ruta en la que esté y asi poder aplicar estilos.
           */}
          <NavLink
            className={({ isActive }) => isActive ? 'nav-link-active' : ''} 
            to="/">
              Inicio
          </NavLink>
          <NavLink 
            className={({ isActive }) => isActive ? 'nav-link-active' : ''}
            to="/search">
              Empleos
          </NavLink>
          {
            isLoggedIn && (
              <NavLink className={({ isActive }) => isActive ? 'nav-link-active' : ''}
              to="/profile">
                Profile ❤️ ({numberOfFavorites})
              </NavLink>
            )
          }
          
        </nav>

        <HeaderUserButton />

      </header>

  )
}

