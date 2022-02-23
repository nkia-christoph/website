import Pgsp from "../app/lib/Pgsp.js"


console.log("caching data...")

const pathToPages = "./app/dist/cache/pages"
const pathToData = "./app/dist/cache/data"

const sheetSettings = [
  { name: "general"     , path: pathToData , split: false },
  { name: "sensitive"   , path: pathToData , split: false },
  { name: "cv"          , path: pathToData , split: false },
  { name: "testimonials", path: pathToData , split: false },
  { name: "projects"    , path: pathToPages, split: true  },
  { name: "blog"        , path: pathToPages, split: true  }
]

sheetSettings.filter(config => config.split).forEach( ({ path, name }) => Deno.mkdir(path + "/" + name , { recursive: true }))
Deno.mkdir(pathToData, { recursive: true })

const spreadsheetId: string|null = Deno.env.get("SHEET_ID") ?? null
if (spreadsheetId === null) throw("ERROR: SHEET_ID not configured. Caching aborted.")
const parser = new Pgsp(spreadsheetId)

// generate json cache
sheetSettings.forEach( async({ name, path, split }) => {
  await parser.parse(spreadsheetId, name).then( rows => {
    if (split) {
      rows.forEach( (row: any) => {
        Deno.writeTextFile(
          `${path}/${name}/${row.id}.json`,
          JSON.stringify(row, null, 2),
          { create: true }
        )
      })
    } else {
      Deno.writeTextFile(
        `${path}/${name}.json`,
        JSON.stringify(rows, null, 2),
        { create: true }
      )
    }
  })
})

console.log("caching complete")
