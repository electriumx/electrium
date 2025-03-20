
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
  const {
    toast
  } = useToast();
  const {
    isAuthenticated
  } = useAuth();
  const navigate = useNavigate();

  // 25 segments with brands and discounts
  const segments = [
    { brand: "Apple", discount: 5, color: "#9b87f5" },
    { brand: "Samsung", discount: 10, color: "#7E69AB" },
    { brand: "All", discount: 15, color: "#6E59A5" },
    { brand: "Sony", discount: 7, color: "#8B5CF6" },
    { brand: "Google", discount: 12, color: "#D946EF" },
    { brand: "Microsoft", discount: 8, color: "#F97316" },
    { brand: "Xiaomi", discount: 20, color: "#0EA5E9" },
    { brand: "Accessories", discount: 25, color: "#9b87f5" },
    { brand: "Audio", discount: 18, color: "#7E69AB" },
    { brand: "Games", discount: 30, color: "#6E59A5" },
    { brand: "PlayStation", discount: 15, color: "#8B5CF6" },
    { brand: "PC Games", discount: 22, color: "#D946EF" },
    { brand: "Headphones", discount: 12, color: "#F97316" },
    { brand: "Laptops", discount: 8, color: "#0EA5E9" },
    { brand: "Tablets", discount: 10, color: "#9b87f5" },
    { brand: "TVs", discount: 15, color: "#7E69AB" },
    { brand: "LG", discount: 7, color: "#6E59A5" },
    { brand: "Nintendo", discount: 20, color: "#8B5CF6" },
    { brand: "Dell", discount: 6, color: "#D946EF" },
    { brand: "HP", discount: 9, color: "#F97316" },
    { brand: "Asus", discount: 11, color: "#0EA5E9" },
    { brand: "Lenovo", discount: 13, color: "#9b87f5" },
    { brand: "Bose", discount: 17, color: "#7E69AB" },
    { brand: "Cameras", discount: 14, color: "#6E59A5" },
    { brand: "Smartwatches", discount: 16, color: "#8B5CF6" }
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

  // Drawing the octogram (8-pointed star) shaped wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const outerRadius = Math.min(centerX, centerY) - 10;
    const innerRadius = outerRadius * 0.4; // Inner radius for star shape

    // Draw the wheel as an octogram (8-pointed star) shape with 25 segments
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const startAngle = (i * segmentAngle - 90 + rotation) * Math.PI / 180;
      const endAngle = ((i + 1) * segmentAngle - 90 + rotation) * Math.PI / 180;
      
      // Calculate midpoint angle for the segment
      const midAngle = (startAngle + endAngle) / 2;
      
      // Create octogram shape by alternating radius
      const useOuterRadius = i % 2 === 0 ? outerRadius : outerRadius * 0.85;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, useOuterRadius, startAngle, endAngle);
      ctx.closePath();
      
      ctx.fillStyle = segment.color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Add text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(midAngle);
      const textDistance = useOuterRadius * 0.65;
      ctx.translate(textDistance, 0);
      ctx.rotate(Math.PI / 2);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      
      // Handle long brand names
      if (segment.brand.length > 10) {
        const midpoint = Math.floor(segment.brand.length / 2);
        const firstHalf = segment.brand.substring(0, midpoint);
        const secondHalf = segment.brand.substring(midpoint);
        ctx.fillText(`${firstHalf}-`, 0, -5);
        ctx.fillText(`${secondHalf}`, 0, 7);
      } else {
        ctx.fillText(`${segment.brand}`, 0, 0);
      }
      
      ctx.fillText(`${segment.discount}%`, 0, 15);
      ctx.restore();
    }

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#9b87f5';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw pointer
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - outerRadius - 5);
    ctx.lineTo(centerX - 15, centerY - outerRadius - 25);
    ctx.lineTo(centerX + 15, centerY - outerRadius - 25);
    ctx.closePath();
    ctx.fillStyle = '#9b87f5';
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
    const rotations = 3 + Math.random() * 2;
    const landingAngle = Math.floor(Math.random() * 360);
    const totalRotation = rotations * 360 + landingAngle;
    let currentRotation = rotation;
    const startTime = Date.now();
    const duration = 3000;
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

  return <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">Spin to Win a Discount!</h2>
      <div className="relative">
        <canvas ref={canvasRef} width={320} height={320} className="border rounded-full" />
      </div>
      {cooldownActive ? <div className="mt-4 text-center">
          <div className="font-mono text-lg">{formatTimeLeft()}</div>
          <p className="text-muted-foreground text-sm">Time until next spin</p>
        </div> : <button onClick={spinWheel} disabled={isSpinning} className="mt-4 px-6 py-2 bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50 text-stone-950">
          {isSpinning ? 'Spinning...' : 'Spin'}
        </button>}
      {result && <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
          {result}
        </div>}
    </div>;
};

export default SpinWheel;
