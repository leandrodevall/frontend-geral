import { NUM_OF_GUESSES_ALLOWED } from "../../data/data";
import { GuessState, LetterStatus } from "../../models/game.interface";
import { checkGuess } from "../../utils/game-helpers";
import { createBoard } from "../../utils/utils";

const IStatus: Record<LetterStatus, string> = {
  correct: "cell correct",
  incorrect: "cell incorrect",
  misplaced: "cell misplaced",
};

function Guess({ guessListValue, answer }: GuessState) {
  const board = createBoard(NUM_OF_GUESSES_ALLOWED, 5, "");

  function handleGuessFlow(letter: string | null, status?: LetterStatus) {
    if (!letter && !status) return "cell";
    return IStatus[status as LetterStatus];
  }

  return (
    <div className="guess-results">
      {board.map((row, i) => {
        const currentGuess = guessListValue[i];
        const result = checkGuess(currentGuess, answer);
        return (
          <p className="guess" key={`row-${i}`}>
            {row.map((_, celIndex) => {
              const letter = currentGuess?.split("");
              return (
                <span
                  key={`cell-${celIndex}`}
                  className={handleGuessFlow(
                    letter?.[celIndex] || "",
                    result?.[celIndex].status as LetterStatus
                  )}
                >
                  {letter?.[celIndex] || ""}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}

export default Guess;
