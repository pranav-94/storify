// "use client"
// import { Button } from "@/components/ui/button"
// import axios from "axios"
// import { useEffect, useState, useRef } from "react"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// //@ts-ignore
// import { usePollinationsImage } from "@pollinations/react"
// import { Play, Pause, StopCircle, Volume2, VolumeX } from "lucide-react"

// export default function MainContent() {
//   const [generatedStory, setGeneratedStory] = useState("")
//   const [displayedStory, setDisplayedStory] = useState("")
//   const [plot, setPlot] = useState("")
//   const [geners, setGeners] = useState("")
//   const [language, setLanguage] = useState("")
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [audioAvailable, setAudioAvailable] = useState(false)
//   const [isMuted, setIsMuted] = useState(false)
//   const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null)
//   let newPlot = ""
//   const [isLoading, setIsLoading] = useState(false)

//   const [img, setImg] = useState("")

//   const randomPrompts = [
//     "Write a short sci-fi story set in the year 3025.",
//     "Generate a list of 10 unique startup ideas.",
//     "Describe a dream vacation to a place that doesn’t exist.",
//     "Write a poem about the feeling of nostalgia.",
//     "Create a dialogue between a time traveler and their past self.",
//     "Invent a new superpower and describe its pros and cons.",
//     "Generate a random character with a detailed backstory.",
//     "Write a humorous review of an imaginary product.",
//     "Describe a parallel universe where history took a different turn.",
//     "Write a journal entry from the perspective of an AI gaining consciousness."
//   ]
  

//   useEffect(() => {
//     let index = 0
//     setDisplayedStory("")

//     if (generatedStory) {
//       const interval = setInterval(() => {
//         if (index < generatedStory.length) {
//           setDisplayedStory((prev) => prev + generatedStory[index])
//           index++
//         } else {
//           clearInterval(interval)
//           // Once story is fully displayed, prepare audio
//           prepareAudio()
//         }
//       }, 30)

//       return () => clearInterval(interval)
//     }
//   }, [generatedStory])

//   // Clean up speech synthesis when component unmounts
//   useEffect(() => {
//     return () => {
//       if (speechSynthRef.current) {
//         window.speechSynthesis.cancel()
//       }
//     }
//   }, [])

//   const handleResponse = async () => {
//     if (!plot) {
//       console.error("Plot is required")
//       return
//     }

//     setIsLoading(true)

//     try {
//       // Log the request data for debugging
//       console.log("Sending request with:", {
//         language: language || "English",
//         geners: geners || "Adventure",
//         plot: plot,
//       })

//       const result = await axios.post("http://127.0.0.1:5000/api/fetchData", {
//         language: language || "English", 
//         geners: geners || "Adventure",
//         plot: plot,
//       })

//       console.log("Response received:", result)

//       if (result.data && result.data.message) {
//         newPlot = plot
//         setGeneratedStory(result.data.message)

//         setImg(result.data.img)

