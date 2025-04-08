import { useState, useRef, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SpinWheelProps {
  onWin: (brand: string, discount: number, expiresAt: number) => void;
}

const SpinWheel = ({
  onWin
}: SpinWheelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const segments = [
    { brand: "Samsung", discount: 10, color: "#243949" },
    { brand: "All", discount: 15, color: "#0F4C81" },
    { brand: "Google", discount: 12, color: "#18304C" },
    { brand: "Xiaomi", discount: 20, color: "#1E293B" },
    { brand: "Accessories", discount: 25, color: "#0A4D68" },
    { brand: "Games", discount: 30, color: "#1A1C24" },
    { brand: "PC Games", discount: 22, color: "#1F3A5F" },
    { brand: "Gaming Gear", discount: 20, color: "#0E2A47" },
    { brand: "Smartwatches", discount: 22, color: "#0D293E" },
    { brand: "Nintendo", discount: 14, color: "#2A3F65" },
    { brand: "Headphones", discount: 18, color: "#172B3A" },
    { brand: "Keyboards", discount: 16, color: "#293745" },
    { brand: "Monitors", discount: 15, color: "#1D3B52" },
    { brand: "Speakers", discount: 12, color: "#204060" },
    { brand: "Smart Home", discount: 20, color: "#0B3B5D" },
  ];

  const numSegments = segments.length;
  const segmentAngle = 360 / numSegments;

  useEffect(() => {
    const lastSpinTime = localStorage.getItem('lastSpinTime');
    if (lastSpinTime) {
      const lastTime = parseInt(lastSpinTime, 10);
      const currentTime = Date.now();
      const timeDiff = currentTime - lastTime;
      const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (timeDiff < cooldownPeriod) {
        const remainingTime = cooldownPeriod - timeDiff;
        setCooldownActive(true);
        setTimeLeft(Math.floor(remainingTime / 1000));
      }
    }
  }, []);

  useEffect(() => {
    if (!cooldownActive || timeLeft === null) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          setCooldownActive(false);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownActive, timeLeft]);

  const formatTimeLeft = () => {
    if (timeLeft === null) return '';
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor(timeLeft % 3600 / 60);
    const seconds = timeLeft % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    const drawOctagramWheel = () => {
      segments.forEach((segment, i) => {
        const startAngle = (i * segmentAngle - 90 + rotation) * Math.PI / 180;
        const endAngle = ((i + 1) * segmentAngle - 90 + rotation) * Math.PI / 180;
        const outerRadius = radius;
        const innerRadius = radius * 0.4;
        
        const outerStart = {
          x: centerX + outerRadius * Math.cos(startAngle),
          y: centerY + outerRadius * Math.sin(startAngle)
        };
        const outerEnd = {
          x: centerX + outerRadius * Math.cos(endAngle),
          y: centerY + outerRadius * Math.sin(endAngle)
        };
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(outerStart.x, outerStart.y);
        ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        
        ctx.fillStyle = segment.color;
        ctx.fill();
        ctx.strokeStyle = '#4A5568';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        const midAngle = (startAngle + endAngle) / 2;
        const textRadius = outerRadius * 0.7;
        const textX = centerX + textRadius * Math.cos(midAngle);
        const textY = centerY + textRadius * Math.sin(midAngle);
        
        ctx.save();
        ctx.translate(textX, textY);
        ctx.rotate(midAngle + Math.PI / 2);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const brandName = segment.brand;
        const discount = `${segment.discount}%`;
        
        if (brandName.length > 8) {
          const words = brandName.split(' ');
          if (words.length > 1) {
            ctx.fillText(words[0], 0, -8);
            ctx.fillText(words.slice(1).join(' '), 0, 8);
            ctx.fillText(discount, 0, 24);
          } else {
            const midpoint = Math.floor(brandName.length / 2);
            ctx.fillText(brandName.substring(0, midpoint) + '-', 0, -8);
            ctx.fillText(brandName.substring(midpoint), 0, 8);
            ctx.fillText(discount, 0, 24);
          }
        } else {
          ctx.fillText(brandName, 0, -5);
          ctx.fillText(discount, 0, 15);
        }
        ctx.restore();
      });
    };
    
    drawOctagramWheel();
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#0A4D68';
    ctx.fill();
    ctx.strokeStyle = '#4A5568';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 5);
    ctx.lineTo(centerX - 15, centerY - radius - 25);
    ctx.lineTo(centerX + 15, centerY - radius - 25);
    ctx.closePath();
    ctx.fillStyle = '#0F4C81';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
  }, [rotation, segments, numSegments, segmentAngle]);

  const spinWheel = () => {
    if (isSpinning || cooldownActive) return;
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to use the spin wheel"
      });
      navigate('/login', {
        state: {
          from: '/products'
        }
      });
      return;
    }
    
    setIsSpinning(true);
    setResult(null);
    
    const rotations = 5 + Math.random() * 3;
    const landingAngle = Math.floor(Math.random() * 360);
    const totalRotation = rotations * 360 + landingAngle;
    let currentRotation = rotation;
    const startTime = Date.now();
    const duration = 4000;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      currentRotation = rotation + totalRotation * easeOut;
      setRotation(currentRotation);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        const normalizedRotation = currentRotation % 360;
        const segmentIndex = Math.floor(((normalizedRotation + 90) % 360) / segmentAngle);
        const actualIndex = segmentIndex % numSegments;
        const landedSegment = segments[actualIndex];
        
        const resultMessage = `You won ${landedSegment.discount}% off ${landedSegment.brand} products! Expires in 48 hours. Come back in 24 hours to spin again.`;
        setResult(resultMessage);
        onWin(landedSegment.brand, landedSegment.discount, Date.now() + 48 * 60 * 60 * 1000);
        setIsSpinning(false);
        localStorage.setItem('lastSpinTime', Date.now().toString());
        setCooldownActive(true);
        setTimeLeft(24 * 60 * 60);
        
        toast({
          title: "Discount Applied!",
          description: resultMessage
        });
      }
    };
    
    animate();
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">Spin to Win a Discount!</h2>
      <div className="relative">
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={400} 
          className="border rounded-full shadow-lg border-border"
        />
      </div>
      
      {cooldownActive ? (
        <div className="mt-4 text-center">
          <div className="font-mono text-lg">{formatTimeLeft()}</div>
          <p className="text-muted-foreground text-sm">Time until next spin</p>
        </div>
      ) : (
        <button 
          onClick={spinWheel} 
          disabled={isSpinning} 
          className="mt-4 px-6 py-2 spin-wheel-btn rounded-md hover:opacity-90 disabled:opacity-50"
        >
          {isSpinning ? 'Spinning...' : 'Spin'}
        </button>
      )}
      
      {result && (
        <div className="mt-4 p-3 bg-muted text-accent-foreground rounded-md">
          {result}
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
