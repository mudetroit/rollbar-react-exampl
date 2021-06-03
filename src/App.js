import * as React from "react";
import { Provider, ErrorBoundary, useRollbarPerson } from "@rollbar/react"; // <-- Provider imports 'rollbar' for us

import logo from "./logo.svg";
import "./App.css";

// same configuration you would create for the Rollbar.js SDK
const rollbarConfig = {
  accessToken: "POST_CLIENT_ITEM_ACCESS_TOKEN",
  environment: "production",
};

async function getCurrentUser() {
  return Promise.resolve({ name: "foobar" });
}

function SomeComponent() {
  const [currentUser, setCurrentUser] = React.useState();

  React.useEffect(() => {
    async function getUser() {
      const user = await getCurrentUser();
      if (user) {
        useRollbarPerson(user);
      }
      setCurrentUser(user);
    }

    getUser();
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React ${currentUser ? currentUser.name : ""}
        </a>
      </header>
    </div>
  );
}

function App() {
  return (
    <Provider config={rollbarConfig}>
      {/* ErrorBoundary catches all React errors in the tree below and logs them to Rollbar */}
      <ErrorBoundary>
        <SomeComponent />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
