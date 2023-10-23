import { ValidationError } from "@/lib/errors"
import { Cart, CreateCart } from "../cart" // Import your Cart function and ValidationError
import { Product } from "../product"

describe("Cart", () => {
  let cart: CreateCart

  beforeEach(() => {
    cart = Cart({ id: "cart1" })
  })

  it("should create a cart with the given id", () => {
    expect(cart.id).toBe("cart1")
  })

  it("should create a cart with no items by default", () => {
    expect(cart.items).toHaveLength(0)
  })

  it("should add items to the cart", () => {
    const product = Product({ name: "Item 1", sku: "item1", price: 10.0 })
    cart.add(product, 2)
    expect(cart.items()).toHaveLength(1)
    expect(cart.items()[0].product).toEqual(product)
    expect(cart.items()[0].quantity).toBe(2)
  })

  it("should calculate the total price of items in the cart", () => {
    const product1 = Product({ name: "Item 1", sku: "item1", price: 10.0 })
    const product2 = Product({ name: "Item 2", sku: "item2", price: 5.0 })
    cart.add(product1, 2)
    cart.add(product2, 3)
    expect(cart.totalPrice()).toBe(35.0)
  })

  it("should throw an error if the quantity is not valid when adding an item", () => {
    const product = Product({ name: "Item 1", sku: "item1", price: 10.0 })
    expect(() => cart.add(product, 0)).toThrow(ValidationError)
    expect(() => cart.add(product, 1001)).toThrow(ValidationError)
  })

  it("should throw an error if an item quantity exceeds the allowed quantity when adding", () => {
    const product = Product({ name: "Item 1", sku: "item1", price: 10.0 })
    cart.add(product, 999) // Adding within allowed quantity
    expect(() => cart.add(product, 2)).toThrow(ValidationError) // Exceeds allowed quantity
  })

  it("should remove an item from the cart", () => {
    const product1 = Product({
      id: "123",
      name: "Item 1",
      sku: "item1",
      price: 10.0,
    })
    const product2 = Product({
      id: "234",
      name: "Item 2",
      sku: "item2",
      price: 5.0,
    })
    cart.add(product1, 2)
    cart.add(product2, 3)
    cart.remove("123")
    expect(cart.items()).toHaveLength(1)
    expect(cart.items()[0].product).toEqual(product2)
  })

  it("should empty the cart", () => {
    const product1 = Product({ name: "Item 1", sku: "item1", price: 10.0 })
    const product2 = Product({ name: "Item 2", sku: "item2", price: 5.0 })
    cart.add(product1, 2)
    cart.add(product2, 3)
    cart.empty()
    expect(cart.items).toHaveLength(0)
  })
})
