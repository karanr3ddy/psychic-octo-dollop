import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';

const ImageCompressor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [compressionOptions, setCompressionOptions] = useState({
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    const selectedFile = event.dataTransfer.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleCompressionOptionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setCompressionOptions((prevOptions) => ({
      ...prevOptions,
      [name]: parseFloat(value),
    }));
  };

  const compressImage = async () => {
    if (!file) return;

    try {
      const compressedBlob = await imageCompression(file, compressionOptions);
      setCompressedFile(compressedBlob);
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  };

  const downloadCompressedImage = () => {
    if (!compressedFile) return;

    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compressed-image.jpg';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClick = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <div className="image-compressor flex flex-col items-center">
      <div
        className={`border-2 border-dashed p-4 mb-2 cursor-pointer ${dragActive ? 'border-blue-500' : 'border-gray-300'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <label htmlFor="fileInput" className="cursor-pointer">
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <p className="text-gray-500">
          Drag and drop an image file here, or click to select a file
        </p>
      </div>
      {file && (
        <div className="selected-file mb-2">
          <p>Selected file: {file.name}</p>
        </div>
      )}
      <div className="compression-options flex flex-col items-start mb-2">
        <label className="mb-1">
          Max Size (MB):
          <input
            type="number"
            name="maxSizeMB"
            value={compressionOptions.maxSizeMB}
            onChange={handleCompressionOptionsChange}
            className="ml-2"
          />
        </label>
        <label>
          Max Width/Height:
          <input
            type="number"
            name="maxWidthOrHeight"
            value={compressionOptions.maxWidthOrHeight}
            onChange={handleCompressionOptionsChange}
            className="ml-2"
          />
        </label>
      </div>
      <button
        onClick={compressImage}
        disabled={!file}
        className="mb-2 bg-green-500 text-white py-2 px-4 rounded"
      >
        Compress Image
      </button>
      {compressedFile && (
        <button
          onClick={downloadCompressedImage}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Download Compressed Image
        </button>
      )}
    </div>
  );
};

export default ImageCompressor;
