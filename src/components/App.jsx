import React, {useState} from 'react';
import SearchBar from './searchbar';
import ImageGallery from "./imageGallery";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <SearchBar onSubmit={setValue}/>
      <ImageGallery value={value} setValue={setValue}/>
      <ToastContainer autoClose={3000} theme="colored"/>
    </div>
  );
};
