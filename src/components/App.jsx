import React, {useState} from 'react';
import SearchBar from './searchbar';
import ImageGallery from "./imageGallery";
import Button from "./button";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [value, setValue] = useState('');

  const handleFormSearch = (searchQuery) => {
    setValue(searchQuery)
  }

  return (
    <div>
      <SearchBar onSubmit={handleFormSearch}/>
      <ImageGallery value={value} />
      <Button/>
      <ToastContainer autoClose={3000} theme="colored"/>
    </div>
  );
};
