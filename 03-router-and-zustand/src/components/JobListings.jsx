import { JobCard } from "./JobCard";

export function JobListings({ jobs }) {
  return (
    <>
      <div className="jobs-listing">
        {
          jobs.length === 0 && (
            <p style={{ textAlign: 'center', padding: '1rem', textWrap: 'balance' }}>No se han encontrado empleos que coincidan con los criterios de búsqueda.</p>
          )
        }
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
}


/*import { JobCard } from "./JobCard";

export function JobListings({ data }) {
  return (
    <>
      <h2>Resultados de búsqueda</h2>
      <div className="jobs-listings">
        <JobCard data={data}/>
      </div>
    </>
  );
}
 */