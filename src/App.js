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
import UserPage from "./pages/UserPage";
import RatingPage from "./pages/RatingPage";
import ToursPage from "./pages/ToursPage";
import TourPage from "./pages/TourPage";
import PlacePage from "./pages/PlacePage";

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
        <Route exact path="/users/:id" component={UserPage}></Route>
        <Route exact path="/rating" component={RatingPage}></Route>
        <Route exact path="/tours" component={ToursPage}></Route>
        <Route exact path="/tours/:id" component={TourPage}></Route>
        <Route exact path="/places/:id" component={PlacePage}></Route>
    </Switch>
  );
}

export default App;
