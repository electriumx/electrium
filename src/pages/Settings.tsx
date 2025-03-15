
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { users } from "@/data/users";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const Settings = () => {
  const { toast } = useToast();
  const { currentUser, logout, isAuthenticated } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [showTranslateButton, setShowTranslateButton] = useState(false);
  const [showTranslateDialog, setShowTranslateDialog] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-center">Please sign in to access settings</h1>
      </div>
    );
  }

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

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    setShowTranslateButton(value !== "");
  };
  
  const handleTranslate = () => {
    setShowTranslateDialog(true);
    
    // In a real application, you would implement actual translation here
    // For demo purposes, we're just showing a dialog
    
    // If Arabic is selected, we would apply RTL direction
    if (selectedLanguage === "arabic") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>
      
      <div className="max-w-md mx-auto space-y-6">
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

        {/* Language Selection */}
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Language Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Language</label>
              <Select onValueChange={handleLanguageChange} value={selectedLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="arabic">Arabic</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="chinese">Chinese</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="japanese">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {showTranslateButton && (
              <Button onClick={handleTranslate} className="w-full">
                Translate to {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}
              </Button>
            )}
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
      
      <AlertDialog open={showTranslateDialog} onOpenChange={setShowTranslateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedLanguage === "arabic" ? "تم التغيير بنجاح" : 
               selectedLanguage === "french" ? "Changement réussi" :
               selectedLanguage === "german" ? "Änderung erfolgreich" :
               "Language Changed"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedLanguage === "arabic" ? "تم تغيير لغة الموقع بنجاح" : 
               selectedLanguage === "french" ? "La langue du site a été changée avec succès" :
               selectedLanguage === "german" ? "Die Sprache der Website wurde erfolgreich geändert" :
               "The website language has been successfully changed"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>
              {selectedLanguage === "arabic" ? "موافق" : 
               selectedLanguage === "french" ? "OK" :
               selectedLanguage === "german" ? "OK" :
               "OK"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;
