import { h, Fragment, FC, Helmet, Router } from "nano"
import { Navigation } from "../components/Navigation.tsx"
import { Article } from "../components/Article.tsx"
import { Footer } from "../components/Footer.tsx"


const Home: FC = () => {
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
      <Footer />
    </div>
  </>
}

export default Home