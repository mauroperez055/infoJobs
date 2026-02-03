// @ts-check
import { test, expect } from '@playwright/test';

/**
 * TEST E2E - END TO END
 */

/**
 * 1. lo mas recomendable es usar selectores como Roles, aria 
 * 2. etiquetas de texto, placeholder, nombres
 * 3. data-testid
 * 4. como último recurso selectores de CSS 
 */
test('buscar empleos y aplicar a una oferta', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const searchInput = page.getByPlaceholder('Buscar empleos por título, habilidad o empresa'); /* recupero el input de búsqueda */
  await searchInput.fill('react'); /* relleno el input con el texto react */

  await page.getByRole('button', { name: 'Buscar' }).click(); /* recupero el botón que dice Buscar y le hago clic */

  const jobCards = page.locator('.job-listing-card'); /* recupero el elemento usando otro tipo de selector */

  await expect(jobCards.first()).toBeVisible(); /* espero que la primera tarjeta de empleo sea visible */

  const firstJobTitle = await jobCards.first().locator('h3'); /* dentro de la primera tarjeta busco el título del empleo */
  await expect(firstJobTitle).toHaveText('Desarrollador de Software Senior'); /* espero que el título sea el esperado */

  await page.getByRole('button', { name: 'Ingresar' }).click(); /* hago clic en el botón de iniciar sesión */
  await page.waitForURL('**/login'); /* espero a que la URL cambie a /login */

  const emailInput = page.getByPlaceholder('Email'); /* recupero el input de email por su placeholder */
  await emailInput.fill('mauroperez055@gmail.com'); /* relleno el input de email con un correo válido */

  const passInput = page.getByPlaceholder('Password'); /* recupero el input de password por su placeholder */
  await passInput.fill('123456'); /* relleno el input de password */

  await page.getByRole('button', { name: 'Iniciar Sesión' }).click(); /* recupero el botón que dice Iniciar Sesión y le hago clic */

  const applyButton = page.getByRole('button', { name: 'Aplicar' }).first(); /* recupero el botón de aplicar de la primera oferta */
  await applyButton.click(); /* hago clic en el botón de aplicar */

  page.getByRole('button', { name: 'Aplicaste!'}).first(); /* verifico que el botón haya cambiado a "Aplicaste!" */
  console.log('Test finalizado correctamente');
})