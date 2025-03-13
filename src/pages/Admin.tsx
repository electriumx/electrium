
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CouponManagement from '@/components/CouponManagement';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('coupons');

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="coupons">Coupons</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="coupons">
          <CouponManagement />
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <p className="text-muted-foreground">Settings panel coming soon.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
