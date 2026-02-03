import { test } from 'node:test';
import assert from 'node:assert';
import { Stagehand } from '@browserbasehq/stagehand';
import { z } from 'zod';

process.loadEnvFile();

test('Un usuario puede entrar a la JSConf y adquirir 2 entradas por 287.98 euros', async () => {
  const stagehand = new Stagehand({
    env: 'LOCAL',
    model: 'google/gemini-2.0-flash' // Usa "model" en lugar de "modelName"
  });

  await stagehand.init();
  const page = stagehand.context.pages()[0]; // Acceso correcto a la página

  await page.goto('https://jsconf.es/');

  await stagehand.act('Clicar en el botón de "Comprar entradas"');
  await stagehand.act('Click en el "+" al lado de "Entrada General"');
  await stagehand.act('Click en el "+" al lado de "Entrada General"');
  

  // Opción 1: Con schema (recomendado)
  const subtotal = await stagehand.extract(
    'Obtén el subtotal de la página',
    z.string()
  );

  // Opción 2: Sin schema
  // const { extraction } = await stagehand.extract('Obtén el subtotal');

  assert.ok(subtotal.includes('287'), `El precio ${subtotal} no es el esperado`);

  await stagehand.close();
});