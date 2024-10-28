import React, {useState, useEffect} from 'react';
import {MainContent, ContainerGallery} from "./ImageGallery.styled";
import ImageGalleryItem from "./imageGalleryItem";
import {fetchGetImages, fetchLoadMOreImages} from "../../services/Api";
import Button from "../button";
import {nanoid} from 'nanoid'
import {ProgressBar, Blocks} from 'react-loader-spinner';
import {smoothScroll} from "../../helpers/smoothScroll";
import * as PropTypes from "prop-types";

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

const ImageGallery = ({value}) => {

  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [, setQuery] = useState('');

  useEffect(() => {
    if (value === "") {
      return
    }

    setQuery((prevState) => {
      if (prevState !== value) {
        setPage(1);
      }
    })
    setStatus(Status.PENDING);

    fetchGetImages(value).then(results => {
      setQuery(value);
      setStatus(Status.RESOLVED);
      setGallery(results.hits);

    }).catch(error => {
      console.log(error);
      setStatus(status.REJECTED);
    }).finally(() => {
      if (gallery.length < 0) {
        setStatus(Status.IDLE)
      }
    })
  }, [value])


  useEffect(() => {
    if (page === 1) {
      return;
    }

    setStatus(Status.PENDING);
    fetchLoadMOreImages(value, page).then(results => {
      setStatus(Status.RESOLVED);
      setGallery(prevState => [...prevState, ...results.hits])
    }).catch(error => {
      console.log(error);
      setStatus(Status.REJECTED);
    }).finally(() => smoothScroll())
  }, [page])

  console.log('STATUS', status)

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  }

  if (status === 'idle') {
    return <h2 style={{textAlign: "center", marginTop: '20px'}}>Enter the name image which you want to find</h2>
  }

  if (status === 'pending') {
  // if (status === 'resolved') {
    return <div style={{textAlign: "center", marginTop: '20px'}}>
      <Blocks
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible/>
    </div>
  }

  if (status === 'resolved') {
    return (
      <MainContent>
        <ContainerGallery>
          {gallery.map(image => (<ImageGalleryItem key={nanoid()} image={image}/>))}
        </ContainerGallery>
        {gallery.length > 0 && <Button setPage={onLoadMore}/>}
      </MainContent>
    )
  }

}

export default ImageGallery;
