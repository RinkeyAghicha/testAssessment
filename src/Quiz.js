import { Component } from "react";
import { QUESTIONS } from "./questions";

class Quiz extends Component {
  state = {
    currentQuestionIndex: 1,
    yesCount: 0,
    totalQuestions: Object.keys(QUESTIONS).length,
    score: null,
    avgScore: null,
  };

  componentDidMount() {
    this.calculateAverageScore();
  }

  handleAnswer = (answer) => {
    const { currentQuestionIndex, yesCount, totalQuestions } = this.state;
    const newYesCount = answer ? yesCount + 1 : yesCount;
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex <= totalQuestions) {
      this.setState({
        currentQuestionIndex: nextQuestionIndex,
        yesCount: newYesCount,
      });
    } else {
      const currentScore = (newYesCount / totalQuestions) * 100;
      this.setState({
        score: currentScore,
        currentQuestionIndex: currentQuestionIndex + 1,
      });

      let scores = JSON.parse(localStorage.getItem("scores")) || [];
      scores.push(currentScore);
      localStorage.setItem("scores", JSON.stringify(scores));

      const average =
        scores.reduce((acc, curr) => acc + curr, 0) / scores.length;
      this.setState({ avgScore: average });
    }
  };

  calculateAverageScore = () => {
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    if (scores.length > 0) {
      const average =
        scores.reduce((acc, curr) => acc + curr, 0) / scores.length;
      this.setState({ averageScore: average });
    }
  };

  render() {
    const { currentQuestionIndex, totalQuestions, score, avgScore } =
      this.state;
    const question = QUESTIONS[currentQuestionIndex];
    return (
      <div className="quiz">
        {currentQuestionIndex <= totalQuestions ? (
          <div className="question-card">
            <p>{question}</p>
            <button onClick={() => this.handleAnswer(true)}>Yes</button>
            <button onClick={() => this.handleAnswer(false)}>No</button>
          </div>
        ) : (
          <div className="score-card">
            <p>Your score: {score?.toFixed(2)}</p>
            <p>Average score: {avgScore?.toFixed(2)}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        )}
      </div>
    );
  }
}

export default Quiz;
