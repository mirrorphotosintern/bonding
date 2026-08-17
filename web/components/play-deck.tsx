"use client"

import { useEffect, useMemo, useState } from "react"
import type { IdeaMode, WebIdea } from "../lib/catalog"

const modes: Array<{ id: "all" | IdeaMode; label: string; note: string; icon: string }> = [
  { id: "all", label: "Surprise us", note: "Anything goes", icon: "✦" },
  { id: "move", label: "Burn energy", note: "Get moving", icon: "↝" },
  { id: "make", label: "Make a thing", note: "Build, draw, fold", icon: "✂" },
  { id: "talk", label: "Talk & laugh", note: "Stories and games", icon: "❞" },
  { id: "think", label: "Puzzle us", note: "Guess and solve", icon: "?" },
  { id: "help", label: "Do a real job", note: "Help, made fun", icon: "✋" },
  { id: "perform", label: "Put on a show", note: "Act and invent", icon: "★" }
]

const modeLabels: Record<IdeaMode, string> = {
  make: "Make",
  move: "Move",
  think: "Puzzle",
  talk: "Talk",
  help: "Help",
  perform: "Perform"
}

const instructionLabels: Record<string, string> = {
  say: "How to start",
  setup: "Get ready",
  steps: "How to play",
  first_round: "First round",
  turns: "Take turns",
  easier: "Make it easier",
  harder: "Make it harder",
  coop: "Play as a team",
  mixed_ages: "For mixed ages",
  recovery: "If it gets stuck",
  if_it_stalls: "If it gets stuck",
  safety: "Keep it safe",
  end: "When to finish",
  to_end: "When to finish",
  close: "Finish with"
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]]
  }
  return copy
}

function matchesSetup(idea: WebIdea, setup: "none" | "some") {
  return setup === "some" || idea.materials === "none"
}

function modeSymbol(mode: IdeaMode) {
  return modes.find((item) => item.id === mode)?.icon ?? "✦"
}

function searchableText(idea: WebIdea) {
  return [idea.title, idea.oneLiner, idea.description, ...idea.tags].join(" ").toLowerCase()
}

