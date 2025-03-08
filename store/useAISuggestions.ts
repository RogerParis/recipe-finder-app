import { env } from "@/config/env";
import axios from "axios";
import { create } from "zustand";


interface AISuggestionState {
  mealSuggestion: string;
  fetchAISuggestion: () => Promise<void>;
}

export const useAISuggestions = create<AISuggestionState>((set) => ({
  mealSuggestion: '',
  fetchAISuggestion: async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [{ role: "system", content: "Suggest a creative meal for today with common ingredients." }],
          max_tokens: 100,
        },
        {
          headers: {
            Authorization: `Bearer ${env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      set({ mealSuggestion: response.data.choices[0].message.content });
    } catch (error) {
      console.error('Error fetching AI suggestion:', error);
    }
  }
}))