import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  Copy,
  Edit,
  Trash,
  ChevronDown,
  ChevronRight,
  Search
} from "lucide-react";
import { Product } from '@/types/product';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { applyCoupon } from '@/components/admin/CouponUtils';
import { useToast } from '@/hooks/use-toast';

// ... rest of the code remains unchanged
