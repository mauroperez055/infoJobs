# Implementación de Resumen con IA usando Ollama

## Resumen

Se implementó un sistema de generación de resúmenes de ofertas de trabajo utilizando **Ollama** con el modelo **qwen2.5:3b** corriendo localmente.

---

## Problemas resueltos

1. **Vercel AI Gateway** - Requiere tarjeta de crédito
2. **Google Gemini** - Cuota gratuita agotada
3. **Puter.js** - Requiere autenticación del usuario
4. **Ollama** - Solución local, sin costos, sin límites

---

## Arquitectura

```
Frontend (React)
       │
       │ Fetch con streaming
       ▼
Backend (Express) ──▶ Ollama (localhost:11434)
       │                   │
       │                   │ qwen2.5:3b
       │                   ▼
       │              Generación de resumen
       │
       ▼
Frontend (muestra resumen en tiempo real)
```

---

## Cambios realizados

### 1. Backend - `backend/routes/ai.js`

**Paquete instalado:**
```bash
npm install ollama
```

**Código implementado:**

```javascript
import { Router } from 'express';
import ollama from 'ollama';
import rateLimit from 'express-rate-limit';
import { JobModel } from '../models/job.js';

// Configuración de Ollama con streaming
const response = await ollama.chat({
  model: 'qwen2.5:3b',
  messages: [
    {
      role: 'user',
      content: prompt,
    }
  ],
  stream: true,
});

// Envío de chunks al cliente
for await (const part of response) {
  const content = part.message?.content;
  if (content) {
    res.write(content);
  }
}

res.end();
```

**Prompt utilizado:**
```
Eres un asistente que resume ofertas de trabajo para ayudar a los usuarios a entender rápidamente de qué se trata la oferta.
Resumen en 4-6 frases la siguiente oferta de trabajo:
Incluye: rol, empresa, ubicación y requisitos claves
Usa un tono claro y directo en español
Título: {titulo}
Empresa: {empresa}
Ubicación: {ubicacion}
Descripción: {descripcion}
```

---

### 2. Frontend - `frontend/src/hooks/useAISummary.jsx`

**Manejo de streaming:**

```javascript
const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunkText = decoder.decode(value, { stream: true });
  setSummary(prev => prev + chunkText);
}
```

---

## Requisitos previos

### 1. Instalar Ollama

Descargar desde: https://ollama.com

### 2. Descargar el modelo

```bash
ollama pull qwen2.5:3b
```

### 3. Iniciar Ollama

```bash
ollama serve
```

El servidor debe estar corriendo en `localhost:11434`

---

## Cómo usar

### Iniciar Ollama (en una terminal)
```bash
ollama serve
```

### Iniciar el backend (en otra terminal)
```bash
cd backend
npm run dev
```

### Iniciar el frontend (en otra terminal)
```bash
cd frontend
npm run dev
```

### Usar la funcionalidad

1. Ir a la página de detalles de un empleo
2. Hacer clic en el botón "✨ Generar resumen con IA"
3. El resumen se mostrará en tiempo real (streaming)

---

## Modelos recomendados

| Modelo | Tamaño | RAM necesaria | Calidad |
|--------|--------|--------------|---------|
| llama3.2 | ~4GB | ~6GB | Excelente |
| qwen2.5:3b | ~2GB | ~4GB | Buena (el usado) |
| mistral | ~4GB | ~6GB | Buena |
| phi3 | ~2GB | ~4GB | Básica |

Para cambiar el modelo, modificar en `backend/routes/ai.js`:
```javascript
model: 'qwen2.5:3b'  // cambiar por otro modelo
```

---

## Troubleshooting

### Error: "Ollama server not found"
- Verificar que Ollama esté corriendo: `ollama serve`
- Verificar que el modelo esté instalado: `ollama list`

### Error: "Job Not Found"
- El ID del empleo no existe en la base de datos
- Es normal si se prueba con un ID inexistente

### Error de CORS
- Verificar que el backend tenga el middleware de CORS configurado

---

## Archivos modificados

1. `backend/package.json` - Añadido paquete `ollama`
2. `backend/routes/ai.js` - Implementación con Ollama
3. `frontend/src/hooks/useAISummary.jsx` - Manejo de streaming
4. `frontend/src/Pages/Details.jsx` - Componente AISummary

---

## Notas

- Los comentarios y console.log del código original fueron preservados
- El sistema funciona completamente offline
- Sin costos de API
- Sin límites de uso
- La respuesta se muestra en tiempo real (streaming)
