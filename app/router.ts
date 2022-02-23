import { pathToRegexp } from "pathToRegexp"
import { handleHome, handleLead, handleResume, handleBlog, handleProjects, handleContact } from "./controller.ts"


interface IPageRoute {
  path: string
  regex: RegExp
  handler: (req: Request, match: RegExpExecArray) => Response
}

export interface IAssetRoute {
  path: string
  regex: RegExp
  type: string
}


const pageRoutes: IPageRoute[] = [
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

const assetRoutes: IAssetRoute[] = [
  { path:"styles/style.css", regex: /.*\/style.css\/?$/, type: "text/css"               },
  { path:"favicon.ico"     , regex: null               , type: "image/x-icon"           },
  { path:"sw.js"           , regex: null               , type: "application/javascript" }
].map(route => (route.regex === null) 
  ? Object.assign( route, { regex: pathToRegexp(route.path) })
  : route
)



export default function handler(request: Request): Response {
  const url = new URL(request.url)

  for (const assetRoute of assetRoutes) {
    const matchRoute = assetRoute.regex.exec(url.pathname)
    if (matchRoute) {
      console.log(`process asset request at: ${url.pathname}`)
      const asset = Deno.readTextFileSync("./dist/" + assetRoute.path)
      return new Response(asset, { headers: { "Content-Type": assetRoute.type } })
    }
  }

  for (const pageRoute of pageRoutes) {
    const matchRoute = pageRoute.regex.exec(url.pathname)
    if (matchRoute) {
      console.log(`process page request at: ${url.pathname}`)
      return pageRoute.handler(request, matchRoute)
    }
  }

  console.warn(`unknown route: ${url.pathname}`)
  return new Response('404', { status: 404 })
}
