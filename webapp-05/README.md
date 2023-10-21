# Workflow

- Talk about the concepts
- Show examples
- Show drawings
- Show diagrams
- Give quizzes
- Give small tasks (so not to code, but do it themselves)

## Setup backend

- Create Prisma Schema
- Setup Prisma Client
- Setup seeder
- Do all prisma commands and seed data

## Setup API

- Create Repository (to be able to switch out Prisma if needed)
- Create Mappers?
- Create Service (businesslogic) - what we will reuse when needed
- Create Domain to interact with Service
- Create Controller - validate request body, organize services, return response
- Create api-routes
- Create dynamic api-routes
- Create middleware (auth)
- Wire up routes, methods and controllers
- Create helperfunctions / reusable functions to be used for handling ex. error / getting data / validate
- Test this in Postman or supertest / http-mocks / msw
- Mock Prisma (or create a dev.db??!?)

## Setup Basic components

- Create all reusable and basic components
- Make sure they are as "Dumb" as possible
- Test components

## Setup hooks

- Abastract common logic to hooks
- Test hooks

## Setup context

- Abstract shared state / props to context
- Test with context

## Add global state

- If needed add global state
- XState / Zustand?

## Create pages

- Create pages (products / cart)
- Create dynamic pages
- Wire up navigation
- Use RSC to fetch data an render on server (send this a props)

## Add states

- Create page loading
- Create page error
- Use useEffect (or library) to handle mutation logic

## Wire it all together

- Use needed logic on actual pages to be able to fetch / mutate / refetch data
- Test with E2E

https://whateverittech.medium.com/manage-shopping-cart-in-nextjs-13-with-zustand-99421fc6a2ec
https://sonner.emilkowal.ski/
https://github.com/cornflourblue/next-js-13-mysql-registration-login-example/blob/master/services/user.service.js#L10
https://github.com/cornflourblue/dotnet-7-jwt-authentication-api/blob/master/Authorization/AuthorizeAttribute.cs
https://github.com/basir/nextjs-shopping-cart-like-amazon/tree/main/src/components
https://javascript.plainenglish.io/client-side-data-fetching-in-next-js-using-swr-3d32aada97ab
https://medium.com/@radzion/building-an-accessible-and-responsive-app-modal-component-a-developers-guide-85d6c603f699?source=list-9ba94759b65f--------0-------predefined%3A9ba94759b65f%3AREADING_LIST---------------------
https://medium.com/@brianridolcedev/zod-and-next-js-api-routes-type-checked-apis-8e7fa2a10b6c?source=list-9ba94759b65f--------1-------predefined%3A9ba94759b65f%3AREADING_LIST---------------------
https://medium.com/@lucgagan/efficient-e2e-testing-for-next-js-a-playwright-tutorial-06eadfc59111?source=list-9ba94759b65f--------2-------predefined%3A9ba94759b65f%3AREADING_LIST---------------------
https://chat.openai.com/c/b2489cfb-ae1e-4ec5-8596-1867e4e695d5
https://www.prisma.io/blog/testing-series-3-aBUyF8nxAn
https://stackoverflow.com/questions/75486253/creating-a-test-database-with-prisma
https://github.com/demonsters/prisma-mock

RSC og Clientside
https://github.com/CodeSnaps/react-server-components
