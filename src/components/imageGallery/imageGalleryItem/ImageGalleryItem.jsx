import {GalleryItem} from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({image: {webformatURL, tags}}) => {
  return (
    <GalleryItem>
      <img src={webformatURL} alt={tags}/>
    </GalleryItem>
  )
}

export default ImageGalleryItem;
