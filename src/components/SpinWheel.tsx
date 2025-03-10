
import { useState, useRef, useEffect } from 'react';

interface SpinWheelProps {
  onWin: (brand: string, discount: number) => void;
}

const SpinWheel = ({ onWin }: SpinWheelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  
  // Define wheel segments with brand and discount pairs
  const segments = [
    { brand: "Apple", discount: 5, color: "#4a5568" },
    { brand: "Samsung", discount: 10, color: "#1a202c" },
    { brand: "All", discount: 15, color: "#2d3748" },
    { brand: "Sony", discount: 7, color: "#4a5568" },
    { brand: "Google", discount: 12, color: "#1a202c" },
    { brand: "Microsoft", discount: 8, color: "#2d3748" }
  ];
  
  const numSegments = segments.length;
  const segmentAngle = 360 / numSegments;
  
  // Draw the wheel on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    // Draw segments
    segments.forEach((segment, i) => {
      const startAngle = (i * segmentAngle - 90 + rotation) * Math.PI / 180;
      const endAngle = ((i + 1) * segmentAngle - 90 + rotation) * Math.PI / 180;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      
      ctx.fillStyle = segment.color;
      ctx.fill();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      const textAngle = startAngle + (endAngle - startAngle) / 2;
      ctx.rotate(textAngle);
      ctx.translate(radius * 0.65, 0);
      ctx.rotate(Math.PI / 2);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${segment.brand} ${segment.discount}%`, 0, 0);
      
      ctx.restore();
    });
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
    ctx.fillStyle = '#4a5568';
    ctx.fill();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw pointer
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 5);
    ctx.lineTo(centerX - 10, centerY - radius - 20);
    ctx.lineTo(centerX + 10, centerY - radius - 20);
    ctx.closePath();
    ctx.fillStyle = '#4a5568';
    ctx.fill();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.stroke();
    
  }, [rotation, segments, numSegments, segmentAngle]);
  
  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);
    
    // Random number of rotations (3-5 full rotations)
    const rotations = 3 + Math.random() * 2;
    
    // Random angle to land on (0-360)
    const landingAngle = Math.floor(Math.random() * 360);
    
    // Total rotation will be multiple full rotations plus the landing angle
    const totalRotation = rotations * 360 + landingAngle;
    
    // Animate the spin
    let currentRotation = rotation;
    const startTime = Date.now();
    const duration = 3000; // 3 seconds
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic function for slowing down
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      currentRotation = rotation + totalRotation * easeOut;
      setRotation(currentRotation);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Determine which segment was landed on
        const normalizedRotation = currentRotation % 360;
        const segmentIndex = Math.floor(((normalizedRotation + 90) % 360) / segmentAngle);
        const landedSegment = segments[segmentIndex % numSegments];
        
        setResult(`You won ${landedSegment.discount}% off ${landedSegment.brand} products!`);
        onWin(landedSegment.brand, landedSegment.discount);
        setIsSpinning(false);
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
          width={300} 
          height={300} 
          className="border rounded-full"
        />
      </div>
      <button 
        onClick={spinWheel} 
        disabled={isSpinning}
        className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
      >
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>
      {result && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
          {result}
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
