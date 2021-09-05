import {BrowserRouter, Route} from "react-router-dom";
import App from "./App";
import './css/main.css'
import HomePage from './components/HomePage'

function WelcomePage() {
  return(
    <BrowserRouter>
      <div className="docator">
        <Route exact path="/"> <App /> </Route>
        <Route path="/home"> <HomePage /> </Route>
      </div>
    </BrowserRouter>
  )
}

export default WelcomePage