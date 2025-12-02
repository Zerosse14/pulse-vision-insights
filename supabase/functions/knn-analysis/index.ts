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
    const { videoFeatures, k = 5, analysisType } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a machine learning analyst specializing in K-Nearest Neighbors (KNN) algorithm for video content analysis.
    
    Given video features, perform KNN analysis to find similar content and provide classification insights.
    
    Video Features provided:
    ${JSON.stringify(videoFeatures, null, 2)}
    
    K value: ${k}
    Analysis Type: ${analysisType}
    
    Perform KNN analysis and return results in this JSON structure:
    {
      "nearestNeighbors": [
        {
          "id": string,
          "title": string,
          "distance": number,
          "similarity": number (0-100),
          "features": {
            "dominantColors": [string],
            "genre": string,
            "engagement": number
          }
        }
      ],
      "classification": {
        "predictedCategory": string,
        "confidence": number (0-100),
        "reasoning": string
      },
      "insights": {
        "patterns": [string],
        "recommendations": [string]
      },
      "visualization": {
        "clusters": [
          {
            "name": string,
            "count": number,
            "centerColor": string
          }
        ]
      }
    }
    
    Make the analysis realistic and data-driven based on the provided features.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Perform KNN analysis with k=${k} for ${analysisType} analysis.` }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const analysis = JSON.parse(data.choices[0].message.content);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in knn-analysis:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