export function PlayDeck({ ideas }: { ideas: WebIdea[] }) {
  const [mode, setMode] = useState<"all" | IdeaMode>("all")
  const [setup, setSetup] = useState<"none" | "some">("none")
  const [duration, setDuration] = useState<"quick" | "longer">("quick")
  const [selected, setSelected] = useState<WebIdea | null>(null)
  const [openIdea, setOpenIdea] = useState<WebIdea | null>(null)
  const [query, setQuery] = useState("")
  const [libraryMode, setLibraryMode] = useState<"all" | IdeaMode>("all")
  const [visibleCount, setVisibleCount] = useState(18)
  const [saved, setSaved] = useState<string[]>([])

  useEffect(() => {
    const stored = window.localStorage.getItem("try-this-saved")
    if (stored) {
      try { setSaved(JSON.parse(stored) as string[]) } catch { /* ignore corrupt local data */ }
    }

    const id = window.location.hash.replace("#idea=", "")
    if (id) setOpenIdea(ideas.find((idea) => idea.id === id) ?? null)
  }, [ideas])

  const matches = useMemo(() => {
    const exact = ideas.filter((idea) =>
      (mode === "all" || idea.mode === mode) &&
      matchesSetup(idea, setup) &&
      (duration === "longer" || idea.duration[0] <= 10)
    )
    return exact.length ? exact : ideas.filter((idea) => mode === "all" || idea.mode === mode)
  }, [duration, ideas, mode, setup])

  const library = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return ideas.filter((idea) =>
      (libraryMode === "all" || idea.mode === libraryMode) &&
      (!needle || searchableText(idea).includes(needle))
    )
  }, [ideas, libraryMode, query])

  function pickIdea() {
    const next = shuffle(matches).find((idea) => idea.id !== selected?.id) ?? matches[0]
    setSelected(next ?? null)
    window.setTimeout(() => document.querySelector("#your-pick")?.scrollIntoView({ behavior: "smooth", block: "center" }), 30)
  }

  function showIdea(idea: WebIdea) {
    setOpenIdea(idea)
    window.history.replaceState(null, "", `#idea=${idea.id}`)
    document.body.classList.add("modal-open")
  }

  function closeIdea() {
    setOpenIdea(null)
    window.history.replaceState(null, "", window.location.pathname)
    document.body.classList.remove("modal-open")
  }

  function toggleSave(id: string) {
    const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id]
    setSaved(next)
    window.localStorage.setItem("try-this-saved", JSON.stringify(next))
  }

  return (
    <div className="play-page">
      <section className="play-hero">
        <div className="play-intro">
          <p className="eyebrow">PLAY RIGHT HERE · NO SIGN-IN</p>
          <h1>What sounds<br /><span>good right now?</span></h1>
          <p>Choose the kind of moment you have. We’ll shuffle the deck and hand you one genuinely doable thing.</p>
          <div className="privacy-note"><span>✓</span> Nothing leaves your browser</div>
        </div>

        <div className="moment-picker" id="choose" aria-label="Choose a family activity">
          <fieldset>
            <legend>Pick a mood</legend>
            <div className="web-mode-grid">
              {modes.map((item) => (
                <button
                  className={`web-mode ${mode === item.id ? "active" : ""}`}
                  key={item.id}
                  onClick={() => setMode(item.id)}
                  type="button"
                >
                  <span className={`web-mode-icon mode-${item.id}`}>{item.icon}</span>
                  <span><strong>{item.label}</strong><small>{item.note}</small></span>
                </button>
              ))}
            </div>
          </fieldset>
          <div className="quick-choices">
            <fieldset>
              <legend>Setup</legend>
              <div className="segmented">
                <button className={setup === "none" ? "active" : ""} onClick={() => setSetup("none")} type="button">Nothing</button>
                <button className={setup === "some" ? "active" : ""} onClick={() => setSetup("some")} type="button">A few things</button>
              </div>
            </fieldset>
            <fieldset>
              <legend>Time</legend>
              <div className="segmented">
                <button className={duration === "quick" ? "active" : ""} onClick={() => setDuration("quick")} type="button">Quick</button>
                <button className={duration === "longer" ? "active" : ""} onClick={() => setDuration("longer")} type="button">Take our time</button>
              </div>
            </fieldset>
          </div>
          <button className="deal-button" onClick={pickIdea} type="button">Try this <span>→</span></button>
        </div>
      </section>

      <section className={`dealt-area ${selected ? "has-card" : ""}`} id="your-pick" aria-live="polite">
        {selected ? (
          <div className="dealt-wrap">
            <div className="deck-ghost ghost-one" />
            <div className="deck-ghost ghost-two" />
            <article className={`dealt-card card-${selected.mode}`}>
              <div className="dealt-topline">
                <span className="activity-mark">{modeSymbol(selected.mode)}</span>
                <span>{modeLabels[selected.mode]} · {selected.duration[0]}–{selected.duration[1]} min</span>
              </div>
              <div>
                <p className="eyebrow blue">YOUR PICK</p>
                <h2>{selected.title}</h2>
                <p className="dealt-description">{selected.oneLiner}</p>
              </div>
              <div className="dealt-actions">
                <button className="play-button" onClick={() => showIdea(selected)} type="button">Play it <span>→</span></button>
                <button className="again-button" onClick={pickIdea} type="button">Deal another</button>
              </div>
            </article>
          </div>
        ) : (
          <div className="empty-deck">
            <span>✦</span>
            <p>Your next good idea is in the deck.</p>
          </div>
        )}
      </section>

      <section className="browser-section" id="all-ideas">
        <div className="browser-heading">
          <div><p className="eyebrow blue">PICK YOUR OWN</p><h2>Every idea is playable.</h2></div>
          <p>Browse when you know what you want. Search works on names, descriptions, and game styles.</p>
        </div>
        <div className="library-tools">
          <label className="search-box"><span>⌕</span><input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(18) }} placeholder="Search for drawing, car games, stories…" /></label>
          <div className="library-filters" aria-label="Filter ideas by type">
            {modes.map((item) => <button type="button" key={item.id} className={libraryMode === item.id ? "active" : ""} onClick={() => { setLibraryMode(item.id); setVisibleCount(18) }}>{item.label}</button>)}
          </div>
        </div>
        {library.length ? (
          <>
            <div className="web-idea-grid">
              {library.slice(0, visibleCount).map((idea) => (
                <article className={`web-idea-card card-${idea.mode}`} key={idea.id}>
                  <button className="card-main" onClick={() => showIdea(idea)} type="button">
                    <span className="activity-mark">{modeSymbol(idea.mode)}</span>
                    <span className="card-time">{idea.duration[0]}–{idea.duration[1]} min {idea.materials === "none" ? "· nothing needed" : ""}</span>
                    <strong>{idea.title}</strong>
                    <span className="card-copy">{idea.oneLiner}</span>
                    <span className="card-link">See how to play →</span>
                  </button>
                  <button className={`save-button ${saved.includes(idea.id) ? "saved" : ""}`} onClick={() => toggleSave(idea.id)} type="button" aria-label={`${saved.includes(idea.id) ? "Remove" : "Save"} ${idea.title}`}>{saved.includes(idea.id) ? "♥" : "♡"}</button>
                </article>
              ))}
            </div>
            {visibleCount < library.length && <button className="more-button" onClick={() => setVisibleCount((count) => count + 18)} type="button">Show more ideas ↓</button>}
          </>
        ) : <div className="no-results"><strong>No idea matches that yet.</strong><span>Try a shorter search or choose “Surprise us.”</span></div>}
      </section>

      {openIdea && <IdeaModal idea={openIdea} saved={saved.includes(openIdea.id)} onClose={closeIdea} onSave={() => toggleSave(openIdea.id)} />}
    </div>
  )
}

