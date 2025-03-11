import './App.css'
import Header from './components/Header/Header'

function App() {

  function Body() {
    return (
      <main>
        <h2>Build a new pc!</h2>
        <button>Start</button>
      </main>
    )
  }

  return (
    <>
      <Header />
      <Body />
    </>
  )
}

export default App
