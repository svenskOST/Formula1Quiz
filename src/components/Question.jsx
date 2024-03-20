import Option from './Option'

const Question = (data) => {
   return (
      <main>
         <h1>{data.question}</h1>
         <img src={data.img} />
         <div>
            {data.options.map((option) => (
               <Option key={option.id} text={option.text} />
            ))}
         </div>
      </main>
   )
}

export default Question
