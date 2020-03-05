import {getBranch} from 'router/Routes'

export const routeParser = (req, _, next) => {
  let router = {branch: [], match: {}}
  if (!req.url.match(/\.\w+$/)) {
    router = getBranch(req.originalUrl)
  }
  req.router = router

  next()
}
