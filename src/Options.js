import React from 'react'


export default function Options ({ questions, dispatch, answer }) {
    const hasAnswered = answer !== null;
  return (
    <>
      {questions.options.map((option, index) => {
        return (
          <button
            onClick={()=>dispatch({ type: 'newAnswer', payload: index })
            }
            key={option}

            className={`btn btn-option ${index === answer ? 'answer' : ''} ${
              hasAnswered ? index === questions.correctOption ? 'correct' : 'wrong':""
            }`}
            disabled={hasAnswered}
          >
            {option}
          </button>
        )
      })}
    </>
  )
}
