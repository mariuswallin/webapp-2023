import React from "react"
import { act } from "react-dom/test-utils"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import ProductForm from "../components/ProductForm"

const createMock = vi.fn()
const routerMock = vi.fn()

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: routerMock,
  }),
}))

vi.mock("../hooks/useProduct", () => ({
  useProduct: () => {
    return {
      create: createMock,
    }
  },
}))

describe("ProductForm", () => {
  let nameInput: HTMLElement | null = null
  let skuInput: HTMLElement | null = null
  let priceInput: HTMLElement | null = null
  let saveButton: HTMLElement | null = null
  let formError: HTMLElement | null = null
  let formValidationError: HTMLElement | null = null
  let formSuccess: HTMLElement | null = null

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    render(<ProductForm />)
    nameInput = screen.getByLabelText("Navn")
    skuInput = screen.getByLabelText("Sku")
    priceInput = screen.getByLabelText("Pris")
    saveButton = screen.getByText("Lagre")
    formValidationError = screen.queryByTestId("form_validation_error")
    formError = screen.queryByTestId("form-error")
    formSuccess = screen.queryByTestId("form-success")
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  it("should render the form fields and submit button", () => {
    // Check if form elements are rendered
    expect(nameInput).toBeInTheDocument()
    expect(skuInput).toBeInTheDocument()
    expect(priceInput).toBeInTheDocument()
    expect(saveButton).toBeInTheDocument()

    expect(formError).not.toBeInTheDocument()
    expect(formValidationError).not.toBeInTheDocument()
    expect(formSuccess).not.toBeInTheDocument()

    expect(saveButton).not.toBeDisabled()
  })

  it("should show validation error for invalid input", async () => {
    await userEvent.type(nameInput!, "test")
    await userEvent.click(saveButton!)

    expect(
      await screen.findByTestId("form_validation_error"),
    ).toBeInTheDocument()
  })

  it("should submit the form and show success message", async () => {
    createMock.mockResolvedValue({ id: "123" })
    await userEvent.type(nameInput!, "Product Name")
    await userEvent.type(skuInput!, "123456-sku")
    await userEvent.type(priceInput!, "10")
    await userEvent.click(saveButton!)

    expect(await screen.findByTestId("form-success")).toBeInTheDocument()

    await act(async () => {
      await vi.runAllTimersAsync()
    })
    expect(routerMock).toHaveBeenCalledWith("/products/123")
  })
})
