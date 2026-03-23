import { Dispatch, SetStateAction } from "react";

export interface LanguageState {
  language: string;
  setLanguage: (value: string) => void;
}

export interface InputState {
  inputValue: string;
  setInputValue: (value: string) => void;
}

export interface GuessState {
  answer: string;
  guessListValue: string[];
  setGuessListValue?: Dispatch<SetStateAction<string[]>>;
}

export type IGameStatus = "Win" | "Lose" | "Playing";
export type LetterStatus = "correct" | "incorrect" | "misplaced";

export interface WordList {
  [language: string]: string[];
}
