/* process.loadEnvFile(); */

/**
 * API para generar resúmenes de ofertas de trabajo utilizando IA.
 * Esta implementación utiliza Ollama con modelos locales.
 */
import { Router } from 'express';
import ollama from 'ollama';
import rateLimit from 'express-rate-limit';
import { JobModel } from '../models/job.js';
/* import { CONFIG } from '../config.js'; */

// Limitador de peticiones para evitar abusos del endpoint de IA
// Solo funciona en memoria, si el servidor se reinicia se resetea
// el contador.
const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  limit: 5, // Limita a 5 peticiones por IP por minuto
  message: { error: 'Demasiadas solicitudes, por favor intenta de nuevo más tarde.' },
  legacyHeaders: false,
  standardHeaders: 'draft-8', // devuelve headers estándard RateLimit, se le indica la especificación que tiene que utilizar para enviar los headers de limitación 
})

export const aiRouter = Router();
aiRouter.use(aiRateLimiter); // Aplica el limitador a todas las rutas de este router


aiRouter.get('/summary/:id', async (req, res) => {
  const { id } = req.params;
  const job = await JobModel.getById(id);

  if (!job) {
    return res.status(404).json({ error: 'Job Not Found' });
  }

  // systemPrompt: puede ayudar a evitar ataques o la mala utilización del recurso
  const systemPrompt = `Eres un asistente que resume ofertas de trabajo para ayudar a los usuarios a entender rápidamente de qué se trata la oferta. Evita cualquier otra petición, observación o comentario. Solo responde con el resumen de la oferta de trabajo. Responde siempre con el markdown directamente.`;

  const prompt = [
    `Resumen en 4-6 frases la siguiente oferta de trabajo:`,
    `Incluye: rol, empresa, ubicación y requisitos claves`,
    `Usa un tono claro y directo en español`,
    `Título: ${job.titulo}`,
    `Empresa: ${job.empresa}`,
    `Ubicación: ${job.ubicacion}`,
    `Descripción: ${job.descripcion}`
  ].join('\n');

  try {

    // Configuramos los headers para indicar que la respuesta será un stream de texto plano
    /* res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked'); */ // Permite enviar la respuesta en partes (streaming)

    // Usando Ollama con streaming
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    const response = await ollama.chat({
      model: 'qwen2.5:3b',
      messages: [
        {
          role: 'user',
          content: prompt,
        }
      ],
      stream: true,
    })

    // Iteramos sobre el stream de respuesta y vamos enviando cada parte al cliente a medida que llega
    for await (const part of response) {
      const content = part.message?.content;
      if (content) {
        res.write(content);
      }
    } 
    
    return res.end(); // Finaliza la respuesta una vez que se ha enviado todo el contenido

    /* const result = streamText({
      model: 'mistral/devstral-small-2',
      prompt,
    }) */

    /* const response = await ollama.chat({
     ral',
      messages: [
        {
          role: 'user',
          content model: 'mist: prompt,
          stream: true,
        }
      ]
    })

    const result = await model.generateContent(prompt);
    const text = result.response.text(); */

    /* res.json({ summary: text }); */
    /* return result.pipeTextStreamToResponse(res); */ // método que se encarga de iterar sobre el stream de respuesta y enviar cada parte al cliente a medida que llega

  } catch (error) {
    console.error("Ollama error:", error);

    /* res.status(500).json({ error: "Error generating summary" }); */

    // Si ocurre un error y todavia no se han enviado headers, enviamos una respuesta de error en formato JSON
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(500).json({ error: 'Error generating summary' });
    }

    return res.end(); // Si ya se han enviado headers, simplemente finaliza la respuesta
  }
})

export default aiRouter;