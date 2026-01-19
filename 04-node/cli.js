/**
 * Programa de Linea de Comandos CLI
 */

import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Por defecto las primeras dos posiciones:
 * 0. ruta del ejecutable de node
 * 1. ruta del archivo que se está ejecutando
 */

/**
 * Los argumentos que nos interesan están
 * a partir de la posición 2
 */

// 1. Recuperar la carpeta a listar
const dir = process.argv[2] ?? '.';

// 2. Formateo simple de los tamaños
const formatBytes = (size) => {
  if (size < 1024) return `${size} B`;
  return `${(size / 1024).toFixed(2)} KB`;
}

// 3. Leer los nombres, sin info
const files = await readdir(dir);

// 4. Pedir toda la info de la carpeta o archivo que estoy listando
const entries = await Promise.all(
  files.map(async (name) => { // mapeo todos los archivos
    const fullPath = join(dir, name); // recupero la ruta completa
    const info = await stat(fullPath); // pido la info de ese archivo con stat

    return {
      name,
      isDir: info.isDirectory(),
      size: formatBytes(info.size)
    }
  })
)

// sort
// 1. Que aparezcan priemro las carpetas
// 2. Que estén en orden alfabético los ficheros


// filter
// tener en cuenta flags como --files-only o dirs-only


// 5. Renderizar la info
for (const entry of entries) {  
  const icon = entry.isDir ? '📁' : '📄';
  const size = entry.isDir ? '-' : `${entry.size}`;
  console.log(`${icon} ${entry.name.padEnd(25)}   ${size}`);
}