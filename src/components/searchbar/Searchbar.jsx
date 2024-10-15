import React, {useState} from 'react';
import {Header, SearchForm, SearchFormButton, SearchFormInput} from "./Searchbar.styled";
import { FiSearch } from "react-icons/fi";
import {  toast } from 'react-toastify';

const Searchbar = ({onSubmit}) => {

  const [inputValue, setInputValue] = useState("");

const onInputChange = (e) => {
  setInputValue(e.target.value.toLowerCase())
}

const onFormSearch = (e) => {
  e.preventDefault();

  if (inputValue.trim() === '') {
    toast.error("Введите название изображения");
    return;
  }

  onSubmit(inputValue);
  setInputValue('');
}

  return (
    <Header>
      <SearchForm onSubmit={onFormSearch}>
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
          onChange={onInputChange}
          value={inputValue}
        />
      </SearchForm>
    </Header>
  )
}

export default Searchbar;
