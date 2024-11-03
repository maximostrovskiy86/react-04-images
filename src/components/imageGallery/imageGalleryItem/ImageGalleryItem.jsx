import {GalleryItem} from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({image: {webformatURL, tags, largeImageURL}, onClickCurrentImage}) => {

  const setLargeImage = () => onClickCurrentImage(largeImageURL);

  return (
    <GalleryItem onClick={setLargeImage}>
      <img src={webformatURL} alt={tags}/>
    </GalleryItem>
  )
}

export default ImageGalleryItem;
