import { h, Fragment, FC, Helmet, Router } from "nano"
import { SocialHelmet, ISocial } from "../components/SocialHelmet.tsx"
import { Navigation } from "../components/Navigation.tsx"


const Resume: FC = () => {
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
      <html lang={ defaultSocial.lang } amp />
      <body class="root" />
      <body class="main" id="id" />
      <SocialHelmet social={ defaultSocial }/>
    </Helmet>
    <Navigation />
    <main itemscope itemtype="http://schema.org/tech">
      <section id="resume" itemscope itemtype="https://schema.org/Person">
        <img src="" itemprop="image" alt="Photo of Christoph"/>
        <span itemprop="name">""</span>
        <span itemprop="jobTitle discription">Software Consultant U+0026 Developer</span>
        <span itemprop="gender">Male</span>
        {/*<span itemprop="owns brand affiliation">NKIA LLC</span>*/}
        <span itemprop="alumniOf">""</span>
        <span itemprop="birthDate">""</span>
        <span itemprop="birthPlace">""</span>
        <span itemprop="nationality">""</span>
        <span itemprop="telephone">""</span>
        <span itemprop="email">""</span>
        <span itemprop="url">""</span>

      </section>
    </main>
  </>
}

export default Resume