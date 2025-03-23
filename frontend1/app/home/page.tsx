'use client'

import Sidebar from "@/components/sidebar"
import MainContent from "@/components/main-content"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-black text-white md:flex-row">
      <Button
        variant="ghost"
        className="md:hidden absolute top-4 left-4 z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MainContent />
    </div>
  )
}

