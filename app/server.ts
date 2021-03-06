import { renderSSR, Helmet, FC } from "nano"
import { initSSR } from "nano/ssr.ts"
import { serve } from "std/http/server.ts"
import handler from "./router.ts"


initSSR()

export function renderPage(fc: FC, props?: Record<string, unknown>): string {
  const ssr = renderSSR(fc(props || {}))
  const { body, head, footer, attributes } = Helmet.SSR(ssr)

  const html = `
  <!DOCTYPE html>
  <html ${attributes.html.toString()}>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="twitter:card" content="summary_large_image"></meta>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/modern-normalize/1.1.0/modern-normalize.min.css">
      <link rel="stylesheet" type="text/css" href="style.css">
      ${head.join('\n')}
    </head>
    <body ${attributes.body.toString()}>
      ${body}
      ${footer.join('\n')}
    </body>
  </html>`

  return html
}


console.log(`HTTP webserver running.`)
await serve(handler, { port: 8080 })
