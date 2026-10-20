const pathItems = [
  { title: "HTML & CSS", stageId: "foundations" },
  { title: "JavaScript", stageId: "javascript" },
  { title: "React", stageId: "react" },
  { title: "Build & launch", stageId: "launch" },
]

export default function Hero({ completedStages, onStart }) {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-copy">
        <span className="eyebrow"><span className="live-dot" /> YOUR FRONT-END JOURNEY STARTS HERE</span>
        <h1 id="hero-title">
          From curious
          <br />
          to <span>creating.</span>
        </h1>
        <p className="hero-description">
          A clear, practical roadmap to learn web development—one small win at a time.
          No guesswork. Just the right next step.
        </p>
        <div className="hero-actions">
          <button className="button-primary" onClick={onStart}>
            Explore the roadmap <span aria-hidden="true">↓</span>
          </button>
          <span className="hero-note">Free · Beginner friendly · Learn at your pace</span>
        </div>
        <div className="hero-proof">
          <span className="proof-icon" aria-hidden="true">✓</span>
          <p><strong>A plan, not a race.</strong><br />Your progress saves on this device.</p>
        </div>
      </div>

      <div className="hero-visual" aria-label="A preview of the learning path">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="path-card">
          <div className="path-card-top">
            <span className="path-label">YOUR LEARNING PATH</span>
            <span className="path-menu" aria-hidden="true">•••</span>
          </div>
          <div className="path-heading">
            <div>
              <span className="path-kicker">THE FRONT-END TRACK</span>
              <h2>Make the web<br />your canvas.</h2>
            </div>
            <span className="sparkle" aria-hidden="true">✳</span>
          </div>
          <div className="path-track">
            {pathItems.map((item, index) => {
              const isComplete = completedStages.includes(item.stageId)
              return (
                <div className={`path-step ${isComplete ? "is-complete" : ""}`} key={item.stageId}>
                  <span className="path-step-dot">{isComplete ? "✓" : `0${index + 1}`}</span>
                  <span>{item.title}</span>
                  {index < pathItems.length - 1 && <span className="path-connector" />}
                </div>
              )
            })}
          </div>
          <div className="path-card-bottom">
            <span>YOUR NEXT CHAPTER IS WAITING</span>
            <span className="path-arrow" aria-hidden="true">↗</span>
          </div>
        </div>
        <div className="floating-note note-top"><span>✦</span> Learn by building</div>
        <div className="floating-note note-bottom"><span className="note-check">✓</span> Progress that sticks</div>
        <span className="hero-coordinate coordinate-one" aria-hidden="true">01 / 06</span>
        <span className="hero-coordinate coordinate-two" aria-hidden="true">THE BEGINNING</span>
      </div>
    </section>
  )
}
