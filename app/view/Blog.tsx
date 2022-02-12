import { h, Fragment, FC, Helmet, Router } from "nano"
import { Navigation } from "../components/Navigation.tsx"
import { Article } from "../components/Article.tsx"


const Blog: FC = (article: any) => {
  return <>
    <div>
      <Helmet>
        <html lang="en" amp />
        <body class="root" />
        <body class="main" id="id" />
        <title>Christoph Kröppl</title>
        <meta name="description" content="Nano JSX Application" />
      </Helmet>
      <Navigation />
      <Article id={ article.id } name={ article.name }/>
    </div>
  </>
}

export default Blog