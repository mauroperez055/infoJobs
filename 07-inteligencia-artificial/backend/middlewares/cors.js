import cors from 'cors';

// Configuración de CORS para permitir solicitudes desde orígenes específicos
const ACCEPTED_ORIGINS = [
  'http://localhost:5173'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
  return cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.log(origin)
      return callback(new Error('Origen no permitido'));
    }
  }) 
}