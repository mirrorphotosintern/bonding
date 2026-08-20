"use client"

import { useEffect, useMemo, useState } from "react"
import type { IdeaMode, WebIdea } from "../lib/catalog"
import { getOriginalArtworkIndex } from "../lib/catalog"

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
  lyrics: "The Kannada rhyme",
  say_aloud: "Say it aloud",
  family_version: "About this version",
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
  const [libraryMode, setLibraryMode] = useState<"all" | IdeaMode | "kannada">("kannada")
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
      (libraryMode === "all" || (libraryMode === "kannada" ? idea.collection === "kannada" : idea.mode === libraryMode)) &&
      (!needle || searchableText(idea).includes(needle))
    )
  }, [ideas, libraryMode, query])

  const heritageIdeas = useMemo(
    () => ideas.filter((idea) => idea.collection === "kannada"),
    [ideas]
  )

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
      <section className="heritage-home-hero">
        <div className="heritage-home-copy">
          <p className="eyebrow">KARNATAKA PLAY · PASSED FORWARD</p>
          <h1>The games that raised us can still raise a laugh.</h1>
          <p>Rhymes, finger plays, elephant rides, and one very sneaky tickle—kept in Kannada, explained step by step, and ready for families everywhere.</p>
          <a className="heritage-jump" href="#kannada-games">Meet the games <span>↓</span></a>
        </div>
        <div className="heritage-film-frame">
          <div className="heritage-film-label"><span>WHY WE BUILT TRY THIS</span><strong>Our family. Our problem. Our first collection.</strong></div>
          <video
            controls
            playsInline
            preload="metadata"
            poster="/videos/try-this-fun-akka-intro-poster.jpg"
          >
            <source src="/videos/try-this-fun-akka-intro.mp4" type="video/mp4" />
            Your browser cannot play this video.
          </video>
          <span className="sound-note">Press play · Sound and captions included</span>
        </div>
      </section>

      <section className="heritage-featured" id="kannada-games">
        <div className="heritage-featured-heading">
          <div>
            <p className="eyebrow blue">ಕನ್ನಡ ಆಟಗಳು · KANNADA HERITAGE GAMES</p>
            <h2>Watch once.<br />Play for years.</h2>
          </div>
          <p>These are not vague “bonding activities.” They are real family games with the words, movements, examples, and tiny details you need to begin.</p>
        </div>
        <div className="heritage-featured-grid">
          {heritageIdeas.map((idea) => (
            <article className={`web-idea-card heritage-featured-card card-${idea.mode}`} key={idea.id}>
              <button className="card-main has-artwork" onClick={() => showIdea(idea)} type="button">
                <img className="card-artwork" src={idea.artworkUrl ?? ""} alt={`Illustration showing ${idea.title}`} />
                <span className="card-time">{idea.duration[0]}–{idea.duration[1]} min · family tradition</span>
                <strong>{idea.title}</strong>
                <span className="card-copy">{idea.oneLiner}</span>
                <span className="card-link">Watch and learn the game →</span>
              </button>
              <button className={`save-button ${saved.includes(idea.id) ? "saved" : ""}`} onClick={() => toggleSave(idea.id)} type="button" aria-label={`${saved.includes(idea.id) ? "Remove" : "Save"} ${idea.title}`}>{saved.includes(idea.id) ? "♥" : "♡"}</button>
            </article>
          ))}
        </div>
      </section>

      <section className="play-hero mood-phase" id="choose">
        <div className="play-intro">
          <p className="eyebrow">NOW MAKE IT FIT YOUR FAMILY</p>
          <h1>What kind of play<br /><span>do you need?</span></h1>
          <p>Pick a mood, setup, and amount of time. We’ll deal one well-explained idea from the full collection.</p>
        </div>

        <div className="moment-picker" aria-label="Choose a family activity">
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
            {modes.slice(0, 1).map((item) => <button type="button" key={item.id} className={libraryMode === item.id ? "active" : ""} onClick={() => { setLibraryMode(item.id); setVisibleCount(18) }}>{item.label}</button>)}
            <button type="button" className={`kannada-filter ${libraryMode === "kannada" ? "active" : ""}`} onClick={() => { setLibraryMode("kannada"); setVisibleCount(18) }}>ಕನ್ನಡ · Kannada games</button>
            {modes.slice(1).map((item) => <button type="button" key={item.id} className={libraryMode === item.id ? "active" : ""} onClick={() => { setLibraryMode(item.id); setVisibleCount(18) }}>{item.label}</button>)}
          </div>
        </div>
        {libraryMode === "kannada" && (
          <aside className="heritage-intro">
            <span className="heritage-kicker">FOR LITTLE HANDS · 18 MONTHS AND UP</span>
            <strong lang="kn">ಕನ್ನಡ ಆಟಗಳು</strong>
            <p>Four rhymes carried through voice, fingers, movement, and one very sneaky tickle. Kannada script and an easy reading guide are included in every game.</p>
          </aside>
        )}
        {library.length ? (
          <>
            <div className="web-idea-grid">
              {library.slice(0, visibleCount).map((idea) => (
                <article className={`web-idea-card card-${idea.mode}`} key={idea.id}>
                  <button className={`card-main ${idea.artworkUrl ? "has-artwork" : ""}`} onClick={() => showIdea(idea)} type="button">
                    {idea.artworkUrl ? <img className="card-artwork" src={idea.artworkUrl} alt={`Illustration showing ${idea.title}`} /> : <span className="activity-mark">{modeSymbol(idea.mode)}</span>}
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
  const artworkIndex = getOriginalArtworkIndex(idea.id)
  const artworkSheet = Math.floor(artworkIndex / 36) + 1
  const artworkCell = artworkIndex % 36
  const artworkColumn = artworkCell % 6
  const artworkRow = Math.floor(artworkCell / 6)

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose() }
    window.addEventListener("keydown", handleKey)
    return () => { window.removeEventListener("keydown", handleKey); document.body.classList.remove("modal-open") }
  }, [onClose])

  return (
    <div className="idea-modal" role="dialog" aria-modal="true" aria-labelledby="idea-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <article className="idea-sheet">
        <div className={`sheet-banner card-${idea.mode}`}>
          <div
            className={`sheet-artwork ${idea.artworkUrl ? "heritage-artwork" : ""}`}
            role="img"
            aria-label={`Illustration showing how to play ${idea.title}`}
            style={{
              backgroundImage: `url(${idea.artworkUrl ?? `/game-art/original-games-${String(artworkSheet).padStart(2, "0")}.webp`})`,
              backgroundPosition: idea.artworkUrl ? "center" : `${artworkColumn * 20}% ${artworkRow * 20}%`,
              backgroundSize: idea.artworkUrl ? "cover" : "600% 600%"
            }}
          />
          <button className="close-button" onClick={onClose} type="button" aria-label="Close activity">×</button>
        </div>
        <div className="sheet-content">
          <div className="sheet-meta"><span>{modeLabels[idea.mode]}</span><span>{idea.duration[0]}–{idea.duration[1]} min</span><span>{idea.materials === "none" ? "Nothing needed" : idea.materials === "household" ? "Household things" : "Special materials"}</span></div>
          <h2 id="idea-title">{idea.title}</h2>
          <p className="sheet-lede">{idea.description || idea.oneLiner}</p>
          <button className={`sheet-save ${saved ? "saved" : ""}`} onClick={onSave} type="button">{saved ? "♥ Saved in this browser" : "♡ Save in this browser"}</button>
          {idea.videoUrl && (
            <section className="game-demo-video">
              <div className="game-demo-heading"><span>WATCH IT ONCE</span><strong>See how this family plays it</strong></div>
              <video controls playsInline preload="metadata" poster={idea.videoPosterUrl ?? undefined}>
                <source src={idea.videoUrl} type="video/mp4" />
                Your browser cannot play this video.
              </video>
            </section>
          )}
          {idea.sourceUrl && (
            <aside className="source-demo">
              <div>
                <span>ORIGINAL DEMONSTRATION</span>
                <strong>See the idea in action</strong>
                <p>Some techniques make more sense when you can watch the original creator do them.</p>
              </div>
              <a href={idea.sourceUrl} target="_blank" rel="noreferrer">Watch original ↗</a>
            </aside>
          )}
          <div className="instructions">
            {instructions.map(([key, value], index) => (
              <section className={`${key === "say" ? "starter-instruction" : ""} instruction-${key}`} key={key}>
                <span className="instruction-number">{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{instructionLabels[key] ?? key.replaceAll("_", " ")}</h3><p lang={key === "lyrics" ? "kn" : undefined}>{key === "say" ? `“${value.replace(/^['\"]|['\"]$/g, "") }”` : value}</p></div>
              </section>
            ))}
          </div>
          <div className="sheet-finish"><span>That’s it.</span><p>Stop while it’s still fun. The point is the time together, not finishing perfectly.</p></div>
        </div>
      </article>
    </div>
  )
}
