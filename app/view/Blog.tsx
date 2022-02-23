import { h, Fragment, FC, Helmet, Router } from "nano"
import { SocialHelmet, ISocial } from "../components/SocialHelmet.tsx"
import { Navigation } from "../components/Navigation.tsx"
import { Article } from "../components/Article.tsx"


const Blog: FC = ({ slug: id }: any) => {
  const defaultSocial: ISocial = {
    author:      "",
    discription: "",
    image:       "",
    keywords:    "",
    lang:        "en",
    title:       "",
    type:        "website"
  }

  return <>
    <Helmet>
      <html lang={ defaultSocial.lang } amp />
      <body class="root" />
      <body class="main" id="id" />
      <SocialHelmet social={ defaultSocial }/>
    </Helmet>
    <Navigation />
    { id &&
      <Article id={ id } name="blog"/>}
  </>
}

export default Blog