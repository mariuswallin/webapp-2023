/** @vitest-environment node */

import type { DeepMockProxy } from "vitest-mock-extended"
import { type NextRequest } from "next/server"
import httpMocks from "node-mocks-http"
import { mockDeep } from "vitest-mock-extended"

import { createProduct } from "@/features/example/product.controller"
import { prismaMock } from "@/lib/__mocks__/prisma"
import { PRODUCT_API_URL } from "@/lib/constants"

const url = PRODUCT_API_URL
vi.mock("@/lib/prisma")

// TODO: Cumbersome to mock Next api
const req: (request?: NextRequest) => DeepMockProxy<NextRequest> = (
  request?: NextRequest,
) => mockDeep<NextRequest>(request)

describe("Mocked Product Creation", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  describe("Creating product", () => {
    describe("when passed correct data", () => {
      it("should respond with status 201 Created", async () => {
        const product = {
          id: "1",
          sku: "abc-123",
          name: "Test name",
          price: 123,
          description: "",
          status: "draft",
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        const body = {
          sku: "abc-123",
          name: "Test name",
          status: "draft",
          price: 123,
        }

        const request = httpMocks.createRequest({
          method: "POST",
          url,
          body,
        })

        const mockedRequest = req(request)

        mockedRequest.headers.get
          .calledWith("content-type")
          .mockReturnValueOnce("application/json")

        mockedRequest.json.mockResolvedValueOnce(body)

        prismaMock.product.findUnique.mockResolvedValue(null)
        prismaMock.product.create.mockResolvedValue(product)

        const result = await createProduct(mockedRequest)

        expect(result.status).toBe(201)
      })
      it("should respond with correct data", async () => {
        const product = {
          id: "1",
          sku: "abc-123",
          name: "Test name",
          price: 123,
          description: "",
          status: "draft",
        }

        const body = {
          sku: "abc-123",
          name: "Test name",
          status: "draft",
          price: 123,
        }

        const request = httpMocks.createRequest({
          method: "POST",
          url,
          body,
        })

        const mockedRequest = req(request)

        mockedRequest.headers.get
          .calledWith("content-type")
          .mockReturnValueOnce("application/json")

        mockedRequest.json.mockResolvedValueOnce(body)

        prismaMock.product.findUnique.mockResolvedValue(null)
        prismaMock.product.create.mockResolvedValue(product)

        const result = await createProduct(mockedRequest)
        const data = await result.json()

        expect(result.status).toBe(201)
        expect(data.success).toBe(true)
        expect(data.data.name).toBe("Test name")
        expect(data.data.sku).toBe("abc-123")
        expect(data.data.status).toBe("draft")
        expect(data.data).toEqual({
          ...product,
          description: null,
          id: expect.any(String),
        })
      })
    })
    describe("When invalid data is passed", () => {
      it("should respond with status 400", async () => {
        const request = httpMocks.createRequest({
          method: "POST",
          url,
          body: {},
        })

        const mockedRequest = req(request)

        mockedRequest.headers.get
          .calledWith("content-type")
          .mockReturnValueOnce("application/json")

        mockedRequest.json.mockResolvedValueOnce({})

        const result = await createProduct(mockedRequest)

        expect(result.status).toBe(400)
      })
      it("should respond with status 400", async () => {
        const request = httpMocks.createRequest({
          method: "POST",
          url,
          body: { name: "Test" },
        })

        const mockedRequest = req(request)

        mockedRequest.headers.get
          .calledWith("content-type")
          .mockReturnValueOnce("application/json")

        mockedRequest.json.mockResolvedValueOnce({ name: "Test" })

        const result = await createProduct(mockedRequest)

        expect(result.status).toBe(400)
      })
      it("should respond with status 400", async () => {
        const request = httpMocks.createRequest({
          method: "POST",
          url,
          body: { name: "Test name", sku: "123" },
        })

        const mockedRequest = req(request)

        mockedRequest.headers.get
          .calledWith("content-type")
          .mockReturnValueOnce("application/json")

        mockedRequest.json.mockResolvedValueOnce({
          name: "Test name",
          sku: "123",
        })

        const result = await createProduct(mockedRequest)

        expect(result.status).toBe(400)
      })
      it("should respond with status 409 if sku exist", async () => {
        const request = httpMocks.createRequest({
          method: "POST",
          url,
          body: {
            sku: "abc-123",
            name: "Test name",
            status: "draft",
            price: 123,
          },
        })

        const mockedRequest = req(request)

        mockedRequest.headers.get
          .calledWith("content-type")
          .mockReturnValueOnce("application/json")

        mockedRequest.json.mockResolvedValue({
          sku: "abc-123",
          name: "Test name",
          status: "draft",
          price: 123,
        })

        prismaMock.product.findUnique.mockResolvedValue({
          sku: "abc-123",
          name: "Test name",
          status: "draft",
          price: 123,
        } as any)

        const result = await createProduct(mockedRequest)

        expect(result.status).toBe(409)
        expect(result.data.error).toBeDefined()
      })
    })
  })
})
