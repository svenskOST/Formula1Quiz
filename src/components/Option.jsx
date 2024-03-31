import PropTypes from 'prop-types'

function Option({ id, text, answer, handleClick }) {
   const isCorrect = id === answer

   return (
      <button
         className='mb-3 w-[46%] rounded-lg bg-slate-200 py-2 text-xl transition-[background-color,transform] duration-200 hover:bg-slate-300 active:scale-90'
         onClick={() => handleClick(isCorrect)}
      >
         {text}
      </button>
   )
}

Option.propTypes = {
   id: PropTypes.number,
   text: PropTypes.string,
   answer: PropTypes.number,
   handleClick: PropTypes.func,
}

export default Option
