import { site } from "../../lib/site"

export const metadata = { title: "Privacy Policy" }

export default function PrivacyPage() {
  return (
    <article className="legal">
      <p className="eyebrow blue">LAST UPDATED JULY 31, 2026</p>
      <h1>Privacy Policy</h1>
      <p>
        Try This Fun is designed to work without an account. Family
        preferences, saved activities, and setup choices are stored on your
        device.
      </p>
      <h2>Information we collect</h2>
      <p>
        The current beta does not ask for names, children’s names, email
        addresses, precise locations, photographs, contacts, or advertising
        identifiers.
      </p>
      <p>
        We do not receive or store your family’s activity choices, saved ideas,
        or on-device settings. If you follow an optional link to an original
        public source, that destination has its own privacy practices.
      </p>
      <p>
        The browser version can store saved-idea identifiers in your browser’s
        local storage. They remain on that device and can be cleared through
        your browser settings. Playing and browsing do not require an account.
      </p>
      <h2>App distribution</h2>
      <p>
        Apple may collect diagnostic and beta-testing information when you use
        TestFlight. Google may collect information related to installing,
        updating, or operating an app distributed through Google Play. Apple
        and Google handle that information under their own privacy policies.
      </p>
      <h2>Permissions</h2>
      <p>
        The current beta does not use your camera, contacts, photos, or precise
        location. It does not record or transmit audio. If a future feature
        needs a new permission or changes how information is handled, we will
        update this policy before enabling it.
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
