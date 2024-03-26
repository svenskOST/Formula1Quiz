import PropTypes from 'prop-types'

function Option({ text, handleClick }) {
   return (
      <button
         className='mb-3 w-[46%] rounded-lg bg-gray-300 py-2 text-xl transition-[background-color,transform] duration-200 hover:bg-gray-400 active:scale-90'
         onClick={handleClick}
      >
         {text}
      </button>
   )
}

Option.propTypes = {
   text: PropTypes.string,
   handleClick: PropTypes.func,
}

export default Option
