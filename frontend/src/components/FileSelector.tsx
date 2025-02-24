import React, { useRef } from 'react';

interface FileSelectorProps {
  onFileSelect: (file: File) => void;
}

export function FileSelector({ onFileSelect }: FileSelectorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div className="w-full">
      <button 
        onClick={() => fileInputRef.current?.click()}
        className="w-full bg-primary text-white py-3 px-6 rounded-lg text-base font-medium transition-colors duration-300 hover:bg-primary-hover"
      >
        Select Video File
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="video/*"
        className="hidden"
      />
    </div>
  );
}