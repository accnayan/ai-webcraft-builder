
import { useState, useEffect } from 'react';

interface PreviewProps {
  code: string;
  language: string;
}

const Preview = ({ code, language }: PreviewProps) => {
  const [previewContent, setPreviewContent] = useState('');

  useEffect(() => {
    if (language === 'html' && code) {
      setPreviewContent(code);
    } else {
      setPreviewContent('');
    }
  }, [code, language]);

  if (!code) {
    return (
      <div className="h-full bg-gray-900 rounded-lg border border-gray-700 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-lg mb-2">🎨</div>
          <p>Preview will appear here</p>
          <p className="text-sm mt-1">Generate code to see the preview</p>
        </div>
      </div>
    );
  }

  if (language === 'html') {
    return (
      <div className="h-full bg-white rounded-lg border border-gray-700 overflow-hidden">
        <iframe
          srcDoc={previewContent}
          className="w-full h-full border-0"
          title="Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-900 rounded-lg border border-gray-700 flex items-center justify-center">
      <div className="text-center text-gray-400">
        <div className="text-lg mb-2">⚛️</div>
        <p>React preview not available</p>
        <p className="text-sm mt-1">Use the code editor to view the generated code</p>
      </div>
    </div>
  );
};

export default Preview;
