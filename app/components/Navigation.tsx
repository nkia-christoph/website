import { h, FC, Link } from "nano"

export const Navigation: FC = () => {
  return <nav>
    <section id="navbar">
      <div class="navbar">
        <div class="hamburger">
          <span />
          <span />
          <span />
        </div>
        <div class="menu">
          <Menu:toolbar>
            <Link prefetch href="/home" children={`Home`} />
            <Link prefetch href="/resume" children={`Rersume`} />
            <Link prefetch href="/blog" children={`Blog`} />
            <Link prefetch href="/projects" children={`Projects`} />
            <Link prefetch href="/contact" children={`Contact`} />
          </Menu:toolbar>
        </div>
      </div>
    </section>
  </nav>
}
