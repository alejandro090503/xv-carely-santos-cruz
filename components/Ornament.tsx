"use client";

export default function Ornament() {
  return (
    <div className="flex justify-center py-3 px-4">
      <svg viewBox="0 0 300 42" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 300, height: 42 }}>
        <line x1="0" y1="20" x2="96" y2="20" stroke="#1E3A8A" strokeWidth="0.85" opacity="0.34"/>
        <line x1="0" y1="23" x2="88" y2="23" stroke="#1E3A8A" strokeWidth="0.38" opacity="0.16"/>
        <path d="M96 21.5 Q104 7 116 21.5" stroke="#1E3A8A" strokeWidth="0.95" fill="none" opacity="0.46"/>
        <path d="M122 21.5 L126.5 15.5 L131 21.5 L126.5 27.5 Z" fill="#a9c0d9" fillOpacity="0.40" stroke="#a9c0d9" strokeWidth="0.4" opacity="0.5"/>
        <path d="M150 6 L165 21.5 L150 37 L135 21.5 Z" fill="rgba(30,58,138,0.09)" stroke="#1E3A8A" strokeWidth="1.05" opacity="0.50"/>
        <circle cx="150" cy="21.5" r="4.5" fill="rgba(168,173,182,0.35)" stroke="#A8ADB6" strokeWidth="0.7" opacity="0.70"/>
        <path d="M169 21.5 L173.5 15.5 L178 21.5 L173.5 27.5 Z" fill="#a9c0d9" fillOpacity="0.40" stroke="#a9c0d9" strokeWidth="0.4" opacity="0.5"/>
        <path d="M184 21.5 Q196 7 204 21.5" stroke="#1E3A8A" strokeWidth="0.95" fill="none" opacity="0.46"/>
        <line x1="204" y1="20" x2="300" y2="20" stroke="#1E3A8A" strokeWidth="0.85" opacity="0.34"/>
        <line x1="212" y1="23" x2="300" y2="23" stroke="#1E3A8A" strokeWidth="0.38" opacity="0.16"/>
      </svg>
    </div>
  );
}
