
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, ArrowRight, Code, Zap, Palette, Rocket } from 'lucide-react';

interface LandingPageProps {
  onBuildWebsite: (prompt: string) => void;
}

const LandingPage = ({ onBuildWebsite }: LandingPageProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onBuildWebsite(prompt.trim());
    }
  };

  const examples = [
    "Create a modern portfolio website for a UX designer",
    "Build a landing page for a coffee shop with menu and contact info",
    "Make a tech startup homepage with hero section and features",
    "Design a restaurant website with online reservation system"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20" />
        
        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">BuildAI</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-gray-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#examples" className="hover:text-white transition-colors">Examples</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </div>
        </nav>

        {/* Main Hero Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Build websites with
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> AI magic</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Describe your vision and watch as AI transforms your ideas into beautiful, functional websites in seconds.
            </p>

            {/* Prompt Input */}
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mb-16">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <Textarea
                  placeholder="Describe the website you want to build... (e.g., 'Create a modern portfolio website with a hero section, about me, projects gallery, and contact form')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-32 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 resize-none text-lg mb-6"
                />
                <Button
                  type="submit"
                  disabled={!prompt.trim()}
                  className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg font-medium rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Build Website
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </form>

            {/* Example Prompts */}
            <div className="max-w-4xl mx-auto" id="examples">
              <p className="text-gray-400 mb-6">Try these examples:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="text-left p-4 bg-gray-800/30 border border-gray-700/50 rounded-lg hover:bg-gray-800/50 hover:border-gray-600 transition-all duration-200 text-gray-300 hover:text-white"
                  >
                    "{example}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-900/50" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powered by AI</h2>
            <p className="text-xl text-gray-300">Everything you need to build amazing websites</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-800/30 rounded-2xl border border-gray-700/50">
              <Code className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Clean Code</h3>
              <p className="text-gray-400">Generated code is clean, semantic, and ready for production</p>
            </div>
            
            <div className="text-center p-8 bg-gray-800/30 rounded-2xl border border-gray-700/50">
              <Palette className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Beautiful Design</h3>
              <p className="text-gray-400">Modern, responsive designs that look great on all devices</p>
            </div>
            
            <div className="text-center p-8 bg-gray-800/30 rounded-2xl border border-gray-700/50">
              <Rocket className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-400">Generate complete websites in seconds, not hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>© 2024 BuildAI. Powered by OpenAI and built with ❤️</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
