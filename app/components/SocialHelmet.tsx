import { h, FC, Fragment } from "nano"


export interface ISocial {
  author:      string
  discription: string
  image:       string
  keywords:    string
  lang:        string
  title:       string
  type:        string
}
  
export const SocialHelmet: FC<{ social: ISocial }> = ({ social: {
  author,
  discription,
  image,
  keywords,
  lang,
  title,
  type
} }) => <>
  { author &&
    <meta name="author"              content={ author } />}
  { discription && <>
    <meta name="discription"         content={ discription } />
    <meta property="og:discription"
          name="twitter:discription" content={ discription } /></>}
  { image &&
    <meta property="og:image:url"
          name="twitter:image"       content={ image } />}
  { keywords &&
    <meta property="og:image:alt"
          name="keywords"            content={ keywords } />}
  { lang &&
    <meta property="og:locale"       content={ lang } />}
  { title && <>
    <title>{ title }</title>
    <meta property="og:title"
          name="twitter:title"       content={ title } /></>}
  { type &&
    <meta property="og:type"         content={ type } />}
</>
