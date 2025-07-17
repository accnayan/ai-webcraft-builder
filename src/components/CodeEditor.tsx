
import { Editor } from '@monaco-editor/react';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CodeEditorProps {
  code: string;
  language: string;
}

const CodeEditor = ({ code, language }: CodeEditorProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative h-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      <div className="absolute top-3 right-3 z-10">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopy}
          className="bg-gray-800 hover:bg-gray-700 border-gray-600"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1 text-green-400" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      <Editor
        height="100%"
        language={language}
        value={code}
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
          },
          overviewRulerLanes: 0,
        }}
      />
    </div>
  );
};

export default CodeEditor;
