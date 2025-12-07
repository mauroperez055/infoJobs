import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Spinner } from "../components/Spinner";
import snarkdown from "snarkdown";
import styles from './Detail.module.css'


// Componente para mostrar cada una de las secciones de la pagina
function JobSection ({ title, content }) {
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

/**
 * Componente que muestra los detalles de cada oferta de trabajo
 * Autor: Perez Mauro
 */

export default function JobDetails() {
  const { id } = useParams(); // recupera los parametros de la URL, en este caso el id
  const navigate = useNavigate();

  const [job, setJob] = useState(null); // para almacenar los detalles del trabajo
  const [loading, setLoading] = useState(true); // para manejar el estado de carga
  const [error, setError] = useState(null); // para manejar estado de errores

  useEffect(() => {
    // simula una llamada a una API para obtener los detalles del trabajo
    fetch(`https://jscamp-api.vercel.app/api/jobs/${id}`)
      .then(res => {
        // primero verifico si la respuesta es correcta
        if (!res.ok) throw new Error('Job not found');
        return res.json();
      })
      .then(json => {
        setJob(json);
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false);
      })
  }, [id])

  if (loading) {
    return <Spinner />;
  }

  if (error || !job) {
    return(
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div className={styles.error}>
          <h2 className={styles.errorTitle}>
            Oferta no encontrada
          </h2>
          <button 
            onClick={() => navigate('/')}
            className={styles.errorButton}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link
            to="/search"
            className={styles.breadcrumbButton}
          >
            Empleos
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
        </nav>  
      </div>

      <header className={styles.header}>
        <div className={styles.info}>
          <h1 className={styles.title}>
            {job.titulo}
          </h1>
          <p className={styles.metaText}>
            {job.empresa} | {job.ubicacion}
          </p>  
        </div>
        <button className={styles.applyButton}>
          Aplicar ahora
        </button>
      </header>

      <JobSection title="Descripción del puesto" content={job.content.description} />
      <JobSection title="Responsabilidades" content={job.content.responsibilities} />
      <JobSection title="Requisitos" content={job.content.requirements} />
      <JobSection title="Acerca de la empresa" content={job.content.about} />
    </div>
  )
}