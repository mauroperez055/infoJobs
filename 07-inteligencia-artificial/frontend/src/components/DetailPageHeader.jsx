import styles from '../Pages/Detail.module.css';
import { useAuthStore } from '../store/authStore';
import { useFavoriteStore } from '../store/favoriteStore';

/**
 * Componente que muestra el header de cualquier 
 * oferta a la que ingresemos. 
 * Renderiza titulo, ubicacion / modalidad y
 * boton para Aplicar a la oferta
 */

function DetailApplyButton () {
  const { isLoggedIn } = useAuthStore();

  return (
    <button disabled={!isLoggedIn} className='button-apply-job'>
      {isLoggedIn ? 'Aplicar ahora' : 'Iniciar sesión para aplicar'}
    </button>
  )
}

function DetailFavoriteButton ({ id }) {
  const { isLoggedIn } = useAuthStore();
  const { isFavorite, toggleFavorite } = useFavoriteStore();

  return (
    <button
      disabled={!isLoggedIn} 
      onClick={() => toggleFavorite(id)}
      aria-label={isFavorite(id) ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite(id) ? '❤️' : '🤍'}
    </button>
  )
}

export function DetailPageHeader ({ job }) { 

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
        <div className={styles.buttons}>
          <DetailApplyButton />
          <DetailFavoriteButton id={job.id}/>
        </div>  
      </header>
    </>
  )
}