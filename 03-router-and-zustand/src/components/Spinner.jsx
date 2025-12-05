import styles from './Spinner.module.css';

/**
 * Componente que muestra animacion cuando se estan cargando los empleos
 */

export function Spinner() {
  return (
    <div className='loading'>
      <span className={styles.spinner} role="status" aria-label="Loading"></span>
      <p>Cargando empleos...</p>
    </div>
  )
}