
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Trash, PencilIcon, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  target: string;
  description?: string;
  expiresAt?: Date;
}

const CouponManagement = () => {
  const { toast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [newCoupon, setNewCoupon] = useState<Omit<Coupon, 'id'>>({
    code: '',
    discount: 10,
    type: 'percentage',
    target: 'all'
  });
  const [editingCouponId, setEditingCouponId] = useState<string | null>(null);

  const productCategories = [
    'all',
    'smartphones',
    'laptops',
    'tablets',
    'headphones',
    'cameras',
    'speakers',
    'gaming',
    'wearables',
    'accessories'
  ];

  useEffect(() => {
    // Load existing coupons
    const storedCoupons = localStorage.getItem('coupons');
    if (storedCoupons) {
      try {
        const parsedCoupons = JSON.parse(storedCoupons);
        setCoupons(parsedCoupons);
      } catch (error) {
        console.error('Error parsing coupons:', error);
      }
    } else {
      // Initialize with default coupons
      const defaultCoupons = generateDefaultCoupons();
      setCoupons(defaultCoupons);
      localStorage.setItem('coupons', JSON.stringify(defaultCoupons));
    }
  }, []);

  const generateDefaultCoupons = (): Coupon[] => {
    // Create 20 default coupons with varying discounts and targets
    const defaultCoupons: Coupon[] = [
      { id: '1', code: 'WELCOME10', discount: 10, type: 'percentage', target: 'all', description: '10% off your first purchase' },
      { id: '2', code: 'SMARTPHONE15', discount: 15, type: 'percentage', target: 'smartphones', description: '15% off smartphones' },
      { id: '3', code: 'LAPTOP20', discount: 20, type: 'percentage', target: 'laptops', description: '20% off laptops' },
      { id: '4', code: 'TABLET10', discount: 10, type: 'percentage', target: 'tablets', description: '10% off tablets' },
      { id: '5', code: 'AUDIO25', discount: 25, type: 'percentage', target: 'headphones', description: '25% off headphones' },
      { id: '6', code: 'SUMMER2023', discount: 15, type: 'percentage', target: 'all', description: 'Summer sale discount' },
      { id: '7', code: 'SAVE30GAMING', discount: 30, type: 'percentage', target: 'gaming', description: '30% off gaming products' },
      { id: '8', code: 'CAMERA20', discount: 20, type: 'percentage', target: 'cameras', description: '20% off cameras' },
      { id: '9', code: 'WEARABLE15', discount: 15, type: 'percentage', target: 'wearables', description: '15% off wearables' },
      { id: '10', code: 'ACCESSORY50', discount: 50, type: 'percentage', target: 'accessories', description: '50% off accessories' },
      { id: '11', code: 'FLASH25', discount: 25, type: 'percentage', target: 'all', description: 'Flash sale discount' },
      { id: '12', code: 'SPEAKER10', discount: 10, type: 'percentage', target: 'speakers', description: '10% off speakers' },
      { id: '13', code: 'PREMIUM5', discount: 5, type: 'percentage', target: 'smartphones', description: '5% off premium smartphones' },
      { id: '14', code: 'LAPTOP50OFF', discount: 50, type: 'fixed', target: 'laptops', description: '$50 off laptops' },
      { id: '15', code: 'BUNDLE20', discount: 20, type: 'percentage', target: 'all', description: '20% off when buying multiple items' },
      { id: '16', code: 'TABLET25', discount: 25, type: 'percentage', target: 'tablets', description: '25% off tablets' },
      { id: '17', code: 'BLACKFRIDAY', discount: 40, type: 'percentage', target: 'all', description: 'Black Friday discount' },
      { id: '18', code: 'GAMING15', discount: 15, type: 'percentage', target: 'gaming', description: '15% off gaming products' },
      { id: '19', code: 'AUDIO10', discount: 10, type: 'percentage', target: 'headphones', description: '10% off audio products' },
      { id: '20', code: 'NEWUSER20', discount: 20, type: 'percentage', target: 'all', description: '20% off for new users' }
    ];
    
    return defaultCoupons;
  };

  const handleAddCoupon = () => {
    if (!newCoupon.code) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Coupon code is required"
      });
      return;
    }

    // Check if coupon code already exists
    if (coupons.some(coupon => coupon.code === newCoupon.code)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Coupon code already exists"
      });
      return;
    }

    const couponToAdd: Coupon = {
      id: Date.now().toString(),
      ...newCoupon
    };

    const updatedCoupons = [...coupons, couponToAdd];
    setCoupons(updatedCoupons);
    localStorage.setItem('coupons', JSON.stringify(updatedCoupons));
    
    // Reset form
    setNewCoupon({
      code: '',
      discount: 10,
      type: 'percentage',
      target: 'all'
    });

    toast({
      title: "Coupon created",
      description: `Coupon ${couponToAdd.code} has been created successfully.`
    });
  };

  const handleUpdateCoupon = () => {
    if (!editingCouponId) return;

    const updatedCoupons = coupons.map(coupon => {
      if (coupon.id === editingCouponId) {
        return {
          ...coupon,
          code: newCoupon.code,
          discount: newCoupon.discount,
          type: newCoupon.type,
          target: newCoupon.target,
          description: newCoupon.description
        };
      }
      return coupon;
    });

    setCoupons(updatedCoupons);
    localStorage.setItem('coupons', JSON.stringify(updatedCoupons));
    
    // Reset form
    setNewCoupon({
      code: '',
      discount: 10,
      type: 'percentage',
      target: 'all'
    });
    setEditingCouponId(null);

    toast({
      title: "Coupon updated",
      description: `Coupon ${newCoupon.code} has been updated successfully.`
    });
  };

  const handleDeleteCoupon = (id: string) => {
    const updatedCoupons = coupons.filter(coupon => coupon.id !== id);
    setCoupons(updatedCoupons);
    localStorage.setItem('coupons', JSON.stringify(updatedCoupons));

    toast({
      title: "Coupon deleted",
      description: "The coupon has been deleted successfully."
    });
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setNewCoupon({
      code: coupon.code,
      discount: coupon.discount,
      type: coupon.type,
      target: coupon.target,
      description: coupon.description
    });
    setEditingCouponId(coupon.id);
  };

  const handleCancelEdit = () => {
    setNewCoupon({
      code: '',
      discount: 10,
      type: 'percentage',
      target: 'all'
    });
    setEditingCouponId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Coupon Management</h3>
      </div>

      <div className="bg-card p-4 rounded-lg border border-border">
        <h4 className="font-medium mb-4">{editingCouponId ? 'Edit Coupon' : 'Add New Coupon'}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="coupon-code">Coupon Code</Label>
            <Input
              id="coupon-code"
              placeholder="e.g. SUMMER2023"
              value={newCoupon.code}
              onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="discount-value">Discount Value</Label>
            <Input
              id="discount-value"
              type="number"
              min={1}
              max={100}
              value={newCoupon.discount}
              onChange={(e) => setNewCoupon({ ...newCoupon, discount: Number(e.target.value) })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="discount-type">Discount Type</Label>
            <Select
              value={newCoupon.type}
              onValueChange={(value) => setNewCoupon({ ...newCoupon, type: value as 'percentage' | 'fixed' })}
            >
              <SelectTrigger id="discount-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage (%)</SelectItem>
                <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="target-category">Target Category</Label>
            <Select
              value={newCoupon.target}
              onValueChange={(value) => setNewCoupon({ ...newCoupon, target: value })}
            >
              <SelectTrigger id="target-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {productCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <Label htmlFor="description">Description (Optional)</Label>
          <Input
            id="description"
            placeholder="Description of the coupon"
            value={newCoupon.description || ''}
            onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
          />
        </div>
        
        <div className="flex gap-2">
          {editingCouponId ? (
            <>
              <Button onClick={handleUpdateCoupon}>Update Coupon</Button>
              <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
            </>
          ) : (
            <Button onClick={handleAddCoupon}>
              <Plus className="w-4 h-4 mr-2" />
              Add Coupon
            </Button>
          )}
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                  No coupons available
                </TableCell>
              </TableRow>
            ) : (
              coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.code}</TableCell>
                  <TableCell>
                    {coupon.type === 'percentage' ? `${coupon.discount}%` : `$${coupon.discount}`}
                  </TableCell>
                  <TableCell>
                    {coupon.target.charAt(0).toUpperCase() + coupon.target.slice(1)}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {coupon.description || '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditCoupon(coupon)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCoupon(coupon.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CouponManagement;
