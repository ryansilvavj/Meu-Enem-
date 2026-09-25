import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const [imgError, setImgError] = useState(false);

  // Direct image link provided in the HTML prompt
  const directLogoUrl =
    'https://lh3.googleusercontent.com/aida/AEtjO1URCp76NZp1rQZObNWEKkNxThJi3ydXYmnbgTQNbL0zHAAU2w8OxDQE-hemgwtpB2NsVYAaVbK9xDG0Lq6pHi4sZzbksA2CfTRXs32noqIf-eq3zAvzenu2g4nJrGGOD4Jmf06XQYrJQEq-umNxL1uRp4kSdw2cLAmlSOMcRE1OLArO_Q_SVQNSdkl9rU_K2NwCJc8vOx7O1vvJDRkySyMDcKt26NHhCdJBp4uOBgCY_Aj9EehYb7Y_29-6';

  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
  }[size];

  if (!imgError) {
    return (
      <img
        src={directLogoUrl}
        alt="Meu ENEM+"
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={`${sizeClasses} w-auto object-contain flex-shrink-0 ${className}`}
      />
    );
  }

  // Crisp SVG Fallback conforming to the exact visual brand in the images
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="w-8 h-8 rounded-xl bg-[#593cf2] flex items-center justify-center text-white shadow-sm flex-shrink-0">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3Z" />
          <path d="M5 13.18V17.18C5 19.5 8.13 21 12 21C15.87 21 19 19.5 19 17.18V13.18L12 17L5 13.18Z" opacity="0.85" />
        </svg>
      </div>
      <div className="flex items-center">
        <span className="font-extrabold text-[19px] tracking-tight text-[#1e1b4b]">
          Meu <span className="text-[#4338ca]">ENEM</span>
        </span>
        <span className="text-[#4f46e5] font-extrabold text-[18px] ml-0.5">+</span>
      </div>
    </div>
  );
};
