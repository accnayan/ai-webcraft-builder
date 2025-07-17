
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Code, Eye, Zap, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import CodeEditor from '@/components/CodeEditor';
import Preview from '@/components/Preview';

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
        title: "Website Generated!",
        description: "Your website has been created successfully.",
      });
    } catch (error) {
      console.error('Error generating website:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate website. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
                className="text-gray-300 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <h1 className="text-2xl font-bold text-white">AI Website Builder</h1>
              </div>
            </div>
          </div>
          
          {/* Input Section */}
          <div className="mt-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
              <Textarea
                placeholder="Describe your website..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 resize-none mb-4"
              />
              <Button
                onClick={handleBuild}
                disabled={!prompt.trim() || isLoading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Building...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Build Website
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Code and Preview Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-280px)]">
          {/* Code Editor */}
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <Code className="w-5 h-5 text-purple-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Generated Code</h2>
            </div>
            <div className="flex-1">
              <CodeEditor code={generatedCode} language={language} />
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <Eye className="w-5 h-5 text-purple-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Live Preview</h2>
            </div>
            <div className="flex-1">
              <Preview code={generatedCode} language={language} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteBuilder;
