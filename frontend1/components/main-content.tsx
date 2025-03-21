



// import { Button } from "@/components/ui/button"
// import { Input } from "./ui/input";
// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// //@ts-ignore
// import { usePollinationsImage } from '@pollinations/react';

// export default function MainContent() {
//   const [generatedStory, setGeneratedStory] = useState("")
//   const [displayedStory, setDisplayedStory] = useState("")
//   const [plot, setPlot]: any = useState("")
//   const [geners, setGeners] = useState("")
//   const [language, setLanguage] = useState("")
//   let newPlot = ""

//   useEffect(() => {
//     let index = 0;
//     setDisplayedStory("");

//     if (generatedStory) {
//       const interval = setInterval(() => {
//         if (index < generatedStory.length) {
//           setDisplayedStory((prev) => prev + generatedStory[index]);
//           index++;
//         } else {
//           clearInterval(interval);
//         }
//       }, 30)
//     }
//   }, [generatedStory]);

//   const handleResponse = async () => {
//     const result = await axios.post('http://127.0.0.1:5000/api/fetchData', {
//       language: language,
//       geners: geners,
//       plot: plot
//     })

//     newPlot = plot

//     console.log(result)
//     setGeneratedStory(result.data.message)
//   }

//   console.log(newPlot)

//   return (
//     <div className="w-full overflow-y-scroll flex flex-col items-center mt-[50px]">
//       <p className="mb-[20px] text-[28px] font-semibold font-mono">Create your AI story</p>
//       <div className="w-[50%]">

//         {/* Neon border around Language input */}
//         {/* <Input type="text" className="mb-[10px]" placeholder='language' onChange={(e)=>{
//                        setLanguage(e.target.value)
//         }}/>  */}

//        <Select onValueChange={(value) => setLanguage(value)}>
//          <SelectTrigger className="w-[180px] mb-[10px]">
//            <SelectValue placeholder="Language" />
//          </SelectTrigger>
//          <SelectContent>
//            <SelectItem value="English">English</SelectItem>
//            <SelectItem value="Hindi">Hindi</SelectItem>
//            <SelectItem value="Marathi">Marathi</SelectItem>
//            <SelectItem value="Tamil">Tamil</SelectItem>
//          </SelectContent>
//        </Select>

//         <Select
//           onValueChange={(value) => { setGeners(value) }}>
//           <SelectTrigger className="w-[180px] mb-[10px]">
//             <SelectValue placeholder="Genres" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="Action">Action</SelectItem>
//             <SelectItem value="Comedy">Comedy</SelectItem>
//             <SelectItem value="Horror">Horror</SelectItem>
//             <SelectItem value="Adventure">Adventure</SelectItem>
//             <SelectItem value="Adventure">Adventure</SelectItem>
//             <SelectItem value="Adventure">Adventure</SelectItem>
//             <SelectItem value="Adventure">Adventure</SelectItem>
//             <SelectItem value="Adventure">Adventure</SelectItem>
//             <SelectItem value="Adventure">Adventure</SelectItem>
//             <SelectItem value="Adventure">Adventure</SelectItem>
//             <SelectItem value="Adventure">Adventure</SelectItem>
//             <SelectItem value="Adventure">Adventure</SelectItem>
//           </SelectContent>
//         </Select>

//         {/* Neon border around Plot input */}
//         <div className="relative p-[2px] rounded-xl mb-[10px] overflow-hidden w-full">
//   <div className="absolute inset-0 border-overlay animate-rotate rounded-xl" />
//   <textarea
//     placeholder="Describe your plot in detail..."
//     rows={6}
//     className="relative z-10 bg-black text-white border-none w-full p-3 rounded-xl resize-none"
//     onChange={(e)=>{
//       setPlot(e.target.value)
//     }}
//   />
// </div>


//         <Button className="text-slate-900 mb-[10px]" variant="outline" onClick={handleResponse}>Get Response</Button>
//       </div>

//       <p className="w-[50%]">{displayedStory}</p>
//       <ImgGenerate plot={plot} />

