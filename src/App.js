import { useState } from "react";

export default function App() {
  return (
    <div className="container">
      <h3>LearnWeb3 - Mood dApp!</h3>
      <Mood />
    </div>
  );
}

function Mood() {
  const [currentMood, setCurrentMood] = useState("unknown");
  async function getMood() {
    const mood = await MoodContract.getMood();
    console.log({ mood });
    setCurrentMood(mood);
  }

  async function setMood() {
    const mood = document.getElementById("mood").value;
    await MoodContract.setMood(mood);
  }

  return (
    <div className="row">
      <div className="col s6">
        <p>Here we can SET the mood:</p>
        <label htmlFor="mood">Set Mood:</label> <br />
        <input type="text" id="mood" />
        <a className="waves-effect waves-light btn" onClick={setMood}>
          Set Mood
        </a>
        <div>{status}</div>
      </div>
      <div className="col s6">
        <p>Here we can GET the mood:</p>
        <label htmlFor="moodValue">Set Mood:</label> <br />
        <input type="text" id="moodValue" readOnly value={currentMood} />
        <a className="waves-effect waves-light btn" onClick={getMood}>
          Get Mood
        </a>
      </div>
    </div>
  );
}
