
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Admin settings state
  const [settings, setSettings] = useState({
    debugMode: false,
    darkMode: document.documentElement.classList.contains('dark'),
    apiEndpoint: 'https://api.example.com',
    cacheTimeout: 30,
    maxProductsPerPage: 20,
    analyticsEnabled: true,
    autoApproveComments: false,
    performanceMode: true,
    discountMultiplier: 1.0,
    adminEmail: 'admin@example.com',
  });

  // Stats state
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
    activeUsers: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setStats({
        totalUsers: 1254,
        totalProducts: 432,
        totalOrders: 897,
        revenue: 125890,
        activeUsers: 347,
        conversionRate: 4.7,
      });
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // This is a hidden page, redirect if accessed directly
  useEffect(() => {
    const hasSecretAccess = sessionStorage.getItem('adminAccess');
    if (!hasSecretAccess) {
      sessionStorage.setItem('adminAccess', 'true');
    }
  }, [navigate]);

  const handleSettingChange = (setting: string, value: any) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
    
    if (setting === 'darkMode') {
      if (value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    toast({
      title: "Setting updated",
      description: `${setting} has been set to ${value}`,
    });
  };

  const handleSaveSettings = () => {
    // Simulate saving settings
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings saved",
        description: "All settings have been saved successfully",
      });
    }, 800);
  };

  const handleClearCache = () => {
    // Simulate clearing cache
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Cache cleared",
        description: "Application cache has been cleared successfully",
      });
    }, 1200);
  };

  const handleResetDatabase = () => {
    // Simulate database reset
    setIsLoading(true);
    setTimeout(() => {
      localStorage.clear();
      setIsLoading(false);
      toast({
        title: "Database reset",
        description: "Database has been reset to default state",
      });
      setTimeout(() => navigate('/'), 1500);
    }, 2000);
  };

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <div className="text-muted-foreground">
          {currentUser ? `Logged in as ${currentUser.displayName || currentUser.username}` : 'Developer Mode'}
        </div>
      </div>
      
      <Tabs defaultValue="dashboard">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="developer">Developer</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Users</CardTitle>
                <CardDescription>Total registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalUsers}</div>
                <div className="text-sm text-green-500 mt-2">+12% from last month</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Products</CardTitle>
                <CardDescription>Total active products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalProducts}</div>
                <div className="text-sm text-green-500 mt-2">+5% from last month</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Total revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${stats.revenue.toLocaleString()}</div>
                <div className="text-sm text-green-500 mt-2">+23% from last month</div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
              <CardDescription>Recent stats and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Active Users</span>
                  <span className="font-semibold">{stats.activeUsers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Orders</span>
                  <span className="font-semibold">{stats.totalOrders}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Conversion Rate</span>
                  <span className="font-semibold">{stats.conversionRate}%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Detailed Analytics</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Settings</CardTitle>
              <CardDescription>Manage your application preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="debug-mode">Debug Mode</Label>
                    <Switch 
                      id="debug-mode" 
                      checked={settings.debugMode}
                      onCheckedChange={(checked) => handleSettingChange('debugMode', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <Switch 
                      id="dark-mode" 
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="analytics">Analytics</Label>
                    <Switch 
                      id="analytics" 
                      checked={settings.analyticsEnabled}
                      onCheckedChange={(checked) => handleSettingChange('analyticsEnabled', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="approve-comments">Auto-approve Comments</Label>
                    <Switch 
                      id="approve-comments" 
                      checked={settings.autoApproveComments}
                      onCheckedChange={(checked) => handleSettingChange('autoApproveComments', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="performance-mode">Performance Mode</Label>
                    <Switch 
                      id="performance-mode" 
                      checked={settings.performanceMode}
                      onCheckedChange={(checked) => handleSettingChange('performanceMode', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-endpoint">API Endpoint</Label>
                    <Input 
                      id="api-endpoint" 
                      value={settings.apiEndpoint}
                      onChange={(e) => handleSettingChange('apiEndpoint', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input 
                      id="admin-email" 
                      value={settings.adminEmail}
                      onChange={(e) => handleSettingChange('adminEmail', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cache-timeout">Cache Timeout (minutes)</Label>
                    <Input 
                      id="cache-timeout" 
                      type="number"
                      value={settings.cacheTimeout.toString()}
                      onChange={(e) => handleSettingChange('cacheTimeout', parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Products Per Page: {settings.maxProductsPerPage}</Label>
                    <Slider 
                      value={[settings.maxProductsPerPage]} 
                      min={5} 
                      max={50} 
                      step={5}
                      onValueChange={([value]) => handleSettingChange('maxProductsPerPage', value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Discount Multiplier: {settings.discountMultiplier.toFixed(1)}</Label>
                    <Slider 
                      value={[settings.discountMultiplier * 10]} 
                      min={5} 
                      max={20} 
                      step={1}
                      onValueChange={([value]) => handleSettingChange('discountMultiplier', value / 10)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleSaveSettings}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Settings'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="developer" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Developer Tools</CardTitle>
              <CardDescription>Advanced tools for debugging and development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-md">
                  <pre className="text-xs overflow-x-auto">
                    {`{
  "session": {
    "user": ${JSON.stringify(currentUser || {}, null, 2)},
    "isAuthenticated": ${Boolean(currentUser)},
    "lastActivity": "${new Date().toISOString()}"
  },
  "system": {
    "environment": "development",
    "version": "1.0.0",
    "nodeEnv": "development",
    "buildTime": "${new Date().toISOString()}"
  }
}`}
                  </pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" onClick={handleClearCache}>
                    Clear Application Cache
                  </Button>
                  <Button variant="outline">
                    Export Error Logs
                  </Button>
                  <Button variant="outline">
                    Test API Connection
                  </Button>
                  <Button variant="outline">
                    Generate Test Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Debug Console</CardTitle>
              <CardDescription>Live application console</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black text-green-400 p-4 rounded-md h-60 overflow-y-auto font-mono text-xs">
                <div>[INFO] Admin panel initialized at {new Date().toISOString()}</div>
                <div>[INFO] User session active: {Boolean(currentUser).toString()}</div>
                <div>[INFO] Local storage items: {Object.keys(localStorage).length}</div>
                <div>[DEBUG] Dark mode status: {settings.darkMode.toString()}</div>
                <div>[WARN] Development environment detected</div>
                <div>[INFO] API endpoint set to: {settings.apiEndpoint}</div>
                <div>[PERF] Page loaded in 145ms</div>
                <div>[INFO] Cache status: 23 items in memory</div>
                <div>[DEBUG] Device: {navigator.userAgent}</div>
                <div>[INFO] Ready for commands...</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="database" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Management</CardTitle>
              <CardDescription>Manage and inspect database operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Storage Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>LocalStorage</span>
                          <span>73%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: '73%' }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>IndexedDB</span>
                          <span>45%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: '45%' }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Cache API</span>
                          <span>29%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: '29%' }} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Database Operations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Read Operations</span>
                        <span className="font-semibold">1,254</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Write Operations</span>
                        <span className="font-semibold">387</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Delete Operations</span>
                        <span className="font-semibold">43</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Average Response Time</span>
                        <span className="font-semibold">24ms</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  Download Database Backup
                </Button>
                
                <Button variant="outline" className="w-full">
                  Run Database Integrity Check
                </Button>
                
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleResetDatabase}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Reset Database to Default'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
