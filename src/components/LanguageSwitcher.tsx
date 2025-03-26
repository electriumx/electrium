
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface LanguageSwitcherProps {
  currentLanguage?: string; // Make this prop optional
  onChange?: (language: string) => void;
}

const LanguageSwitcher = ({ currentLanguage = 'en', onChange }: LanguageSwitcherProps) => {
  const handleLanguageChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Select defaultValue={currentLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="es">Español</SelectItem>
        <SelectItem value="fr">Français</SelectItem>
        <SelectItem value="de">Deutsch</SelectItem>
        <SelectItem value="zh">中文</SelectItem>
        <SelectItem value="ja">日本語</SelectItem>
        <SelectItem value="ar">العربية</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
