
import React, { useRef, useState } from 'react';
import { Upload, Video } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface VideoUploadProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onUpload, isUploading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      
      // Create a preview URL for the video
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('video/')) {
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  const handleBrowse = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/*"
        className="hidden"
      />

      <div 
        className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-lg p-8"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {previewUrl ? (
          <div className="w-full space-y-4">
            <video 
              src={previewUrl} 
              className="w-full rounded-lg" 
              controls 
              style={{ maxHeight: '240px' }}
            />
            <p className="text-center text-gray-400">{selectedFile?.name}</p>
            <div className="flex justify-center gap-4">
              <Button 
                onClick={handleBrowse}
                variant="outline"
              >
                Change Video
              </Button>
              <Button 
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading ? 'Analyzing...' : 'Analyze Colors'}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Video className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-400 mb-4 text-center">
              Drag and drop your video file here, or click to browse
            </p>
            <Button onClick={handleBrowse}>
              <Upload className="h-4 w-4 mr-2" />
              Browse Files
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
