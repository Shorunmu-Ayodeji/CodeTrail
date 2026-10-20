export default function NavBar() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="CodeTrail home">
        <span className="brand-mark" aria-hidden="true">
          <span className="monogram-c">C</span>
          <span className="monogram-t">T</span>
          <span className="monogram-trail" />
        </span>
        <span className="brand-name">
          Code<span className="brand-name-accent">Trail</span><span className="brand-period">.</span>
        </span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="#roadmap">Roadmap</a>
        <a href="#how-it-works">How it works</a>
      </nav>
      <a className="header-cta" href="#roadmap">
        <span>Start learning</span><span className="cta-arrow" aria-hidden="true">↗</span>
      </a>
    </header>
  )
}
