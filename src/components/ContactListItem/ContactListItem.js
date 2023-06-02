import PropTypes from 'prop-types';
import s from './ContactListItem.module.css';

const ContactListItem = ({ id, name, number, onDeleteClick }) => {
  return (
    <li className={s.contactItem}>
      {name}: {number}
      <button
        type="button"
        className={s.deleteBtn}
        onClick={() => onDeleteClick(id)}
      >
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default ContactListItem;
