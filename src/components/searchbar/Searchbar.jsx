import {Header, SearchForm, SearchFormButton, SearchFormInput} from "./Searchbar.styled";
import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  return (
    <Header>
      <SearchForm>
        <SearchFormButton type="submit">
          <FiSearch width="60" height="40" />
          <span className="button-label">Search</span>
        </SearchFormButton>

        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  )
}

export default Searchbar;
