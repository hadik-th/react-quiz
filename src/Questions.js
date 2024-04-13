import React from 'react'
import Options from './Options'

export default function Questions({questions,dispatch,answer}) {
  return (
    <div>
  <h4>{questions.question}</h4>
  <div className='options'>
  <Options dispatch={dispatch} answer={answer} questions={questions}/>
  </div>
    </div>
  )
}
