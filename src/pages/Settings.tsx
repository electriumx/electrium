
import { useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { users } from "@/data/users";

const Settings = () => {
  const { setTheme, theme } = useTheme();
  const { toast } = useToast();
  const { currentUser, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    toast({
      title: "Theme Changed",
      description: `Switched to ${newTheme} mode`,
    });
  };

  const handlePasswordChange = () => {
    // Verify current password
    const user = users.find(u => u.username === currentUser?.username);
    if (!user || user.password !== currentPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Current password is incorrect",
      });
      return;
    }

    // Verify new password
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "New passwords do not match",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "New password must be at least 6 characters long",
      });
      return;
    }

    // Update password in database
    user.password = newPassword;
    
    toast({
      title: "Success",
      description: "Password updated successfully",
    });

    // Clear form
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>
      
      <div className="max-w-md mx-auto space-y-6">
        {/* Theme Settings */}
        <div className="bg-card p-6 rounded-lg shadow-lg">
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

        {/* Account Information */}
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Username / Email</label>
              <p className="text-muted-foreground">{currentUser?.username}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Display Name</label>
              <p className="text-muted-foreground">{currentUser?.displayName}</p>
            </div>
          </div>
        </div>

        {/* Password Change */}
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Current Password</label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">New Password</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Confirm New Password</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button onClick={handlePasswordChange} className="w-full">
              Update Password
            </Button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center">
          <Button variant="destructive" onClick={logout}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
