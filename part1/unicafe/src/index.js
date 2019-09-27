import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistic = ({ text, value, symbol }) => (
  <p>
    {text} {value}
    {symbol}
  </p>
);

const Statistics = props => {
  const { good, neutral, bad } = props;
  const all = good + neutral + bad;
  const average = all ? (good * 1 + bad * -1) / all : 0;
  const positive = all ? (good / all) * 100 : 0;

  if (!all) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Statistic</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Statistic text="good" />
            </td>
            <td>
              <Statistic value={good} />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text="neutral" />
            </td>
            <td>
              <Statistic value={neutral} />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text="bad" />
            </td>
            <td>
              <Statistic value={bad} />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text="all" />
            </td>
            <td>
              <Statistic value={all} />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text="average" />
            </td>
            <td>
              <Statistic value={average.toFixed(1)} />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text="positive" />
            </td>
            <td>
              <Statistic value={positive.toFixed(1)} symbol="%" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
