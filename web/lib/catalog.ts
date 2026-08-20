import { ideas as mobileIdeas } from "../../src/data/ideas"
import { getSourceIdeaPlaybook } from "../../src/data/source-ideas"
import { getGameArtworkIndex } from "../../src/data/game-artwork-manifest"

export type IdeaMode = "make" | "move" | "think" | "talk" | "help" | "perform"

export type HowToPlay = Record<string, string>

export type WebIdea = {
  id: string
  title: string
  mode: IdeaMode
  oneLiner: string
  description: string
  ages: string[]
  situations: string[]
  duration: [number, number]
  materials: "none" | "household" | "special"
  tags: string[]
  howToPlay: HowToPlay
  sourceUrl?: string | null
  collection?: "kannada" | null
  artworkUrl?: string | null
  videoUrl?: string | null
  videoPosterUrl?: string | null
}

const kannadaArtwork: Readonly<Record<string, string>> = {
  kn_aane_bantond_aane: "/game-art/kannada/aane-bantond-aane.webp",
  kn_avalakki_pavalakki: "/game-art/kannada/avalakki-pavalakki.webp",
  kn_hebberalanna: "/game-art/kannada/hebberalanna.webp",
  kn_oota_yaarige: "/game-art/kannada/oota-yaarige.webp"
}

const appIdeas: WebIdea[] = mobileIdeas.map((idea): WebIdea => {
  if (idea.activity) {
    const activity = idea.activity
    return {
      id: activity.id,
      title: activity.title,
      mode: activity.mode,
      oneLiner: activity.oneLinePromise,
      description: activity.theIdea,
      ages: activity.ageBands,
      situations: activity.places,
      duration: [activity.durationPlayMin, activity.durationPlayMax],
      materials: activity.materials.length ? "household" : "none",
      tags: [activity.mode, ...activity.places, ...activity.mechanics],
      howToPlay: {
        say: activity.introLine,
        ...(activity.heritage ? {
          lyrics: activity.heritage.lyricsKannada,
          say_aloud: activity.heritage.transliteration,
          family_version: activity.heritage.versionNote
        } : {}),
        setup: activity.prepChecklist.join(" "),
        steps: activity.steps.map((step) => step.text).join(" "),
        turns: `${activity.adultRole} ${activity.childRole}`,
        easier: activity.saferVariant || activity.ifItFlops,
        recovery: activity.ifItFlops,
        end: activity.endingPrompt
      },
      sourceUrl: activity.sourceDemoUrl,
      collection: activity.heritage?.collection ?? null,
      artworkUrl: kannadaArtwork[activity.id] ?? null,
      videoUrl: activity.heritage?.demoVideoPath ?? null,
      videoPosterUrl: activity.heritage?.demoPosterPath ?? null
    }
  }

  if (idea.conversationGame) {
    const game = idea.conversationGame
    return {
      id: game.id,
      title: game.title,
      mode: "talk",
      oneLiner: game.oneBreathRule,
      description: game.oneBreathRule,
      ages: game.ageBands,
      situations: game.fit.situations,
      duration: game.durationMinutes,
      materials: "none",
      tags: [game.mechanic, game.fit.volume],
      howToPlay: {
        say: game.firstPrompt,
        steps: game.adultModel,
        turns: "Take one turn each, then let the next person lead.",
        easier: game.easier,
        harder: game.harder,
        mixed_ages: game.mixedAges,
        recovery: game.childRemix,
        end: game.closeLine
      },
      sourceUrl: null
    }
  }

  const source = idea.sourceIdea!
  const playbook = getSourceIdeaPlaybook(source)
  return {
    id: source.id,
    title: source.title,
    mode: idea.mode,
    oneLiner: playbook.summary,
    description: playbook.summary,
    ages: idea.ageBands,
    situations: idea.places,
    duration: [idea.durationMin, idea.durationMax],
    materials: idea.materialCount ? "household" : "none",
    tags: [source.category, idea.mode],
    howToPlay: {
      steps: playbook.steps.join(" "),
      recovery: playbook.remix
    },
    sourceUrl: source.sourceUrl
  }
})

// Web and native deliberately share one reviewed 98-game catalog. New research
// stays in docs until it is promoted into both products together.
export const ideas: WebIdea[] = appIdeas

export function getOriginalArtworkIndex(id: string): number {
  return getGameArtworkIndex(id) ?? -1
}

export const catalogCount = ideas.length
