import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';

/**
 * Controlo si tiene permisos primero
 */
let content = '';

if (process.permission.has('fs.read', 'archivo.txt')) {
  /**
   * Leer el contenido de un archivo
   */
  content = await readFile('archivo.txt', 'utf-8');
  console.log(content);
} else {
  console.log('No tienes permisos para leer el archivo.');
}

if (process.permission.has('fs.write', 'output/files/documents')) {
  /**
   * Crear una carpeta 
   */
  
  /* const outputDir = 'output/files/documents'; */
  const outputDir = join('output', 'files', 'documents');
  /**
   * para no tener problemas con las rutas relativas
   * dependiendo si trabajamos en windows o linux o macOS, 
   * utilizamos path.join para concatenar las rutas de manera segura
   */
  
  await mkdir(outputDir, { recursive: true });
  
  /**
   * convertir el archivo a mayusculas y guardarlo en la nueva carpeta
   */
  const uppercaseContent = content.toUpperCase();
  const outputFilePath = join(outputDir, 'archivo-uppercase.txt');
  
  console.log('la extension es: ', extname(outputFilePath));
  console.log('el nombre del archivo es: ', basename(outputFilePath));
  
  await writeFile(outputFilePath, uppercaseContent)
  /* await writeFile(`./${outputDir}/archivo-uppercase.txt, uppercaseContent); */
  console.log('Archivo creado con contenido en mayúsculas.');
} else {
  console.log('No tienes permisos para escribir en la carpeta de destino.');
}


/**
 * Para activar los permisos:
 * node --permission <nombre-archivo.js> --> no permite hacer nada
 * node --permission --allow-fs-read="*" <nombre-archivo.js> --> tiene todos los permisos de lectura
 * node --permission --allow-fs-read="archivo.txt" --allow-fs-write="./output/*" <nombre-archivo.js> --> permisos especificos  
 */