import React, {useState, useEffect} from 'react';
import {MainContent, ContainerGallery} from "./ImageGallery.styled";
import ImageGalleryItem from "./imageGalleryItem";
import {fetchGetImages, fetchLoadMOreImages} from "../../services/Api";
import Button from "../button";
import {nanoid} from 'nanoid'
import {Blocks} from 'react-loader-spinner';
// import {smoothScroll} from "../../helpers/smoothScroll";
import Modal from "../modal";

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

const smoothScroll = () => {
  const element = document.querySelector('.load-more-btn');
  console.log('smoothScroll', element);
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
  const [, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState('');


  useEffect(() => {
    if (value === "") {
      return
    }

    console.log('USE_EFFECT-1' )


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

    console.log('USE_EFFECT-2' )

    fetchLoadMOreImages(value, page).then(results => {
      setStatus(Status.RESOLVED);
      setGallery(prevState => [...prevState, ...results.hits])
    }).catch(error => {
      console.log(error);
      setStatus(Status.REJECTED);
    }).finally(() => {
      // setStatus(Status.RESOLVED)

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    })
  }, [page])


  const onLoadMore = () => {
    // setStatus(Status.RESOLVED)
    setPage(prevState => prevState + 1);
  }

  const toggleModal = () => {
    setShowModal(state => !state)
  }

  const onClickCurrentImage = (largeImg) => {
    setShowModal(prev => !prev);
    setLargeImg(largeImg);
  }

  if (status === 'idle') {
    return <h2 style={{textAlign: "center", marginTop: '20px'}}>Enter the name image which you want to find</h2>
  }

  if (status === 'pending') {
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
          {gallery.map(image => (
            <ImageGalleryItem key={nanoid()} image={image} onClickCurrentImage={onClickCurrentImage}/>))}
        </ContainerGallery>
        {showModal && <Modal toggleModal={toggleModal}> <img src={largeImg} alt="Изображение"/>
        </Modal>}
        {gallery.length > 0 && <Button setPage={onLoadMore}/>}
      </MainContent>
    )
  }
}

export default ImageGallery;
