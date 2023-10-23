import { setupServer } from "msw/node"

import { handlers } from "./handlers"
import { handlers as serverHandlers } from "./handlers/products.server"

const allHandlers = [...serverHandlers, ...handlers]

export const server = setupServer(...allHandlers)
