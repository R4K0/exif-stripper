import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from './pages/about';
import UploadPage from './pages/upload';
import PrivacyPage from './pages/privacy';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/privacy">
          <PrivacyPage/>
        </Route>
        <Route path="/">
          <UploadPage/>
        </Route>        
      </Switch>
    </Router>
  );
}

export default App;
