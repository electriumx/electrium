
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Edit, Plus, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Coupon {
  id: string;
  code: string;
  discount: number;
  expiresAt: number | null;
  description: string;
  isActive: boolean;
}

const CouponManagement = () => {
  const { toast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState<Coupon>({
    id: '',
    code: '',
    discount: 0,
    expiresAt: null,
    description: '',
    isActive: true
  });

  // Load coupons from localStorage
  useEffect(() => {
    const savedCoupons = localStorage.getItem('adminCoupons');
    if (savedCoupons) {
      try {
        const parsedCoupons = JSON.parse(savedCoupons);
        setCoupons(parsedCoupons);
      } catch (error) {
        console.error('Error parsing coupons:', error);
        // Initialize with some default coupons if parsing fails
        initializeDefaultCoupons();
      }
    } else {
      // Initialize with default coupons if none exist
      initializeDefaultCoupons();
    }
  }, []);

  const initializeDefaultCoupons = () => {
    const defaultCoupons: Coupon[] = [
      {
        id: '1',
        code: 'WELCOME10',
        discount: 10,
        expiresAt: null,
        description: 'Welcome discount for new users',
        isActive: true
      },
      {
        id: '2',
        code: 'SUMMER25',
        discount: 25,
        expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
        description: 'Summer sale discount',
        isActive: true
      },
      {
        id: '3',
        code: 'FLASH50',
        discount: 50,
        expiresAt: Date.now() + 2 * 24 * 60 * 60 * 1000, // 2 days from now
        description: 'Flash sale - 50% off',
        isActive: true
      },
      {
        id: '4',
        code: 'APPLE15',
        discount: 15,
        expiresAt: null,
        description: 'Special discount for Apple products',
        isActive: true
      },
      {
        id: '5',
        code: 'SAMSUNG20',
        discount: 20,
        expiresAt: null,
        description: 'Special discount for Samsung products',
        isActive: true
      },
      {
        id: '6',
        code: 'LOYALTY30',
        discount: 30,
        expiresAt: null,
        description: 'Loyalty program discount',
        isActive: true
      },
      {
        id: '7',
        code: 'HOLIDAY40',
        discount: 40,
        expiresAt: Date.now() + 15 * 24 * 60 * 60 * 1000, // 15 days from now
        description: 'Holiday season special discount',
        isActive: true
      },
      {
        id: '8',
        code: 'STUDENT10',
        discount: 10,
        expiresAt: null,
        description: 'Student discount',
        isActive: true
      },
      {
        id: '9',
        code: 'STAFF25',
        discount: 25,
        expiresAt: null,
        description: 'Staff discount',
        isActive: true
      },
      {
        id: '10',
        code: 'FRIEND15',
        discount: 15,
        expiresAt: null,
        description: 'Refer a friend discount',
        isActive: true
      },
      {
        id: '11',
        code: 'VIP50',
        discount: 50,
        expiresAt: null,
        description: 'VIP customer discount',
        isActive: true
      },
      {
        id: '12',
        code: 'NEWUSER20',
        discount: 20,
        expiresAt: null,
        description: 'New user registration discount',
        isActive: true
      },
      {
        id: '13',
        code: 'BLACKFRIDAY60',
        discount: 60,
        expiresAt: Date.now() + 10 * 24 * 60 * 60 * 1000, // 10 days from now
        description: 'Black Friday special discount',
        isActive: true
      },
      {
        id: '14',
        code: 'CYBERSALE45',
        discount: 45,
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
        description: 'Cyber Monday special discount',
        isActive: true
      },
      {
        id: '15',
        code: 'BIRTHDAY30',
        discount: 30,
        expiresAt: null,
        description: 'Birthday special discount',
        isActive: true
      },
      {
        id: '16',
        code: 'ANNIVERSARY25',
        discount: 25,
        expiresAt: null,
        description: 'Anniversary special discount',
        isActive: true
      },
      {
        id: '17',
        code: 'COMEBACK15',
        discount: 15,
        expiresAt: null,
        description: 'Comeback discount for inactive users',
        isActive: true
      },
      {
        id: '18',
        code: 'APP10',
        discount: 10,
        expiresAt: null,
        description: 'Mobile app usage discount',
        isActive: true
      },
      {
        id: '19',
        code: 'SOCIAL5',
        discount: 5,
        expiresAt: null,
        description: 'Social media follower discount',
        isActive: true
      },
      {
        id: '20',
        code: 'SIGNUP5',
        discount: 5,
        expiresAt: null,
        description: 'Newsletter signup discount',
        isActive: true
      }
    ];
    
    setCoupons(defaultCoupons);
    localStorage.setItem('adminCoupons', JSON.stringify(defaultCoupons));
  };

  // Save coupons to localStorage
  useEffect(() => {
    if (coupons.length > 0) {
      localStorage.setItem('adminCoupons', JSON.stringify(coupons));
    }
  }, [coupons]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setCurrentCoupon(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              name === 'discount' ? Math.min(Number(value), 100) : value
    }));
  };

  const handleAddCoupon = () => {
    setIsEditing(false);
    setCurrentCoupon({
      id: '',
      code: '',
      discount: 0,
      expiresAt: null,
      description: '',
      isActive: true
    });
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setIsEditing(true);
    setCurrentCoupon(coupon);
  };

  const handleDeleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(coupon => coupon.id !== id));
    
    toast({
      title: "Coupon deleted",
      description: "The coupon has been successfully deleted.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentCoupon.code.trim()) {
      toast({
        title: "Error",
        description: "Coupon code cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentCoupon.discount <= 0 || currentCoupon.discount > 100) {
      toast({
        title: "Error",
        description: "Discount must be between 1 and 100.",
        variant: "destructive",
      });
      return;
    }
    
    if (isEditing) {
      // Update existing coupon
      setCoupons(prev => 
        prev.map(coupon => 
          coupon.id === currentCoupon.id ? currentCoupon : coupon
        )
      );
      
      toast({
        title: "Coupon updated",
        description: `Coupon "${currentCoupon.code}" has been updated.`,
      });
    } else {
      // Add new coupon
      const newCoupon = {
        ...currentCoupon,
        id: Date.now().toString(),
      };
      
      setCoupons(prev => [...prev, newCoupon]);
      
      toast({
        title: "Coupon added",
        description: `Coupon "${newCoupon.code}" has been added.`,
      });
    }
    
    // Reset form
    setCurrentCoupon({
      id: '',
      code: '',
      discount: 0,
      expiresAt: null,
      description: '',
      isActive: true
    });
    setIsEditing(false);
  };

  // Format expiration date
  const formatExpirationDate = (timestamp: number | null) => {
    if (!timestamp) return 'Never expires';
    
    const expirationDate = new Date(timestamp);
    return expirationDate.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Coupon' : 'Add New Coupon'}</CardTitle>
          <CardDescription>
            {isEditing ? 'Modify existing coupon details' : 'Create a new discount coupon for customers'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="coupon-form" className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Coupon Code</Label>
                <Input
                  id="code"
                  name="code"
                  value={currentCoupon.code}
                  onChange={handleInputChange}
                  placeholder="e.g., SUMMER25"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="discount">Discount Percentage (%)</Label>
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  min="1"
                  max="100"
                  value={currentCoupon.discount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={currentCoupon.description}
                onChange={handleInputChange}
                placeholder="Describe what this coupon is for"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={currentCoupon.isActive}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => {
              setIsEditing(false);
              setCurrentCoupon({
                id: '',
                code: '',
                discount: 0,
                expiresAt: null,
                description: '',
                isActive: true
              });
            }}
          >
            Cancel
          </Button>
          <Button type="submit" form="coupon-form">
            {isEditing ? 'Update Coupon' : 'Add Coupon'}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Coupons</CardTitle>
          <CardDescription>Manage your discount coupons</CardDescription>
        </CardHeader>
        <CardContent>
          {coupons.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead className="hidden md:table-cell">Expires</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell className="font-medium">{coupon.code}</TableCell>
                    <TableCell>{coupon.discount}%</TableCell>
                    <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                      {coupon.description}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatExpirationDate(coupon.expiresAt)}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {coupon.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditCoupon(coupon)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDeleteCoupon(coupon.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-4">
              <Tag className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <h3 className="text-lg font-medium">No coupons found</h3>
              <p className="text-muted-foreground">Start creating discount coupons for your customers.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={handleAddCoupon}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create your first coupon
              </Button>
            </div>
          )}
        </CardContent>
        {coupons.length > 0 && (
          <CardFooter>
            <Button 
              className="w-full"
              onClick={handleAddCoupon}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Coupon
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default CouponManagement;
