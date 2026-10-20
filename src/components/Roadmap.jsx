import { ROADMAP } from "../data/roadmap"
import { useState } from "react"

export default function Roadmap({ completedStages, onToggleStage, onReset }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [stageFilter, setStageFilter] = useState("all")
  const completedCount = ROADMAP.filter((stage) => completedStages.includes(stage.id)).length
  const progress = Math.round((completedCount / ROADMAP.length) * 100)
  const nextStage = ROADMAP.find((stage) => !completedStages.includes(stage.id))
  const nextStageIndex = ROADMAP.findIndex((stage) => !completedStages.includes(stage.id))
  const normalizedSearch = searchTerm.trim().toLowerCase()
  const filteredStages = ROADMAP.filter((stage) => {
    const isComplete = completedStages.includes(stage.id)
    const matchesFilter =
      stageFilter === "all" ||
      (stageFilter === "completed" && isComplete) ||
      (stageFilter === "remaining" && !isComplete)
    const searchableContent = [
      stage.title,
      stage.category,
      stage.description,
      ...stage.topics,
      stage.project,
      stage.resourceLabel,
    ].join(" ").toLowerCase()

    return matchesFilter && (!normalizedSearch || searchableContent.includes(normalizedSearch))
  })
  const filters = [
    { id: "all", label: "All stages", count: ROADMAP.length },
    { id: "remaining", label: "Not started", count: ROADMAP.length - completedCount },
    { id: "completed", label: "Completed", count: completedCount },
  ]

  return (
    <section className="roadmap-section" id="roadmap" aria-labelledby="roadmap-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow section-eyebrow">THE ROADMAP</span>
          <h2 id="roadmap-title">A path you can <span>actually follow.</span></h2>
          <p>Start at the beginning. Time estimates are flexible—learn at your own pace.</p>
        </div>
        <span className="step-count">{ROADMAP.length} STEPS <span aria-hidden="true">↘</span></span>
      </div>

      <div className="progress-card" aria-live="polite">
        <div className="progress-copy">
          <div className="progress-title">
            <span className="progress-icon" aria-hidden="true">↗</span>
            <div>
              <strong>Your learning journey</strong>
              <span>
                {completedCount === ROADMAP.length
                  ? "You made it. Now build something amazing."
                  : nextStage
                    ? `Up next: ${nextStage.title}`
                    : "Your progress is ready whenever you are."}
              </span>
            </div>
          </div>
          <div className="progress-numbers">
            <strong>{String(completedCount).padStart(2, "0")}<span> / {String(ROADMAP.length).padStart(2, "0")}</span></strong>
            <span>{progress}% COMPLETE</span>
          </div>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Roadmap progress"
          aria-valuemin="0"
          aria-valuemax={ROADMAP.length}
          aria-valuenow={completedCount}
          aria-valuetext={`${completedCount} of ${ROADMAP.length} stages completed`}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        {completedCount > 0 && (
          <button className="reset-button" onClick={onReset}>Reset progress</button>
        )}
      </div>

      <div className="roadmap-tools">
        <label className="stage-search">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <span className="sr-only">Search stages and topics</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search stages, skills, or topics"
          />
        </label>
        <div className="stage-filters" role="group" aria-label="Filter roadmap stages">
          {filters.map((filter) => (
            <button
              className={`filter-button ${stageFilter === filter.id ? "is-selected" : ""}`}
              key={filter.id}
              onClick={() => setStageFilter(filter.id)}
              aria-pressed={stageFilter === filter.id}
            >
              {filter.label}<span>{filter.count}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="results-count" aria-live="polite">
        Showing <strong>{filteredStages.length}</strong> of {ROADMAP.length} stages
      </p>

      <div className="roadmap-list">
        {filteredStages.length > 0 ? filteredStages.map((stage) => {
          const index = ROADMAP.findIndex((item) => item.id === stage.id)
          const isComplete = completedStages.includes(stage.id)
          const isCurrent = !isComplete && index === nextStageIndex

          return (
            <article className={`roadmap-card ${isComplete ? "is-complete" : ""} ${isCurrent ? "is-current" : ""}`} key={stage.id}>
              <div className="timeline-column" aria-hidden="true">
                <span className="timeline-marker">{isComplete ? "✓" : stage.number}</span>
                {filteredStages.at(-1)?.id !== stage.id && <span className="timeline-line" />}
              </div>
              <div className="stage-content">
                <div className="stage-topline">
                  <span>{stage.category}</span>
                  <span className="stage-duration">{stage.duration}</span>
                </div>
                <div className="stage-title-row">
                  <h3>{stage.title}</h3>
                  {isComplete ? (
                    <span className="stage-status status-done">✓ DONE</span>
                  ) : isCurrent ? (
                    <span className="stage-status status-next">START HERE</span>
                  ) : (
                    <span className="stage-status status-later">COMING UP</span>
                  )}
                </div>
                <p className="stage-description">{stage.description}</p>
                <details className="stage-details">
                  <summary>
                    <span>See what you’ll learn</span>
                    <span className="details-icon" aria-hidden="true">+</span>
                  </summary>
                  <div className="stage-detail-content">
                    <ul className="topic-list">
                      {stage.topics.map((topic) => <li key={topic}>{topic}</li>)}
                    </ul>
                    <div className="project-prompt">
                      <span className="project-icon" aria-hidden="true">✳</span>
                      <p><strong>Put it into practice</strong>{stage.project}</p>
                    </div>
                    <a className="resource-link" href={stage.resource} target="_blank" rel="noreferrer">
                      {stage.resourceLabel} <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </details>
                <button
                  className={`complete-button ${isComplete ? "complete-button-done" : ""}`}
                  onClick={() => onToggleStage(stage.id)}
                  aria-pressed={isComplete}
                >
                  <span className="completion-check" aria-hidden="true">{isComplete ? "✓" : ""}</span>
                  {isComplete ? "Mark as not done" : "Mark step complete"}
                </button>
              </div>
            </article>
          )
        }) : (
          <div className="empty-state">
            <span aria-hidden="true">⌕</span>
            <h3>No stages found</h3>
            <p>Try another search or clear the filters to see the full learning path.</p>
            <button
              className="empty-state-button"
              onClick={() => {
                setSearchTerm("")
                setStageFilter("all")
              }}
            >
              Clear search and filters
            </button>
          </div>
        )}
      </div>

      <div className="roadmap-footnote" id="how-it-works">
        <span aria-hidden="true">✳</span>
        <p><strong>Your pace, your path.</strong> Take as long as you need. Mark each step when you feel ready, and your progress will be saved on this device.</p>
      </div>
    </section>
  )
}
