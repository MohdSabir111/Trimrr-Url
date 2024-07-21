
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { useNavigate } from 'react-router-dom';
  


function Landing() {
    const [longUrl, setLongUrl]=useState();
    const navigate = useNavigate();

    const handleShorten = (event)=>
        {
        event.preventDefault()
        if(longUrl){ navigate(`/auth?createNew=${longUrl}`)}
        }

  return (
    <div className='flex flex-col items-center'>
      <h2 className='my-10 sm:my-16 text-3xl  sm:text-6xl lg:text-7xl  text-white text-center
     font-extrabold '>The only shortner url you need </h2>
     <form onSubmit={handleShorten} className='sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2'>
        <Input type="url" placeholder='enter your long url'
        value= {longUrl}
       onChange={(event)=>setLongUrl(event.target.value)} 
       className='h-full flex-1 py-4 px-4'
        />
        <Button className='h-full' type='submit' variant='destructive' >Shorten</Button>
     </form>
     <img src="/banner.jpeg" alt="banner image" className='w-full my-11 md:px-11' />
     <Accordion type="single" collapsible className='w-full md:px-11'>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
   When you enter long url, our system generates a shorter version of 
   that URL, This shortened Url redirect to the original long Url when 
   accessed. 
    </AccordionContent>
     </AccordionItem>
     </Accordion>

    </div>
 

  )
}

export default Landing
