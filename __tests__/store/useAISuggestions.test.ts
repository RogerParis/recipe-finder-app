import { useAISuggestions } from '@/store/useAISuggestions';
import { act, renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useAISuggestions', () => {
  beforeEach(() => {
    useAISuggestions.setState({
      mealSuggestion: '',
      error: null,
      isLoading: false,
    });
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useAISuggestions());
    expect(result.current.mealSuggestion).toBe('');
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('fetches AI suggestion successfully', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { choices: [{ message: { content: 'Tomato' } }] },
    });

    const { result, waitForNextUpdate } = renderHook(() => useAISuggestions());

    act(() => {
      result.current.fetchAISuggestion();
    });

    await waitForNextUpdate();

    expect(result.current.mealSuggestion).toBe('Tomato');
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('handles API failure gracefully', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('API Error'));

    const { result, waitForNextUpdate } = renderHook(() => useAISuggestions());

    act(() => {
      result.current.fetchAISuggestion();
    });

    await waitForNextUpdate();

    expect(result.current.mealSuggestion).toBe('');
    expect(result.current.error).toBe('Failed to fetch AI suggestion');
    expect(result.current.isLoading).toBe(false);
  });
});
