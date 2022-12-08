import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { nanoid } from 'nanoid';
import css from './App.module.css';


export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  };

  componentDidMount() {
    const newContacts = JSON.parse(localStorage.getItem("contacts"));
    if (newContacts) {
      this.setState({ contacts: newContacts });
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevState.contacts !== this.state.contacts){
      localStorage.setItem("contacts", JSON.stringify
      (this.state.contacts))
    };
  }

  addContacts = ({ name, number }) => {
    const contactEl = {
      id: nanoid(),
      name: name,
      number: number,
    };

    if (this.state.contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, contactEl],
    }));
   
  };

  getVisibleContacts=()=> {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(normalizedFilter));
  }

  onDeleteContacts =id=>{
    this.setState((prevState)=> ({
      contacts: prevState.contacts.filter(
        (contact)=> contact.id !== id
      ),
 }))
 };

  componentFilter = e => {
    this.setState({filter: e.currentTarget.value});
  }

  render() {
    const { filter } = this.state;
    const visibleContacts =  this.getVisibleContacts();
    return (
      <div>
      <h1 className={css.text}>Phonebook</h1>
      <ContactForm 
      onSubmit={this.addContacts}/>

      <h2  className={css.text}>Contacts</h2>
      <Filter value={filter} onChange={this.componentFilter} />
      <ContactList 
       contacts={ visibleContacts }
      deleteContacts={ this.onDeleteContacts } 
     />
      </div>
    );
  }
}













