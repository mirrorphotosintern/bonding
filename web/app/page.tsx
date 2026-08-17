import Link from "next/link"
import { examples, site } from "../lib/site"

const intentions = [
  ["✦", "Surprise us", "Anything goes", "sun"],
  ["↝", "Burn energy", "Get bodies moving", "coral"],
  ["✂", "Make a thing", "Build, draw, fold", "sun"],
  ["❞", "Talk & laugh", "Stories and games", "mint"],
  ["?", "Puzzle us", "Guess, think, perform", "lavender"],
  ["✋", "Do a real job", "Help, but make it fun", "mint"]
] as const

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: site.name,
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. No account required.",
    applicationCategory: "LifestyleApplication",
    description: site.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">FOR FAMILIES WITH A FEW MINUTES</p>
          <h1>
            Less deciding.
            <br />
            <span>More doing.</span>
          </h1>
          <p className="lede">
            Tell us what kind of moment you have. We’ll hand you one playful,
            genuinely doable thing to try together.
          </p>
          <div className="store-actions" aria-label="Try This now">
            <Link className="button button-sun" href="/play/">
              Play in your browser <span>→</span>
            </Link>
            <a className="button button-paper" href={site.testFlightUrl}>
              Get the iPhone beta <span>↗</span>
            </a>
          </div>
          <p className="button-note">
            No account. No download. Works on phones, tablets, and computers.
          </p>
        </div>

        <div className="picker" aria-label="A preview of the Try This app">
          <div className="picker-shadow" />
          <div className="picker-panel">
            <p className="eyebrow blue">RIGHT NOW</p>
            <h2>What sounds good?</h2>
            <p>Pick the kind of moment you want. We’ll choose the activity.</p>
            <div className="intent-grid">
              {intentions.map(([icon, title, note, color], index) => (
                <div className={`intent ${index === 0 ? "selected" : ""}`} key={title}>
                  <span className={`intent-icon ${color}`}>{icon}</span>
                  <strong>{title}</strong>
                  <small>{note}</small>
                </div>
              ))}
            </div>
            <span className="fake-button">Try this →</span>
          </div>
        </div>
      </section>

      <section className="principle-strip" aria-label="Product principles">
        <span>No account needed</span>
        <span>Clear instructions</span>
        <span>Made for real family life</span>
      </section>

      <section className="how section" id="how-it-works">
        <div className="section-heading">
          <p className="eyebrow blue">HOW IT WORKS</p>
          <h2>From “what should we do?”<br />to doing it.</h2>
        </div>
        <div className="steps">
          <article>
            <span className="step-mark sun">01</span>
            <h3>Pick the mood</h3>
            <p>Move, make, talk, puzzle, help—or let us surprise you.</p>
          </article>
          <article>
            <span className="step-mark lavender">02</span>
            <h3>Set the moment</h3>
            <p>Choose your setup and how many people are playing.</p>
          </article>
          <article>
            <span className="step-mark mint">03</span>
            <h3>Try one thing</h3>
            <p>Get playful instructions without digging through an endless list.</p>
          </article>
        </div>
      </section>

      <section className="ideas section" id="ideas">
        <div className="section-heading">
          <p className="eyebrow">A FEW THINGS YOU MIGHT TRY</p>
          <h2>Small ideas.<br />Properly explained.</h2>
        </div>
        <div className="idea-grid">
          {examples.map((idea) => (
            <article className="idea-card" key={idea.title}>
              <div className="idea-meta">
                <span className={`idea-icon ${idea.color}`}>{idea.icon}</span>
                <span>{idea.time}</span>
              </div>
              <h3>{idea.title}</h3>
              <p>{idea.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="closing">
        <div>
          <p className="eyebrow">YOUR NEXT GOOD MEMORY CAN START SMALL</p>
          <h2>Got five minutes?</h2>
        </div>
        <div className="store-actions closing-actions">
          <Link className="button button-sun" href="/play/">
            Find something to do <span>→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
