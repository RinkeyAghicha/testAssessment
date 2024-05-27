import React, { Component } from "react";
import Quiz from "./Quiz";

class App extends Component {
  render() {
    return (
      <div className="main__wrap">
        <main className="container">
          <div><h2>Yes/No Quiz</h2></div>
          <Quiz />
        </main>
      </div>
    );
  }
}

export default App;
