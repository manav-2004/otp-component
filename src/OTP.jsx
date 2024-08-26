import React, { useEffect, useRef, useState } from 'react'
import './App.css'

function OTP() {

    const [otp, setOtp] = useState(new Array(4).fill(""))
    const inputRefs = useRef([])
    const buttonRef = useRef(null)
    const [verifying, setVerifying] = useState(false)
    const [hideButton, setHideButton] = useState(true)

    const setValue = (e,index)=>{

        console.log("hello "+index)
        if (isNaN(e.target.value)){
            return
        }

        const newOtp = [...otp]
        const enteredValue = String(e.target.value)

        newOtp[index] = enteredValue === ""? "" : enteredValue[enteredValue.length-1]
        setOtp(newOtp)

        if (newOtp[index] && index<otp.length-1){
            let i = index+1;
            for (i; i<otp.length; i++){
                if (!otp[i]){
                    break;
                }
            }
            inputRefs.current[i].focus()
        }
        if (newOtp[index] && index===otp.length-1){
            buttonRef.current.focus()
            buttonRef.current.click()
        }
    }

    useEffect(()=>{
        for (let i = 0; i<otp.length; i++){
            if (otp[i] === ""){
                setHideButton(true)
                return
            }
            setHideButton(false)
        }
    },[otp])

    const moveToAnotherBox = (e, index)=>{

        //when backpsace is clicked following is how event moves after putting settimeout
        //first backspace default behaviour occurs
        //second since now a value is changed it goes to setValue
        //after this the cursor moves to previous

        //also when field is empty setValue is not called

        if (e.key === "Backspace"){
            console.log("backspace")
            setTimeout(() => {
                if (index > 0){
                    inputRefs.current[index-1].focus()
                    console.log("i moved")
                }
            }, 0);
        }
    }

    const putCursorAtBack = (index)=>{
        inputRefs.current[index].setSelectionRange(1,2)
    }
    
    const handleVerify = ()=>{
        setVerifying(true)
        //make backend calls and if errors setVerifying = false else navigate
        setTimeout(() => {
            setVerifying(false)
        }, 1500);
    }

    useEffect(()=>{
        inputRefs.current[0].focus()
    },[])

  return (
    <div className='w-96 h-48 flex flex-col justify-center items-center gap-8 font-mono font-semibold'>
        <div className='flex gap-1'>
            {
                otp.map((val, index)=>(
                    <input 
                    type="text"
                    key={index} 
                    value={val}
                    onChange={(e)=>{setValue(e,index)}}
                    onKeyDown={(e)=>{moveToAnotherBox(e,index)}}
                    onClick={()=>putCursorAtBack(index)}
                    ref={(input)=>inputRefs.current[index] = input}
                    className='h-16 aspect-square border-[2px] rounded-md outline-none px-[1.35rem] text-3xl'
                    />
                ))
            }
        </div>
        {!hideButton && <button 
            className='bg-cyan-400 text-white rounded-md outline-none focus:bg-cyan-600 w-24 h-10 flex justify-center items-center' 
            ref={buttonRef}
            onClick={handleVerify}
            disabled={verifying}
        >
            {
                verifying ? <div className='loader'></div> : <div className='font-bold font-mono text-xl'>Verify</div>
            }
        </button>
        }
    </div>
  )
}

export default OTP