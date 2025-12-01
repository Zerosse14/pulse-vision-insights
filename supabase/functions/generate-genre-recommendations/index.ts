import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { genre } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are a social media video optimization expert. Generate actionable recommendations for ${genre} videos based on current trends, color psychology, and platform best practices.

Return a JSON object with this exact structure:
{
  "recommendedColors": ["color1", "color2", "color3"],
  "avoidColors": ["color1", "color2"],
  "trendingWords": ["word1", "word2", "word3", "word4", "word5"],
  "hashtagSuggestions": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"],
  "colorPalette": [
    { "name": "Color Name", "hex": "#HEXCODE", "usage": "where to use it" },
    { "name": "Color Name 2", "hex": "#HEXCODE", "usage": "where to use it" },
    { "name": "Color Name 3", "hex": "#HEXCODE", "usage": "where to use it" },
    { "name": "Color Name 4", "hex": "#HEXCODE", "usage": "where to use it" }
  ],
  "optimizationTips": ["tip1", "tip2", "tip3", "tip4"],
  "mood": "description of the mood/vibe for this genre",
  "targetAudience": "description of target audience demographics and interests"
}

Be specific, actionable, and focus on what makes ${genre} content perform well on social media platforms like Instagram, TikTok, and YouTube.
Use actual trending hashtags and current social media trends for ${genre} content.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate recommendations for ${genre} videos` }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits depleted. Please add credits in Settings.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;
    const recommendations = JSON.parse(generatedContent);

    return new Response(JSON.stringify(recommendations), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
