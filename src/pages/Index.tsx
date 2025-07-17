
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Zap, Code, Eye } from 'lucide-react';
import CodeEditor from '@/components/CodeEditor';
import Preview from '@/components/Preview';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [language, setLanguage] = useState('html');
  const [isLoading, setIsLoading] = useState(false);

  const handleBuild = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call with realistic delay
    setTimeout(() => {
      // Generate sample code based on prompt
      const sampleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        .hero {
            text-align: center;
            padding: 4rem 0;
            color: white;
        }
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .hero p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .cta-button {
            background: #ff6b6b;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 25px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }
        .cta-button:hover {
            background: #ff5252;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 4rem;
        }
        .feature {
            background: rgba(255,255,255,0.1);
            padding: 2rem;
            border-radius: 10px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
        }
        .feature h3 {
            color: white;
            margin-bottom: 1rem;
        }
        .feature p {
            color: rgba(255,255,255,0.8);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="hero">
            <h1>Welcome to Your Website</h1>
            <p>Built with AI-powered technology</p>
            <a href="#" class="cta-button">Get Started</a>
        </div>
        
        <div class="features">
            <div class="feature">
                <h3>🚀 Fast Performance</h3>
                <p>Lightning-fast loading times and optimized code for the best user experience.</p>
            </div>
            <div class="feature">
                <h3>📱 Responsive Design</h3>
                <p>Looks great on all devices - desktop, tablet, and mobile.</p>
            </div>
            <div class="feature">
                <h3>🎨 Beautiful UI</h3>
                <p>Modern, clean design that captures attention and engages users.</p>
            </div>
        </div>
    </div>
</body>
</html>`;

      setGeneratedCode(sampleHTML);
      setLanguage('html');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-purple-400 mr-2" />
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                AI Website Builder
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Describe your vision and watch as AI transforms your ideas into beautiful, functional websites
            </p>
            
            {/* Input Section */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <Textarea
                  placeholder="Describe the website you want to build... (e.g., 'Create a modern portfolio website with a hero section, about me, and contact form')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-32 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 resize-none text-lg"
                />
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={handleBuild}
                    disabled={!prompt.trim() || isLoading}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-medium rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Building...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Build Website
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code and Preview Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
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

      {/* Footer */}
      <div className="border-t border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>Powered by AI • Built with React & Tailwind CSS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
