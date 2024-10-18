import {ButtonStyle} from './Button.styled';

const Button = ({setPage}) => {
  return (
    <ButtonStyle className="load-more-btn" onClick={setPage}>
      Load more
    </ButtonStyle>
  )
}

export default Button;
