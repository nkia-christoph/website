import { h, FC } from "core"
import { Fragment } from "nano/fragment.ts"
import { Helmet } from "nano/components/helmet.ts"
import { marked } from "marked"
import { SocialHelmet, ISocial } from "../components/SocialHelmet.tsx"
import { loadPage } from "../lib/util.ts"


const countWords = (text: string): number => text.split(' ').filter(n => n != '' ).length

export const Article = (route: any): FC => {

  const pageData = loadPage<any>(route)
  const html: string = marked.parse(pageData.content_en)
  const wordCount = countWords(pageData.content_en)
  const timeReq = wordCount / 238

  const defaultSocial: ISocial = {
    author:      "Christoph Kröppl",
    discription: pageData.discription,
    image:       pageData.image,
    keywords:    pageData.seo,
    lang:        "en",
    title:       pageData.name,
    type:        "article",
  }
  
  return <>
    <Helmet><SocialHelmet social={ defaultSocial }/></Helmet>
    <main>
      <article itemscope itemtype="https://schema.org/Article/TechArticle">
        <div class="tags">tags <span itemprop="keywords">{ pageData.seo }</span></div>
        <h1 itemprop="name headline">{ pageData.name }</h1>
        <div class="author">by <span itemprop="author">{ "" }</span></div>
        <div class="date-created">publisehd: <span itemprop="dateCreated">{ "" }</span></div>
        { pageData.dateModified &&
          <div class="date-modified">modified: <span itemprop="dateModified">{ "" }</span></div>}
        <div class="seo-only" itemprop="datePublished">{ "" }</div>
        <div class="seo-only" itemprop="inLanguage">{ "" }</div>
        <div class="seo-only" itemprop="wordcount">{ wordCount }</div>
        <div class="time-required">time required: <span itemprop="timeRequired">{ timeReq }</span></div>
        <div class="article" itemprop="text" innerHTML={{ __dangerousHtml: `${html}` }} />
      </article>
    </main>
  </>
}