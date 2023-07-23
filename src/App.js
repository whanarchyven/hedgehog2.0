import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import { Switch, Route } from "react-router-dom";
import "./index.css";
import RegistrationPage from "./pages/RegistrationPage";
import PasswordRecover from "./pages/PasswordRecover";
import MapPage from "./pages/MapPage";
import AccountPage from "./pages/AccountPage";
import PublicationPage from "./pages/PublicationPage";
import PostPage from "./pages/PostPage";
import DefaultPage from "pages/DefaultPage";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={DefaultPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegistrationPage} />
      <Route exact path="/recover" component={PasswordRecover} />
      <Route exact path="/feed" component={HomePage}></Route>
      <Route exact path="/map" component={MapPage}></Route>
      <Route exact path="/account" component={AccountPage}></Route>
      <Route exact path="/publication" component={PublicationPage}></Route>
      <Route exact path="/post/:id" component={PostPage}></Route>
    </Switch>
  );
}

export default App;
