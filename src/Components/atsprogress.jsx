import React, { useEffect, useState } from 'react';

const HalfCircleProgress = ({
  progress,
  size = 200,
  strokeWidth = 20,
  color = '#3b82f6',
  backgroundColor = '#e5e7eb',
  showPercentage = true,
  className = '',
  animationDuration = 1400,
  percentageStyle = {},
  gradientColors,
  label
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  // Calculate dimensions
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI;
  const progressOffset = (circumference * (1 - animatedProgress / 100));

  // Unique gradient ID
  const gradientId = React.useId();

  useEffect(() => {
    const normalizedProgress = Math.min(100, Math.max(0, progress));
    const startValue = animatedProgress;
    const endValue = normalizedProgress;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // Easing function for smooth animation
      const easeOutQuad = (t) => t * (2 - t);
      const currentProgress = startValue + (endValue - startValue) * easeOutQuad(progress);
      
      setAnimatedProgress(currentProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [progress, animationDuration]);

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size / 2 + (label ? 24 : 0),
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <svg
        width={size}
        height={size}
        style={{
          transform: 'rotate(0deg)',
          overflow: 'visible',
          marginTop: -size / 2,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
        }}
      >
        {gradientColors && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              {gradientColors.map((color, index) => (
                <stop
                  key={index}
                  offset={`${(index / (gradientColors.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          </defs>
        )}
        
        {/* Background path */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Progress path */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke={gradientColors ? `url(#${gradientId})` : color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          style={{
            transition: 'stroke 0.3s ease'
          }}
        />
      </svg>
      
      {showPercentage && (
        <div
          style={{
            position: 'absolute',
            bottom: label ? '24px' : '10px',
            fontSize: `${size / 8}px`,
            fontWeight: 'bold',
            color: '#1f2937',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            ...percentageStyle
          }}
        >
          {Math.round(animatedProgress)}  
        </div>
      )}

      {label && (
        <div
          style={{
            fontSize: `${size / 12}px`,
            color: '#6b7280',
            marginTop: '8px',
            textAlign: 'center'
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default HalfCircleProgress;