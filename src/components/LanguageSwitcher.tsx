
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { translateText } from '@/utils/translation';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface LanguageSwitcherProps {
  variant?: "dropdown" | "buttons";
  size?: "sm" | "md" | "lg";
}

const LanguageSwitcher = ({ variant = "dropdown", size = "md" }: LanguageSwitcherProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("english");
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage === "arabic" ? "ar" : savedLanguage === "french" ? "fr" : "en";
      document.documentElement.dir = savedLanguage === "arabic" ? "rtl" : "ltr";
    }
  }, []);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    localStorage.setItem('preferredLanguage', value);
    
    // Set HTML direction for RTL languages
    if (value === "arabic") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = value === "french" ? "fr" : "en";
    }
    
    // Dispatch a custom event so other components can react to language changes
    window.dispatchEvent(new CustomEvent('languageChange', { detail: value }));
    
    setShowDialog(true);
  };

  if (variant === "buttons") {
    return (
      <>
        <div className="flex space-x-2">
          <Button 
            variant={selectedLanguage === "english" ? "default" : "outline"} 
            size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
            onClick={() => handleLanguageChange("english")}
          >
            English
          </Button>
          <Button 
            variant={selectedLanguage === "french" ? "default" : "outline"} 
            size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
            onClick={() => handleLanguageChange("french")}
          >
            Français
          </Button>
          <Button 
            variant={selectedLanguage === "arabic" ? "default" : "outline"} 
            size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
            onClick={() => handleLanguageChange("arabic")}
          >
            العربية
          </Button>
        </div>
        
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {translateText("language_changed", selectedLanguage)}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {selectedLanguage === "arabic" ? "تم تغيير لغة الموقع بنجاح" : 
                selectedLanguage === "french" ? "La langue du site a été changée avec succès" :
                "The website language has been successfully changed"}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>
                {translateText("ok", selectedLanguage)}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return (
    <>
      <div className="space-y-2">
        <Select onValueChange={handleLanguageChange} value={selectedLanguage}>
          <SelectTrigger className={`w-full ${size === "sm" ? "h-8 text-sm" : size === "lg" ? "h-12 text-lg" : ""}`}>
            <SelectValue placeholder={translateText("select_language", selectedLanguage)} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="french">Français</SelectItem>
            <SelectItem value="arabic">العربية</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {translateText("language_changed", selectedLanguage)}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedLanguage === "arabic" ? "تم تغيير لغة الموقع بنجاح" : 
               selectedLanguage === "french" ? "La langue du site a été changée avec succès" :
               "The website language has been successfully changed"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>
              {translateText("ok", selectedLanguage)}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LanguageSwitcher;
