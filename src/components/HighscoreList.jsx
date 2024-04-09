import PropTypes from 'prop-types'
import { useState } from 'react'

function HighscoreList({ highscores }) {
   const [firstPage, setFirstPage] = useState(true)
   const highscoreItems = []

   for (let i = 0; i < 10; i++) {
      if (highscores[i]) {
         highscoreItems.push(
            <tr key={i} className='group odd:bg-slate-100 even:bg-slate-200'>
               <td>{i + 1}</td>
               <td className='flex h-full items-center justify-center'>
                  {highscores[i].name}{' '}
                  <span className='absolute w-32 -translate-y-3/4 rounded-md bg-gray-600 px-2 py-1 text-slate-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                     {highscores[i].date}
                  </span>
               </td>
               <td>{highscores[i].score}</td>
            </tr>,
         )
      } else {
         highscoreItems.push(
            <tr key={i} className='odd:bg-slate-100 even:bg-slate-200'>
               <td></td>
               <td>Score not set</td>
               <td></td>
            </tr>,
         )
      }
   }

   return (
      <div className='flex h-2/3 w-full flex-col items-center justify-evenly'>
         <div className='flex w-full justify-evenly text-2xl font-[600] text-gray-200 sm:text-black'>
            <button
               onClick={() => {
                  setFirstPage(true)
               }}
               className='h-8 w-10 rounded-full bg-slate-200 transition-[background-color,transform] duration-200 hover:bg-slate-300 active:scale-90'
            >
               {'<'}
            </button>
            <h2>Highscores</h2>
            <button
               onClick={() => {
                  setFirstPage(false)
               }}
               className='h-8 w-10 rounded-full bg-slate-200 transition-[background-color,transform] duration-200 hover:bg-slate-300 active:scale-90'
            >
               {'>'}
            </button>
         </div>
         <table className='h-2/3 w-full table-fixed  border-collapse overflow-hidden rounded-lg bg-slate-300 text-center text-lg text-black'>
            <thead className='h-10'>
               <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
               </tr>
            </thead>
            <tbody>
               {firstPage
                  ? highscoreItems.slice(0, 5)
                  : highscoreItems.slice(5, 10)}
            </tbody>
         </table>
      </div>
   )
}

HighscoreList.propTypes = {
   highscores: PropTypes.arrayOf(Object),
}

export default HighscoreList
