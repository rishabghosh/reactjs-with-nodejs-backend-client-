import React, { useState, useEffect } from "react";
import "./App.css";

/**
 * setting a state is very important
 * because it re-renders the page
 * here if component did mount on the DOM it will fetch the url
 * and get the data then it will update the state and the page rerenders
 */

const App = function() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/home")
      .then(res => res.json())
      .then(jsonData => setData(jsonData.data));
  }, []);

  return <div className="App">{data}</div>;
};

export default App;
