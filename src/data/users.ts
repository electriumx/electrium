
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
