import { PlayDeck } from "../components/play-deck"
import { ideas } from "../lib/catalog"
import { site } from "../lib/site"

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
      <PlayDeck ideas={ideas} />
    </>
  )
}
