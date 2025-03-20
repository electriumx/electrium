
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
    // Improved Google OAuth simulation
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    
    const googleWindow = window.open(
      'https://accounts.google.com/o/oauth2/auth',
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
              .button { background-color: #4285f4; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-size: 14px; margin-top: 20px; }
              .input { width: 100%; padding: 10px; margin: 8px 0; border: 1px solid #ddd; border-radius: 4px; }
              .form { width: 80%; max-width: 300px; }
            </style>
          </head>
          <body>
            <img class="google-logo" src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google">
            <h1>Sign in with Google</h1>
            <div class="form">
              <p>Enter your Google account email</p>
              <input type="email" placeholder="Email" class="input">
              <p>Password</p>
              <input type="password" placeholder="Password" class="input">
              <button class="button" onclick="completeAuth()">Sign in</button>
            </div>
            <script>
              function completeAuth() {
                const spinner = document.createElement('div');
                spinner.className = 'spinner';
                document.querySelector('.form').innerHTML = '';
                document.querySelector('.form').appendChild(spinner);
                document.querySelector('h1').textContent = 'Authenticating...';
                setTimeout(() => window.close(), 2000);
              }
            </script>
          </body>
        </html>
      `);
      
      // Set up message listener to handle when the user completes auth
      const messageListener = (event: MessageEvent) => {
        if (event.data === 'googleAuthComplete') {
          window.removeEventListener('message', messageListener);
          
          // Log the user in with demo credentials
          if (login('demo', 'demo123')) {
            const from = location.state?.from?.pathname || '/';
            navigate(from);
          }
        }
      };
      
      window.addEventListener('message', messageListener);
      
      // Fallback: If the user closes the window manually, we'll check every 500ms
      const checkInterval = setInterval(() => {
        if (googleWindow.closed) {
          clearInterval(checkInterval);
          window.removeEventListener('message', messageListener);
          
          // Log the user in with demo credentials
          if (login('demo', 'demo123')) {
            const from = location.state?.from?.pathname || '/';
            navigate(from);
          }
        }
      }, 500);
    }
  };

  const handleFacebookLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    
    const facebookWindow = window.open(
      'https://www.facebook.com/login.php',
      'Facebook Login',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );
    
    if (facebookWindow) {
      facebookWindow.document.write(`
        <html>
          <head>
            <title>Facebook Login</title>
            <style>
              body { font-family: Helvetica, Arial, sans-serif; margin: 0; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #f0f2f5; }
              .facebook-logo { width: 240px; margin-bottom: 20px; }
              h1 { color: #1877f2; font-size: 24px; }
              p { color: #606770; }
              .spinner { border: 4px solid #f3f3f3; border-radius: 50%; border-top: 4px solid #1877f2; width: 30px; height: 30px; animation: spin 1s linear infinite; margin: 20px 0; }
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              .button { background-color: #1877f2; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 16px; margin-top: 20px; width: 100%; font-weight: bold; }
              .input { width: 100%; padding: 14px; margin: 8px 0; border: 1px solid #ddd; border-radius: 6px; font-size: 16px; }
              .form { width: 80%; max-width: 300px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
            </style>
          </head>
          <body>
            <img class="facebook-logo" src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt="Facebook">
            <div class="form">
              <p>Log in to Facebook</p>
              <input type="text" placeholder="Email or phone number" class="input">
              <input type="password" placeholder="Password" class="input">
              <button class="button" onclick="completeAuth()">Log In</button>
            </div>
            <script>
              function completeAuth() {
                const spinner = document.createElement('div');
                spinner.className = 'spinner';
                document.querySelector('.form').innerHTML = '';
                document.querySelector('.form').appendChild(spinner);
                setTimeout(() => window.close(), 2000);
              }
            </script>
          </body>
        </html>
      `);
      
      // Check if the window is closed
      const checkInterval = setInterval(() => {
        if (facebookWindow.closed) {
          clearInterval(checkInterval);
          
          // Log the user in with demo credentials
          if (login('demo', 'demo123')) {
            const from = location.state?.from?.pathname || '/';
            navigate(from);
          }
        }
      }, 500);
    }
  };

  const handleAppleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    
    const appleWindow = window.open(
      'https://appleid.apple.com/auth/authorize',
      'Apple Sign In',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );
    
    if (appleWindow) {
      appleWindow.document.write(`
        <html>
          <head>
            <title>Sign in with Apple</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #fff; }
              .apple-logo { width: 50px; margin-bottom: 20px; }
              h1 { color: #000; font-size: 24px; font-weight: 500; margin-bottom: 30px; }
              p { color: #86868b; }
              .spinner { border: 4px solid #f3f3f3; border-radius: 50%; border-top: 4px solid #000; width: 30px; height: 30px; animation: spin 1s linear infinite; margin: 20px 0; }
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              .button { background-color: #000; color: white; border: none; padding: 12px 20px; border-radius: 6px; cursor: pointer; font-size: 16px; margin-top: 20px; width: 100%; font-weight: 500; }
              .input { width: 100%; padding: 14px; margin: 8px 0; border: 1px solid #d2d2d7; border-radius: 6px; font-size: 16px; }
              .form { width: 80%; max-width: 300px; }
            </style>
          </head>
          <body>
            <svg class="apple-logo" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.2-150.8-35.2-71.2 1.1-137.3 41.2-174.6 104.5-75.6 129-19.1 317.8 53.7 422 36.1 52.4 78.3 111 133.9 109.2 54.2-1.8 74.4-34.2 139.4-34.2 64.9 0 83.8 34.2 140.8 33 58.4-1.2 95.3-52 130.9-104.6 40.8-59.6 57.7-117.3 58.1-120.1-1.1-.4-111-42.7-112.1-168.9zM663 288.8c50.4-60.8 42.5-146.2 41.4-152.1-39.7 1.9-87.2 27.2-114 59.7-25 28.8-47.2 75.2-41.4 119.8 44.1 3.2 85.3-19.7 114-27.4z"/>
            </svg>
            <h1>Sign in with Apple</h1>
            <div class="form">
              <p>Apple ID</p>
              <input type="email" placeholder="Apple ID" class="input">
              <p>Password</p>
              <input type="password" placeholder="Password" class="input">
              <button class="button" onclick="completeAuth()">Continue</button>
            </div>
            <script>
              function completeAuth() {
                const spinner = document.createElement('div');
                spinner.className = 'spinner';
                document.querySelector('.form').innerHTML = '';
                document.querySelector('.form').appendChild(spinner);
                document.querySelector('h1').textContent = 'Authenticating...';
                setTimeout(() => window.close(), 2000);
              }
            </script>
          </body>
        </html>
      `);
      
      // Check if the window is closed
      const checkInterval = setInterval(() => {
        if (appleWindow.closed) {
          clearInterval(checkInterval);
          
          // Log the user in with demo credentials
          if (login('demo', 'demo123')) {
            const from = location.state?.from?.pathname || '/';
            navigate(from);
          }
        }
      }, 500);
    }
  };

  const handleSocialLogin = (provider: string) => {
    if (provider === 'google') {
      handleGoogleLogin();
    } else if (provider === 'facebook') {
      handleFacebookLogin();
    } else if (provider === 'apple') {
      handleAppleLogin();
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
              Log In
            </button>
          </div>
        </form>
        
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
