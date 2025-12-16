import { useNavigate } from 'react-router';
import styles from './404.module.css';

export default function NotFoundPage () {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 8v3a1 1 0 0 0 1 1h3" />
        <path d="M7 8v8" />
        <path d="M17 8v3a1 1 0 0 0 1 1h3" />
        <path d="M21 8v8" />
        <path d="M10 10v4a2 2 0 1 0 4 0m0 -4a2 2 0 0 0 -2 -2" />
        <path d="M3 3l18 18" />
      </svg>
      <h3 className={styles.subtitle}>Página no encontrada</h3>
      <p className={styles.p}>Lo sentimos, la página que buscas no existe.</p>
      <button 
        onClick={() => navigate('/')}
        className={styles.errorButton}
      >
        Volver al inicio
      </button>
    </div>
  )
}