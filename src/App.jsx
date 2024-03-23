import { useState, useEffect } from 'react'
import Question from './components/Question'
import './index.css'

function App() {
   const [stage, setStage] = useState(1)
   const [name, setName] = useState('')
   const [currentQuestion, setCurrentQuestion] = useState(1)
   const [questions, setQuestions] = useState([])

   useEffect(() => {
      fetchQuestions()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const fetchQuestions = async () => {
      try {
         const response = await fetch('src/questions.json')

         var questions = await response.json()

         setQuestions(questions)
      } catch (error) {
         console.error('Error:', error)
      }
   }

   const handleChange = (e) => {
      setName(e.target.value)
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      setStage(2)
   }

   const handleClick = () => {
      setCurrentQuestion(currentQuestion + 1)
   }

   return (
      <>
         <div className='flex min-h-screen items-center justify-center bg-[url("src/assets/grid.avif")] bg-[length:100%_100%] bg-fixed bg-center'>
            <main className='my-12 h-[580px] w-5/6 sm:w-[512px] sm:rounded-xl sm:bg-white sm:px-10 sm:py-8'>
               {stage == 1 ? (
                  <form onSubmit={handleSubmit}>
                     <input
                        type='text'
                        name='name'
                        autoComplete='name'
                        onChange={handleChange}
                     />
                     <input type='submit' name='submit' />
                  </form>
               ) : stage == 2 ? (
                  <Question
                     question={questions[currentQuestion - 1]}
                     handleClick={handleClick}
                  />
               ) : (
                  <ul>
                     <li>{name}</li>
                     <li>Name 2</li>
                     <li>Name 3</li>
                  </ul>
               )}
            </main>
         </div>
      </>
   )
}

export default App
