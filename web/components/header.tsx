import Link from "next/link"
import { site } from "../lib/site"

export function Header() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label={`${site.name} home`}>
        Try This<span>.</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/#how-it-works">How it works</Link>
        <Link href="/#ideas">Sample ideas</Link>
        <a className="nav-cta" href={site.testFlightUrl}>
          Join the beta ↗
        </a>
      </nav>
    </header>
  )
}
