import React, {useState, useEffect} from 'react';
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
  const [, setQuery] = useState('');
  const [loadButton, setLoadButton] = useState(false);


  useEffect(() => {
    if (value === "") {
      return
    }

    setQuery((prevState) => {
      // console.log("prevState", prevState)
      // console.log("value", value)
      if (prevState !== value) {
        setPage(1);
      }
    })


    console.log("UESEFFECT---1")

    fetchGetImages(value).then(results => {
      if (results.length > 0) {
        setLoadButton(true)
      }


      setQuery((prevState) => {
        setQuery(value);
        setGallery(results.hits)
      })
    }).catch(error => {
      setError(error);
      setStatus(Status.REJECTED);
    })
  }, [value])


  useEffect(() => {

    if (page === 1) {
      return;
    }

    console.log("PAGE", page);
    console.log("UESEFFECT-------2");

    fetchLoadMOreImages(value, page).then(results => {

      if (!results.length) {
        setLoadButton(false)
      }

      setGallery(prevState => [...prevState, ...results.hits])
      console.log("results", results.hits)

    }).catch(error => {
      setError(error);
      setStatus(Status.REJECTED);
    }).finally(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      })
    })

  }, [page])

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  }

  console.log("gellery", gallery)


  return (
    <MainContent>
      <ContainerGallery>
        {gallery.map(image => (<ImageGalleryItem key={nanoid()} image={image}/>))}
      </ContainerGallery>
      {gallery.length > 0 && <Button setPage={onLoadMore}/>}
    </MainContent>
  )
}

export default ImageGallery;
