import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';

/**
 * Leer el contenido de un archivo
 */
const content = await readFile('archivo.txt', 'utf-8');
console.log(content);

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