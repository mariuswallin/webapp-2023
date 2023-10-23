import { PRODUCT_API_URL } from "@/lib/constants"
import prisma from "@/lib/prisma"

const url = PRODUCT_API_URL

describe("Product creation", () => {
  beforeEach(async () => {
    vi.resetAllMocks()
    await prisma.product.deleteMany({})
  })
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe("Creating product", () => {
    describe("when passed invalid data", () => {
      it("should respond with success false", async () => {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "Test name" }),
        })
        const result = (await response.json()) as any

        expect(result.success).toBe(false)
      })

      it("should respond with correct error if no id or sku added", async () => {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "Test name" }),
        })
        const result = (await response.json()) as any

        expect(result.error).toBe("Failed finding product")
      })
      it("should respond with correct data", async () => {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Test name",
            sku: "abc-123",
            price: 123,
            status: "draft",
          }),
        })
        const result = (await response.json()) as any
        expect(result.error).toBe(undefined)
        expect(result.data.name).toBe("Test name")
      })
      it("should respond with duplicate error", async () => {
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Test name",
            sku: "abc-123",
            status: "draft",
            price: 123,
          }),
        })
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Test name",
            sku: "abc-123",
            status: "draft",
            price: 123,
          }),
        })
        const result = (await response.json()) as any

        expect(result.error).toBe("Item with abc-123 already exist")
      })
    })
  })
})
