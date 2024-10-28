import { AIError } from './errors';

export async function generateStepInstructions(recipeName: string, stepText: string): Promise<string> {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `For the recipe "${recipeName}", please provide clear, detailed instructions for this step: "${stepText}". 
                   Focus on clarity and precision. Keep the response concise but informative.`
        }]
      })
    });

    if (!response.ok) {
      throw new AIError('Failed to generate instructions', response.status);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('AI generation error:', error);
    if (error instanceof AIError) {
      throw error;
    }
    throw new AIError('Failed to generate instructions', 500);
  }
}