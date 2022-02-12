import { renderSSR, Helmet, FC } from "nano"
import { initSSR } from "nano/ssr.ts"
import { serve } from "std/http/server.ts"
import handler from "./router.ts"


initSSR()

export function renderPage(fc: FC, props?: object): string {
  const ssr = renderSSR(fc(props || {}))
  const { body, head, footer, attributes } = Helmet.SSR(ssr)

  const html = `
  <!DOCTYPE html>
  <html ${attributes.html.toString()}>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
