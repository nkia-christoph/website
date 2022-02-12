import { h, FC } from "nano"
import { IVersion } from "../interfaces.ts"


const loadVersion = (): IVersion => JSON.parse(Deno.readTextFileSync("./cache/data/version.json"))

export const Footer: FC = () => {
  const version = loadVersion()

  return <section id="footer">
    <div class="version">
      <p class="serverversion">Built with NanoJSX {version.nanojsx} on Deno {version.deno}</p>
      <p class="deploydate">Last build: {new Date(version.deploy_date).toLocaleTimeString()}</p>
    </div>
  </section>
}
