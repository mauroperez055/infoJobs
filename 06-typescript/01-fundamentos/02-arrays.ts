// ================================
// ARRAYS EN TYPESCRIPT
// ================================

// Sintaxis 1
const numeros: number[] = [1, 2, 3, 4, 5]
numeros.push(6) // No hay error porque el tipo es number

// Sintaxis 2
const numerosAlt: Array<number> = [10, 20, 30] 
numerosAlt.push(40)

// Arrays de tipos mixtos
const mixto: (string | number)[] = ['hola', 42, 'mundo', 3.14]
const arrayToFilter: (string | undefined)[] = ['uno', undefined, 'dos', undefined, 'tres']