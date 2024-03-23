import { useState, useEffect } from 'react'
import Question from './components/Question'
import './index.css'

function App() {
   const [questions, setQuestions] = useState([])
   const [name, setName] = useState('')
   const [notifyName, setNotifyName] = useState(false)
   const [currentQuestion, setCurrentQuestion] = useState(0)

   useEffect(() => {
      const fetchQuestions = async () => {
         try {
            const response = await fetch('src/questions.json')
            var questions = await response.json()
            setQuestions(questions)
         } catch (error) {
            console.error('Error:', error)
         }
      }

      fetchQuestions()
   }, [])

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

      const introForm = document.getElementById('introForm')
      introForm.style.opacity = 0
      setTimeout(() => {
         introForm.style.display = 'none'
         setCurrentQuestion(1)
      }, 501)
   }

   const handleClick = () => {
      setCurrentQuestion(currentQuestion + 1)
   }

   return (
      <>
         <div className='flex min-h-screen items-center justify-center bg-[url("src/assets/grid.avif")] bg-[length:100%_100%] bg-fixed bg-center'>
            <main className='absolute my-12 flex h-[580px] w-5/6 overflow-hidden sm:w-[512px] sm:rounded-xl sm:bg-white'>
               <div
                  id='introForm'
                  className='flex h-full w-full items-center justify-center transition-opacity duration-500 sm:px-10 sm:py-8'
               >
                  <div className='my-10 flex h-full flex-col items-center justify-between rounded-2xl bg-[rgba(0,0,0,0.5)] py-12 text-gray-200 sm:my-0 sm:bg-[transparent]'>
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
            </main>
         </div>
      </>
   )
}

export default App
