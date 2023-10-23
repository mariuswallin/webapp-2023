import { type Entity, type Product } from "@/types"

export const products: Entity<Product>[] = [
  {
    id: "1",
    name: "Product One",
    sku: "123",
    price: 1,
    status: "draft",
  },
  {
    id: "2",
    name: "Product Two",
    sku: "234",
    price: 2,
    status: "draft",
  },
  {
    id: "3",
    name: "Product Three",
    sku: "456",
    price: 3,
    status: "published",
  },
  {
    id: "4",
    name: "Product Four",
    sku: "567",
    price: 4,
    status: "featured",
  },
]