//       {/* Inline neon rotating border styles */}
//       <style jsx>{`
//         .border-overlay {
//           background: linear-gradient(
//             270deg,
//             #ff00ff,
//             #00ffff,
//             #00ff00,
//             #ffff00,
//             #ff0000,
//             #ff00ff
//           );
//           background-size: 600% 600%;
//           filter: blur(10px);
//           z-index: 0;
//         }
//         .animate-rotate {
//           animation: rotateBorder 6s linear infinite;
//         }
//         @keyframes rotateBorder {
//           0% {
//             background-position: 0% 50%;
//           }
//           100% {
//             background-position: 100% 50%;
//           }
//         }
//       `}</style>
//     </div>
//   )
// }

// const ImgGenerate = ({ plot }: { plot: any }) => {
//   //@ts-ignore
//     const imageUrl = usePollinationsImage(plot, {
//       width: 1024,
//       height: 1024,
//       seed: 42,
//       model: 'flux'
//     });


//   return (
//     <div>
//       <img className="w-[500px] h-[400px] mt-4" src={
//           imageUrl
//         } alt="Generated Image" />
//     </div>
//   )
// }



"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
//@ts-ignore
import { usePollinationsImage } from "@pollinations/react"
import { Play, Pause, StopCircle, Volume2, VolumeX } from "lucide-react"

