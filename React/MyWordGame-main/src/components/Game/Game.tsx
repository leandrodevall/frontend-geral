import React from "react";
import { sample } from "../../utils/utils";
import { NUM_OF_GUESSES_ALLOWED, WORDS } from "../../data/data";
import Input from "../input";
import Guess from "../Guess";
import { checkGameStatus } from "../../utils/game-status";
import { IGameStatus } from "../../models/game.interface";
import SelectLanguage from "../select-language";

function Game() {
  const [inputValue, setInputValue] = React.useState("");
  const [answer, setAnswer] = React.useState(() => sample(WORDS["en"]));
  const [guessListValue, setGuessListValue] = React.useState<string[]>([]);
  const [resultValue, setResultValue] = React.useState<IGameStatus>("Playing");
  const [language, setLanguage] = React.useState("en");
  console.log(answer)
  React.useEffect(() => {
    setAnswer(sample(WORDS[language]));
  }, [language]);

  function processGameFlow(inputValueRef: string): void {
    if (inputValueRef.length === 5) {
      console.log({ guess: inputValueRef });
      const currentGuessList = [...guessListValue, inputValueRef];
      setGuessListValue(currentGuessList);
      setInputValue("");
      const status = checkGameStatus(
        currentGuessList,
        answer,
        NUM_OF_GUESSES_ALLOWED
      );
      setResultValue(status);
    } else {
      setInputValue(inputValueRef);
    }
  }

  function resetState() {
    setInputValue("");
    setGuessListValue([]);
    setResultValue("Playing");
    setAnswer(sample(WORDS[language]));
  }

  function handleLanguageChange(newLanguage: string) {
    setLanguage(newLanguage);
    resetState();
  }

  return (
    <>
      <SelectLanguage language={language} setLanguage={handleLanguageChange} />
      <Guess guessListValue={guessListValue} answer={answer} />
      <Input inputValue={inputValue} setInputValue={processGameFlow} />

      {resultValue === "Win" && (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in{" "}
            <strong>{guessListValue.length} guesses</strong>.
          </p>
          <button onClick={resetState}>Jogar novamente</button>
        </div>
      )}

      {resultValue === "Lose" && (
        <div className="sad banner">
          <p>
            Sorry, the correct answer was <strong>{answer}</strong>.
          </p>
          <button onClick={resetState}>Jogar novamente</button>
        </div>
      )}
    </>
  );
}

export default Game;
