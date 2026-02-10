// Tipos de datos en TypeScript

export type Company = { 
  name: string,
  address: string,
  phone?: string
}

// Uniones de tipos
type UserId = {
  readonly id: string | number 
}

type UserWithBirthday = {
  birthdate: Date
}

export type User = {
  readonly name: string,
  readonly age: number,
  email?: string,
  company?: Company,
  role: 'admin' | 'editor' | 'user' // Tipos literales
}

export type UserEntity = User & UserId & UserWithBirthday // Intersección de tipos

export type Configuration = {
  readonly apiKey: string,
  readonly theme: 'dark' | 'light' // Tipos literales
}

// Tipos literales
type Level =  1 | 2 | 3 | 4 | 5 
type Direction = 'up' | 'down' | 'left' | 'right'