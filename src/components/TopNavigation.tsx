
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ShoppingCart, User, Heart, LogOut, Settings, Info, Home, Package, Gift } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { translateText } from '@/utils/translation';
import LanguageSwitcher from "@/components/LanguageSwitcher";

const TopNavigation = () => {
  const { currentUser, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
    
    // Listen for language changes
    const handleLanguageChange = (e: CustomEvent) => {
      setCurrentLanguage(e.detail);
    };
    
    // Update cart count
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    };
    
    // Update wishlist count
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlistCount(wishlist.length);
    };
    
    // Initial counts
    updateCartCount();
    updateWishlistCount();
    
    // Listen for cart updates
    const handleCartUpdate = () => {
      updateCartCount();
    };
    
    // Listen for wishlist updates
    const handleWishlistUpdate = () => {
      updateWishlistCount();
    };
    
    window.addEventListener('cartUpdate', handleCartUpdate);
    window.addEventListener('wishlistUpdate', handleWishlistUpdate);
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('cartUpdate', handleCartUpdate);
      window.removeEventListener('wishlistUpdate', handleWishlistUpdate);
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border shadow-sm z-50">
      {/* Desktop Navigation */}
      <div className="container mx-auto h-full flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="font-bold text-xl tracking-tight text-foreground mr-6">
            EDDM
          </Link>
          
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className={`text-sm font-medium ${location.pathname === '/' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              <span className="flex items-center gap-1">
                <Home size={16} />
                {translateText("home", currentLanguage)}
              </span>
            </Link>
            <Link to="/products" className={`text-sm font-medium ${location.pathname === '/products' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              <span className="flex items-center gap-1">
                <Package size={16} />
                {translateText("products", currentLanguage)}
              </span>
            </Link>
            <Link to="/about" className={`text-sm font-medium ${location.pathname === '/about' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              <span className="flex items-center gap-1">
                <Info size={16} />
                {translateText("about", currentLanguage)}
              </span>
            </Link>
            <Link to="/donation" className={`text-sm font-medium ${location.pathname === '/donation' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              <span className="flex items-center gap-1">
                <Gift size={16} />
                {translateText("donation", currentLanguage)}
              </span>
            </Link>
          </nav>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative w-64">
            <Input
              type="search"
              placeholder={translateText("search_products", currentLanguage)}
              className="w-full pr-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <MagnifyingGlassIcon className="h-4 w-4" />
            </button>
          </form>
          
          <div className="hidden lg:block w-28">
            <LanguageSwitcher variant="dropdown" size="sm" />
          </div>
          
          <ModeToggle />
          
          <Link to="/wishlist" className="relative">
            <Heart className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            {wishlistCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-4 min-w-4 p-0 flex items-center justify-center text-[10px]" variant="destructive">
                {wishlistCount}
              </Badge>
            )}
          </Link>
          
          <Link to="/checkout" className="relative">
            <ShoppingCart className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-4 min-w-4 p-0 flex items-center justify-center text-[10px]" variant="default">
                {cartCount}
              </Badge>
            )}
          </Link>
          
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{currentUser.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{currentUser.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{translateText("settings", currentLanguage)}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{translateText("logout", currentLanguage)}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
              <User className="mr-2 h-4 w-4" />
              <span>{translateText("login", currentLanguage)}</span>
            </Button>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-1">
          <Link to="/checkout" className="relative mr-2">
            <ShoppingCart className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-4 min-w-4 p-0 flex items-center justify-center text-[10px]" variant="default">
                {cartCount}
              </Badge>
            )}
          </Link>
          
          <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-card border-b border-border shadow-md z-50">
          <div className="container mx-auto py-4 px-4 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder={translateText("search_products", currentLanguage)}
                className="w-full pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <MagnifyingGlassIcon className="h-4 w-4" />
              </button>
            </form>
            
            <LanguageSwitcher variant="buttons" size="sm" />
            
            <nav className="flex flex-col space-y-2">
              <Link to="/" onClick={closeMobileMenu} className="text-sm font-medium p-2 rounded hover:bg-accent">
                <span className="flex items-center gap-2">
                  <Home size={16} />
                  {translateText("home", currentLanguage)}
                </span>
              </Link>
              <Link to="/products" onClick={closeMobileMenu} className="text-sm font-medium p-2 rounded hover:bg-accent">
                <span className="flex items-center gap-2">
                  <Package size={16} />
                  {translateText("products", currentLanguage)}
                </span>
              </Link>
              <Link to="/about" onClick={closeMobileMenu} className="text-sm font-medium p-2 rounded hover:bg-accent">
                <span className="flex items-center gap-2">
                  <Info size={16} />
                  {translateText("about", currentLanguage)}
                </span>
              </Link>
              <Link to="/donation" onClick={closeMobileMenu} className="text-sm font-medium p-2 rounded hover:bg-accent">
                <span className="flex items-center gap-2">
                  <Gift size={16} />
                  {translateText("donation", currentLanguage)}
                </span>
              </Link>
              <Link to="/wishlist" onClick={closeMobileMenu} className="text-sm font-medium p-2 rounded hover:bg-accent">
                <span className="flex items-center gap-2">
                  <Heart size={16} />
                  {translateText("wishlist", currentLanguage)}
                  {wishlistCount > 0 && (
                    <Badge variant="destructive">{wishlistCount}</Badge>
                  )}
                </span>
              </Link>
              <Link to="/settings" onClick={closeMobileMenu} className="text-sm font-medium p-2 rounded hover:bg-accent">
                <span className="flex items-center gap-2">
                  <Settings size={16} />
                  {translateText("settings", currentLanguage)}
                </span>
              </Link>
            </nav>
            
            <div className="pt-2 border-t border-border">
              {currentUser ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{currentUser.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{currentUser.username}</span>
                  </div>
                  <Button variant="destructive" size="sm" className="w-full" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{translateText("logout", currentLanguage)}</span>
                  </Button>
                </div>
              ) : (
                <Button variant="default" size="sm" className="w-full" onClick={() => { navigate('/login'); closeMobileMenu(); }}>
                  <User className="mr-2 h-4 w-4" />
                  <span>{translateText("login", currentLanguage)}</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNavigation;
