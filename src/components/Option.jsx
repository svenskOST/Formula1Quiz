import PropTypes from 'prop-types'

function Option({ id, text, answer, handleClick, buttonsDisabled }) {
   return (
      <button
         id={id}
         className={`mb-3 w-[46%] rounded-lg bg-slate-200 py-2 text-xl transition-[background-color,transform] duration-200 ${
            !buttonsDisabled && 'hover:bg-slate-300 active:scale-90'
         }`}
         onClick={() => !buttonsDisabled && handleClick(id, answer)}
         disabled={buttonsDisabled}
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
   buttonsDisabled: PropTypes.bool,
}

export default Option
