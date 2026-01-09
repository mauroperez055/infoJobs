import os from 'node:os';
import ms from 'ms';

console.log('Información del sistema ioperativo:');

console.log('Tipo de SO:', os.type());
console.log('Plataforma:', os.platform());
console.log('Arquitectura:', os.arch());
console.log('Memoria total (bytes):', os.totalmem());
console.log('Memoria libre (bytes):', os.freemem());
console.log('Directorio home del usuario:', os.homedir());
console.log('Nombre del host:', os.hostname());
console.log('Tiempo de actividad (segundos):', ms(os.uptime()*1000, { long: true }));
console.log('Número de CPUs:', os.cpus().length);
console.log('CPU modelo:', os.cpus());
console.log('--------------------------------------------------')