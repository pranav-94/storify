import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
//@ts-ignore
import { usePollinationsImage } from '@pollinations/react';
import { Plus } from "lucide-react"
import axios from 'axios'
import {useEffect, useState} from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "./ui/input";

export default function MainContent() {

    const [generatedStory, setGeneratedStory] = useState("")
    const [displayedStory, setDisplayedStory] = useState("")
    const [plot,setPlot]:any = useState("")
    const [imgPlot,setImgPlot] = useState("")
    const [geners,setGeners] = useState("")
    const [language,setLanguage] = useState("")

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

    const handleResponse = async()=>{
          const result =  await axios.post('http://127.0.0.1:5000/api/fetchData',{
              language: language,
              geners:geners,
              plot: plot
           })

           console.log(result)
           setGeneratedStory(result.data.message)
    }

  return (
    <div className=" w-[100%] overflow-y-scroll flex  flex-col items-center mt-[50px]">
              <p className="mb-[20px] text-[28px] font-semibold font-mono">Create your AI story</p>
              <div className=" w-[50%]">
                 <Input type="text" className="mb-[10px]" placeholder='language' onChange={(e)=>{
                       setLanguage(e.target.value)
                 }}/> 
                 <Select 
                  onValueChange={(value)=>{setGeners(value)}}>
                   <SelectTrigger className="w-[180px] mb-[10px]">
                     <SelectValue placeholder="Geners" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="Action">Action</SelectItem>
                     <SelectItem value="Comedy">Comedy</SelectItem>
                     <SelectItem value="Horror">Horror</SelectItem>
                     <SelectItem value="Advanture">Advanture</SelectItem>
                   </SelectContent>
                  </Select>
         
                 <Input onChange={(e)=>{
                       setPlot(e.target.value)
                 }} type="text" placeholder='plot' className="mb-[10px]"/>
                <Button className="text-slate-900 mb-[10px]" variant="outline" onClick={handleResponse}>Get Response</Button>

              </div>
             <p className="w-[50%]">{displayedStory}</p>
             <ImgGenerate plot={plot}/>
         </div>
  )
}

const ImgGenerate = ({plot}:{plot:any})=>{
  //@ts-ignore
    const imageUrl = usePollinationsImage(plot, {
        width: 1024,
        height: 1024,
        seed: 42,
        model: 'flux'
      });
      console.log(imageUrl)
    return(
        <>
            <div>
      <img className="w-[500px] h-[400px]" src={imageUrl} alt="Generated Image" /> 
           </div>
        </>
    )
}

