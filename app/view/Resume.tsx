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
        <div itemprop="name">""</div>
        <div itemprop="jobTitle discription">Software Consultant &amp; Developer</div>
        <div class="seo-only" classitemprop="gender">Male</div>
        {/*<div itemprop="owns brand affiliation">NKIA LLC</div>*/}
        <div itemprop="alumniOf">""</div>
        <div itemprop="birthDate">""</div>
        <div class="seo-only"itemprop="birthPlace">"seo"</div>
        <div itemprop="nationality">""</div>
        <div itemprop="telephone">""</div>
        <div itemprop="email">""</div>
        <div class="seo-only" itemprop="url">""</div>

      </section>
    </main>
  </>
}

export default Resume