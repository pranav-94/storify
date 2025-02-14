import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
//@ts-ignore
import { usePollinationsImage } from '@pollinations/react';
import { Plus } from "lucide-react"
import axios from 'axios'
import {useState} from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "./ui/input";

  

// const Home = ()=>{

//     const [generatedStory, setGeneratedStory] = useState("")

//     const handleResponse = async()=>{
//           const result =  await axios.post('http://127.0.0.1:5000/api/fetchData',{
//               language: "hindi",
//               geners: "love story",
//               plot: "iron man and wanda story"
//            })

//            console.log(result)
//            setGeneratedStory(result.data.message)
//     }

//     return(
//         <>
//            <div>
//               <input type="text" placeholder='language'/>
              
//               <input type="text" placeholder='plot'/>
//            </div>
//            <button onClick={handleResponse}>Get Response</button>

//            <p>{generatedStory}</p>
//         </>
//     )
// }


export default function MainContent() {

    const [generatedStory, setGeneratedStory] = useState("")
    const [plot,setPlot]:any = useState("")
    const [geners,setGeners] = useState("")
    const [language,setLanguage] = useState("")

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
    <div className=" w-[100%] h-auto overflow-y-scroll">
              <div className=" w-[50%]">
                 <Input type="text" placeholder='language' onChange={(e)=>{
                       setLanguage(e.target.value)
                 }}/> 
                 <Select onValueChange={(value)=>{setGeners(value)}}>
                   <SelectTrigger className="w-[180px]">
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
                 }} type="text" placeholder='plot'/>
                <Button className="text-slate-900" variant="outline" onClick={handleResponse}>Get Response</Button>

              </div>
             <ImgGenerate plot={plot}/>
             <p>{generatedStory}</p>
         </div>
  )
}

const ImgGenerate = ({plot}:{plot:any})=>{
    const imageUrl = usePollinationsImage(plot, {
        width: 1024,
        height: 1024,
        seed: 42,
        model: 'flux'
      });
    return(
        <>
            <div>
      <img className="w-[500px] h-[400px]" src={imageUrl} alt="Generated Image" /> 
           </div>
        </>
    )
}

