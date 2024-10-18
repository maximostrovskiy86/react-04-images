import React, {useState, useEffect, useMemo} from 'react';
import {MainContent, ContainerGallery} from "./ImageGallery.styled";
import ImageGalleryItem from "./imageGalleryItem";
import {fetchGetImages, fetchLoadMOreImages} from "../../services/Api";
import Button from "../button";
import {nanoid} from 'nanoid'

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

export const smoothScroll = () => {
  const element = document.querySelector('.load-more-btn');
  element.scrollIntoView({
    behavior: 'smooth',
    // block: 'start',
    block: 'end',
  });
}

const ImageGallery = ({value}) => {

  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);


 const  getImages = (value, page) => {

   if (!page) {
     fetchGetImages(value).then(results => {
       setGallery(results.hits)
     }).catch(error => {
       setError(error);
       setStatus(Status.REJECTED);
     })
   }

 }

  useEffect(() => {
    if (value === "") {
      return
    }
    console.log("UESEFFECT---1")

    fetchGetImages(value).then(results => {
      setGallery(results.hits)
    }).catch(error => {
      setError(error);
      setStatus(Status.REJECTED);
    })
  }, [value])

  useEffect(() => {
    if (page === 1) {
      return;
    }

    fetchLoadMOreImages(value, page).then(results => {
      setGallery(prevState => [...prevState, ...results.hits])

    }).catch(error => {
      setError(error);
      setStatus(Status.REJECTED);
      }).finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        })
      })


    console.log("UESEFFECT-------2")

  }, [page, value])

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  }

  // console.log("gallery", gallery)
  return (
    <MainContent>
      <ContainerGallery>
        {gallery.map(image => (<ImageGalleryItem key={nanoid()} image={image}/>))}
      </ContainerGallery>
      <Button setPage={onLoadMore}/>
    </MainContent>
  )
}

export default ImageGallery;
