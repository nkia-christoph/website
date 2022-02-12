import { h, FC, Link } from "nano"

export const Navigation: FC = () => {
  return <section id="navbar">
    <div class="navbar">
      <h1>NavBar</h1>
      <div class="hamburger">
        <span />
        <span />
        <span />
      </div>
      <div class="menu">
        <Link prefetch href="/home" children={`Home`} />
        <Link prefetch href="/resume" children={`Rersume`} />
        <Link prefetch href="/blog" children={`Blog`} />
        <Link prefetch href="/projects" children={`Projects`} />
        <Link prefetch href="/contact" children={`Contact`} />
      </div>
    </div>
  </section>
}
