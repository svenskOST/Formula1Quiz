import { useState, useEffect } from 'react'
import Question from './components/Question'
import './index.css'

const App = () => {
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
         <div>
            <Question data={quizData[currentQuestion]} />
         </div>
      </>
   )
}

export default App
