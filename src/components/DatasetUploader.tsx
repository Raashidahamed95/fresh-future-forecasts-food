
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const DatasetUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    // In a real application, this would upload to a backend service
    // For now, we'll just show a success toast
    toast.success('Dataset uploaded successfully!', {
      description: `File "${file.name}" has been processed.`,
    });
    
    // Reset the file state
    setFile(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Dataset</CardTitle>
        <CardDescription>
          Upload CSV or Excel files containing your supply chain data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            ${dragging ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
            accept=".csv,.xlsx,.xls"
          />
          <span className="material-icons-outlined text-4xl text-gray-400 mb-2">
            cloud_upload
          </span>
          <p className="text-gray-600 mb-2">
            {file ? file.name : 'Drag & drop your dataset here, or click to browse'}
          </p>
          <p className="text-xs text-gray-400">
            Supports CSV, XLSX files up to 10MB
          </p>
        </div>
        
        {file && (
          <div className="mt-4 flex justify-end">
            <Button onClick={handleUpload} className="bg-green-600 hover:bg-green-700">
              Upload Dataset
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DatasetUploader;
