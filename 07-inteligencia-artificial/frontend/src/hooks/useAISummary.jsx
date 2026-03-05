import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export function useAISummary (id) {
  
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Método que se comunica con la API
  const generateSummary = async () => {
    setLoading(true);
    setError(null);
    setSummary('');

    try {
      const response = await fetch(`${API_URL}/ai/summary/${id}`);

      if (!response.ok) {
        throw new Error('Error fetching summary');
      }

      // Manejo de streaming desde Ollama
      const reader = response.body.getReader(); // lector de datos del stream
      const decoder = new TextDecoder(); // decodificador de datos del stream

      // bucle infinito porque no sabemos cuándo termina la petición
      while (true) {
        const { done, value } = await reader.read();
        if (done) break; // si terminó, rompemos el bucle infinito

        // cada chunk es un fragmento de texto
        const chunkText = decoder.decode(value, { stream: true });
        setSummary(prev => prev + chunkText) // guardamos en el estado cada uno de los fragmentos
      }

    } catch {
      setError('Error al generar el resumen');
    } finally {
      setLoading(false);
    }
  }

  return {    
    summary,
    loading,
    error,
    generateSummary
  }
}