import { randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { json } from 'node:stream/consumers';

process.loadEnvFile(); // Lee el archivo.env y carga las variables en process.env
const port = process.env.PORT ?? 3000;

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json, charset=utf-8');
  res.end(JSON.stringify(data));
}

const users = [
  {
    "id": 1,
    "name": "Mauro"
  },
  {
    "id": 2,
    "name": "Melisa"
  },
  {
    "name": "Apu",
    "id": "d2264351-cceb-4cdc-8e31-57e881c4a0c2"
  },
  {
    "name": "Corazón",
    "id": "e768ae67-ab69-4b13-9f39-85670b6d08f0"
  },
  {
    "name": "Millo",
    "id": "539cf26f-3a1e-4ad9-afd4-91f7535b2fb9"
  },
  {
    "name": "Ona",
    "id": "583bbde5-10e8-49f9-83f1-a0805f9f2e3b"
  },
  {
    "name": "Dulce",
    "id": "0c43850e-cdc5-489e-951f-2e902bf2e438"
  },
  {
    "name": "Teo",
    "id": "ae580115-0b4a-4386-be3c-ca9189e394de"
  },
  {
    "name": "Pati",
    "id": "c356c2c7-fd4c-42a6-9b26-5a8a0985d41f"
  }
]

const server = createServer(async (req, res) => {
  const { method, url } = req;

  // separo la ruta de los query params
  const [ pathname, querystring ] = url.split('?');

  // creo los parámetros de búsqueda
  const searchParams = new URLSearchParams(querystring);

  if (method === 'GET') {
    if (pathname === '/users') {
      const limit = Number(searchParams.get('limit')) || users.length;
      const offset = Number(searchParams.get('offset')) || 0;
      const paginatedUsers = users.slice(offset, offset + limit);

      return sendJson(res, 200, paginatedUsers);
    }
  
    // sirve para controlar que la API funcione correctamente
    if (pathname === '/health') {
      return sendJson(res, 200, { status: 'ok', uptime: process.uptime() });
    }
  }

  if (method === 'POST') {
    if (pathname === '/users') {
      const body = await json(req);

      if (!body || !body.name) {
        return sendJson(res, 400, { error: 'Name required' });
      }

      const newUser = {
        name: body.name,
        id: randomUUID(), // crea un identificador unico para utilizar como id 
      }

      users.push(newUser);

      return sendJson(res, 201, { message: 'Usuario creado' });
    }
  }

  return sendJson(res, 404, { error: 'Not Found '});
})


/**
 * Colocando puerto 0 y luego usando server.address() 
 * obtenemos el primer puerto libre que encuentre
 */
server.listen(port, () => {
  const address = server.address();
  console.log(`Servidor escuchando en http://localhost:${address.port}`);
})