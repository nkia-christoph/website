import { renderPage } from "./server.ts"
import Pgsp from "./lib/Pgsp.js"
import Home from "./view/Home.tsx"
import Resume from "./view/Resume.tsx"
import Lead from "./view/Lead.tsx"
import Blog from "./view/Blog.tsx"
import Projects from "./view/Projects.tsx"
import Contact from "./components/Contact.tsx"


export function handleHome(request: Request, match: RegExpExecArray) {
  const html = renderPage(Home)
  return new Response(html, { headers: { "Content-Type": "text/html" } })
}
export function handleContact(request: Request, match: RegExpExecArray) {
  const html = renderPage(Contact)
  return new Response(html, { headers: { "Content-Type": "text/html" } })
}
export function handleResume(request: Request, match: RegExpExecArray) {
  const html = renderPage(Resume)
  return new Response(html, { headers: { "Content-Type": "text/html" } })
}
export function handleLead(request: Request, match: RegExpExecArray) {
  const config: string|null = match[1] || null
  const html = renderPage(Lead, { config: config })
  return new Response(html, { headers: { "Content-Type": "text/html" } })
}
export function handleBlog(request: Request, match: RegExpExecArray) {
  const blogId: string|null = match[1] || null
  const html = renderPage(Blog, { id: blogId, name: "blog" })
  return new Response(html, { headers: { "Content-Type": "text/html" } })
}
export function handleProjects(request: Request, match: RegExpExecArray) {
  const projId: string|null = match[1] || null
  const html = renderPage(Projects, { id: projId, name: "projects" })
  return new Response(html, { headers: { "Content-Type": "text/html" } })
}
