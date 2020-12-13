import { Pool } from 'pg';

export const pgPool = (pgConnectionString: string): Pool => {
  const pool = new Pool({
    connectionString: pgConnectionString,
  });

  pool.connect().then(() => {
    console.log('psql database connection established.');
  }).catch((error) => {
    console.error('psql connection could not be established: ', error);
  });

  return pool;
};
