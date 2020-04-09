import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Main from "./pages/MainPage";
import Login from "./pages/LoginPage";
import Project from "./pages/ProjectPage";
import ProjectList from "./pages/ProjectListPage";
import Profile from "./pages/ProfilePage";
import MyProject from "./pages/MyProjectPage";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./css/app.scss";
import "./css/header.scss";
import "./css/footer.scss";
import { closeUserContext } from "./utils";
import ProjectRegistPage from "./pages/ProjectRegistPage";
import ProjectModifyPage from "./pages/ProjectModifyPage";
import ScrollTop from "./components/ScrollTop";

const App = () => {
  document.querySelector("body").addEventListener("click", (e) => {
    const userWrapper = document.querySelector(".headerUserInfo");
    const clickedUser = e.path.includes(userWrapper);
    if (!clickedUser) {
      closeUserContext();
    }
  });

  return (
    <>
      <Header />
      <ScrollTop />
      <Switch>
        <Route path="/" component={Main} exact={true} />
        <Route path="/login" component={Login} />
        <Route path="/projects" component={ProjectList} />
        <Route path="/project" component={Project} />
        <PrivateRoute
          path="/me"
          redirectTo="/login"
          component={Profile}
          exact={true}
        />
        <PrivateRoute
          path="/me/project"
          redirectTo="/login"
          component={MyProject}
          exact={true}
        />
        <PrivateRoute
          path="/me/project/regist"
          redirectTo="/login"
          component={ProjectRegistPage}
          exact={true}
        />
        <PrivateRoute
          path="/me/project/modify"
          redirectTo="/login"
          component={ProjectModifyPage}
          exact={true}
        />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
