import { Button } from "@/components/ui/button"
import { Home, BookOpen, MessageCircle, FlaskRoundIcon as Flask, BookText, Zap, LogIn, X } from "lucide-react"

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 md:z-0`}
    >
      <div className="w-64 bg-zinc-900 p-4 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-red-500 rounded-md mr-2"></div>
              <h1 className="text-xl font-bold">MidReal</h1>
            </div>
            <Button variant="ghost" className="md:hidden" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <BookOpen className="mr-2 h-4 w-4" />
              Stories
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <MessageCircle className="mr-2 h-4 w-4" />
              Messages
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Flask className="mr-2 h-4 w-4" />
              Labs
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <BookText className="mr-2 h-4 w-4" />
              Blogs
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Zap className="mr-2 h-4 w-4" />
              Upgrade
            </Button>
          </nav>
        </div>
        <div className="space-y-4">
          <Button variant="outline" className="w-full text-black">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Storify
          </Button>
        </div>
      </div>
    </div>
  )
}

