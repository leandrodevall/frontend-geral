import { LanguageState } from "../../models/game.interface";

function SelectLanguage({ language, setLanguage }: LanguageState) {
  return (
    <span className="select-language">
      <label htmlFor="language-select">Language: </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="ptBr">Português (Brasil)</option>
      </select>
    </span>
  );
}

export default SelectLanguage;
