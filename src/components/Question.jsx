import PropTypes from 'prop-types'
import Option from './Option'

function Question({ question, position, handleClick }) {
   return (
      <div
         className='absolute flex h-full w-full flex-col items-center justify-center transition-transform duration-500 sm:px-10 sm:pb-8 sm:pt-10'
         style={{ transform: 'translateX(' + position + '%)' }}
      >
         <h1 className='w-fit rounded-xl bg-[rgba(0,0,0,0.5)] px-6 py-3 text-center text-2xl font-[600] text-gray-200 sm:bg-[transparent] sm:p-0 sm:text-black'>
            {question.question}
         </h1>
         <div className='mb-10 mt-6 flex h-3/5 items-center justify-center'>
            <img
               src={`src/assets/${question.img}`}
               alt={'File "' + question.img + '" not found'}
               className='max-h-full rounded-xl shadow-lg shadow-[rgba(0,0,0,0.8)]'
            />
         </div>
         <div className='flex w-full flex-wrap justify-evenly'>
            {question.options.map((option) => (
               <Option
                  key={option.id}
                  id={option.id}
                  text={option.text}
                  answer={question.answer}
                  handleClick={handleClick}
               />
            ))}
         </div>
      </div>
   )
}

Question.propTypes = {
   question: PropTypes.object,
   position: PropTypes.number,
   handleClick: PropTypes.func,
}

export default Question
