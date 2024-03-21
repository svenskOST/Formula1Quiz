import PropTypes from 'prop-types'
import Option from './Option'

function Question({ data, handleSubmit }) {
   console.log(data)
   return (
      <main className='relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10'>
         <div className='mx-auto max-w-md'>
            <h1>{data.question}</h1>
            <img src={`src/assets/${data.img}`} />
         </div>
      </main>
   )
}

Question.propTypes = {
   data: PropTypes.object,
   handleSubmit: PropTypes.func,
}

export default Question
