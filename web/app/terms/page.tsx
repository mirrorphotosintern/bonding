import { site } from "../../lib/site"

export const metadata = { title: "Terms of Use" }

export default function TermsPage() {
  return (
    <article className="legal">
      <p className="eyebrow blue">LAST UPDATED JULY 31, 2026</p>
      <h1>Terms of Use</h1>
      <p>
        Try This provides optional activity ideas for parents, caregivers, and
        families. Adults remain responsible for deciding whether an activity is
        suitable for their children, home, materials, and surroundings.
      </p>
      <h2>Use common sense</h2>
      <p>
        Supervise children, use age-appropriate materials, avoid choking and
        tripping hazards, and stop any activity that feels unsafe or
        uncomfortable.
      </p>
      <h2>Beta software</h2>
      <p>
        The beta may contain incomplete content or errors and may change without
        notice. It is provided as-is during testing.
      </p>
      <h2>Content</h2>
      <p>
        Original app text, design, and software belong to {site.company}.
        Source-attributed ideas remain credited and linked where applicable.
      </p>
      <h2>Contact</h2>
      <p>
        Questions can be sent to{" "}
        <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
      </p>
    </article>
  )
}
