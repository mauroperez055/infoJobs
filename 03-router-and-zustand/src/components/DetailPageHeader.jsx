import styles from '../Pages/Detail.module.css';
import { useAuth } from '../context/AuthContext';

/**
 * Componente que muestra el header de cualquier 
 * oferta a la que ingresemos. 
 * Renderiza titulo, ubicacion / modalidad y
 * boton para Aplicar a la oferta
 */

export function DetailPageHeader ({ job }) {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.info}>
          <h1 className={styles.title}>
            {job.titulo}
          </h1>
          <p className={styles.metaText}>
            {job.empresa} | {job.ubicacion}
          </p>  
        </div>
        <button disabled={!isLoggedIn} className='button-apply-job'>
          {isLoggedIn ? 'Aplicar ahora' : 'Iniciar sesión para aplicar'}
        </button>
      </header>
    </>
  )
}