import { Pool } from 'pg';
import logger from "../../logger-config";

export const pgPool = (pgConnectionString: string): Pool => {
  const pool = new Pool({
    connectionString: pgConnectionString,
  });

  pool.connect().then(() => {
    logger.info('psql database connection established.');
  }).catch((error) => {
    logger.error('psql connection could not be established: ', error);
  });

  return pool;
};
