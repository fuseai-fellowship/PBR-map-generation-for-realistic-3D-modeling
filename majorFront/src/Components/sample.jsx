import React, { useEffect, useState } from 'react'

function sample() {
    const [sample,setSample]=useState([]);

    useEffect(()=>{
        setSample(prev=>[...prev,{a:1}])
        setSample(prev=>[...prev,{b:2}])
        setSample(prev=>[...prev,{c:3}])
    
        console.log("set sample is ",sample)
    },[])
    console.log("set sample is ",sample)
    sample.map((obj)=>{
        Object.entries(obj).map(([key,value])=>{
            console.log("hl",value)
        })
    })

  return (
    <div>sample</div>
  )
}

export default sample