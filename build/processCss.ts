/// <reference types="https://deno.land/x/postcss@8.4.6/lib/postcss.d.ts" />

import postcss from "https://deno.land/x/postcss@8.4.6/mod.js"
import { AcceptedPlugin } from "https://deno.land/x/postcss@8.4.6/lib/postcss.d.ts"
import postcssNesting from "https://cdn.jsdelivr.net/npm/postcss-nesting@10/mod.js"
import autoprefixer from "https://deno.land/x/postcss_autoprefixer@0.1.1/mod.js"


const supported = ["css", "scss", "sass", "less"]
const sourceCssDir = "./app/styles"
const dirFlag = "--dist-dir"
const distArg: string|null = Deno.args?.find( arg => arg.startsWith(dirFlag)) ?? null
const distDir: string|null = distArg?.slice(dirFlag.length+1) ?? null
if (distDir === null) throw(`incorrect arguments: ${Deno.args.join(" ")}`)

const targetCssDir = `${distDir}/styles` as string
Deno.mkdir(targetCssDir, { recursive: true })


/**
 * process stylesheets and store in dist folder
 * 
 * @param cssPaths array of paths
 */
function processStylesheets(cssPaths: string[]): void {
  for (const fullPath of cssPaths) {
    const fullName = fullPath.replace(/^.*[\\\/]/, "")
    const dotIndex = fullName.lastIndexOf(".")
    const ending = fullName.slice(dotIndex+1)
    if (!supported.includes(ending)) continue
    const name = fullName.slice(0, dotIndex)

    const from = fullPath
    const to = `${targetCssDir}/${name}.css` as string
    const file = Deno.readTextFileSync(from)

    /// <reference types="https://deno.land/x/postcss@8.4.6/lib/postcss.d.ts" />
    postcss([
      postcssNesting,
      autoprefixer,
    ] as AcceptedPlugin[])
    .process(file, {
      from: from,
      to: to
    })
    .then( result => {
      Deno.writeTextFile(to, result.css, { create: true })
      if (result.map) Deno.writeTextFileSync(`${to}.map`, result.map.toString(), { create: true }) 
      result?.warnings()?.forEach( warn => console.warn(warn.toString()))
      console.log(`processed ${name}.${ending} ==> ${name}.css`)
    })
  }
}


console.log("processing stylesheets...")

// TODO make async
for (const dirEntry of Deno.readDirSync(sourceCssDir)) {
  const path = `${sourceCssDir}/${dirEntry.name}` as string
  if (dirEntry.isFile) processStylesheets([path])
}

console.log("processing complete")


if (Deno.args.includes("-w") || Deno.args.includes("--watch")) {
  console.log("watching stylesheet changes...")
  const fsWatcher = Deno.watchFs(sourceCssDir)
  for await (const fsEvent of fsWatcher) {
    if (!["", "create", "modify"].indexOf(fsEvent.kind)) continue
    console.log("stylesheet changed. processing...")
    processStylesheets(fsEvent.paths)
  }
}