//         // Stop any existing audio when generating new story
//         stopAudio()
//         setAudioAvailable(false)
//       } else {
//         console.error("Invalid response format:", result.data)
//       }
//     } catch (error) {
//       console.error("Error fetching story:", error)
//       // Set a fallback story for testing if API fails
//       setGeneratedStory(
//         "Once upon a time, there was a problem connecting to the story generation service. Please try again later.",
//       )
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const prepareAudio = () => {
//     if ("speechSynthesis" in window) {
//       const utterance = new SpeechSynthesisUtterance(generatedStory)

//       // Set language based on selection
//       if (language) {
//         const langMap: { [key: string]: string } = {
//           English: "en-US",
//           Hindi: "hi-IN",
//           Marathi: "mr-IN",
//           Tamil: "ta-IN",
//         }
//         utterance.lang = langMap[language] || "en-US"
//       }

//       speechSynthRef.current = utterance
//       setAudioAvailable(true)
//     } else {
//       console.error("Speech synthesis not supported in this browser")
//     }
//   }

//   const playAudio = () => {
//     if (speechSynthRef.current && "speechSynthesis" in window) {
//       // Cancel any ongoing speech
//       window.speechSynthesis.cancel()

//       // Set volume based on mute state
//       speechSynthRef.current.volume = isMuted ? 0 : 1

//       // Play speech
//       window.speechSynthesis.speak(speechSynthRef.current)
//       setIsPlaying(true)

//       // Add event listener for when speech ends
//       speechSynthRef.current.onend = () => {
//         setIsPlaying(false)
//       }
//     }
//   }

//   const pauseAudio = () => {
//     if ("speechSynthesis" in window) {
//       window.speechSynthesis.pause()
//       setIsPlaying(false)
//     }
//   }

//   const resumeAudio = () => {
//     if ("speechSynthesis" in window) {
//       window.speechSynthesis.resume()
//       setIsPlaying(true)
//     }
//   }

//   const stopAudio = () => {
//     if ("speechSynthesis" in window) {
//       window.speechSynthesis.cancel()
//       setIsPlaying(false)
//     }
//   }

//   const toggleMute = () => {
//     setIsMuted(!isMuted)
//     if (speechSynthRef.current) {
//       speechSynthRef.current.volume = isMuted ? 1 : 0
//     }
//   }

//   const handleRandomPlot = ()=>{
    
//   }

//   return (
//     <div className="w-full overflow-y-scroll flex flex-col items-center mt-[50px]">
//       <p className="mb-[20px] text-[28px] font-semibold font-mono">Create your AI story</p>
//       <div className="w-[65%]">
//         <Select onValueChange={(value) => setLanguage(value)}>
//           <SelectTrigger className="w-[180px] mb-[10px]">
//             <SelectValue placeholder="Language" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="English">English</SelectItem>
//             <SelectItem value="Hindi">Hindi</SelectItem>
//             <SelectItem value="Marathi">Marathi</SelectItem>
//             <SelectItem value="Tamil">Tamil</SelectItem>
//           </SelectContent>
//         </Select>

//         <Select
//           onValueChange={(value) => {
//             setGeners(value)
//           }}
//         >
//           <SelectTrigger className="w-[180px] mb-[10px]">
//             <SelectValue placeholder="Genres" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="Action">Action</SelectItem>
//             <SelectItem value="Comedy">Comedy</SelectItem>
//             <SelectItem value="Horror">Horror</SelectItem>
//             <SelectItem value="Adventure">Adventure</SelectItem>
//             <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
//             <SelectItem value="Fantasy">Fantasy</SelectItem>
//             <SelectItem value="Mystery">Mystery</SelectItem>
//             <SelectItem value="Thriller">Thriller</SelectItem>
//             <SelectItem value="Drama">Drama</SelectItem>
//             <SelectItem value="Historical">Historical</SelectItem>
//             <SelectItem value="Fairy Tale">Fairy Tale</SelectItem>
//           </SelectContent>
//         </Select>

//         {/* Neon border around Plot input */}
//         <div className="relative p-[2px] rounded-xl mb-[10px] overflow-hidden w-full">
//           <div className="absolute inset-0 border-overlay animate-rotate rounded-xl" />
//           <textarea
//             placeholder="Describe your plot in detail..."
//             rows={6}
//             className="relative z-10 bg-black text-white border-none w-full p-3 rounded-xl resize-none"
//             onChange={(e) => {
//               setPlot(e.target.value)
//             }}
//           />
//           <p
//           onClick={handleRandomPlot}
//           className="text-black">Random</p>
//         </div>

//         <Button
//           className="text-slate-900 mb-[10px]"
//           variant="outline"
//           onClick={handleResponse}
//           disabled={isLoading || !plot}
//         >
//           {isLoading ? "Generating..." : "Get Response"}
//         </Button>
//       </div>
     
//       {displayedStory && (
//         <div className="w-[80%] mb-4">
//           <div className="flex items-center justify-between mb-2">

//             {/* Audio Controls */}
//             <div className="flex items-center gap-2 left-[785px] top-[-45px] relative ">
//               {audioAvailable && (
//                 <>
//                   {isPlaying ? (
//                     <Button variant="outline" size="icon" onClick={pauseAudio} className="h-8 w-8">
//                       <Pause className="h-4 w-4" />
//                     </Button>
//                   ) : (
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={isPlaying ? resumeAudio : playAudio}
//                       className="h-8 w-8 text-black"
//                     >
//                       <Play className="h-4 w-4" />
//                     </Button>
//                   )}
//                   <Button variant="outline"  size="icon" onClick={stopAudio} className="h-8 w-8 text-black">
//                     <StopCircle className="h-4 w-4" />
//                   </Button>
//                   <Button variant="outline" size="icon" onClick={toggleMute} className="h-8 w-8 text-black">
//                     {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
//                   </Button>
//                 </>
//               )}
//             </div>
//           </div>
//           <div className="p-4 flex justify-evenly items-center w-[100%]">
//           <ImgGenerate plot={img} />
//             <p className="w-[40%]">{displayedStory}</p>
//           </div>
//         </div>
//       )}

//       {/* <ImgGenerate plot={img} /> */}

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

// const ImgGenerate = ({ plot }: { plot: string }) => {
//   //@ts-ignore
//   const imageUrl = usePollinationsImage(plot, {
//     width: 1024,
//     height: 1024,
//     seed: 126,
//     model: "flux-pro",
//   })

//   return (
//     <div>
//       <img className="w-[500px] h-[400px] mt-4 rounded-lg" src={imageUrl || "/placeholder.svg"} alt="Generated Image" />
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

  const [img, setImg] = useState("")

  const randomPrompts = [
    "A team of explorers discovers a hidden city deep beneath the ocean—what secrets does it hold?",
    "An ordinary person wakes up with a mysterious map tattooed on their arm—where does it lead?",
    "A cosmic storm causes people to swap bodies at random—how does society react?",
    "A thief breaks into a high-security vault only to find something beyond their wildest imagination.",
    "A group of kids playing in the woods accidentally opens a portal to a world of living shadows.",
    "A champion gladiator in a futuristic arena realizes the fights are rigged—but what happens when they refuse to lose?",
    "A rogue scientist injects themselves with an experimental serum and gains an unexpected and uncontrollable power.",
    "An abandoned amusement park suddenly lights up in the middle of the night—who or what is running it?",
    "A lost spaceship receives a distress signal from a planet that shouldn't exist on any star map.",
    "A famous treasure hunter finally finds the artifact they've been searching for—but it comes with a curse.",
];


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
        language: language || "English",
        geners: geners || "Adventure",
        plot: plot,
      })

      const result = await axios.post("http://127.0.0.1:5000/api/fetchData", {
        language: language || "English",
        geners: geners || "Adventure",
        plot: plot,
      })

      console.log("Response received:", result)

      if (result.data && result.data.message) {
        newPlot = plot
        setGeneratedStory(result.data.message)

        setImg(result.data.img)

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

  const handleRandomPlot = () => {
    const randomIndex = Math.floor(Math.random() * randomPrompts.length)
    const randomPrompt = randomPrompts[randomIndex]
    setPlot(randomPrompt)
  }

  return (
    <div className="w-full overflow-y-scroll flex flex-col items-center mt-[50px]">
      <p className="mb-[20px] text-[28px] font-semibold font-mono">Create your AI story</p>
      <div className="w-[65%]">
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
            value={plot}
          />
          <Button
            onClick={handleRandomPlot}
            variant="outline"
            size="sm"
            className="absolute right-3 bottom-3 z-20 text-white bg-black/50 hover:bg-black/70 border-none"
          >
            Random Prompt
          </Button>
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
        <div className="w-[80%] mb-4">
          <div className="flex items-center justify-between mb-2">
            {/* Audio Controls */}
            <div className="flex items-center gap-2 left-[785px] top-[-45px] relative ">
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
                  <Button variant="outline" size="icon" onClick={stopAudio} className="h-8 w-8 text-black">
                    <StopCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={toggleMute} className="h-8 w-8 text-black">
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="p-4 flex justify-evenly items-center w-[100%]">
            <ImgGenerate plot={img} />
            <p className="w-[40%]">{displayedStory}</p>
          </div>
        </div>
      )}

      {/* <ImgGenerate plot={img} /> */}

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
    seed: 126,
    model: "flux-pro",
  })

  return (
    <div>
      <img className="w-[500px] h-[400px] mt-4 rounded-lg" src={imageUrl || "/placeholder.svg"} alt="Generated Image" />
    </div>
  )
}

