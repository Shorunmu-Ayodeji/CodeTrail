import { useEffect, useState } from "react"
import "./App.css"
import Hero from "./components/Hero"
import NavBar from "./components/NavBar"
import Roadmap from "./components/Roadmap"
import { ROADMAP } from "./data/roadmap"

const STORAGE_KEY = "my-first-app-roadmap-progress"

function App() {
  const [completedStages, setCompletedStages] = useState([])
  const [isProgressLoaded, setIsProgressLoaded] = useState(false)
  const [storageMessage, setStorageMessage] = useState("")

  useEffect(() => {
    try {
      const savedProgress = window.localStorage.getItem(STORAGE_KEY)

      if (savedProgress) {
        const parsedProgress = JSON.parse(savedProgress)

        if (Array.isArray(parsedProgress)) {
          const validStageIds = new Set(ROADMAP.map((stage) => stage.id))
          setCompletedStages(
            [...new Set(parsedProgress.filter((stage) => validStageIds.has(stage)))],
          )
        } else {
          throw new Error("Saved roadmap progress has an invalid format.")
        }
      }
    } catch (error) {
      console.error("Unable to load roadmap progress.", error)
      setStorageMessage("Saved progress couldn't be loaded in this browser.")
    } finally {
      setIsProgressLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!isProgressLoaded) return

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completedStages))
    } catch (error) {
      console.error("Unable to save roadmap progress.", error)
      setStorageMessage("Progress couldn't be saved. It may be lost when you leave this page.")
    }
  }, [completedStages, isProgressLoaded])

  function toggleStage(stageId) {
    setCompletedStages((currentStages) =>
      currentStages.includes(stageId)
        ? currentStages.filter((id) => id !== stageId)
        : [...currentStages, stageId],
    )
  }

  function resetProgress() {
    setCompletedStages([])
    setStorageMessage("")
  }

  function scrollToRoadmap() {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth"
    document.getElementById("roadmap")?.scrollIntoView({ behavior })
  }

  return (
    <div className="app-shell" id="top">
      <NavBar />
      <main>
        <Hero
          completedStages={completedStages}
          onStart={scrollToRoadmap}
        />
        {storageMessage && (
          <p className="storage-notice" role="status">
            {storageMessage}
          </p>
        )}
        <Roadmap
          completedStages={completedStages}
          onToggleStage={toggleStage}
          onReset={resetProgress}
        />
      </main>
      <footer className="site-footer">
        <span className="brand-mark brand-mark-small" aria-hidden="true">
          <span className="monogram-c">C</span>
          <span className="monogram-t">T</span>
          <span className="monogram-trail" />
        </span>
        <p>Keep showing up. The progress takes care of itself.</p>
        <a href="#top" onClick={(event) => {
          event.preventDefault()
          const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth"
          window.scrollTo({ top: 0, behavior })
        }}>
          Back to top ↑
        </a>
      </footer>
    </div>
  )
}

export default App
