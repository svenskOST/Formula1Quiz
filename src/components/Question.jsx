import PropTypes from 'prop-types'
import Option from './Option'

function Question({ data, handleSubmit }) {
   return (
      <>
         <h1>{data.question}</h1>
         <img src={`src/assets/${data.img}`} />
         {data.options.map((option) => (
            <Option key={option.id} text={option.text} />
         ))}
      </>
   )
}

Question.propTypes = {
   data: PropTypes.object,
   handleSubmit: PropTypes.func,
}

export default Question
