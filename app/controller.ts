import { FC } from "nano"
import { renderPage } from "./server.ts"
import Pgsp from "./lib/Pgsp.js"


export function handleDefault(app: FC, pathMatch: RegExpExecArray|undefined): Response {
  const slug: string|null = pathMatch ? pathMatch[1] : null
  const html = renderPage(app, { slug: slug })
  return new Response(html, { headers: { "Content-Type": "text/html" } })
}
export function handleLead(app: FC, pathMatch: RegExpExecArray|undefined): Response {
  const slug: string|null = pathMatch ? pathMatch[1] : null
  const html = renderPage(app, { slug: slug })
  return new Response(html, { headers: { "Content-Type": "text/html" } })
}
export function handleResume(app: FC, pathMatch: RegExpExecArray|undefined): Response {
  const slug: string|null = pathMatch ? pathMatch[1] : null
  const html = renderPage(app, { slug: slug })
  return new Response(html, { headers: { "Content-Type": "text/html" } })
}
