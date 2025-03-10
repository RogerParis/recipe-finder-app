import { env } from '@/config/env';
import axios from 'axios';
import { create } from 'zustand';

interface AISuggestionState {
  mealSuggestion: string;
  fetchAISuggestion: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

export const useAISuggestions = create<AISuggestionState>((set) => ({
  mealSuggestion: '',
  isLoading: true,
  error: null,
  fetchAISuggestion: async () => {
    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'Suggest a meal name.',
            },
          ],
          max_tokens: 100,
        },
        {
          headers: {
            Authorization: `Bearer ${env.AI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );
      set({ mealSuggestion: response.data.choices[0].message.content });
    } catch (error) {
      console.error('Error fetching AI suggestion:', error);
      set({ error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  },
}));
