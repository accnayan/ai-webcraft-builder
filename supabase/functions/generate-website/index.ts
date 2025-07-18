
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();

    console.log('Generating website for prompt:', prompt);

    // Retry logic for rate limiting
    let attempt = 0;
    const maxAttempts = 3;
    
    while (attempt < maxAttempts) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openRouterApiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://lovable.dev',
            'X-Title': 'Website Builder',
          },
          body: JSON.stringify({
            model: 'qwen/qwen-2.5-coder-32b-instruct:free',
            messages: [
              {
                role: 'system',
                content: `You are an expert web developer. Generate complete, functional HTML websites based on user descriptions. 
                
                Requirements:
                - Always create a complete HTML document with DOCTYPE, head, and body
                - Include modern CSS styling using Tailwind CSS via CDN
                - Make it responsive and visually appealing with modern design
                - Include realistic content relevant to the user's request
                - Use semantic HTML elements
                - Add interactive elements where appropriate (buttons, forms, hover effects)
                - Include proper meta tags, title, and favicon
                - Add smooth animations and transitions
                - Use modern color schemes and typography
                - Make sure the code is production-ready and functional
                - Include Tailwind CSS CDN link in the head
                
                Return ONLY the HTML code, no explanations or markdown.`
              },
              { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 4000,
          }),
        });

        if (response.status === 429) {
          attempt++;
          if (attempt < maxAttempts) {
            console.log(`Rate limited, retrying in ${2 ** attempt} seconds...`);
            await delay(2 ** attempt * 1000);
            continue;
          }
          throw new Error('Rate limit exceeded. Please try again in a few minutes.');
        }

        if (!response.ok) {
          throw new Error(`OpenRouter API error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const generatedCode = data.choices[0].message.content;

        console.log('Website generated successfully');

        return new Response(
          JSON.stringify({ 
            code: generatedCode,
            language: 'html'
          }), 
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      } catch (error) {
        if (attempt === maxAttempts - 1) {
          throw error;
        }
        attempt++;
      }
    }
  } catch (error) {
    console.error('Error in generate-website function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to generate website. Please try again.',
        details: error.message 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
