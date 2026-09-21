// hooks/use-unsaved-changes.ts
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function useUnsavedChanges(hasUnsavedChanges: boolean) {
  const router = useRouter()

  // Block browser refresh/close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [hasUnsavedChanges])

  // Block Next.js navigation (back/forward/link click)
  useEffect(() => {
    if (!hasUnsavedChanges) return

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a")
      if (!target) return
      const href = target.getAttribute("href")
      if (!href || href.startsWith("#")) return

      const confirmed = window.confirm(
        "You have unsaved edits you want to leave this page?"
      )
      if (!confirmed) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    // Intercept popstate (back/forward button)
    const handlePopState = () => {
      if (hasUnsavedChanges) {
        const confirmed = window.confirm(
          "You have unsaved edits you want to leave this page?"
        )
        if (!confirmed) {
          // Push state กลับเพื่อยกเลิกการ navigate
          window.history.pushState(null, "", window.location.href)
        }
      }
    }

    // Push dummy state เพื่อให้ popstate ทำงาน
    window.history.pushState(null, "", window.location.href)
    window.addEventListener("popstate", handlePopState)
    document.addEventListener("click", handleClick, true)

    return () => {
      window.removeEventListener("popstate", handlePopState)
      document.removeEventListener("click", handleClick, true)
    }
  }, [hasUnsavedChanges])
}