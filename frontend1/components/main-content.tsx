

import { Button } from "@/components/ui/button"
import { Input } from "./ui/input";
import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
//@ts-ignore
import { usePollinationsImage } from '@pollinations/react';

export default function MainContent() {
  const [generatedStory, setGeneratedStory] = useState("")
  const [displayedStory, setDisplayedStory] = useState("")
  const [plot, setPlot]: any = useState("")
  const [geners, setGeners] = useState("")
  const [language, setLanguage] = useState("")
  let newPlot = ""

  useEffect(() => {
    let index = 0;
    setDisplayedStory("");

    if (generatedStory) {
      const interval = setInterval(() => {
        if (index < generatedStory.length) {
          setDisplayedStory((prev) => prev + generatedStory[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 30)
    }
  }, [generatedStory]);

  const handleResponse = async () => {
    const result = await axios.post('http://127.0.0.1:5000/api/fetchData', {
      language: language,
      geners: geners,
      plot: plot
    })

    newPlot = plot

    console.log(result)
    setGeneratedStory(result.data.message)
  }

  console.log(newPlot)

  return (
    <div className="w-full overflow-y-scroll flex flex-col items-center mt-[50px]">
      <p className="mb-[20px] text-[28px] font-semibold font-mono">Create your AI story</p>
      <div className="w-[50%]">

        {/* Neon border around Language input */}
        {/* <Input type="text" className="mb-[10px]" placeholder='language' onChange={(e)=>{
                       setLanguage(e.target.value)
        }}/>  */}

       <Select
          onValueChange={(value) => { setGeners(value) }}>
          <SelectTrigger className="w-[180px] mb-[10px]">
            <SelectValue placeholder="Genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Action">Action</SelectItem>
            <SelectItem value="Comedy">Comedy</SelectItem>
            <SelectItem value="Horror">Horror</SelectItem>
            <SelectItem value="Adventure">Adventure</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => { setGeners(value) }}>
          <SelectTrigger className="w-[180px] mb-[10px]">
            <SelectValue placeholder="Genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Action">Action</SelectItem>
            <SelectItem value="Comedy">Comedy</SelectItem>
            <SelectItem value="Horror">Horror</SelectItem>
            <SelectItem value="Adventure">Adventure</SelectItem>
            <SelectItem value="Adventure">Adventure</SelectItem>
            <SelectItem value="Adventure">Adventure</SelectItem>
            <SelectItem value="Adventure">Adventure</SelectItem>
            <SelectItem value="Adventure">Adventure</SelectItem>
            <SelectItem value="Adventure">Adventure</SelectItem>
            <SelectItem value="Adventure">Adventure</SelectItem>
            <SelectItem value="Adventure">Adventure</SelectItem>
            <SelectItem value="Adventure">Adventure</SelectItem>
          </SelectContent>
        </Select>

        {/* Neon border around Plot input */}
        <div className="relative p-[2px] rounded-xl mb-[10px] overflow-hidden w-full">
  <div className="absolute inset-0 border-overlay animate-rotate rounded-xl" />
  <textarea
    placeholder="Describe your plot in detail..."
    rows={6}
    className="relative z-10 bg-black text-white border-none w-full p-3 rounded-xl resize-none"
    onChange={(e)=>{
      setPlot(e.target.value)
    }}
  />
</div>


        <Button className="text-slate-900 mb-[10px]" variant="outline" onClick={handleResponse}>Get Response</Button>
      </div>

      <p className="w-[50%]">{displayedStory}</p>
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

const ImgGenerate = ({ plot }: { plot: any }) => {
  //@ts-ignore
    const imageUrl = usePollinationsImage(plot, {
      width: 1024,
      height: 1024,
      seed: 42,
      model: 'flux'
    });


  return (
    <div>
      <img className="w-[500px] h-[400px] mt-4" src={
          imageUrl
        } alt="Generated Image" />
    </div>
  )
}
