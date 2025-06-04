import { Button } from "@/components/ui/button"
import { Home, BookOpen, MessageCircle, FlaskRoundIcon as Flask, BookText, Zap, LogIn, X } from "lucide-react"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {

  const navigate = useRouter()
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // This code only runs on the client
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
    console.log(storedUsername);
  }, []);

  const handleLog = ()=>{
    localStorage.removeItem("username")
    navigate.push('/')
  }

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 md:z-0`}
    >
      <div className="w-64 bg-zinc-900 p-4 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <img src="https://img.freepik.com/premium-vector/cool-headphone-vector-illustration-with-music-bar_444100-29.jpg" className="w-8 h-8 rounded-xl" alt="" />
              <h1 className="text-xl font-bold ml-2">Storify</h1>
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
              Poems
            </Button>
            {/* <Button variant="ghost" className="w-full justify-start">
              <Flask className="mr-2 h-4 w-4" />
              Labs
            </Button> */}
            <Button variant="ghost" className="w-full justify-start">
              <BookText className="mr-2 h-4 w-4" />
              History
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Zap className="mr-2 h-4 w-4" />
              Upgrade
            </Button>
          </nav>
        </div>
        <div className="space-y-4">
          <Button variant="outline" className="w-full text-black">
            {username}
          </Button>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          onClick={handleLog}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}