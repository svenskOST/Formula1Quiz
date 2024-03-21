import { useState, useEffect } from 'react'
import Question from './components/Question'
import './index.css'

function App() {
   const [stage, setStage] = useState(1)
   const [name, setName] = useState('')
   const [currentQuestion, setCurrentQuestion] = useState(1)
   const [quizData, setQuizData] = useState([])

   useEffect(() => {
      fetchData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const fetchData = async () => {
      try {
         const response = await fetch('src/data.json')

         var data = await response.json()

         setQuizData(data)
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

   return (
      <>
         <div className='flex min-h-screen flex-col justify-center bg-gray-50 py-6 sm:py-12'>
            <img
               src='src/assets/grid.avif'
               className='absolute h-full w-full'
            />
            <main className='relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10'>
               <div className='mx-auto max-w-md'>
                  {stage == 1 ? (
                     <form onSubmit={handleSubmit}>
                        <input type='text' onChange={handleChange} />
                        <input type='submit' />
                     </form>
                  ) : stage == 2 ? (
                     <Question
                        data={quizData[currentQuestion - 1]}
                        handleSubmit={setCurrentQuestion}
                     />
                  ) : (
                     <ul>
                        <li>{name}</li>
                        <li>Name 2</li>
                        <li>Name 3</li>
                     </ul>
                  )}
               </div>
            </main>
         </div>
      </>
   )
}

export default App
