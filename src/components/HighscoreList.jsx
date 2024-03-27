import PropTypes from 'prop-types'

function HighscoreList({ highscores }) {
   const highscoreItems = Array.from({ length: 10 }, (_, index) => {
      const highscore = highscores.find((score) => score.id === index + 1)
      if (highscore) {
         return (
            <li key={highscore.id}>
               {`${highscore.id}: ${highscore.name} (${highscore.score})`}
            </li>
         )
      } else {
         return <li key={index + 1}>{`${index + 1}: Score not set`}</li>
      }
   })

   return <ol>{highscoreItems}</ol>
}

HighscoreList.propTypes = {
   highscores: PropTypes.arrayOf(Object),
}

export default HighscoreList
