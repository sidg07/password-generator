import { useCallback, useState,useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [length,setLength]=useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState("")

  const passRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()_+-={}[]|:;'<>,.?/~`"
    for(let i=1;i<=length;i++){

      let char=Math.floor(Math.random()*str.length +1)
      pass=pass+str.charAt(char)

    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipBoard=useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
    alert("Text copied to clipboard")
               
  },[password])
  useEffect(()=>{
   passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3  my-8 bg-gray-800 text-orange-500'>
     <h1 className='text-white text-center'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 my-6'>
     
        <input type="text" value={password} placeholder="Password" className='outline-None py-1 px-3 w-full' ref={passRef}></input>
        <button className='outline-None py-0.5 px-3  bg-blue-700 text-center text-white shrink-0' onClick={copyPasswordToClipBoard}>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}} /><label className='text-white'> Length :{length}</label>
          <input className="mx-1" type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{
            setNumberAllowed((prev)=>!prev)
          }} /><label className='text-white' htmlFor='numberInput'>Number</label>
          <input className="mx-1" type="checkbox" defaultChecked={charAllowed} id="charInput" onChange={()=>{
            setCharAllowed((prev)=>!prev)
          }} /><label className='text-white' htmlFor='charInput'>Characters</label>
        </div>


      </div>
     </div>
    </>
  )
}

export default App
