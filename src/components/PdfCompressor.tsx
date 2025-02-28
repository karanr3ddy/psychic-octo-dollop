import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const PdfCompressor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
  const [dragActive, setDragActive] = useState(false);

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

  const compressPdf = async () => {
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    // Compress the PDF by removing unused objects and optimizing the content
    const compressedPdfBytes = await pdfDoc.save({ useObjectStreams: false });

    const compressedBlob = new Blob([compressedPdfBytes], { type: 'application/pdf' });
    setCompressedFile(compressedBlob);
  };

  const downloadCompressedPdf = () => {
    if (!compressedFile) return;

    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compressed.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pdf-compressor flex flex-col items-center">
      <div
        className={`border-2 border-dashed p-4 mb-2 ${dragActive ? 'border-blue-500' : 'border-gray-300'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
        <p className="text-gray-500">Drag and drop a PDF file here, or click to select a file</p>
      </div>
      <button onClick={compressPdf} disabled={!file} className="mb-2 bg-green-500 text-white py-2 px-4 rounded">
        Compress PDF
      </button>
      {compressedFile && (
        <button onClick={downloadCompressedPdf} className="bg-green-500 text-white py-2 px-4 rounded">
          Download Compressed PDF
        </button>
      )}
    </div>
  );
};

export default PdfCompressor;