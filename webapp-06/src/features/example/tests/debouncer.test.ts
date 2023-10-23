import { act, renderHook } from "@testing-library/react"

import { useDebounce } from "@/hooks/useDebounce"

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
    vi.restoreAllMocks()
  })
  it("should return a function", () => {
    // @ts-expect-error
    const { result } = renderHook(() => useDebounce())
    const { debounce } = result.current

    expect(typeof debounce).toBe("function")
  })
  it("should fire callback after timeout expired", () => {
    const mockFn = vi.fn()
    const { result } = renderHook(() => useDebounce(mockFn, 100))
    result.current.debounce(1)
    vi.runAllTimers()
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
  it("should fire callback only once", () => {
    const mockFn = vi.fn()
    const { result } = renderHook(() => useDebounce(mockFn, 100))

    act(() => {
      result.current.debounce("test argument 1")
    })

    act(() => {
      result.current.debounce("test argument 2")
    })

    expect(mockFn).not.toHaveBeenCalled()

    // vi.advanceTimersByTime(100)
    vi.runAllTimers()

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith("test argument 2")
  })
  it("should handle async callback only once", () => {
    const mockFn = vi.fn()
    const { result } = renderHook(() => useDebounce(mockFn, 100))

    act(() => {
      result.current.debounce("test argument 1")
    })

    act(() => {
      result.current.debounce("test argument 2")
    })

    expect(mockFn).not.toHaveBeenCalled()

    // vi.advanceTimersByTime(100)
    vi.runAllTimers()

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith("test argument 2")
  })
})
