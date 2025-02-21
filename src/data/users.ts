
export interface User {
  username: string;
  password: string;
  displayName: string;
}

export const users: User[] = [
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
