
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { users } from "@/data/users";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showGoogleAccounts, setShowGoogleAccounts] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Sample Google accounts for demonstration
  const googleAccounts = [
    { email: "user1@gmail.com", name: "User One", avatar: "U1" },
    { email: "user2@gmail.com", name: "User Two", avatar: "U2" },
    { email: "add-account@gmail.com", name: "Add another account", avatar: "+" }
  ];

  const from = location.state?.from || "/";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      setError("Invalid username or password");
      return;
    }

    // Login successful
    login(user);
    
    toast({
      title: "Login Successful",
      description: `Welcome back, ${user.displayName}!`,
    });

    navigate(from, { replace: true });
  };

  const handleSocialLogin = (provider: string, email?: string) => {
    // For Google sign-in with specific account
    if (provider === "google" && !email) {
      setShowGoogleAccounts(true);
      return;
    }
    
    // Handle social login
    const socialUser = {
      id: Date.now(),
      username: email || `${provider}_user_${Math.floor(Math.random() * 1000)}`,
      displayName: email ? email.split('@')[0] : `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      password: "",
      isAdmin: false
    };
    
    login(socialUser);
    
    toast({
      title: "Login Successful",
      description: `Welcome, ${socialUser.displayName}!`,
    });
    
    navigate(from, { replace: true });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        
        {error && (
          <div className="bg-destructive/15 text-destructive p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium">
              Username or Email
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username or email"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label
                htmlFor="remember-me"
                className="text-sm font-medium leading-none cursor-pointer"
              >
                Remember me
              </label>
            </div>
            
            <Link
              to="#"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("google")}
              className="flex justify-center items-center"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("facebook")}
              className="flex justify-center items-center"
            >
              <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M9.1 7.87v2.45H7.12v3H9.1v7.31h3.15v-7.31h2.12s.2-1.23.3-2.58h-2.4V9.06c0-.26.34-.62.68-.62h1.72V5.36h-2.34c-3.31 0-3.23 2.57-3.23 2.51z" />
              </svg>
              Facebook
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("apple")}
              className="flex justify-center items-center"
            >
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.63 16.51c-.21.7-.48 1.35-.82 1.93-.56.97-1.15 1.54-1.75 1.72-.66.26-1.38.24-2.16-.06-.8-.3-1.54-.32-2.22-.06-.71.26-1.32.8-1.84 1.63-.98 1.51-1.09 3.2-.31 5.06.77 1.85 2.16 2.98 4.18 3.4 1.38.3 2.53-.04 3.45-1.01.89-.93 1.38-2.01 1.47-3.23.1-1.24.51-2.28 1.23-3.13.45-.53.98-.94 1.59-1.24 2.46-1.21 3.89-3.59 4.29-7.14-1.15.11-2.09.68-2.8 1.68-.71 1.01-1.11 2.18-1.2 3.52-.1 1.47-.55 2.66-1.35 3.59-.16.18-.3.35-.44.5-.49.55-1.08.79-1.77.72-.67-.08-1.17-.44-1.5-1.09-.25-.51-.33-1.07-.25-1.65.08-.58.29-1.18.63-1.8.34-.62.76-1.17 1.26-1.67.5-.5 1.03-.89 1.59-1.18.54-.29 1.08-.47 1.59-.55.54-.08 1.09-.06 1.64.05.55.12 1.03.29 1.44.53.38.24.68.5.9.78l.33.43c.01-.01.02-.03.04-.05l.12-.15c.18-.22.35-.46.53-.72.18-.26.34-.6.48-1.01.16-.4.28-.87.37-1.38.09-.51.13-1.15.13-1.92 0-.96-.08-1.75-.24-2.37-1.43.07-2.65.5-3.65 1.28-1 .78-1.79 1.75-2.36 2.9-.57 1.16-.93 2.4-1.07 3.74-.15 1.33 0 2.53.44 3.6z" />
              </svg>
              Apple
            </Button>
          </div>
        </div>
        
        {/* Google Accounts Selection */}
        {showGoogleAccounts && (
          <div className="mt-6 border border-border rounded-lg p-4">
            <h3 className="text-md font-medium mb-3">Choose an account</h3>
            <div className="space-y-2">
              {googleAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => handleSocialLogin("google", account.email)}
                  className="w-full flex items-center p-2 hover:bg-accent rounded-md"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {account.avatar}
                  </div>
                  <div className="ml-3 text-left">
                    <p className="text-sm font-medium">{account.name}</p>
                    <p className="text-xs text-muted-foreground">{account.email !== "add-account@gmail.com" && account.email}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
