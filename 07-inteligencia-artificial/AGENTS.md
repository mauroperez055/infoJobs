# AGENTS.md - Guías para Agentes de Código

Este archivo proporciona guías para agentes de código que operan en este repositorio.

## Descripción del Proyecto

Este es un proyecto de JavaScript/TypeScript del BootCamp de midudev enfocado en Inteligencia Artificial.

## Comandos de Build, Lint y Test

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev          # Iniciar servidor de desarrollo
npm run start        # Iniciar servidor de producción
```

### Build
```bash
npm run build        # Build para producción
```

### Linting y Formateo
```bash
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir problemas de linting automáticamente
npm run format       # Formatear con Prettier
npm run format:check # Verificar formato sin hacer cambios
```

### Testing
```bash
npm test             # Ejecutar todos los tests
npm test:watch       # Ejecutar tests en modo watch
npm test:coverage    # Ejecutar tests con reporte de cobertura

# Ejecutar un solo archivo de test
npm test -- --testPathPattern=nombre-del-test

# Ejecutar un test específico por nombre
npm test -- --testNamePattern="nombre del test"
```

## Guías de Estilo de Código

### Principios Generales
- Escribir código limpio, legible y mantenible
- Mantener funciones pequeñas y enfocadas (responsabilidad única)
- Usar nombres de variables y funciones significativos
- Evitar números mágicos - usar constantes

### Formateo (Prettier)
- Usar Prettier para formateo de código
- Indentación de 2 espacios
- Comillas simples para strings
- Comas finales en objetos/arrays multilínea

### Imports
- Orden: Módulos built-in → Librerías externas → Módulos internos
- Ordenar alfabéticamente dentro de cada grupo

```typescript
import { useState, useEffect } from 'react'
import axios from 'axios'
import { formatDate } from '@/utils/date'
import { UserCard } from '@/components/UserCard'
```

### Convenciones de Nombres
- Variables/Funciones: camelCase
- Clases/Tipos/Interfaces: PascalCase
- Constantes: UPPER_SNAKE_CASE
- Booleanos: Usar prefijos como `is`, `has`, `can`, `should`

### Guías de TypeScript
- Siempre definir tipos de retorno en funciones
- Usar interfaces para formas de objetos, types para uniones
- Evitar `any` - usar `unknown` cuando el tipo es desconocido

### Manejo de Errores
- Usar try-catch para operaciones async
- Siempre manejar rechazos de promesas
- Loguear errores con contexto apropiado

### Guías de Testing
- Escribir tests unitarios para funciones utilitarias
- Usar nombres descriptivos para los tests
- Seguir el patrón AAA: Arrange, Act, Assert

```typescript
describe('formatCurrency', () => {
  it('should format USD correctly', () => {
    const result = formatCurrency(100, 'USD')
    expect(result).toBe('$100.00')
  })

  it('should handle zero amount', () => {
    const result = formatCurrency(0, 'USD')
    expect(result).toBe('$0.00')
  })
})
```

### Guías de React/Componentes
- Usar componentes funcionales con hooks
- Mantener componentes pequeños y enfocados
- Extraer lógica reutilizable en custom hooks
- Usar interfaces de TypeScript para props

```typescript
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export function Button({ label, onClick, variant = 'primary', disabled = false }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
```

### Convenciones de Git
- Usar commits convencionales: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`
- Mantener commits pequeños y enfocados
- Escribir mensajes de commit significativos

### Mejores Prácticas de Seguridad
- Nunca hacer commit de secrets o API keys
- Validar todos los inputs de usuarios
- Usar variables de entorno para configuración

## Estructura del Proyecto

```
src/
├── components/     # Componentes UI reutilizables
├── hooks/         # Custom React hooks
├── utils/         # Funciones utilitarias
├── services/      # API y servicios externos
├── types/         # Definiciones de tipos TypeScript
├── constants/     # Constantes de la aplicación
├── config/        # Archivos de configuración
└── __tests__/     # Archivos de tests (colocados junto al código)
```

## Recursos Adicionales

- ESLint: `.eslintrc.js`
- Prettier: `.prettierrc`
- TypeScript: `tsconfig.json`
