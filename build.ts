const flags = [
  { name: "--import-map", deno: true,  req: true  },
  { name: "--dist-dir"  , deno: false, req: true  },
  { name: "--watch"     , deno: true,  req: false },
  { name: "-w"          , deno: false, req: false }
]

const buildFiles = [
  "build/cacheDb.ts",
  "build/cacheVersion.ts",
  "build/processCss.ts"
]


function validateArgs(args: string[]): void {
  const reqFlags = flags.filter( ({ req }) => req )
  const hasReqFlags: boolean = reqFlags
    .every( ({ name }) => args.some( arg => arg.startsWith(name)))
  if (!hasReqFlags) {
    const missingArgs: string = reqFlags
      .filter( ({ name }) => !args.includes(name)).join(" ")
    throw(`error: mising arguments: ${missingArgs}`)
  }

  const unknownArgs: string[] = args.filter( arg => {
    return !flags.some( ({ name }) => arg.startsWith(name))
  })
  if (unknownArgs.length) {
    throw(`error: unknown arguments: ${unknownArgs.join(" ")}`)
  }
}


async function subProcess(file: string, denoArgs: string[], custArgs: string[]): Promise<void> {

  const process = Deno.run({
    cmd: [
      "deno",
      "run",
      "-A",
      "--unstable", // processCss needs deno.futime
      ...denoArgs,
      file,
      ...custArgs
    ],
    stdout: "piped",
    stderr: "piped",
  })

  const { code } = await process.status()
  const rawOutput = await process.output()
  const rawError = await process.stderrOutput()

  if (code === 0) {
    await Deno.stdout.write(rawOutput)
  } else {
    const errorString = new TextDecoder().decode(rawError)
    console.error(errorString)
  }
}


console.log("starting build process...")

await validateArgs(Deno.args)
const denoArgs = Deno.args
  .filter( arg => flags.some( ({ deno, name }) => deno === true && arg.startsWith(name)))
const custArgs = Deno.args
  .filter( arg => flags.some( ({ deno, name }) => deno === false && arg.startsWith(name)))

await Promise.all(buildFiles.map( file => subProcess(file, denoArgs, custArgs)))

console.log("build complete")