
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { setTheme, theme } = useTheme();
  const { toast } = useToast();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    toast({
      title: "Theme Changed",
      description: `Switched to ${newTheme} mode`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>
      
      <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Theme</h2>
            <p className="text-muted-foreground">Toggle between light and dark mode</p>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="h-10 w-10"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
