import PropTypes from 'prop-types'

function HighscoreList({ highscores }) {
   const highscoreItems = []

   for (let i = 0; i < 10; i++) {
      if (highscores[i]) {
         highscoreItems.push(
            <li key={i}>
               {`${i + 1}: ${highscores[i].name} (${highscores[i].score})`}
            </li>,
         )
      } else {
         highscoreItems.push(<li key={i}>{`${i + 1}: Score not set`}</li>)
      }
   }

   return <ol>{highscoreItems}</ol>
}

HighscoreList.propTypes = {
   highscores: PropTypes.arrayOf(Object),
}

export default HighscoreList
