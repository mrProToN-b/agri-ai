import React from 'react';

const VoiceWaveform = ({ isActive = false, size = 'default' }) => {
  const waveformSizes = {
    small: { container: 'w-16 h-8', bar: 'w-0.5' },
    default: { container: 'w-20 h-10', bar: 'w-1' },
    large: { container: 'w-24 h-12', bar: 'w-1' }
  };

  const currentSize = waveformSizes?.[size] || waveformSizes?.default;
  const barCount = 12;

  return (
    <div className={`flex items-center justify-center ${currentSize?.container}`}>
      <div className="flex items-end space-x-0.5">
        {[...Array(barCount)]?.map((_, index) => (
          <div
            key={index}
            className={`
              ${currentSize?.bar} bg-white/80 rounded-full transition-all duration-150
              ${isActive ? 'animate-waveform' : 'h-1'}
            `}
            style={{
              animationDelay: `${index * 50}ms`,
              height: isActive ? `${Math.random() * 20 + 8}px` : '4px'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default VoiceWaveform;