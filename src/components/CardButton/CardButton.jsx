import './CardButton.css';
function CardButton({children, className, onClick, ...props}) {
const cl = 'card-button ' + (className ? ' ' + className : ''); 

  return (
      <button {...props} className={cl} onClick={onClick}>
        {children}
      </button>
 );
}

export default CardButton;