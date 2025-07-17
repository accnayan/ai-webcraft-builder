
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, ArrowRight, Code, Zap, Palette, Rocket, Globe, Star, Users, Lightning } from 'lucide-react';

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
    "Create a modern portfolio website for a UX designer with dark theme",
    "Build a coffee shop landing page with online menu and contact form",
    "Make a SaaS startup homepage with pricing tiers and testimonials",
    "Design a restaurant website with reservation system and gallery"
  ];

  const features = [
    {
      icon: Lightning,
      title: "Lightning Fast",
      description: "Generate complete websites in under 30 seconds",
      color: "text-yellow-400"
    },
    {
      icon: Code,
      title: "Clean Code",
      description: "Production-ready HTML with modern CSS",
      color: "text-blue-400"
    },
    {
      icon: Palette,
      title: "Beautiful Design",
      description: "Responsive designs that work on all devices",
      color: "text-pink-400"
    },
    {
      icon: Globe,
      title: "Ready to Deploy",
      description: "Download and host anywhere instantly",
      color: "text-green-400"
    }
  ];

  const stats = [
    { number: "10K+", label: "Websites Created" },
    { number: "99%", label: "Success Rate" },
    { number: "<30s", label: "Generation Time" },
    { number: "24/7", label: "Available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
        
        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">BuildAI</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-gray-300">
            <a href="#features" className="hover:text-white transition-colors cursor-pointer">Features</a>
            <a href="#examples" className="hover:text-white transition-colors cursor-pointer">Examples</a>
            <a href="#stats" className="hover:text-white transition-colors cursor-pointer">Stats</a>
          </div>
        </nav>

        {/* Main Hero Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-gray-700/50">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Powered by GPT-4 AI Technology</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Build websites with
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> AI magic</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Transform your ideas into stunning websites in seconds. Just describe what you want, and watch AI create it for you.
            </p>

            {/* Prompt Input */}
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mb-16">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
                <Textarea
                  placeholder="Describe your dream website... (e.g., 'Create a modern portfolio website with a hero section, about me, projects gallery, and contact form using a dark theme with purple accents')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-32 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 resize-none text-lg mb-6 focus:border-purple-500 transition-colors"
                />
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Lightning className="w-4 h-4 text-yellow-400" />
                      <span>Fast Generation</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Code className="w-4 h-4 text-blue-400" />
                      <span>Clean Code</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Globe className="w-4 h-4 text-green-400" />
                      <span>Ready to Deploy</span>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={!prompt.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Build Website
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </form>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16" id="stats">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Example Prompts */}
            <div className="max-w-4xl mx-auto" id="examples">
              <p className="text-gray-400 mb-6 text-lg">✨ Try these examples or create your own:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="text-left p-4 bg-gray-800/30 border border-gray-700/50 rounded-lg hover:bg-gray-800/50 hover:border-purple-500/50 transition-all duration-200 text-gray-300 hover:text-white group"
                  >
                    <div className="flex items-start space-x-3">
                      <ArrowRight className="w-4 h-4 mt-1 text-purple-400 group-hover:translate-x-1 transition-transform" />
                      <span>"{example}"</span>
                    </div>
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
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose BuildAI?</h2>
            <p className="text-xl text-gray-300">Everything you need to create amazing websites</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105">
                <feature.icon className={`w-12 h-12 ${feature.color} mx-auto mb-4`} />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Build Something Amazing?</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of creators who are building with AI</p>
          <Button
            onClick={() => document.querySelector('textarea')?.focus()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Start Building Now
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">BuildAI</span>
          </div>
          <p>© 2024 BuildAI. Powered by OpenAI and built with ❤️</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
