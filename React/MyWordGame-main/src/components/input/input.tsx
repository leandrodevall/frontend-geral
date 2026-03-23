import { InputState } from "../../models/game.interface";

function Input({ inputValue, setInputValue }: InputState) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="guess-input-wrapper">
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={inputValue}
        maxLength={5}
        min={5}
        onChange={(event) => {
          event.preventDefault();
          setInputValue((event.target as HTMLInputElement).value.toUpperCase());
        }}
      />
    </form>
  );
}

export default Input;
