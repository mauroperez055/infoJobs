import snarkdown from "snarkdown";
import styles from '../Pages/Detail.module.css'

/* Componente para mostrar los detalles de 
 * la oferta y cada una de las secciones de la pagina
*/
export function JobSection ({ title, content }) {
  /**
   * snarkdown es una dependencia que conviernte markdown en html
   * pero no va renderizar de manera correcta por protocolo de seguridad,
   * por lo tanto utilizamos dangerouslyInnerHTML
   */
  const html = snarkdown(content);

  return(
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        {title}
      </h2>

      {/**
       * para poder renderizar correctamente el html lo inyectamos de manera "peligrosa" con 'dangerouslyInnerHTML'
       * Hay que estar seguros que el html viene de un sitio confiable"
      */}
      <div 
        className={`${styles.sectionContent} prose`} 
        dangerouslySetInnerHTML={{
          __html: html
        }} 
      />

    </section>
  )
}