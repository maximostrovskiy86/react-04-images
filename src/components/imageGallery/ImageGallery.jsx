import React, {useState, useEffect} from 'react';
import {ContainerGallery} from "./ImageGallery.styled";
import ImageGalleryItem from "./imageGalleryItem";
import {fetchGetImages } from "../../services/Api";

const ImageGallery = ({value}) => {

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchGetImages(value).then(results => {
      console.log("results" ,results)
      setImages(results.hits)
    })
  }, [value])

  console.log("images", images)
  return (
    <ContainerGallery>
      {images.map(image => (<ImageGalleryItem key={image.id} image={image}/>))}
    </ContainerGallery>
  )
}

export default ImageGallery;
