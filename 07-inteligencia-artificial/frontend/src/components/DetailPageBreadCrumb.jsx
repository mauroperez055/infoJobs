import styles from '../Pages/Detail.module.css';
import { Link } from './Link';

/**
 * Componente que muestra la navegacion BreadCrumb 
 * con informacion de la ruta actual (titulo de la oferta)
 * y link para volver a la lista de empleos
 */

export function DetailPageBreadCrumb ({ job }) {
  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label='Ruta de navegación'>
        <Link
          to="/search"
          className={styles.breadcrumbButton}
        >
          Empleos
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent} aria-current='page'>{job.titulo}</span>
      </nav>  
    </div>
  )
}