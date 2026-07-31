import { site } from "../../lib/site"

export const metadata = { title: "Privacy Policy" }

export default function PrivacyPage() {
  return (
    <article className="legal">
      <p className="eyebrow blue">LAST UPDATED JULY 31, 2026</p>
      <h1>Privacy Policy</h1>
      <p>
        Try This is designed to work without an account. Family preferences,
        saved activities, and setup choices are stored on your device.
      </p>
      <h2>Information we collect</h2>
      <p>
        The current beta does not ask for names, children’s names, email
        addresses, precise locations, photographs, contacts, or advertising
        identifiers.
      </p>
      <h2>TestFlight</h2>
      <p>
        Apple may collect diagnostic and beta-testing information when you use
        TestFlight. Apple handles that information under its own privacy policy.
      </p>
      <h2>External links</h2>
      <p>
        Some activities may link to their original public source. Those sites
        have their own privacy practices.
      </p>
      <h2>Contact</h2>
      <p>
        Questions or deletion requests can be sent to{" "}
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
      </p>
    </article>
  )
}
