import logo from './logo.svg'
import { useEffect, useReducer } from 'react'
import Loader from './Loader'
import Error from './Error'
import './App.css'
import Header from './Header'
import Main from './Main'
import Start from './Start'
import Questions from './Questions'
import Progress from './Progress'
import Finish from './Finish'
import Footer from './Footer'
import Timer from './Timer'
//--------------------------------------------------------------------------------------------------------------
// Change the title and how it works.

const initialState = {
  question: [],
  //loading,error,ready state,active(quiz running),finish state.
  //InitalState of status is loading.
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  gameLevel: 'Easy',
  secondsRemaning: null
}
//--------------------------------------------------------------------------------------------------------------
const sec_var = 1
function reducer (state, action) {
  let hard
  switch (action.type) {
    case 'dataRecieved':
      return {
        ...state,
        question: action.payload,
        status: 'ready'
      }
    case 'dataFailed':
      return {
        ...state,
        status: 'error'
      }
    case 'Start':
      console.log(hard)
      return {
        ...state,
      
        status: 'active',
        secondsRemaning: state.question.length * sec_var
      }
    case 'newAnswer':
      const que = state.question.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === que.correctOption
            ? state.points + que.points
            : state.points
      }
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null
      }
    case 'Finish':
      return {
        ...state,
        status: 'finished'
      }
    case 'sort':
      if (action.payload === 'Hard') {
        hard = state.question.sort(function (a, b) {
          return b.points - a.points
        })

        console.log(hard)
        return {
          ...state,
          question: hard,
          gameLevel: 'Hard'
        }
      }
    case 'tick':
      return {
        ...state,
        secondsRemaning: state.secondsRemaning - 1,
        status: state.secondsRemaning === 0 ? 'finished' : state.status
      }
      case "stop":
        return {
          ...initialState,
          points:state.points,
          question:state.question, 
          status: 'finished',
          
        }
        case "reset":
          return (
            {...initialState, status:"ready",question:state.question}
          )

    default:
      throw new Error('Something went Wrong')
  }
}
//---------------------------------------------------------------------------------------------------------------
function App () {
  //question and status are destructured from api response.
  const [
    { question, status, index, answer, points, secondsRemaning },
    dispatch
  ] = useReducer(reducer, initialState)

  const numberOfQuestions = question.length
  const maxPoints = question.reduce((prev, cur) => prev + cur.points,0)

  //---------------------------------------------------------------------------------------------------------------
  useEffect(function () {
    fetch('http://localhost:8080/questions')
      .then(res => res.json())
      .then(data =>
        dispatch({ type: 'dataRecieved', payload: data }, console.log(data))
      )
      .catch(err => dispatch({ type: 'dataFailed' }))
  }, [])
  //------------------------------------------------------------------------------------------------------------
  return (
    <>
      <div className='app'>
        <Header />
        <Main>
          {status === 'loading' && <Loader />}
          {status === 'error' && <Error />}
          {status === 'ready' && (
            <Start numberOfQuestions={numberOfQuestions} dispatch={dispatch} />
          )}

          {status === 'active' && (
            <>
              <Progress
                index={index}
                numberOfQuestions={numberOfQuestions}
                maxpoints={maxPoints}
                points={points}
                answer={answer}
              />
              <Questions
                dispatch={dispatch}
                answer={answer}
                questions={question[index]}
              />
              <Footer>
                <Timer dispatch={dispatch} secondsRemaning={secondsRemaning} />
              </Footer>
            </>
          )}
          {status === 'active' && index < numberOfQuestions - 1 ? (
            <>
              <button
                onClick={() => {
                  dispatch({ type: 'nextQuestion' })
                }}
                className='btn btn-ui'
              >
                Next
              </button>
              <button onClick={()=>{
                dispatch({type:"stop"})
              }} className='btn btn-ui'>Stop</button>
            </>
          ) : (
            ''
          )}
          {index === numberOfQuestions - 1 && status === 'active' && (
            <button
              onClick={() => dispatch({ type: 'Finish' })}
              className='btn btn-ui'
            >
              Finish
            </button>
          )}
        </Main>

        {status === 'finished' && (
          <Finish dispatch={dispatch} points={points} maxpoints={maxPoints} />
        )}
      </div>
    </>
  )
}

export default App
//------------------------------------------------------------------------------------------------
