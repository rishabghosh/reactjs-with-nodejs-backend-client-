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
    <div>
      <table>
        <tr>
          <th>Titles</th>
        </tr>
        {genTable(props.titles)}
      </table>
    </div>
  );
};

const addTitle = function(title, list) {
  const result = [...list];
  result.push(title);
  return result;
};

const InputMovie = function(props) {
  const [title, setTitle] = useState("");

  const handleChange = function(event) {
    setTitle(event.target.value);
  };

  const addMovie = function() {
    if (title) {
      console.log(title);
      fetch("/addTitle", {
        method: "POST",
        body: title
      });
      props.setTitles(addTitle(title, props.titles));
    }
  };

  return (
    <div>
      <textarea onChange={handleChange} />
      <button onClick={addMovie}>add movie</button>
    </div>
  );
};

const App = function() {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    fetch("/getTitles")
      .then(res => res.text())
      .then(jsonData => JSON.parse(jsonData))
      .then(data => {
        const titles = extractTitles(data);
        setTitles(titles);
      });
  }, []);

  return (
    <div className="App">
      <MovieTitleTable titles={[...titles]} />
      <InputMovie setTitles={setTitles} titles={[...titles]} />
    </div>
  );
};

export default App;
