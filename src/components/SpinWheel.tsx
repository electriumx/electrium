
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

  // Updated to 25 segments
  const segments = [
    { brand: "Apple", discount: 5, color: "#E74C3C" },
    { brand: "Samsung", discount: 10, color: "#3498DB" },
    { brand: "All", discount: 15, color: "#2ECC71" },
    { brand: "Sony", discount: 7, color: "#9B59B6" },
    { brand: "Google", discount: 12, color: "#F1C40F" },
    { brand: "Microsoft", discount: 8, color: "#1ABC9C" },
    { brand: "Xiaomi", discount: 20, color: "#E67E22" },
    { brand: "Accessories", discount: 25, color: "#34495E" },
    { brand: "Audio", discount: 18, color: "#D35400" },
    { brand: "Games", discount: 30, color: "#8E44AD" },
    { brand: "PlayStation", discount: 15, color: "#2980B9" },
    { brand: "PC Games", discount: 22, color: "#27AE60" },
    { brand: "Speakers", discount: 17, color: "#C0392B" },
    { brand: "Laptops", discount: 8, color: "#F39C12" },
    { brand: "Tablets", discount: 12, color: "#16A085" },
    { brand: "Gaming Gear", discount: 20, color: "#7F8C8D" },
    { brand: "TVs", discount: 15, color: "#3498DB" },
    { brand: "Cameras", discount: 10, color: "#2ECC71" },
    { brand: "Smartwatches", discount: 22, color: "#E74C3C" },
    { brand: "Home Tech", discount: 18, color: "#9B59B6" },
    { brand: "Nintendo", discount: 14, color: "#F1C40F" },
    { brand: "Dell", discount: 9, color: "#1ABC9C" },
    { brand: "HP", discount: 11, color: "#E67E22" },
    { brand: "LG", discount: 13, color: "#34495E" },
    { brand: "Monitors", discount: 16, color: "#D35400" },
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
    const radius = Math.min(centerX, centerY) - 20;
    
    // Draw the octagram shape wheel with 25 segments
    const drawOctagramWheel = () => {
      const pointCount = numSegments;
      const outerRadius = radius;
      const innerRadius = radius * 0.4;
      
      segments.forEach((segment, i) => {
        const startAngle = (i * segmentAngle - 90 + rotation) * Math.PI / 180;
        const endAngle = ((i + 1) * segmentAngle - 90 + rotation) * Math.PI / 180;
        
        // Calculate points of the segment
        const outerStart = {
          x: centerX + outerRadius * Math.cos(startAngle),
          y: centerY + outerRadius * Math.sin(startAngle)
        };
        const outerEnd = {
          x: centerX + outerRadius * Math.cos(endAngle),
          y: centerY + outerRadius * Math.sin(endAngle)
        };
        const innerStart = {
          x: centerX + innerRadius * Math.cos(startAngle),
          y: centerY + innerRadius * Math.sin(startAngle)
        };
        const innerEnd = {
          x: centerX + innerRadius * Math.cos(endAngle),
          y: centerY + innerRadius * Math.sin(endAngle)
        };
        const midAngle = (startAngle + endAngle) / 2;
        const midPoint = {
          x: centerX + (outerRadius * 0.7) * Math.cos(midAngle),
          y: centerY + (outerRadius * 0.7) * Math.sin(midAngle)
        };
        
        // Draw the segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(outerStart.x, outerStart.y);
        ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        
        // Fill and stroke the segment
        ctx.fillStyle = segment.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Add text
        ctx.save();
        ctx.translate(midPoint.x, midPoint.y);
        ctx.rotate(midAngle + Math.PI/2);
        ctx.fillStyle = '#ffffff';
        ctx.font = '9px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        if (segment.brand.length > 10) {
          const words = segment.brand.split(' ');
          if (words.length > 1) {
            ctx.fillText(words[0], 0, -6);
            ctx.fillText(words.slice(1).join(' '), 0, 6);
          } else {
            const midpoint = Math.floor(segment.brand.length / 2);
            ctx.fillText(segment.brand.substring(0, midpoint) + '-', 0, -6);
            ctx.fillText(segment.brand.substring(midpoint), 0, 6);
          }
        } else {
          ctx.fillText(segment.brand, 0, -6);
        }
        ctx.fillText(`${segment.discount}%`, 0, 6);
        ctx.restore();
      });
    };
    
    // Draw the octagram wheel
    drawOctagramWheel();
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#333333';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw pointer
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 5);
    ctx.lineTo(centerX - 10, centerY - radius - 20);
    ctx.lineTo(centerX + 10, centerY - radius - 20);
    ctx.closePath();
    ctx.fillStyle = '#ff5722';
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
    
    // More rotations for a better spinning effect
    const rotations = 5 + Math.random() * 3;
    const landingAngle = Math.floor(Math.random() * 360);
    const totalRotation = rotations * 360 + landingAngle;
    let currentRotation = rotation;
    const startTime = Date.now();
    const duration = 4000; // Longer spin for more drama
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic easing out for a more realistic spinning effect
      const easeOut = 1 - Math.pow(1 - progress, 3);
      currentRotation = rotation + totalRotation * easeOut;
      setRotation(currentRotation);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        const normalizedRotation = currentRotation % 360;
        const segmentIndex = Math.floor((normalizedRotation + 90) % 360 / segmentAngle);
        const landedSegment = segments[segmentIndex % numSegments];
        
        setResult(`You won ${landedSegment.discount}% off ${landedSegment.brand} products!`);
        onWin(landedSegment.brand, landedSegment.discount, Date.now() + 48 * 60 * 60 * 1000);
        setIsSpinning(false);
        localStorage.setItem('lastSpinTime', Date.now().toString());
        setCooldownActive(true);
        setTimeLeft(24 * 60 * 60);
        
        toast({
          title: "Discount Applied!",
          description: `You won ${landedSegment.discount}% off ${landedSegment.brand} products! Expires in 48 hours. Come back in 24 hours to spin again.`
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
          width={320} 
          height={320} 
          className="border rounded-full shadow-lg"
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
          className="mt-4 px-6 py-2 bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50 text-stone-950"
        >
          {isSpinning ? 'Spinning...' : 'Spin'}
        </button>
      )}
      
      {result && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
          {result}
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
