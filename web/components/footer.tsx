import Link from "next/link"
import { site } from "../lib/site"

export function Footer() {
  return (
    <footer>
      <div>
        <Link className="footer-mark" href="/">
          Try This<span>.</span>
        </Link>
        <p>One good thing to do together, right now.</p>
      </div>
      <div className="footer-links">
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <a href={`mailto:${site.supportEmail}`}>Support</a>
      </div>
      <small>© {new Date().getFullYear()} {site.company}</small>
    </footer>
  )
}
