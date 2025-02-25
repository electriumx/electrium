
export interface User {
  username: string;
  password: string;
  displayName?: string;
}

export const users: User[] = [
  {
    username: 'user@example.com',
    password: 'password123',
    displayName: 'User'
  },
  {
    username: 'test@example.com',
    password: 'test123',
    displayName: 'Test User'
  }
];

export const addUser = (user: User) => {
  if (users.some(u => u.username === user.username)) {
    throw new Error('Username already exists');
  }
  users.push(user);
};

export const updateUserPassword = (username: string, newPassword: string) => {
  const user = users.find(u => u.username === username);
  if (user) {
    user.password = newPassword;
  }
};

export const getUser = (username: string, password: string): User | undefined => {
  return users.find(u => u.username === username && u.password === password);
};
