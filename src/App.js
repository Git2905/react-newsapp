import { useState } from 'react'
import NavBar from './components/NavBarComponent';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteComponent from './components/RouteComponent';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const [AppState, setAppState] = useState(() => { return { progress: 0 } });

  const setProgress = (progress) => {
    setAppState({ progress: progress })
  };

  return (
    <div>
      <Router>
        <LoadingBar color="#f11946" height={5} progress={AppState.progress} />
        <NavBar />
        <RouteComponent setProgress={setProgress} />
      </Router>
    </div>
  )
}

export default App
