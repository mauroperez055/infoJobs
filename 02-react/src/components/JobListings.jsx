import { JobCard } from "./JobCard";

export function JobListings({ jobs }) {
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Resultados de búsqueda</h2>
      <div className="jobs-listing">
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