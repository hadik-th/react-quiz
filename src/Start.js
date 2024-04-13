import React from 'react';

//prop recieveing here as number of question in Number from App component(parent) via Start component.

export default function Start({numberOfQuestions,dispatch}) {
  return (
    <div className='start'>
      <h2>Welcome to the react-quiz</h2>
      <h3>{numberOfQuestions} questions to test</h3>
      <button onClick={(e)=>{
        dispatch({type:"Start"})
      }} className='btn btn-ui'>Let's Start</button>
      <select onChange={(e)=>dispatch({type:"sort",payload:e.target.value})} className='btn btn-ui'><option  value="Easy">Easy</option>
      <option value="Medium">Medium</option>
      <option value="Hard">Hard</option></select>
    </div>
  )
};
