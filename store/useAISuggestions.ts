import { env } from '@/config/env';
import axios from 'axios';
import { create } from 'zustand';

interface AISuggestionState {
  mealSuggestion: string;
  error: string | null;
  isLoading: boolean;
  fetchAISuggestion: () => Promise<void>;
}

export const useAISuggestions = create<AISuggestionState>((set) => ({
  mealSuggestion: '',
  error: null,
  isLoading: true,
  fetchAISuggestion: async () => {
    try {
      set({ error: null });
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
      set({ error: 'Failed to fetch AI suggestion' });
      console.error('Error fetching AI suggestion:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
