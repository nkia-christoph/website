import { h, FC } from "core"
import { Fragment } from "nano/fragment.ts"
import { marked } from "marked"


const loadArticle = (props: any): string => {
  const stringified:string = JSON.parse( Deno.readTextFileSync(
    "./cache/pages/" + props.name + "/" + props.id + ".json"
  )).content_en

  return marked.parse(stringified)
}

export const Article = (props: any): FC|void => <>
  { props.id &&
    <article>
      <div innerHTML={{ __dangerousHtml: `${loadArticle(props)}` }} />
    </article>
  }
</>