import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ImageUploadArea = ({ onImageUpload, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFileUpload(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileUpload = (file) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes?.includes(file?.type)) {
      alert('Please upload a valid image file (JPEG, PNG, WebP)');
      return;
    }

    // Validate file size (max 10MB)
    if (file?.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e?.target?.result);
      
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            if (onImageUpload) {
              onImageUpload(file, e?.target?.result);
            }
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    };
    reader?.readAsDataURL(file);
  };

  const handleFileSelect = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFileUpload(e?.target?.files?.[0]);
    }
  };

  const handleCameraCapture = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFileUpload(e?.target?.files?.[0]);
    }
  };

  const clearImage = () => {
    setUploadedImage(null);
    setUploadProgress(0);
    if (fileInputRef?.current) fileInputRef.current.value = '';
    if (cameraInputRef?.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">Upload Crop Image</h3>
        <p className="text-sm text-muted-foreground">
          Upload a clear image of your crop showing disease symptoms for AI analysis
        </p>
      </div>
      {!uploadedImage ? (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-smooth
            ${dragActive 
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-muted-foreground" />
            </div>
            
            <div>
              <p className="text-foreground font-medium mb-1">
                Drag and drop your image here
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse files
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => fileInputRef?.current?.click()}
                iconName="FolderOpen"
                iconPosition="left"
              >
                Browse Files
              </Button>
              
              <Button
                variant="outline"
                onClick={() => cameraInputRef?.current?.click()}
                iconName="Camera"
                iconPosition="left"
              >
                Take Photo
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Supported formats: JPEG, PNG, WebP (Max 10MB)
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleCameraCapture}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <Image
              src={uploadedImage}
              alt="Uploaded crop image"
              className="w-full h-64 object-cover rounded-lg"
            />
            
            <Button
              variant="destructive"
              size="sm"
              onClick={clearImage}
              iconName="X"
              className="absolute top-2 right-2"
            >
              Remove
            </Button>
          </div>

          {uploadProgress < 100 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Uploading...</span>
                <span className="text-foreground">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-smooth"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {uploadProgress === 100 && !isAnalyzing && (
            <div className="flex items-center justify-center space-x-2 text-success">
              <Icon name="CheckCircle" size={16} />
              <span className="text-sm font-medium">Image uploaded successfully</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploadArea;