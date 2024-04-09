/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import Question from './components/Question'
import HighscoreList from './components/HighscoreList'
import './index.css'

function App() {
   const [stage, setStage] = useState(1)
   const [questions, setQuestions] = useState([])
   const [name, setName] = useState()
   const [notifyName, setNotifyName] = useState(false)
   const [currentQuestion, setCurrentQuestion] = useState(0)
   const [score, setScore] = useState(0)
   const [buttonsDisabled, setButtonsDisabled] = useState(false)
   const [highscores, setHighscores] = useState([])

   useEffect(() => {
      fetchQuestions()
   }, [])

   useEffect(() => {
      if (stage == 2) {
         const introForm = document.getElementById('introForm')
         introForm.style.opacity = 0
         setTimeout(() => {
            introForm.style.display = 'none'
            setCurrentQuestion(1)
         }, 501)
      } else if (stage == 3) {
         addHighscore().then(() => {
            fetchHighscores()
         })

         const results = document.getElementById('results')
         results.style.display = 'flex'
         setTimeout(() => {
            results.style.opacity = 1
         }, 500)
      }
   }, [stage])

   const fetchQuestions = async () => {
      try {
         const response = await fetch('src/questions.json')
         var data = await response.json()
         setQuestions(data)
      } catch (error) {
         console.error('Error:', error)
      }
   }

   const fetchHighscores = async () => {
      try {
         const response = await fetch(
            'http://localhost:8080/projects/f1-quiz/api.php',
         )
         const data = await response.json()
         setHighscores(data)
      } catch (error) {
         console.error('Error:', error)
      }
   }

   const addHighscore = async () => {
      try {
         await fetch('http://localhost:8080/projects/f1-quiz/api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               name: name,
               score: score,
            }),
         })
      } catch (error) {
         console.error('Error:', error)
      }
   }

   const handleChange = (e) => {
      setName(e.target.value)

      if (notifyName && name) {
         setNotifyName(false)
      }
   }

   const handleSubmit = (e) => {
      e.preventDefault()

      if (!name) {
         setNotifyName(true)
         return
      }

      setStage(2)
   }

   const handleClick = (id, answer) => {
      const currentOptions = document.getElementById(`options${currentQuestion}`)
      const options = currentOptions.getElementsByTagName('button')
      console.log(currentOptions)

      if (id == answer) {
         setScore(score + 1)
         options[id - 1].style.backgroundColor = 'rgb(134 239 172)'
      } else {
         options[id - 1].style.backgroundColor = 'rgb(252 165 165)'
         options[answer - 1].style.backgroundColor = 'rgb(134 239 172)'
      }

      setButtonsDisabled(true)

      setTimeout(() => {
         proceed()
      }, 1000)
   }

   const proceed = () => {
      setButtonsDisabled(false)
      setCurrentQuestion(currentQuestion + 1)

      if (currentQuestion == 10) {
         setStage(3)
      }
   }

   const setMessage = () => {
      if (score > 0) {
         if (score > 3) {
            if (score > 6) {
               if (score > 8) {
                  if (score == 10) {
                     return 'Smooth operator'
                  }
                  return 'You know your stuff!'
               }
               return 'Impressive'
            }
            return 'Average'
         }
         return 'Lucky guesses?'
      }
      return 'Z-E-R-O'
   }

   return (
      <>
         <div className='flex min-h-screen items-center justify-center bg-[url("src/assets/grid.avif")] bg-[length:100%_100%] bg-fixed bg-center'>
            <main className='absolute my-12 flex h-[580px] w-[90%] overflow-hidden sm:w-[512px] sm:rounded-xl sm:bg-white'>
               <div
                  id='introForm'
                  className='flex h-full w-full items-center justify-center transition-opacity duration-500 sm:px-10 sm:py-8'
               >
                  <div className='my-10 flex h-full flex-col items-center justify-evenly rounded-2xl bg-[rgba(0,0,0,0.5)] py-12 text-gray-200 sm:my-0 sm:justify-between sm:bg-[transparent]'>
                     <img
                        src='src/assets/logo.png'
                        alt='File "logo.png" not found'
                        className='w-5/6 drop-shadow-[3px_3px_5px_rgba(0,0,0,0.5)]'
                     ></img>
                     <div className='text-center'>
                        <h2 className='mb-4 text-3xl font-[500] sm:text-black'>
                           Welcome to the ultimate
                        </h2>
                        <h1 className='text-5xl font-[600] sm:text-[rgb(238,0,0)]'>
                           F1 Quiz
                        </h1>
                     </div>
                     <form
                        onSubmit={handleSubmit}
                        className='flex flex-col items-center justify-center text-black'
                     >
                        <input
                           type='text'
                           name='name'
                           autoComplete='name'
                           spellCheck='false'
                           onChange={handleChange}
                           placeholder='Enter your name'
                           className={`mb-6 w-full rounded-lg py-2 text-center text-xl outline-none ${
                              notifyName
                                 ? 'animate-pulse bg-red-200 placeholder-red-500'
                                 : 'bg-slate-200'
                           }`}
                        />
                        <input
                           type='submit'
                           name='submit'
                           value='Start'
                           className='w-1/2 cursor-pointer rounded-lg bg-slate-200 py-2 text-xl transition-[background-color,transform] duration-200 hover:bg-slate-300 active:scale-90'
                        />
                     </form>
                  </div>
               </div>
               {questions.length > 0 &&
                  questions.map((question) => (
                     <Question
                        key={question.id}
                        id={question.id}
                        question={question}
                        position={question.id * 100 - currentQuestion * 100}
                        handleClick={handleClick}
                        buttonsDisabled={buttonsDisabled}
                     />
                  ))}
               <div
                  id='results'
                  className='my-6 hidden h-full w-full flex-col items-center justify-evenly rounded-2xl bg-[rgba(0,0,0,0.5)] px-10 py-12 text-gray-200 opacity-0 transition-opacity duration-500 sm:my-0 sm:justify-between sm:bg-[transparent] sm:py-10 sm:text-black'
               >
                  <div className='text-center'>
                     <h2 className='mb-4 text-3xl font-[500] sm:text-black'>
                        {setMessage()}
                     </h2>
                     <h1 className='text-5xl font-[600] sm:text-[rgb(238,0,0)]'>
                        {score}/10
                     </h1>
                  </div>
                  <HighscoreList highscores={highscores} />
                  <button
                     className='w-1/2 cursor-pointer rounded-lg bg-slate-200 py-2 text-xl text-black transition-[background-color,transform] duration-200 hover:bg-slate-300 active:scale-90'
                     onClick={() => {
                        location.reload()
                     }}
                  >
                     Play again
                  </button>
               </div>
            </main>
         </div>
      </>
   )
}

export default App
