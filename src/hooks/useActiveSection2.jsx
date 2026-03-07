import { useEffect, useState } from "react"

export default function useActiveSection() {
  const [active, setActive] = useState("hero")

  useEffect(() => {
    const sections = document.querySelectorAll("section")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { threshold: 0.6 }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return active
}