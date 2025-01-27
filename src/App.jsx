import React, { useContext } from "react";
import "./App.css";
import va from "./assets/ai.png";
import { BiSolidMicrophoneAlt } from "react-icons/bi";
import { datacontext } from "./context/UserContext";
import speakimg from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif";

const App = () => {
  const { recognition, speaking, setSpeaking, prompt, response, setPrompt, setResponse} = useContext(datacontext);

  if (!recognition) {
    return <p>Speech recognition is not supported in your browser.</p>;
  }

  const startRecognition = () => {
    setSpeaking(true);
    recognition.start();
  };

  return (
    <div className="main">
      <img src={va} alt="Virtual Assistant" id="nayra" />
      <span>I&apos;m Nayra, Your Advanced Virtual Assistant</span>
      {!speaking ? (
        <button onClick={()=> {
            setPrompt("listening...")
            setSpeaking(true)
            setResponse(false)
          recognition.start()
          }}>Click here <BiSolidMicrophoneAlt /></button>
      ) : (
        <div className="response">
          {!response ? (
            <img src={speakimg} alt="Speaking animation" id="speak" />
          ) : (
            <img src={aigif} alt="AI response animation" id="aigif" />
          )}
          <p>{prompt}</p>
        </div>
      )}
    </div>
  );
};

export default App;
