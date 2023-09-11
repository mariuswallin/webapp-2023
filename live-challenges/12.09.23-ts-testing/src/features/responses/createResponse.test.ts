// TODO: Not implemented
const fakerMock: Faker = {
  id,
  answer,
  score,
  category,
}

describe.only("Create responses", () => {
  it("should create response", () => {
    expect(responses.size).toBe(10)
  })
  it("should have correct data", () => {
    expect(firstResponse.answer).toBe("answer")
    expect(firstResponse.score).toBe(3)
    expect(firstResponse.category).toBe("one")
  })
  it("should add to existing list", () => {
    expect(firstProduct.answer).toBe("answer")
    expect(firstProduct.category).toBe("Initial")
    expect(firstProduct.id).toBe("response-initial")
    expect(products.size).toBe(11)
  })
  it("should fail if no responses can be added", () => {})
})
