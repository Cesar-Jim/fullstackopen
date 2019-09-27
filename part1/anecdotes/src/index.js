import React, { useState } from "react";
import ReactDOM from "react-dom";

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

// Secondary components:
const NextAnecdoteButton = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

const VotingButton = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

const FavoriteAnecdote = ({ votes, anecdotes }) => {
  const mostFavorited = votes.indexOf(Math.max(...votes));

  return <p>"{anecdotes[mostFavorited]}"</p>;
};

// Main Component:
const App = props => {
  const [selected, setSelected] = useState(0);
  const { anecdotes } = props;
  const points = new Array(anecdotes.length + 1)
    .join("0")
    .split("")
    .map(parseFloat);
  const [votes, setvotes] = useState([...points]);

  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVote = () => {
    const copyOfVotes = [...votes];

    copyOfVotes[selected] += 1;
    setvotes(copyOfVotes);
  };

  return (
    <div>
      <h1>Anecdote of the day:</h1>
      <p>"{anecdotes[selected]}"</p>
      <h4>Has {votes[selected]} votes.</h4>
      <VotingButton onClick={handleVote} text="vote" />
      <NextAnecdoteButton onClick={handleNextAnecdote} text="next anecdote" />
      <h1>Anecdote with most votes:</h1>
      <FavoriteAnecdote votes={votes} anecdotes={anecdotes} />
    </div>
  );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
