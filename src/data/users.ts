
export interface User {
  username: string;
  password: string;
  displayName: string;
}

// Initial users array
let users: User[] = [
  {
    username: "john_doe",
    password: "password123",
    displayName: "John Doe"
  },
  {
    username: "jane_smith",
    password: "pass456",
    displayName: "Jane Smith"
  },
  {
    username: "bob_wilson",
    password: "secure789",
    displayName: "Bob Wilson"
  }
];

// Function to add a new user
export const addUser = (newUser: User) => {
  // Check if user already exists
  if (users.some(u => u.username === newUser.username)) {
    return false;
  }
  users = [...users, newUser];
  // Store in localStorage for persistence
  localStorage.setItem('users', JSON.stringify(users));
  return true;
};

// Function to get all users
export const getUsers = () => {
  const storedUsers = localStorage.getItem('users');
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  }
  return users;
};

// Export the users array
export { users };

