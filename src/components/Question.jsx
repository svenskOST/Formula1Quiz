import PropTypes from 'prop-types'
import Option from './Option'

function Question({ question, handleClick }) {
   return (
      <div className='flex h-full w-full flex-col items-center justify-center'>
         <h1 className='w-fit rounded-xl bg-[rgba(0,0,0,0.5)] px-6 py-3 text-center text-2xl font-[600] text-gray-200 sm:bg-[transparent] sm:p-0 sm:text-black'>
            {question.question}
         </h1>
         <div className='mb-8 mt-4 flex items-center justify-center sm:h-2/3'>
            <img
               src={`src/assets/${question.img}`}
               alt={'File "' + question.img + '" not found'}
               className='max-h-full rounded-xl shadow-lg shadow-[rgba(0,0,0,0.8)]'
            />
         </div>
         <div className='w-full'>
            {question.options.map((option) => (
               <Option
                  key={option.id}
                  text={option.text}
                  handleClick={handleClick}
               />
            ))}
         </div>
      </div>
   )
}

Question.propTypes = {
   question: PropTypes.object,
   handleClick: PropTypes.func,
}

export default Question