export default function MainContent() {
  const [generatedStory, setGeneratedStory] = useState("")
  const [displayedStory, setDisplayedStory] = useState("")
  const [plot, setPlot] = useState("")
  const [geners, setGeners] = useState("")
  const [language, setLanguage] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioAvailable, setAudioAvailable] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null)
  let newPlot = ""
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let index = 0
    setDisplayedStory("")

    if (generatedStory) {
      const interval = setInterval(() => {
        if (index < generatedStory.length) {
          setDisplayedStory((prev) => prev + generatedStory[index])
          index++
        } else {
          clearInterval(interval)
          // Once story is fully displayed, prepare audio
          prepareAudio()
        }
      }, 30)

      return () => clearInterval(interval)
    }
  }, [generatedStory])

  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if (speechSynthRef.current) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const handleResponse = async () => {
    if (!plot) {
      console.error("Plot is required")
      return
    }

    setIsLoading(true)

    try {
      // Log the request data for debugging
      console.log("Sending request with:", {
        language: language || "English", // Provide default values
        geners: geners || "Adventure",
        plot: plot,
      })

      const result = await axios.post("http://127.0.0.1:5000/api/fetchData", {
        language: language || "English", // Provide default values
        geners: geners || "Adventure",
        plot: plot,
      })

      console.log("Response received:", result)

      if (result.data && result.data.message) {
        newPlot = plot
        setGeneratedStory(result.data.message)

        // Stop any existing audio when generating new story
        stopAudio()
        setAudioAvailable(false)
      } else {
        console.error("Invalid response format:", result.data)
      }
    } catch (error) {
      console.error("Error fetching story:", error)
      // Set a fallback story for testing if API fails
      setGeneratedStory(
        "Once upon a time, there was a problem connecting to the story generation service. Please try again later.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  const prepareAudio = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(generatedStory)

      // Set language based on selection
      if (language) {
        const langMap: { [key: string]: string } = {
          English: "en-US",
          Hindi: "hi-IN",
          Marathi: "mr-IN",
          Tamil: "ta-IN",
        }
        utterance.lang = langMap[language] || "en-US"
      }

      speechSynthRef.current = utterance
      setAudioAvailable(true)
    } else {
      console.error("Speech synthesis not supported in this browser")
    }
  }

  const playAudio = () => {
    if (speechSynthRef.current && "speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      // Set volume based on mute state
      speechSynthRef.current.volume = isMuted ? 0 : 1

      // Play speech
      window.speechSynthesis.speak(speechSynthRef.current)
      setIsPlaying(true)

      // Add event listener for when speech ends
      speechSynthRef.current.onend = () => {
        setIsPlaying(false)
      }
    }
  }

  const pauseAudio = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.pause()
      setIsPlaying(false)
    }
  }

  const resumeAudio = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.resume()
      setIsPlaying(true)
    }
  }

  const stopAudio = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (speechSynthRef.current) {
      speechSynthRef.current.volume = isMuted ? 1 : 0
    }
  }

  return (
    <div className="w-full overflow-y-scroll flex flex-col items-center mt-[50px]">
      <p className="mb-[20px] text-[28px] font-semibold font-mono">Create your AI story</p>
      <div className="w-[50%]">
        <Select onValueChange={(value) => setLanguage(value)}>
          <SelectTrigger className="w-[180px] mb-[10px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Hindi">Hindi</SelectItem>
            <SelectItem value="Marathi">Marathi</SelectItem>
            <SelectItem value="Tamil">Tamil</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => {
            setGeners(value)
          }}
        >
          <SelectTrigger className="w-[180px] mb-[10px]">
            <SelectValue placeholder="Genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Action">Action</SelectItem>
            <SelectItem value="Comedy">Comedy</SelectItem>
            <SelectItem value="Horror">Horror</SelectItem>
            <SelectItem value="Adventure">Adventure</SelectItem>
            <SelectItem value="Romance">Romance</SelectItem>
            <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
            <SelectItem value="Fantasy">Fantasy</SelectItem>
            <SelectItem value="Mystery">Mystery</SelectItem>
            <SelectItem value="Thriller">Thriller</SelectItem>
            <SelectItem value="Drama">Drama</SelectItem>
            <SelectItem value="Historical">Historical</SelectItem>
            <SelectItem value="Fairy Tale">Fairy Tale</SelectItem>
          </SelectContent>
        </Select>

        {/* Neon border around Plot input */}
        <div className="relative p-[2px] rounded-xl mb-[10px] overflow-hidden w-full">
          <div className="absolute inset-0 border-overlay animate-rotate rounded-xl" />
          <textarea
            placeholder="Describe your plot in detail..."
            rows={6}
            className="relative z-10 bg-black text-white border-none w-full p-3 rounded-xl resize-none"
            onChange={(e) => {
              setPlot(e.target.value)
            }}
          />
        </div>

        <Button
          className="text-slate-900 mb-[10px]"
          variant="outline"
          onClick={handleResponse}
          disabled={isLoading || !plot}
        >
          {isLoading ? "Generating..." : "Get Response"}
        </Button>
      </div>

      {displayedStory && (
        <div className="w-[50%] mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold">Your Story</h3>

            {/* Audio Controls */}
            <div className="flex items-center gap-2">
              {audioAvailable && (
                <>
                  {isPlaying ? (
                    <Button variant="outline" size="icon" onClick={pauseAudio} className="h-8 w-8">
                      <Pause className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={isPlaying ? resumeAudio : playAudio}
                      className="h-8 w-8 text-black"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="outline"  size="icon" onClick={stopAudio} className="h-8 w-8 text-black">
                    <StopCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={toggleMute} className="h-8 w-8 text-black">
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="p-4 ">
            <p>{displayedStory}</p>
          </div>
        </div>
      )}

      <ImgGenerate plot={plot} />

      {/* Inline neon rotating border styles */}
      <style jsx>{`
        .border-overlay {
          background: linear-gradient(
            270deg,
            #ff00ff,
            #00ffff,
            #00ff00,
            #ffff00,
            #ff0000,
            #ff00ff
          );
          background-size: 600% 600%;
          filter: blur(10px);
          z-index: 0;
        }
        .animate-rotate {
          animation: rotateBorder 6s linear infinite;
        }
        @keyframes rotateBorder {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  )
}

const ImgGenerate = ({ plot }: { plot: string }) => {
  //@ts-ignore
  const imageUrl = usePollinationsImage(plot, {
    width: 1024,
    height: 1024,
    seed: 42,
    model: "flux",
  })

  return (
    <div>
      <img className="w-[500px] h-[400px] mt-4 rounded-lg" src={imageUrl || "/placeholder.svg"} alt="Generated Image" />
    </div>
  )
}


