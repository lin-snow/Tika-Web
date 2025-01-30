// User
export interface User {
    id: number;
    username: string;
    token?: string;
}

// Todo
export interface Todo {
    id: number;
    title: string;
    content: string;
    dueDate?: Date;
    status: number;
    categoryId: number;
}

// Categort
export interface Category {
    id: number;
    name: string;
}

// UserToLogin
export interface UserToLogin {
    username: string;
    password: string;
}

// UserToRegister
export interface UserToRegister {
    username: string;
    password: string;
}

// Response
export interface Response<T> {
    code: number;
    msg: string;
    data: T;
}



