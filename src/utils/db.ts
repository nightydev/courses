import { Pool } from 'pg';

// Configuración de la conexión a la base de datos PostreSQL
const pool = new Pool({
  user: 'umucufu5bsav2pjsdz1k',
  host: 'b0o6giwi43wvqglymjml-postgresql.services.clever-cloud.com',
  database: 'b0o6giwi43wvqglymjml',
  password: 'E9bJKeVtnv2TPrW9Mt8jZMoKrJc6sp',
  port: 50013,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);