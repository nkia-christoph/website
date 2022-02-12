import { h, Fragment, FC, Helmet, Router } from "nano"
import { Navigation } from "../components/Navigation.tsx"


const Lead: FC = () => {
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
    </div>
  </>
}

export default Lead