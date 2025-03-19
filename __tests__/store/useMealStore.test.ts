import { useMealStore } from '@/store/useMealStore'; // adjust path if needed
import { act, renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useMealStore', () => {
  beforeEach(() => {
    useMealStore.setState({
      meals: [],
      isLoading: false,
      error: null,
    });
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useMealStore());
    expect(result.current.meals).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should fetch meals successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        meals: [{ idMeal: '1', strMeal: 'Pizza', strMealThumb: 'url' }],
      },
    });

    const { result, waitForNextUpdate } = renderHook(() => useMealStore());

    act(() => {
      result.current.fetchMeals('pizza');
    });

    // Wait for async updates
    await waitForNextUpdate();

    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/search.php?s=pizza'));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.meals).toEqual([{ idMeal: '1', strMeal: 'Pizza', strMealThumb: 'url' }]);
    expect(result.current.error).toBeNull();
  });

  it('should return empty array if no meals are found', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        meals: null,
      },
    });

    const { result, waitForNextUpdate } = renderHook(() => useMealStore());

    act(() => {
      result.current.fetchMeals('pizza');
    });

    // Wait for async updates
    await waitForNextUpdate();

    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/search.php?s=pizza'));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.meals).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetchMeals failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    const { result, waitForNextUpdate } = renderHook(() => useMealStore());

    act(() => {
      result.current.fetchMeals('fail');
    });

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.meals).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch meals.');
  });

  it('should clear meals', () => {
    const { result } = renderHook(() => useMealStore());

    act(() => {
      result.current.meals = [{ idMeal: '1', strMeal: 'Test', strMealThumb: '' }];
    });

    act(() => {
      result.current.clearMeals();
    });

    expect(result.current.meals).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});
