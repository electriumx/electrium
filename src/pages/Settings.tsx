
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { users } from "@/data/users";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { translateText } from "@/utils/translation";

const Settings = () => {
  const { toast } = useToast();
  const { currentUser, logout, isAuthenticated } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("english");

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
    
    const handleLanguageChange = (e: CustomEvent) => {
      setCurrentLanguage(e.detail);
    };
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {translateText("please_sign_in", currentLanguage) || "Please sign in to access settings"}
        </h1>
      </div>
    );
  }

  const handlePasswordChange = () => {
    // Verify current password
    const user = users.find(u => u.username === currentUser?.username);
    if (!user || user.password !== currentPassword) {
      toast({
        variant: "destructive",
        title: translateText("error", currentLanguage) || "Error",
        description: translateText("incorrect_password", currentLanguage) || "Current password is incorrect",
      });
      return;
    }

    // Verify new password
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: translateText("error", currentLanguage) || "Error",
        description: translateText("passwords_mismatch", currentLanguage) || "New passwords do not match",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        variant: "destructive",
        title: translateText("error", currentLanguage) || "Error",
        description: translateText("password_short", currentLanguage) || "New password must be at least 6 characters long",
      });
      return;
    }

    // Update password in database
    user.password = newPassword;
    
    toast({
      title: translateText("success", currentLanguage) || "Success",
      description: translateText("password_updated", currentLanguage) || "Password updated successfully",
    });

    // Clear form
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-8">{translateText("settings_title", currentLanguage)}</h1>
      
      <div className="max-w-md mx-auto space-y-6">
        {/* Account Information */}
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{translateText("account_information", currentLanguage)}</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">{translateText("username_email", currentLanguage)}</label>
              <p className="text-muted-foreground">{currentUser?.username}</p>
            </div>
            <div>
              <label className="text-sm font-medium">{translateText("display_name", currentLanguage)}</label>
              <p className="text-muted-foreground">{currentUser?.displayName}</p>
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{translateText("language_settings", currentLanguage)}</h2>
          <LanguageSwitcher />
        </div>

        {/* Password Change */}
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{translateText("change_password", currentLanguage)}</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">{translateText("current_password", currentLanguage)}</label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">{translateText("new_password", currentLanguage)}</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">{translateText("confirm_new_password", currentLanguage)}</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button onClick={handlePasswordChange} className="w-full">
              {translateText("update_password", currentLanguage)}
            </Button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center">
          <Button variant="destructive" onClick={logout}>
            {translateText("sign_out", currentLanguage)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
