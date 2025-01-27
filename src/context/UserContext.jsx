import { createContext, useState } from "react";
import run from "../gemini";

export const datacontext = createContext()

const UserContext = ({ children }) => {
   let [speaking,setSpeaking] = useState(false)
   let [prompt, setPrompt] = useState("listening...")
   let [response, setResponse] = useState(false)

   function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak)
      }
      
      async function aiResponse(prompt) {
             let text =  await run(prompt)
             let newText = text.split("**") && text.split("*") && text.replace("google", "Payal Kumari") &&text.replace("Google", "Payal Kumari")
             setPrompt(newText)
             speak(newText)
             setResponse(true)
             setTimeout(() => {
               setSpeaking(false)
          },5000)
      }
      let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      let recognition = new speechRecognition();
      
      recognition.onresult = (e) => {
          let currentIndex = e.resultIndex;
          let transcript = e.results[currentIndex][0].transcript;
          setPrompt(transcript);
          takeCommand(transcript.toLowerCase())  
        };

    function takeCommand(command){
      if(command.includes("open") && command.includes("youtube")) {
           window.open("https://www.youtube.com/","_blank");
           speak("opening Youtube")
           setResponse(true)
           setPrompt("opening Youtube...")
           setTimeout(()=> {
            setSpeaking(false)
           }, 5000)
        } else if(command.includes("open") && command.includes("google")) {
          window.open("https://www.google.com/","_blank");
          speak("opening Google")
          setResponse(true)
          setPrompt("opening Google...")
          setTimeout(()=> {
           setSpeaking(false)
          }, 5000)
       } else if(command.includes("open") && command.includes("chatgpt")) {
        window.open("https://chatgpt.com/","_blank");
        speak("opening ChatGPT")
        setResponse(true)
        setPrompt("opening ChatGPT...")
        setTimeout(()=> {
         setSpeaking(false)
        }, 5000)
     } else if(command.includes("open") && command.includes("x")) {
      window.open("https://x.com/home/","_blank");
      speak("opening X")
      setResponse(true)
      setPrompt("opening X...")
      setTimeout(()=> {
       setSpeaking(false)
      }, 5000)
   } else if(command.includes("open") && command.includes("gmail")) {
    window.open("https://mail.google.com/mail/u/0/","_blank");
    speak("opening Gmail")
    setResponse(true)
    setPrompt("opening Gmail...")
    setTimeout(()=> {
     setSpeaking(false)
    }, 5000)
 } else if(command.includes("open") && command.includes("github")) {
  window.open("https://github.com/","_blank");
  speak("opening GitHub")
  setResponse(true)
  setPrompt("opening GitHub...")
  setTimeout(()=> {
   setSpeaking(false)
  }, 5000)
}else if(command.includes("open") && command.includes("linkedin")) {
  window.open("https://linkedin.com/","_blank");
  speak("opening Linkedin")
  setResponse(true)
  setPrompt("opening Linkedin...")
  setTimeout(()=> {
   setSpeaking(false)
  }, 5000)
} else if(command.includes("open") && command.includes("leetcode")) {
  window.open("https://leetcode.com/","_blank");
  speak("opening Leetcode")
  setResponse(true)
  setPrompt("opening Leetcode...")
  setTimeout(()=> {
   setSpeaking(false)
  }, 5000)
} else if(command.includes("time")) {
     let time = new Date().toLocaleDateString(undefined, 
      {hour:"numeric", mintue:"numeric"})
      speak(time)
      setResponse(true)
      setPrompt(time)
      setTimeout(()=> {
      setSpeaking(false)
  }, 5000)
}  else if(command.includes("date")) {
    let date = new Date().toLocaleString(undefined,
      {day:"numeric", month:"short"})
       speak(date)
       setResponse(true)
       setPrompt(date)
       setTimeout(()=> {
       setSpeaking(false)
  }, 5000)
}
        else {
          aiResponse(command)
        }
    }

      let value = {
        recognition,
        speaking,
        setSpeaking,
        prompt,
        setPrompt,
        response,
        setResponse
     }
    return (
      <div>
        <datacontext.Provider value={ value }>
          {children}
        </datacontext.Provider>
      </div>
    );
  };
  
  export default UserContext;
  


