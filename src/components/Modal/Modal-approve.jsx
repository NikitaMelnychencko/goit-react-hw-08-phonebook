import s from './Modal-approve.module.scss'
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';


const modalRoot = document.querySelector('#modal-root');

const Modal = ({  onClose,children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <button type="button" className={s.Button} onClick={onClose} aria-label='Close'>
          Close
        </button>
        <div className={s.Warper}>
          {children}
        </div>
      </div>
    </div>,
    modalRoot,
  );
};
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children:PropTypes.node
};
export default Modal