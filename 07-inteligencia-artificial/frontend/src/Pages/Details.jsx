import { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router";
import { Spinner } from "../components/Spinner";
import styles from './Detail.module.css'
import { JobSection } from "../components/JobSection";
import { DetailPageBreadCrumb } from "../components/DetailPageBreadCrumb";
import { DetailPageHeader } from "../components/DetailPageHeader";
import { useAISummary } from "../hooks/useAISummary";


/**
 * Componente que muestra los detalles de cada oferta de trabajo
 */

const API_URL = import.meta.env.VITE_API_URL;

export function AISummary({ id }) {
  const {summary, loading, generateSummary} = useAISummary(id);
  if (summary) {

    return (
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>✨ Resumen generado por IA</h2>
        <div className={styles.sectionContent}>
          <p>{summary}</p>
        </div>
      </section>
    )
  }

  return (
    <button
      onClick={generateSummary}
      disabled={loading}
      className={styles.applyButton}
    >
      {loading ? 'Generando resumen...' : '✨ Generar resumen con IA'}
    </button>
  )
}

export default function JobDetails() {
  const { id } = useParams(); // recupera los parametros de la URL, en este caso el id
  const navigate = useNavigate();

  const [job, setJob] = useState(null); // para almacenar los detalles del trabajo
  const [loading, setLoading] = useState(true); // para manejar el estado de carga
  const [error, setError] = useState(null); // para manejar estado de errores

  useEffect(() => {
    // simula una llamada a una API para obtener los detalles del trabajo
    fetch(`${API_URL}/jobs/${id}`) 
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
            onClick={() => navigate('/search')}
            className={styles.applyButton}
          >
            Volver a la lista de empleos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
      <DetailPageBreadCrumb job={job}/>
      <DetailPageHeader job={job} />
      <AISummary id={id} />

      <div className="section-details">
        <JobSection title="Descripción del puesto" content={job.content.description} />
        <JobSection title="Responsabilidades" content={job.content.responsibilities} />
        <JobSection title="Requisitos" content={job.content.requirements} />
        <JobSection title="Acerca de la empresa" content={job.content.about} />
      </div>
    </div>
  )
}