
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { ArrowLeftRight, Truck, DollarSign, ShieldCheck, Package, RefreshCw } from "lucide-react";

const Trade = () => {
  const navigate = useNavigate();

  const handleStartTrade = () => {
    navigate('/products');
  };

  return (
    <div className="container mx-auto px-4 py-16 mt-8">
      <div className="flex flex-col items-center text-center mb-12">
        <ArrowLeftRight size={48} className="text-primary mb-4" />
        <h1 className="text-4xl font-bold mb-4">Trade Your Old Electronics</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Get credit for your old devices when purchasing new electronics from Electrium
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-lg mb-6">
            Electrium's Trade-In program allows you to exchange your old electronics for store credit. 
            It's our way of helping you upgrade your tech while reducing electronic waste.
          </p>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
              <Package className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Bring in your devices</h3>
              <p className="text-muted-foreground">We accept smartphones, laptops, tablets, and more</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
              <RefreshCw className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Get an appraisal</h3>
              <p className="text-muted-foreground">Our experts will evaluate your items on the spot</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
              <DollarSign className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Receive store credit</h3>
              <p className="text-muted-foreground">Use your credit immediately or save it for later</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
            alt="Electronics Trade In Process" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>

      <Tabs defaultValue="how-it-works" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="how-it-works" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <CardTitle>Select Your Items</CardTitle>
                <CardDescription>
                  Choose which old electronics you want to trade in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Browse through our eligible trade-in categories and select the devices you wish to trade.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <CardTitle>Get Appraised</CardTitle>
                <CardDescription>
                  We'll evaluate your items and offer you store credit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Our experts will assess the condition and value of your electronics to determine the trade-in value.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <CardTitle>Apply Credit</CardTitle>
                <CardDescription>
                  Use your credit towards new purchases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>The assessed value will be applied as a discount on your new electronics purchase at checkout.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button onClick={handleStartTrade} size="lg" className="gap-2">
              <ArrowLeftRight size={20} />
              Start Trading Now
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="benefits" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                <DollarSign className="text-primary mr-2 mt-1" size={24} />
                <div>
                  <CardTitle>Save Money</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>Get up to 50% off new purchases when you trade in your eligible old electronics.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                <ShieldCheck className="text-primary mr-2 mt-1" size={24} />
                <div>
                  <CardTitle>Eco-Friendly</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>Help reduce electronic waste and support our recycling initiatives for a greener planet.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                <Truck className="text-primary mr-2 mt-1" size={24} />
                <div>
                  <CardTitle>Free Pickup</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>For high-value trades, we offer free pickup service from your location at your convenience.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="examples" className="mt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Trade-In Examples</CardTitle>
                <CardDescription>Here's what you could get for your old electronics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden border border-border">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium">Device</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Condition</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Trade Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-3 text-sm">iPhone 13 Pro (256GB)</td>
                        <td className="px-4 py-3 text-sm">Excellent</td>
                        <td className="px-4 py-3 text-sm font-medium">$400 credit</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">Samsung Galaxy S21 (128GB)</td>
                        <td className="px-4 py-3 text-sm">Good</td>
                        <td className="px-4 py-3 text-sm font-medium">$250 credit</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">MacBook Pro 2019 (13-inch)</td>
                        <td className="px-4 py-3 text-sm">Excellent</td>
                        <td className="px-4 py-3 text-sm font-medium">$700 credit</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">iPad Air 4th Gen</td>
                        <td className="px-4 py-3 text-sm">Fair</td>
                        <td className="px-4 py-3 text-sm font-medium">$180 credit</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">Dell XPS 13 (2020)</td>
                        <td className="px-4 py-3 text-sm">Good</td>
                        <td className="px-4 py-3 text-sm font-medium">$350 credit</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">Trade values may vary based on current market conditions and device inspection.</p>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
              alt="Electronics Trade In" 
              className="rounded-lg w-full md:w-1/2 h-60 object-cover" 
            />
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" 
              alt="Trade Credit" 
              className="rounded-lg w-full md:w-1/2 h-60 object-cover" 
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="bg-card border border-border rounded-lg p-6 mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Ready to trade in your electronics?</h2>
        <p className="mb-6">Visit our store or start shopping online to see how much you can save with our trade-in program.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleStartTrade} size="lg" className="gap-2">
            <ArrowLeftRight size={20} />
            Start Trading Now
          </Button>
          <Button variant="outline" onClick={() => navigate('/products')} size="lg">
            Browse Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Trade;
