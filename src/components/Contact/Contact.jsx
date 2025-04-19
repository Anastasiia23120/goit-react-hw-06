"use client";

import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
import css from "./Contact.module.css";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <div className={css.contact}>
      <div className={css.info}>
        <span className={css.name}>{contact.name}:</span>
        <span className={css.number}>{contact.number}</span>
      </div>
      <button type="button" className={css.deleteButton} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
