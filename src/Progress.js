import React from 'react'

export default function Progress({index,numberOfQuestions,maxpoints,points,answer}) {
  return (
    <header className='progress'>
    <progress max={numberOfQuestions} value={index + Number(answer !==null)}></progress>
    <p>Question <strong>{index +1}</strong>/{numberOfQuestions}</p>
    <p><strong>{points} / {maxpoints}</strong></p>
      
    </header>
  )
}
