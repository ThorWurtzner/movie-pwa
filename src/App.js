import './App.scss';
import Search from "./components/Search/Search";
import { Router } from "@reach/router";
import SingleView from "./components/SingleView/SingleView";
import { useState, useEffect } from "react";
import dataContext from "./Context";

function App() {

  var dataArray = useState([]);

  Notification.requestPermission(function(status) {
    console.log("Notification permission status:", status);
  })

  function displayNotification() {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.getRegistration()
        .then(function(reg) {
          var options = {
            vibrate: [200, 100, 500, 100, 200, 100, 800, 100, 500]
          }
          reg.showNotification("Hello world", options);
        });
    }
  }

  // const request = indexedDB.open("library");
  // var [db, setDb] = useState({});

  // useEffect(() => {
  //   request.onupgradeneeded = function() {
  //     const store = db.createObjectStore("Movie Ratings", {keyPath: "id"});
  //     const titleIndex = store.createIndex("by_title", "title", {unique: true});
  //     const ratingIndex = store.createIndex("by_rating", "rating");

  //     store.put({title: "Good Will Hunting", rating: 2, id: 123456});
  //     store.put({title: "Grease", rating: 3, id: 234567});
  //     store.put({title: "Der Untergang", rating: 5, id: 345678});
  //   };

  //   request.onsuccess = function() {
  //     setDb(request.result);
  //   };
  // }, [])

  // var rating = db.transaction(["library"], "readwrite").get("234567");
  // console.log(rating);


  return (
    <div className="App">
      <dataContext.Provider value={dataArray}>
        <Router>
          <Search path="/" />
          <SingleView path="/single-view/:id" />
        </Router>
        <button onClick={displayNotification}>Click me</button>
      </dataContext.Provider>
    </div>
  );
}

export default App;
