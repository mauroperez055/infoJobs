import { useState } from "react";
import { Link } from "./Link";
import styles from "./JobCard.module.css";

export function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false);

  const handleApplyClick = () => {
    setIsApplied(true);
  }

  const buttonClasses = isApplied ? 'button-apply-job is-applied' : 'button-apply-job';
  const buttonText = isApplied ? 'Aplicaste!' : 'Aplicar';

  return (
    <article
      className="job-listing-card"
      data-modalidad={job.data.modalidad}
      data-nivel={job.data.nivel}
      data-technology={job.data.technology}
    >
      <div>
        <h3>
          <Link href={`/jobs/${job.id}`} className={styles.title}>
            {job.titulo}
          </Link>
        </h3>
        <small>{job.empresa} | {job.ubicacion}</small>
        <p>{job.descripcion}</p>
      </div>
      <div className={styles.actions}>
        <Link href={`/jobs/${job.id}`} className={styles.details}>
          Ver detalles
        </Link>
        <button className={buttonClasses} onClick={handleApplyClick}>{buttonText}</button>
      </div>
    </article>
  )
}

/*export function JobCard ({ data }) {
  return (
    <>
      {data.map((job) => 
        <article className="jobs-listing">
          <h3>{job.titulo}</h3>
          <small>
            {job.empresa} | {job.ubicacion}
          </small>
          <p>{job.descripcion}</p>
          <button className="button-apply-job">Aplicar</button>
        </article>
      )}
    </>
  )
} */
