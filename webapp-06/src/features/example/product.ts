import { ValidationError } from "@/lib/errors"
import createId from "@/lib/id"
import { type Entity, type Product as ProductProps } from "@/types"

export function Product(productProps: ProductProps): Entity<ProductProps> {
  const id = productProps.id ?? createId()

  const validate = (product: ProductProps) => {
    const validName = ({ name }: ProductProps) => {
      return name.length >= 5
    }

    const validSlug = ({ sku }: ProductProps) => {
      return sku.length >= 5
    }

    const validPrice = ({ price }: ProductProps) => {
      return Number(price) > 0 && Number(price) < 5000
    }
    return [validName, validSlug, validPrice].every((fn) => fn(product))
  }

  const create = (product: ProductProps) => {
    const { sku, name, description = "", price, status = "draft" } = product
    if (!validate(product)) throw new ValidationError("Invalid product data")
    return { id, sku, name, description, price: Number(price), status }
  }

  return create(productProps)
}
