import { pathToRegexp } from "pathToRegexp"
import { handleHome, handleLead, handleResume, handleBlog, handleProjects, handleContact } from "./controller.ts"


interface Route {
  path: string
  regex: RegExp
  handler: (req: Request, match: RegExpExecArray) => void
}


const routes = [
  { path:""             , handler: handleHome     },
  { path:"/"            , handler: handleHome     },
  { path:"/home"        , handler: handleHome     },
  { path:"/lead"        , handler: handleLead     },
  { path:"/lead/:config", handler: handleLead     },
  { path:"/resume"      , handler: handleResume   },
  { path:"/blog"        , handler: handleBlog     },
  { path:"/blog/:id"    , handler: handleBlog     },
  { path:"/projects"    , handler: handleProjects },
  { path:"/projects/:id", handler: handleProjects },
  { path:"/contact"     , handler: handleContact  }
].map(route => Object.assign( route, { regex: pathToRegexp(route.path) }))


export default function handler(request: Request): Response {
  const url = new URL(request.url)
  for (const route of routes) {
    const matchRoute = route.regex.exec(url.pathname);
    if (matchRoute) {
      console.log(`process request at: ${url.pathname}`)
      return route.handler(request, matchRoute)
    }
  }

  console.warn(`unknown route: ${url.pathname}`)
  return new Response('404', { status: 404 })
}
