import { useState, useEffect } from 'react'
import Question from './components/Question'
import './index.css'

function App() {
   const [currentQuestion, setCurrentQuestions] = useState(0)
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

   return (
      <>
         <div className='flex min-h-screen flex-col justify-center bg-gray-50 py-6 sm:py-12'>
            <img
               src='src/assets/grid.avif'
               className='absolute h-full w-full'
            />
            <Question
               data={quizData[currentQuestion]}
               handleSubmit={setCurrentQuestions}
            />
         </div>
      </>
   )
}

export default App
