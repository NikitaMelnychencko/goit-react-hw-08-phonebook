import s from './ContactDetailsPageItem.module.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from 'components/Modal/Modal-approve';
import svg from '../../image/svg/proj_svg.svg';

const ContactDetailsPageItem = ({
  name,
  value,
  updateValue,
  deleteValue,
  lastStep,
}) => {
  const [inpValue, setInpValue] = useState(value);
  const [curentOperation, setCurentOperation] = useState('');
  const [showModal, setShowModal] = useState(false);
  const undoAction = e => {
    const { textContent } = e.target;
    switch (textContent) {
      case 'Cancel':
        toggleModal('Cancel');
        break;
      case 'Delete':
        toggleModal('Delete');
        break;
      default:
        return;
    }
  };

  const undoModalAction = () => {
    switch (curentOperation) {
      case 'Cancel':
        setInpValue(value);
        toggleModal();
        break;
      case 'Delete':
        deleteValue(name);
        toggleModal();
        break;
      default:
        return;
    }
  };

  const handleChange = e => {
    const { value } = e.currentTarget;
    setInpValue(value);
  };

  const goToLastStep = e => {
    setInpValue(lastStep);
    updateValue(name, lastStep);
  };

  const toggleModal = value => {
    setShowModal(!showModal);
    setCurentOperation(value);
  };
  const editName = () => {
    const firstLetter = name.slice(0, 1);
    const capitalized = name.replace(firstLetter, firstLetter.toUpperCase());
    return capitalized.replace(/([a-z])([A-Z])/g, '$1 $2');
  };
  const validationInput = () => {
    const validation = {
      text: {
        type: 'text',
        pattern: "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
      },
      tel: {
        type: 'tel',
        pattern:
          '+?d{1,4}?[-.s]?(?d{1,3}?)?[-.s]?d{1,4}[-.s]?d{1,4}[-.s]?d{1,9}',
      },
      email: {
        type: 'email',
        pattern:
          "^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$",
      },
    };
    if (name === 'number' && name === 'tel') {
      return validation.tel;
    } else if (name === 'email' && name === 'e-mail' && name === 'e-mail') {
      return validation.email;
    } else {
      return validation.text;
    }
  };
  const handelSubmit = e => {
    e.preventDefault();
    updateValue(name, e.target[0].value);
  };
  return (
    <>
      <li className={s.FormList_Item}>
        <form onSubmit={handelSubmit}>
          <label className={s.Item}>
            {editName()}:
            <input
              type={validationInput().type}
              className={s.Input}
              pattern={validationInput().pattern}
              name={name}
              value={inpValue}
              onChange={handleChange}
            />
            <div className={s.ButtonBox}>
              <button className={s.ApplyBtn} type="submit" aria-label="Apply">
                Apply
              </button>
              <button
                type="button"
                className={s.CancelBtn}
                onClick={undoAction}
                aria-label="Cancel"
              >
                Cancel
              </button>

              <button
                className={s.deleteBtn}
                type="button"
                onClick={undoAction}
                aria-label="Delete"
              >
                Delete
              </button>
              <button
                type="button"
                className={s.LastStep}
                onClick={goToLastStep}
                aria-label="Undo"
              >
                <svg className={s.svgUndo}>
                  <use href={`${svg}#icon-undo`}></use>
                </svg>
              </button>
            </div>
          </label>
        </form>
      </li>
      {showModal && (
        <Modal onClose={toggleModal}>
            <>
              <button
                type="button"
                className={s.ApplyBtn}
                onClick={undoModalAction}
                aria-label="Apply"
              >
                Apply
              </button>
              <button
                type="button"
                className={s.CancelBtn}
                onClick={undoModalAction}
                aria-label="Cancel"
              >
                Cancel
              </button>
            </>
        </Modal>
      )}
    </>
  );
};
ContactDetailsPageItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  lastStep: PropTypes.string,
  deleteValue: PropTypes.func.isRequired,
};

export default ContactDetailsPageItem;
