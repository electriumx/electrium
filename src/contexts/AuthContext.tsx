
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, users } from '../data/users';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  currentUser: User | null;
  login: (usernameOrEmail: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loginAsAdmin: () => void;
  canAccessAdminPanel: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load user from localStorage on initial mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (usernameOrEmail: string, password: string) => {
    // Check if input is email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(usernameOrEmail);
    
    // Find user by either username or email
    const user = users.find(u => 
      (isEmail ? u.username === usernameOrEmail : (u.username === usernameOrEmail || u.displayName === usernameOrEmail)) 
      && u.password === password
    );
    
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast({
        title: "Welcome back!",
        description: `Successfully signed in as ${user.displayName || 'User'}`
      });
      return true;
    }
    toast({
      variant: "destructive",
      title: "Error",
      description: "Invalid username/email or password"
    });
    return false;
  };

  const loginAsAdmin = () => {
    const adminUser = users.find(u => u.username === "Omar Tarek" && u.isAdmin);
    if (adminUser) {
      adminUser.password = "otdk1234"; // Set the password
      setCurrentUser(adminUser);
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      navigate('/admin');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    navigate('/');
    toast({
      title: "Signed out",
      description: "You have been successfully signed out"
    });
  };

  const isAdmin = currentUser?.isAdmin === true;

  const canAccessAdminPanel = () => {
    return currentUser?.username === "Omar Tarek" && currentUser?.password === "otdk1234";
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      login, 
      logout, 
      isAuthenticated: !!currentUser,
      isAdmin,
      loginAsAdmin,
      canAccessAdminPanel
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
