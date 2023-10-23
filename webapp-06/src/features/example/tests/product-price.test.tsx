import { render } from "@testing-library/react"

import { Product } from "@/types"
import ProductPrice from "../components/ProductPrice"
import ProductCardContext from "../context/ProductContext"

describe("ProductPrice", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })
  it("should render the price in the correct format", () => {
    const product: Product = {
      name: "Test name",
      sku: "123",
      status: "draft",
      price: 100,
    }

    const { getByText } = render(
      <ProductCardContext.Provider value={{ product }}>
        <ProductPrice />
      </ProductCardContext.Provider>,
    )

    const formattedPrice = getByText("kr 100,00")

    expect(formattedPrice).toBeInTheDocument()
  })
})
