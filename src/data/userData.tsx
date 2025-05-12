import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  avatar?: string;
  role?: string;
}

export const userData: User[] = [
  {
    id: uuidv4(),
    name: "John Doe",
    email: "john@orielix.com",
    password: "password123", // In a real app, this would be hashed
    createdAt: new Date().toISOString(),
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Student"
  },
  {
    id: uuidv4(),
    name: "Everything is new to him",
    email: "new@orielix.com",
    password: "12345678", // In a real app, this would be hashed
    createdAt: new Date().toISOString(),
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    role: "Student"
  }
];

// Function to find a user by email
export const findUserByEmail = (email: string): User | undefined => {
  return userData.find(user => user.email === email);
};

// Function to authenticate a user
export const authenticateUser = (email: string, password: string): User | null => {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
};

// Function to add a new user
export const addUser = (name: string, email: string, password: string): User => {
  const newUser: User = {
    id: uuidv4(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
    role: "Student"
  };
  
  userData.push(newUser);
  return newUser;
};
