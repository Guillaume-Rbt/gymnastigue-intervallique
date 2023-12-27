import CounterPoint from './components/counter'
import GameContent from './components/gameContent'
function App() {

  
  return <div className='main-container'>
      <header  id='header-content' className="header-content">
        <CounterPoint></CounterPoint>
      </header>
      
      <GameContent ></GameContent>
    
    </div>
  
}

export default App
