import { Link as NavLink } from "react-router";

/**
 * Componente que sirve para navegar por la pagina 
 * cuando se le hace click a un enlace.
 */

export function Link ({ href, children, ...restOfProps }) {
  return (
    <NavLink to={href} {...restOfProps}>
      {children}
    </NavLink>
  )
}