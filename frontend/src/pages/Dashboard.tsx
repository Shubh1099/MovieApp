import { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropUpload } from '../components/DragDropUpload';
// import { FileSelector } from '../components/FileSelector';

interface Video {
  key: string;
  url: string;
  lastModified: string;
}

function Dashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/videos');
      setVideos(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch videos. Please try again later.');
      console.log(error);
      setVideos([]);
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append('video', selectedFile);

    try {
      await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      await fetchVideos();
      setError(null);
      setSelectedFile(null);
    } catch (error) {
      setError('Upload failed. Please try again.');
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Upload a Movie</h1>
      
      <div className="flex flex-col gap-8 mb-8 bg-primary/5 p-8 rounded-xl">
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Drag & Drop Upload</h2>
          <DragDropUpload onFileSelect={handleFileSelect} />
        </div>

        <div className="w-full">
          <button 
            onClick={handleSubmit}
            disabled={uploading || !selectedFile}
            className="w-full bg-primary text-white py-4 px-8 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-primary-hover hover:-translate-y-0.5 disabled:bg-gray-600 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {uploading ? 'Uploading...' : 'Submit Video'}
          </button>
          {selectedFile && (
            <div className="mt-4 p-4 bg-primary/10 rounded-lg">
              <p className="text-gray-600 my-2">Selected: {selectedFile.name}</p>
              <p className="text-gray-600 my-2">Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          )}
        </div>
      </div>

      {uploading && (
        <div className="text-center p-4 bg-primary text-white rounded-lg my-4">
          <p>Uploading video...</p>
        </div>
      )}

      {error && (
        <div className="text-center p-4 bg-error text-white rounded-lg my-4">
          <p>{error}</p>
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Uploaded Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.key} className="bg-primary/10 rounded-lg p-4 transition-transform duration-200 hover:-translate-y-1">
              <video controls className="w-full rounded">
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="mt-2 text-sm">{video.key.split('/').pop()}</p>
              <p className="mt-1 text-sm">Uploaded: {new Date(video.lastModified).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard