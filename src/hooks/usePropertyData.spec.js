import { renderHook } from '@testing-library/react-hooks';
import useProperyData from './usePropertyData';

global.fetch = jest.fn();

afterEach(() => {
    jest.clearAllMocks();
});

test('should return property data after successful fetch', async () => {
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: 1, name: 'Test Property' }],
    });

    const { result, waitForNextUpdate } = renderHook(() => useProperyData());

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(false);
    expect(result.current.propertyData).toEqual([{ id: 1, name: 'Test Property' }]);
});

test('should set error to true on fetch failure', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
    });

    const { result, waitFor } = renderHook(() => useProperyData());

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(true);
    expect(result.current.propertyData).toEqual([]);

    consoleError.mockRestore();
});
