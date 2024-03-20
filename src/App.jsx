import './index.css'
import { Route, Routes } from 'react-router'

function App() {
   return (
      <>
         <Routes>
            <Route path='/' element={<Page1 />}></Route>
            <Route path='/page2' element={<Page2 />}></Route>
         </Routes>
      </>
   )
}

export default App