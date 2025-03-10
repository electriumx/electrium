
import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

interface Segment {
  text: string;
  brand: string;
  discount: number;
  color: string;
}

const segments: Segment[] = [
  { text: '5% off Apple', brand: 'Apple', discount: 5, color: '#94a3b8' },
  { text: '10% off Samsung', brand: 'Samsung', discount: 10, color: '#64748b' },
  { text: '15% off Sony', brand: 'Sony', discount: 15, color: '#475569' },
  { text: '20% off Google', brand: 'Google', discount: 20, color: '#334155' },
  { text: '25% off Microsoft', brand: 'Microsoft', discount: 25, color: '#1e293b' },
  { text: '30% off Xiaomi', brand: 'Xiaomi', discount: 30, color: '#0f172a' },
  { text: '35% off Audio', brand: 'Audio', discount: 35, color: '#020617' },
  { text: '40% off Accessories', brand: 'Accessories', discount: 40, color: '#052e16' },
  { text: '45% off PlayStation', brand: 'PlayStation', discount: 45, color: '#064e3b' },
  { text: '50% off PC Games', brand: 'PC Games', discount: 50, color: '#0f766e' },
  { text: '15% off All Games', brand: 'Games', discount: 15, color: '#0e7490' },
  { text: '20% off All Products', brand: 'All', discount: 20, color: '#0369a1' },
];

interface SpinWheelProps {
  onWin: (brand: string, discount: number) => void;
}

const SpinWheel = ({ onWin }: SpinWheelProps) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastSpinTime, setLastSpinTime] = useState<number | null>(null);
  const [timeUntilNextSpin, setTimeUntilNextSpin] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  // Draw the wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.9;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw segments
    const segmentAngle = (2 * Math.PI) / segments.length;
    segments.forEach((segment, i) => {
      const startAngle = i * segmentAngle - Math.PI / 2 + rotation * (Math.PI / 180);
      const endAngle = (i + 1) * segmentAngle - Math.PI / 2 + rotation * (Math.PI / 180);

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px Arial';
      ctx.fillText(segment.text, radius * 0.75, 5);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#f8fafc';
    ctx.fill();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw pointer
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 10);
    ctx.lineTo(centerX - 10, centerY - radius + 10);
    ctx.lineTo(centerX + 10, centerY - radius + 10);
    ctx.closePath();
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [rotation]);

  // Check last spin time from localStorage
  useEffect(() => {
    const storedTime = localStorage.getItem('lastSpinTime');
    if (storedTime) {
      setLastSpinTime(parseInt(storedTime, 10));
    }
  }, []);

  // Update countdown timer
  useEffect(() => {
    if (!lastSpinTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const nextSpinTime = lastSpinTime + 24 * 60 * 60 * 1000; // 24 hours
      const timeLeft = nextSpinTime - now;

      if (timeLeft <= 0) {
        setTimeUntilNextSpin('');
        clearInterval(interval);
      } else {
        const hours = Math.floor(timeLeft / (60 * 60 * 1000));
        const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
        setTimeUntilNextSpin(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastSpinTime]);

  const handleSpin = () => {
    const now = Date.now();
    
    // Check if 24 hours have passed since last spin
    if (lastSpinTime && now - lastSpinTime < 24 * 60 * 60 * 1000) {
      toast({
        title: "You've already spun today!",
        description: `You can spin again in ${timeUntilNextSpin}`,
        variant: "destructive"
      });
      return;
    }

    setIsSpinning(true);
    
    // Calculate random rotation (5-10 full rotations + random segment)
    const spinDuration = 5000; // 5 seconds
    const fullRotations = 5 + Math.floor(Math.random() * 5);
    const extraRotation = Math.floor(Math.random() * 360);
    const totalRotation = fullRotations * 360 + extraRotation;
    
    // Animated spin
    let start: number | null = null;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / spinDuration, 1);
      
      // Easing function for natural deceleration
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const currentRotation = totalRotation * easeOut(percentage);
      
      setRotation(currentRotation % 360);
      
      if (progress < spinDuration) {
        requestAnimationFrame(animate);
      } else {
        // Spin completed
        setIsSpinning(false);
        
        // Determine winning segment
        const normalizedRotation = currentRotation % 360;
        const segmentAngle = 360 / segments.length;
        const winningIndex = Math.floor(
          ((360 - normalizedRotation) % 360) / segmentAngle
        );
        const winningSegment = segments[winningIndex];
        
        // Record spin time
        setLastSpinTime(now);
        localStorage.setItem('lastSpinTime', now.toString());
        
        // Notify about the win
        toast({
          title: "Congratulations!",
          description: `You won: ${winningSegment.text}!`,
        });
        
        // Call the callback with the winning segment
        onWin(winningSegment.brand, winningSegment.discount);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const canSpin = !lastSpinTime || Date.now() - lastSpinTime >= 24 * 60 * 60 * 1000;

  return (
    <div className="flex flex-col items-center max-w-md mx-auto bg-card rounded-xl p-6 shadow-md border border-border">
      <h3 className="text-xl font-bold mb-4">Daily Spin Wheel</h3>
      
      <div className="relative w-full aspect-square">
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={300} 
          className="w-full h-full"
        />
      </div>
      
      <div className="mt-6 text-center">
        {timeUntilNextSpin ? (
          <div className="text-sm text-muted-foreground mb-2">
            Next spin available in: <span className="font-bold">{timeUntilNextSpin}</span>
          </div>
        ) : null}
        
        <Button
          onClick={handleSpin}
          disabled={isSpinning || !canSpin}
          className="w-full"
        >
          {isSpinning ? 'Spinning...' : canSpin ? 'Spin the Wheel!' : 'Come back tomorrow!'}
        </Button>
      </div>
    </div>
  );
};

export default SpinWheel;
