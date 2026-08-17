import type { Metadata } from "next"
import { PlayDeck } from "../../components/play-deck"
import { ideas } from "../../lib/catalog"

export const metadata: Metadata = {
  title: "Play",
  description: "Find and play a family activity in your browser. No account or download needed."
}

export default function PlayPage() {
  return <PlayDeck ideas={ideas} />
}
