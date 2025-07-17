
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Code, Eye, Zap, Sparkles, Download, Share, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import CodeEditor from '@/components/CodeEditor';

interface WebsiteBuilderProps {
  initialPrompt?: string;
  onBackToLanding: () => void;
}

const WebsiteBuilder = ({ initialPrompt, onBackToLanding }: WebsiteBuilderProps) => {
  const [prompt, setPrompt] = useState(initialPrompt || '');
  const [generatedCode, setGeneratedCode] = useState('');
  const [language, setLanguage] = useState('html');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleBuild = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    
    try {
      console.log('Calling generate-website function...');
      
      const { data, error } = await supabase.functions.invoke('generate-website', {
        body: { prompt: prompt.trim() }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      console.log('Website generated successfully');
      setGeneratedCode(data.code);
      setLanguage(data.language || 'html');
      
      toast({
        title: "✨ Website Generated!",
        description: "Your website has been created successfully. Click preview to see it live!",
      });
    } catch (error) {
      console.error('Error generating website:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate website. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    if (!generatedCode) {
      toast({
        title: "No Code Generated",
        description: "Please generate a website first before previewing.",
        variant: "destructive",
      });
      return;
    }

    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(generatedCode);
      previewWindow.document.close();
    }
  };

  const handleDownload = () => {
    if (!generatedCode) {
      toast({
        title: "No Code Generated",
        description: "Please generate a website first before downloading.",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Your website HTML file is being downloaded.",
    });
  };

  // Auto-build if initial prompt is provided
  useState(() => {
    if (initialPrompt && !generatedCode) {
      handleBuild();
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={onBackToLanding}
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-gray-800/50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <h1 className="text-2xl font-bold text-white">AI Website Builder</h1>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                onClick={handlePreview}
                disabled={!generatedCode}
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                onClick={handleDownload}
                disabled={!generatedCode}
                variant="outline"
                className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          
          {/* Input Section */}
          <div className="mt-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
              <div className="flex flex-col space-y-4">
                <Textarea
                  placeholder="Describe your dream website... Be specific about style, colors, content, and functionality!"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 resize-none min-h-24"
                />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    {generatedCode ? '✅ Website generated successfully!' : '💡 Tip: Be specific for better results'}
                  </div>
                  <Button
                    onClick={handleBuild}
                    disabled={!prompt.trim() || isLoading}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        {generatedCode ? 'Regenerate' : 'Build Website'}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {generatedCode ? (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">Generated Code</span>
                </div>
                <p className="text-gray-400 text-sm mt-1">HTML with Tailwind CSS</p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Ready to Preview</span>
                </div>
                <p className="text-gray-400 text-sm mt-1">Click preview to see live site</p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-2">
                  <Download className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-medium">Production Ready</span>
                </div>
                <p className="text-gray-400 text-sm mt-1">Download and deploy anywhere</p>
              </div>
            </div>

            {/* Code Editor */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-purple-400" />
                  <h2 className="text-xl font-semibold text-white">Generated Code</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={handlePreview}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Preview
                  </Button>
                </div>
              </div>
              <div className="h-96">
                <CodeEditor code={generatedCode} language={language} />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Ready to Create Magic?</h3>
              <p className="text-gray-400 mb-6">
                Describe your website idea above and watch AI bring it to life in seconds.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700">
                  <span className="text-purple-400">✨ AI-Powered</span>
                  <p className="text-gray-400 mt-1">Generated with GPT-4</p>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700">
                  <span className="text-pink-400">🚀 Instant</span>
                  <p className="text-gray-400 mt-1">Ready in seconds</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteBuilder;
