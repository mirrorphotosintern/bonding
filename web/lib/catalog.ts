import catalog from "../../docs/ideas/ideas.json"
import { ideas as mobileIdeas } from "../../src/data/ideas"
import { getSourceIdeaPlaybook } from "../../src/data/source-ideas"

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
}

const reviewedIdeas = catalog.ideas as unknown as WebIdea[]

function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]/g, "")
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
      tags: [activity.mode, ...activity.places],
      howToPlay: {
        say: activity.introLine,
        setup: activity.prepChecklist.join(" "),
        steps: activity.steps.map((step) => step.text).join(" "),
        turns: `${activity.adultRole} ${activity.childRole}`,
        easier: activity.saferVariant || activity.ifItFlops,
        recovery: activity.ifItFlops,
        end: activity.endingPrompt
      }
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
      }
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
    }
  }
})

const mobileTitles = new Set(appIdeas.map((idea) => normalizeTitle(idea.title)))

// Mobile is the parity floor. Reviewed tracker ideas expand the browser catalog
// without duplicating cards whose app and editorial IDs differ.
export const ideas: WebIdea[] = [
  ...appIdeas,
  ...reviewedIdeas.filter((idea) => !mobileTitles.has(normalizeTitle(idea.title)))
]

export const catalogCount = ideas.length
