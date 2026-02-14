# AGENTS.md - Guías para Agentes de Código

Este archivo proporciona guías para agentes de código que operan en este repositorio.

## Descripción del Proyecto

Este es un proyecto de JavaScript/TypeScript del BootCamp de midudev.

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
- Comentar solo cuando sea necesario (código autoexplicativo preferido)

### Formateo (Prettier)
- Usar Prettier para formateo de código
- Indentación de 2 espacios
- Comillas simples para strings (excepto cuando el string contiene comillas simples)
- Comas finales en objetos/arrays multilínea
- Longitud máxima de línea: 100 caracteres

### Imports
- Usar imports absolutos cuando sea posible (configurar path aliases en tsconfig.json)
- Orden de imports:
  1. Módulos built-in de Node.js
  2. Librerías externas (React, lodash, etc.)
  3. Módulos internos (imports relativos)
- Ordenar alfabéticamente dentro de cada grupo

```typescript
// Buen orden de imports
import { useState, useEffect } from 'react'
import axios from 'axios'
import { formatDate } from '@/utils/date'
import { UserCard } from '@/components/UserCard'
```

### Convenciones de Nombres
- **Variables/Funciones**: camelCase
- **Clases/Tipos/Interfaces**: PascalCase
- **Constantes**: UPPER_SNAKE_CASE
- **Archivos**: kebab-case para componentes, camelCase para utilitarios
- **Booleanos**: Usar prefijos como `is`, `has`, `can`, `should`

### Guías de TypeScript
- Siempre definir tipos de retorno en funciones
- Usar interfaces para formas de objetos, types para uniones/aliases
- Evitar `any` - usar `unknown` cuando el tipo es verdaderamente desconocido
- Habilitar strict mode en tsconfig.json

### Manejo de Errores
- Usar try-catch para operaciones async
- Crear clases de errores personalizadas para errores específicos del dominio
- Siempre manejar rechazos de promesas
- Loguear errores con contexto apropiado
- Nunca exponer errores internos a usuarios sin sanitización

```typescript
// Buen manejo de errores
async function fetchUser(id: string): Promise<User> {
  try {
    const response = await api.get(`/users/${id}`)
    return response.data
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw new Error(`User with id ${id} not found`)
    }
    logger.error('Failed to fetch user', { id, error })
    throw new Error('Failed to fetch user')
  }
}
```

### Guías de React/Componentes
- Usar componentes funcionales con hooks
- Mantener componentes pequeños y enfocados
- Extraer lógica reutilizable en custom hooks
- Usar interfaces de TypeScript para props
- Memoizar cálculos costosos con useMemo/useCallback
- Preferir composición sobre herencia

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

### Guías de Testing
- Escribir tests unitarios para funciones utilitarias
- Escribir tests de integración para endpoints de API
- Usar nombres descriptivos para los tests (formato given/when/then)
- Seguir el patrón AAA: Arrange, Act, Assert
- Mockear dependencias externas
- Probar casos límite y escenarios de error

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

### Convenciones de Git
- Usar commits convencionales: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`
- Mantener commits pequeños y enfocados
- Escribir mensajes de commit significativos
- Hacer pull antes de push para evitar conflictos

### Mejores Prácticas de Seguridad
- Nunca hacer commit de secrets o API keys
- Validar todos los inputs de usuarios
- Sanitizar datos antes de renderizar
- Usar variables de entorno para configuración
- Seguir las guías de seguridad OWASP

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

- Configuración de ESLint: `.eslintrc.js`
- Configuración de Prettier: `.prettierrc`
- Configuración de TypeScript: `tsconfig.json`
