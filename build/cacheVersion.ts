import { VERSION } from "nano/version.ts"
import { IVersion } from "../app/interfaces.ts"


console.log("caching version...")

const dirFlag = "--dist-dir"
const distArg: string|null = Deno.args?.find( arg => arg.startsWith(dirFlag)) ?? null
const distDir: string|null = distArg?.slice(dirFlag.length+1) ?? null
if (distDir === null) throw(`incorrect arguments: ${Deno.args.join(" ")}`)

const versionDir = `${distDir}/cache/data` as string
Deno.mkdir(versionDir, { recursive: true })

const version: IVersion = {
  ...Deno.version,
  nanojsx: VERSION,
  deploy_date: Deno.env.get("BUILD_DATE") ?? "1969-07-20T20:17+00:00"
}

Deno.writeTextFile(
  `${versionDir}/version.json`,
  JSON.stringify(version, null, 2),
  { create: true }
)

console.log("caching complete")
