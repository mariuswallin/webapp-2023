import { useProduct } from "../hooks/useProduct"

describe("useProduct", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })
  it("should call list function and return data on success", async () => {
    const productApi = useProduct()
    const result = await productApi.get("1")

    expect(result).toEqual([
      { id: "1", name: "Product One", price: 1, sku: "123", status: "draft" },
    ])
  })

  it("should call create function and return data on success", async () => {
    const mockProduct = {
      name: "New Product",
      sku: "123-456-253",
      price: 123,
      status: "draft",
    }

    const productApi = useProduct()
    const result = await productApi.create(mockProduct)

    expect(result).toEqual({
      id: expect.any(String),
      description: null,
      ...mockProduct,
    })
  })

  it("should call remove function and return null on success", async () => {
    const mockProductId = "1"

    const productApi = useProduct()
    const result = await productApi.remove(mockProductId)

    expect(result).toBeNull()
  })
})
