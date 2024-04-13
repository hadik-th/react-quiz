import React from 'react'

export default function Finish({points,maxpoints,dispatch}) {
    const percentage =(points / maxpoints)*100
  
  return (
    <>
      <p className='result'>
    You scored <strong>{points}</strong> out of {maxpoints}( {Math.ceil(percentage)}%)
   
  </p>
  <button onClick={()=>{
    dispatch({type:"reset"})
   }}className='btn -btn-ui'>Restart</button>

    </>

  )
}
