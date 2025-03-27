import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Apple, Facebook, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addUser } from '../data/users';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [socialEmail, setSocialEmail] = useState('');
  const [socialPassword, setSocialPassword] = useState('');
  const [showSocialLogin, setShowSocialLogin] = useState(false);
  const [socialProvider, setSocialProvider] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors = { username: '', password: '' };
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (login(username, password)) {
        const from = location.state?.from?.pathname || '/';
        navigate(from);
      }
    }
  };

  const handleSocialLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!socialEmail) {
      toast({
        variant: "destructive",
        title: "Email Required",
        description: "Please enter your email to continue",
      });
      return;
    }
    
    if (!socialPassword || socialPassword.length < 6) {
      toast({
        variant: "destructive",
        title: "Invalid Password",
        description: "Password must be at least 6 characters",
      });
      return;
    }
    
    try {
      const newUser = {
        username: socialEmail.toLowerCase(),
        password: socialPassword,
        displayName: socialEmail.split('@')[0]
      };
      
      addUser(newUser);
      
      if (login(newUser.username, newUser.password)) {
        toast({
          title: "Welcome!",
          description: `Successfully signed in with ${socialProvider}`,
        });
        
        const from = location.state?.from?.pathname || '/';
        navigate(from);
      }
    } catch (error) {
      if (login(socialEmail.toLowerCase(), socialPassword)) {
        toast({
          title: "Welcome back!",
          description: `Successfully signed in with ${socialProvider}`,
        });
        
        const from = location.state?.from?.pathname || '/';
        navigate(from);
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password",
        });
      }
    }
  };

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    window.open(
      "https://accounts.google.com/o/oauth2/auth?" +
      "client_id=DEMO_CLIENT_ID" +
      "&redirect_uri=" + encodeURIComponent(window.location.origin + "/auth/callback") +
      "&response_type=code" +
      "&scope=email%20profile" +
      "&prompt=select_account",
      "Google Sign In",
      `width=${width},height=${height},left=${left},top=${top}`
    );
    
    setSocialProvider('Google');
    setShowSocialLogin(true);
  };

  const handleSocialLogin = (provider: string) => {
    if (provider === 'Google') {
      handleGoogleLogin();
    } else {
      setSocialProvider(provider);
      setShowSocialLogin(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-card p-8 rounded-xl shadow-lg"
      >
        <div>
          <h2 className="text-center text-3xl font-bold">Log In To Your Account</h2>
        </div>
        
        {!showSocialLogin ? (
          <>
            <div className="grid grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleSocialLogin('Google')}
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
                variant="outline" 
                className="w-full"
                onClick={() => handleSocialLogin('Facebook')}
              >
                <Facebook className="h-5 w-5 mr-2 text-blue-600" />
                Facebook
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleSocialLogin('Apple')}
              >
                <Apple className="h-5 w-5 mr-2" />
                Apple
              </Button>
            </div>
            
            <div className="flex items-center">
              <div className="flex-grow border-t border-border"></div>
              <span className="mx-4 text-sm text-muted-foreground">or continue with</span>
              <div className="flex-grow border-t border-border"></div>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-input bg-background placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.username && (
                    <p className="text-destructive text-sm mt-1">{errors.username}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-input bg-background placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm pr-10"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-destructive text-sm mt-1">{errors.password}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Log In
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Sign in with {socialProvider}</h3>
              <p className="text-muted-foreground">Please enter your email and create a password</p>
            </div>
            
            <form className="space-y-4" onSubmit={handleSocialLoginSubmit}>
              <div>
                <label htmlFor="socialEmail" className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  id="socialEmail"
                  type="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-input bg-background placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="email@example.com"
                  value={socialEmail}
                  onChange={(e) => setSocialEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="socialPassword" className="block text-sm font-medium mb-1">Create Password</label>
                <div className="relative">
                  <input
                    id="socialPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-input bg-background placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm pr-10"
                    placeholder="Password (min 6 characters)"
                    value={socialPassword}
                    onChange={(e) => setSocialPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Password must be at least 6 characters
                </p>
              </div>
              
              <div className="pt-2 flex space-x-2">
                <button
                  type="button"
                  className="flex-1 py-2 px-4 border border-input text-sm font-medium rounded-md text-foreground bg-background hover:bg-muted focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-border"
                  onClick={() => setShowSocialLogin(false)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Continue
                </button>
              </div>
            </form>
          </>
        )}
        
        <div className="text-center text-sm">
          <Link to="/register" className="font-medium text-primary hover:text-primary/90">
            Don't Have An Account? Register
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
