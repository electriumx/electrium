
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Apple, Facebook } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

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

  const handleGoogleLogin = () => {
    // In a real implementation, this would be integrated with Google OAuth
    // For now, we'll simulate the popup behavior
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    
    const googleWindow = window.open(
      'about:blank',
      'Google Sign In',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );
    
    if (googleWindow) {
      googleWindow.document.write(`
        <html>
          <head>
            <title>Google Sign In</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; }
              .google-logo { width: 100px; margin-bottom: 20px; }
              h1 { color: #202124; font-size: 24px; }
              p { color: #5f6368; }
              .spinner { border: 4px solid #f3f3f3; border-radius: 50%; border-top: 4px solid #4285f4; width: 30px; height: 30px; animation: spin 1s linear infinite; margin: 20px 0; }
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            </style>
          </head>
          <body>
            <img class="google-logo" src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google">
            <h1>Signing in...</h1>
            <div class="spinner"></div>
            <p>Please wait while we connect you to your Google account.</p>
          </body>
        </html>
      `);
      
      // Simulate auth flow completing after 2 seconds
      setTimeout(() => {
        googleWindow.close();
        
        // Log the user in with demo credentials
        if (login('demo', 'demo123')) {
          const from = location.state?.from?.pathname || '/';
          navigate(from);
        }
      }, 2000);
    }
  };

  const handleSocialLogin = (provider: string) => {
    if (provider === 'google') {
      handleGoogleLogin();
      return;
    }
    
    // For other providers, use demo login for now
    if (login('demo', 'demo123')) {
      const from = location.state?.from?.pathname || '/';
      navigate(from);
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
          <h2 className="text-center text-3xl font-bold">Log in to your account</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handleSocialLogin('google')}
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
            onClick={() => handleSocialLogin('facebook')}
          >
            <Facebook className="h-5 w-5 mr-2 text-blue-600" />
            Facebook
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handleSocialLogin('apple')}
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
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-input bg-background placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
              Log in
            </button>
          </div>
        </form>
        
        <div className="text-center text-sm">
          <Link to="/register" className="font-medium text-primary hover:text-primary/90">
            Don't have an account? Register
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
