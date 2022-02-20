import { h, Fragment, FC, Helmet, Router } from "nano"
import { SocialHelmet, ISocial } from "../components/SocialHelmet.tsx"
import { Navigation } from "../components/Navigation.tsx"


const Lead: FC = () => {
  const defaultSocial: ISocial = {
    author:      "",
    discription: "Software Consultant & Developer",
    image:       "",
    keywords:    "",
    lang:        "en",
    title:       "",
    type:        "website"
  }

  return <>
    <Helmet>
      <html lang="en" amp />
      <body class="root" />
      <body class="main" id="id" />
      <SocialHelmet social={ defaultSocial }/>
    </Helmet>
    <Navigation />
    <main>
      <section id="lead">

      </section>
    </main>
  </>
}

export default Lead