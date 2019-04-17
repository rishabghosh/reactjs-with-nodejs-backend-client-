import React, { useState, useEffect } from "react";
import "./App.css";

/**
 * setting a state is very important
 * because it re-renders the page
 * here if component did mount on the DOM it will fetch the url
 * and get the data then it will update the state and the page rerenders
 */

const extractTitles = function(movieTitles) {
  const titles = movieTitles.map(movieTitle => movieTitle.title);
  return titles;
};

const genTable = function(elements) {
  const result = [];
  for (let index = 0; index < elements.length; index++) {
    result.push(
      <tr>
        <th>{elements[index]}</th>
      </tr>
    );
  }
  return result;
};

const MovieTitleTable = function(props) {
  return (
    <table>
      <tr>
        <th>Titles</th>
      </tr>
      {genTable(props.titles)}
    </table>
  );
};

const App = function() {
  const [data, setData] = useState("");
  const [titles, setTitles] = useState("");

  useEffect(() => {
    fetch("/getTitles")
      .then(res => res.text())
      .then(jsonData => JSON.parse(jsonData))
      .then(data => {
        const titles = extractTitles(data);
        setTitles(titles);
      });
  }, []);

  useEffect(() => {
    fetch("/home")
      .then(res => res.json())
      .then(jsonData => setData(jsonData.data));
  }, []);

  return (
    <div className="App">
      <div>{data}</div>
      <MovieTitleTable titles={titles} />
    </div>
  );
};

export default App;
