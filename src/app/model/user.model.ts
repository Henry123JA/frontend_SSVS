// src/app/user/user.model.ts
export interface Role {
    id: number;
    name: string;
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    roles: Role[];
  }
  