import { FC } from "nano"
import { pathToRegexp } from "pathToRegexp"
import { handleDefault, handleLead, handleResume } from "./controller.ts"
import Home from "./view/Home.tsx"
import Resume from "./view/Resume.tsx"
import Lead from "./view/Lead.tsx"
import Blog from "./view/Blog.tsx"
import Projects from "./view/Projects.tsx"
import Contact from "./components/Contact.tsx"


interface IPageRoute {
  path: string
  regex: RegExp
  app: FC
  controller: (app: FC, match?: RegExpExecArray|undefined) => Response
}

export interface IAssetRoute {
  path: string
  regex: RegExp
  type: string
}


const pageRoutes: IPageRoute[] = [
  { path:""             , app: Home    , controller: handleDefault },
  { path:"/"            , app: Home    , controller: handleDefault },
  { path:"/home"        , app: Home    , controller: handleDefault },
  { path:"/lead"        , app: Lead    , controller: handleLead    },
  { path:"/lead/:config", app: Lead    , controller: handleLead    },
  { path:"/resume"      , app: Resume  , controller: handleResume  },
  { path:"/blog"        , app: Blog    , controller: handleDefault },
  { path:"/blog/:id"    , app: Blog    , controller: handleDefault },
  { path:"/projects"    , app: Projects, controller: handleDefault },
  { path:"/projects/:id", app: Projects, controller: handleDefault },
  { path:"/contact"     , app: Contact , controller: handleDefault }
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
    const matchAsset = assetRoute.regex.exec(url.pathname)
    if (matchAsset) {
      console.log(`process asset request at: ${url.pathname}`)
      const asset = Deno.readTextFileSync("./dist/" + assetRoute.path)
      return new Response(asset, { headers: { "Content-Type": assetRoute.type } })
    }
  }

  for (const pageRoute of pageRoutes) {
    const matchPage = pageRoute.regex.exec(url.pathname);
    if (matchPage) {
      console.log(`process page request at: ${url.pathname}`)
      return pageRoute.controller(pageRoute.app, matchPage)
    }
  }

  console.warn(`unknown route: ${url.pathname}`)
  return new Response('404', { status: 404 })
}
