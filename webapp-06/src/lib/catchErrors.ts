export const catchErrors = (fn: (args: unknown[]) => Promise<void>) => {
  return function (...args: unknown[]) {
    return fn(args).catch((err) => {
      console.error(err)
    })
  }
}

// TODO: HandleErrors
