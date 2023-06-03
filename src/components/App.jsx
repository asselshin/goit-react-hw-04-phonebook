import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default function App() {
  const [contacts, setContacts] = useState(
    () => {
      return JSON.parse(window.localStorage.getItem('contacts')) ?? ' ';
    });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('uodate');
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFillteredNames = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const formSubmitHandler = data => {
    const contact = {
      id: nanoid(),
      ...data,
    };

    const repeatedName = contact.name.toLowerCase();

    const hasrepeatedName = contacts.find(
      contact => contact.name.toLowerCase() === repeatedName.toLowerCase()
    );

    if (hasrepeatedName) {
      alert(`${contact.name} is already in contacts`);
      return false;
    }

    setContacts(prevState => [...prevState, contact]);
    return true;
  };

  const deleteContact = contactId => {
    setContacts(prevState => [
      ...prevState.filter(contact => contact.id !== contactId),
    ]);
  };

  return (
    <div className="container">
      <h1>Phonebook </h1>
      <Form onSubmit={formSubmitHandler} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contactArray={getFillteredNames()}
        onDeleteClick={deleteContact}
      />
    </div>
  );
}