function IdeaModal({ idea, saved, onClose, onSave }: { idea: WebIdea; saved: boolean; onClose: () => void; onSave: () => void }) {
  const instructions = Object.entries(idea.howToPlay).filter(([, value]) => Boolean(value))

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose() }
    window.addEventListener("keydown", handleKey)
    return () => { window.removeEventListener("keydown", handleKey); document.body.classList.remove("modal-open") }
  }, [onClose])

  return (
    <div className="idea-modal" role="dialog" aria-modal="true" aria-labelledby="idea-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <article className="idea-sheet">
        <div className={`sheet-banner card-${idea.mode}`}><span className="giant-mark">{modeSymbol(idea.mode)}</span><button className="close-button" onClick={onClose} type="button" aria-label="Close activity">×</button></div>
        <div className="sheet-content">
          <div className="sheet-meta"><span>{modeLabels[idea.mode]}</span><span>{idea.duration[0]}–{idea.duration[1]} min</span><span>{idea.materials === "none" ? "Nothing needed" : idea.materials === "household" ? "Household things" : "Special materials"}</span></div>
          <h2 id="idea-title">{idea.title}</h2>
          <p className="sheet-lede">{idea.description || idea.oneLiner}</p>
          <button className={`sheet-save ${saved ? "saved" : ""}`} onClick={onSave} type="button">{saved ? "♥ Saved in this browser" : "♡ Save in this browser"}</button>
          <div className="instructions">
            {instructions.map(([key, value], index) => (
              <section className={key === "say" ? "starter-instruction" : ""} key={key}>
                <span className="instruction-number">{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{instructionLabels[key] ?? key.replaceAll("_", " ")}</h3><p>{key === "say" ? `“${value.replace(/^['\"]|['\"]$/g, "") }”` : value}</p></div>
              </section>
            ))}
          </div>
          <div className="sheet-finish"><span>That’s it.</span><p>Stop while it’s still fun. The point is the time together, not finishing perfectly.</p></div>
        </div>
      </article>
    </div>
  )
}
