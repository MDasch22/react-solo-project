// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Beaches from "./components/Beaches";
import BeachForm from "./components/BeachFormModal/BeachForm";
import BeachId from "./components/Beach";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/beaches">
            <Beaches />
          </Route>
          <Route path='/beaches/:beachId'>
            <BeachId />
          </Route>
        </Switch>
      )}

    </>
  );
}

export default App;
