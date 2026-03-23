import { IGameStatus } from "../models/game.interface";

export function checkGameStatus(
  guesses: string[],
  answer: string,
  maxGuesses: number
): IGameStatus {
  const lastGuess = guesses[guesses.length - 1];
  if (!lastGuess) return "Playing";

  const result = lastGuess.split("").map((letter, i) => ({
    letter,
    status: letter === answer[i] ? "correct" : "incorrect",
  }));

  const isCorrect = result.every((r) => r.status === "correct");
  if (isCorrect) return "Win";

  if (guesses.length >= maxGuesses) return "Lose";

  return "Playing";
}
