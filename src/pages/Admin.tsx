
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CouponManagement from '@/components/CouponManagement';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { 
  Database, 
  Tag, 
  Settings as SettingsIcon, 
  Percent, 
  PlusCircle 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface BrandDiscount {
  brand: string;
  discount: number;
  active: boolean;
}

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('coupons');
  const [brandDiscounts, setBrandDiscounts] = useState<BrandDiscount[]>([]);
  const [newBrand, setNewBrand] = useState('');
  const [newDiscount, setNewDiscount] = useState(10);
  const [globalDiscount, setGlobalDiscount] = useState(0);
  const [enableGlobalDiscount, setEnableGlobalDiscount] = useState(false);
  
  useEffect(() => {
    // Load existing discounts
    const storedDiscounts = localStorage.getItem('discounts');
    if (storedDiscounts) {
      try {
        const parsedDiscounts = JSON.parse(storedDiscounts);
        
        // Convert object to array for easier manipulation
        const discountsArray: BrandDiscount[] = [];
        Object.entries(parsedDiscounts).forEach(([brand, discount]) => {
          discountsArray.push({
            brand: brand,
            discount: discount as number,
            active: true
          });
        });
        
        // Check if there's a global "All" discount
        const allDiscount = discountsArray.find(d => d.brand === 'All');
        if (allDiscount) {
          setGlobalDiscount(allDiscount.discount);
          setEnableGlobalDiscount(true);
        }
        
        setBrandDiscounts(discountsArray.filter(d => d.brand !== 'All'));
      } catch (error) {
        console.error('Error parsing discounts:', error);
      }
    } else {
      // Initialize with default discounts
      const defaultDiscounts: BrandDiscount[] = [
        { brand: 'Apple', discount: 5, active: true },
        { brand: 'Samsung', discount: 10, active: true },
        { brand: 'Sony', discount: 15, active: true },
        { brand: 'Microsoft', discount: 8, active: true },
        { brand: 'Google', discount: 12, active: true }
      ];
      setBrandDiscounts(defaultDiscounts);
      
      // Save defaults to localStorage
      const discountObj: Record<string, number> = {};
      defaultDiscounts.forEach(d => {
        if (d.active) discountObj[d.brand] = d.discount;
      });
      localStorage.setItem('discounts', JSON.stringify(discountObj));
    }
  }, []);
  
  const handleAddDiscount = () => {
    if (!newBrand) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Brand name is required"
      });
      return;
    }
    
    // Check if brand already exists
    if (brandDiscounts.some(d => d.brand.toLowerCase() === newBrand.toLowerCase())) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Brand already exists"
      });
      return;
    }
    
    const updatedDiscounts = [
      ...brandDiscounts,
      { brand: newBrand, discount: newDiscount, active: true }
    ];
    setBrandDiscounts(updatedDiscounts);
    
    // Save to localStorage
    saveDiscountsToLocalStorage(updatedDiscounts, enableGlobalDiscount ? globalDiscount : null);
    
    // Reset form
    setNewBrand('');
    setNewDiscount(10);
    
    toast({
      title: "Discount added",
      description: `${newBrand} discount has been added successfully.`
    });
  };
  
  const handleToggleDiscount = (index: number) => {
    const updatedDiscounts = [...brandDiscounts];
    updatedDiscounts[index].active = !updatedDiscounts[index].active;
    setBrandDiscounts(updatedDiscounts);
    
    // Save to localStorage
    saveDiscountsToLocalStorage(updatedDiscounts, enableGlobalDiscount ? globalDiscount : null);
  };
  
  const handleRemoveDiscount = (index: number) => {
    const updatedDiscounts = brandDiscounts.filter((_, i) => i !== index);
    setBrandDiscounts(updatedDiscounts);
    
    // Save to localStorage
    saveDiscountsToLocalStorage(updatedDiscounts, enableGlobalDiscount ? globalDiscount : null);
    
    toast({
      title: "Discount removed",
      description: "The discount has been removed successfully."
    });
  };
  
  const handleGlobalDiscountChange = (value: number) => {
    setGlobalDiscount(value);
    if (enableGlobalDiscount) {
      saveDiscountsToLocalStorage(brandDiscounts, value);
    }
  };
  
  const handleToggleGlobalDiscount = (enabled: boolean) => {
    setEnableGlobalDiscount(enabled);
    saveDiscountsToLocalStorage(brandDiscounts, enabled ? globalDiscount : null);
  };
  
  const saveDiscountsToLocalStorage = (discounts: BrandDiscount[], globalDiscountValue: number | null) => {
    const discountObj: Record<string, number> = {};
    
    // Add brand-specific discounts
    discounts.forEach(d => {
      if (d.active) discountObj[d.brand] = d.discount;
    });
    
    // Add global discount if enabled
    if (globalDiscountValue !== null) {
      discountObj['All'] = globalDiscountValue;
    }
    
    localStorage.setItem('discounts', JSON.stringify(discountObj));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="coupons">Coupons</TabsTrigger>
          <TabsTrigger value="discounts">Discounts</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="coupons">
          <CouponManagement />
        </TabsContent>
        
        <TabsContent value="discounts">
          <div className="space-y-6">
            <div className="bg-card p-4 rounded-lg border border-border mb-6">
              <h2 className="text-lg font-medium mb-4">Global Discount</h2>
              <div className="flex items-center gap-4 mb-4">
                <Switch 
                  id="enable-global" 
                  checked={enableGlobalDiscount}
                  onCheckedChange={handleToggleGlobalDiscount}
                />
                <Label htmlFor="enable-global">Enable store-wide discount</Label>
              </div>
              
              {enableGlobalDiscount && (
                <div className="flex items-end gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="global-discount">Discount Percentage</Label>
                    <div className="flex items-center">
                      <Input
                        id="global-discount"
                        type="number"
                        min={1}
                        max={90}
                        value={globalDiscount}
                        onChange={(e) => handleGlobalDiscountChange(Number(e.target.value))}
                        className="w-24"
                      />
                      <span className="ml-2">%</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground ml-4">
                    This discount will be applied to all products.
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-card p-4 rounded-lg border border-border">
              <h2 className="text-lg font-medium mb-4">Brand Specific Discounts</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="brand-name">Brand Name</Label>
                  <Input
                    id="brand-name"
                    placeholder="e.g. Samsung"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discount-percentage">Discount Percentage</Label>
                  <div className="flex items-center">
                    <Input
                      id="discount-percentage"
                      type="number"
                      min={1}
                      max={90}
                      value={newDiscount}
                      onChange={(e) => setNewDiscount(Number(e.target.value))}
                      className="w-24"
                    />
                    <span className="ml-2">%</span>
                    
                    <Button onClick={handleAddDiscount} className="ml-4">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add Discount
                    </Button>
                  </div>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Brand</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {brandDiscounts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                        No brand discounts available
                      </TableCell>
                    </TableRow>
                  ) : (
                    brandDiscounts.map((discount, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{discount.brand}</TableCell>
                        <TableCell>{discount.discount}%</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Switch
                              checked={discount.active}
                              onCheckedChange={() => handleToggleDiscount(index)}
                              className="mr-2"
                            />
                            <span className={discount.active ? "text-green-500" : "text-muted-foreground"}>
                              {discount.active ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveDiscount(index)}
                            className="text-destructive"
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" defaultValue="Electrium" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-email">Store Email</Label>
                <Input id="store-email" defaultValue="contact@electrium.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-phone">Store Phone</Label>
                <Input id="store-phone" defaultValue="+1 (555) 123-4567" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-address">Store Address</Label>
                <Input id="store-address" defaultValue="123 Tech Street, Silicon Valley, CA" />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="enable-analytics" defaultChecked />
                <Label htmlFor="enable-analytics">Enable Analytics</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="enable-inventory" defaultChecked />
                <Label htmlFor="enable-inventory">Enable Inventory Management</Label>
              </div>
              
              <Button>Save Settings</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
