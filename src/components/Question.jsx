import PropTypes from 'prop-types'
import Option from './Option'

function Question({ question, handleSubmit }) {
   return (
      <div className='flex h-full w-full flex-col text-center'>
         <h1 className=' text-3xl font-[500] text-gray-200 sm:text-black'>
            {question.question}
         </h1>
         <div className='mb-6 mt-4 h-2/3 bg-[url("src/assets/question1.avif")] bg-contain bg-center bg-no-repeat'></div>
         <div>
            {question.options.map((option) => (
               <Option key={option.id} text={option.text} />
            ))}
         </div>
      </div>
   )
}

Question.propTypes = {
   question: PropTypes.object,
   handleSubmit: PropTypes.func,
}

export default Question
