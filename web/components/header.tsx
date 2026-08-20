import Link from "next/link"
import { site } from "../lib/site"

export function Header() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label={`${site.name} home`}>
        Try This<span>.</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/#kannada-games">Kannada games</Link>
        <Link href="/#all-ideas">All ideas</Link>
        <Link className="nav-cta" href="/#choose">Play now →</Link>
      </nav>
    </header>
  )
}
