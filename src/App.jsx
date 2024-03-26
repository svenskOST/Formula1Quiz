import { useState, useEffect } from 'react'
import Question from './components/Question'
import './index.css'

function App() {
   const [stage, setStage] = useState(1)
   const [questions, setQuestions] = useState([])
   const [name, setName] = useState('')
   const [notifyName, setNotifyName] = useState(false)
   const [currentQuestion, setCurrentQuestion] = useState(0)
   const [points, setPoints] = useState(0)
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
         addHighscore()
         fetchHighscores()

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
         var questions = await response.json()
         setQuestions(questions)
      } catch (error) {
         console.error('Error:', error)
      }
   }

   const addHighscore = () => {

   }

   const fetchHighscores = () => {
      
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

   const handleClick = (isCorrect) => {
      if (isCorrect) {
         setPoints(points + 1)
      }

      setCurrentQuestion(currentQuestion + 1)

      if (currentQuestion == 10) {
         setStage(3)
      }
   }

   const setMessage = () => {
      if (points > 0) {
         if (points > 3) {
            if (points > 6) {
               if (points > 8) {
                  if (points == 10) {
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
            <main className='absolute my-12 flex h-[580px] max-h-full w-5/6 overflow-x-hidden sm:w-[512px] sm:rounded-xl sm:bg-white'>
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
                           className={`mb-6 w-full rounded-lg bg-gray-300 py-2 text-center text-xl outline-none ${
                              notifyName
                                 ? 'animate-pulse bg-red-200 placeholder-red-500'
                                 : ''
                           }`}
                        />
                        <input
                           type='submit'
                           name='submit'
                           value='Start'
                           className='w-1/2 cursor-pointer rounded-lg bg-gray-300 py-2 text-xl transition-[background-color,transform] duration-200 hover:bg-gray-400 active:scale-90'
                        />
                     </form>
                  </div>
               </div>
               {questions.length > 0 &&
                  questions.map((question) => (
                     <Question
                        key={question.id}
                        question={question}
                        position={question.id * 100 - currentQuestion * 100}
                        handleClick={handleClick}
                     />
                  ))}
               <div
                  id='results'
                  className='my-10 hidden h-full w-full flex-col items-center justify-evenly rounded-2xl bg-[rgba(0,0,0,0.5)] py-12 text-gray-200 opacity-0 transition-opacity duration-500 sm:my-0 sm:justify-between sm:bg-[transparent] sm:px-10 sm:py-8 sm:text-black'
               >
                  <div className='text-center'>
                     <h2 className='mb-4 text-3xl font-[500] sm:text-black'>
                        {setMessage()}
                     </h2>
                     <h1 className='text-5xl font-[600] sm:text-[rgb(238,0,0)]'>
                        {points}/10
                     </h1>
                  </div>
                  <div>
                     <h2>Highscores</h2>
                     <ol className='text-right'>
                        <li>1:</li>
                        <li>2:</li>
                        <li>3:</li>
                        <li>4:</li>
                        <li>5:</li>
                        <li>6:</li>
                        <li>7:</li>
                        <li>8:</li>
                        <li>9:</li>
                        <li>10:</li>
                     </ol>
                  </div>
                  <button
                     className='w-1/2 cursor-pointer rounded-lg bg-gray-300 py-2 text-xl text-black transition-[background-color,transform] duration-200 hover:bg-gray-400 active:scale-90'
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
