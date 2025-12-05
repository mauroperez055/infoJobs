import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Spinner } from "../components/Spinner";

/**
 * Componente que muestra los detalles de cada oferta de trabajo
 * Autor: Perez Mauro
 */

export function JobDetails() {
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
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
      <div className={style.error}>
        <h2 className={style.errorTitle}>
          Oferta no encontrada
        </h2>
        <button 
          onClick={() => navigate('/')}
          className={style.errorButton}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  }

  return (
    <>
      <h1>tengo que crear la pagina, puedo copiar lo del modulo 02-react-cdn-version/detalles_oferta.html y adaptarlos a este</h1>
    </>
  )
}