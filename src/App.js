import './App.scss';
import Search from "./components/Search/Search";
import { Router } from "@reach/router";
import SingleView from "./components/SingleView/SingleView";
import { useState } from "react";
import dataContext from "./Context";

function App() {

  var dataArray = useState([]);

  return (
    <div className="App">
      <dataContext.Provider value={dataArray}>
        <Router>
          <Search path="/" />
          <SingleView path="/single-view/:id" />
        </Router>
      </dataContext.Provider>
    </div>
  );
}

export default App;
