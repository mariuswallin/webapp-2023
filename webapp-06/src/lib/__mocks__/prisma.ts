import type { DeepMockProxy } from "vitest-mock-extended"
import { type PrismaClient } from "@prisma/client"
import { mockDeep, mockReset } from "vitest-mock-extended"

import prisma from "@/lib/prisma"

vi.mock("@/lib/prisma", () => mockDeep<PrismaClient>())

beforeEach(() => {
  mockReset(prisma)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
