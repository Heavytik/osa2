import React from 'react';
import AddPerson from './components/AddPerson.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '123456789', id: 1},
        { name: 'Arto Hellas', number: '040-123456', id: 2},
        { name: 'Martti Tienari', number: '040-123456', id: 3 },
        { name: 'Arto Järvinen', number: '040-123456', id: 4 },
        { name: 'Lea Kutvonen', number: '040-123456', id: 5 }
      ],
      // for form inputs
      newName: '',
      newNumber: '',
      filtering: ''
    }

    this.addPerson = this.addPerson.bind(this)
    this.handleNewName = this.handleNewName.bind(this)
    this.handleNewNumber = this.handleNewNumber.bind(this)
  }
  
  addPerson = (event) => {
    event.preventDefault()
    console.log('napinpainallus')
    console.log(event)
    
    const nameAlreadyExist = this.state.persons
      .map((person) => person.name)
      .includes(this.state.newName)
    
    if (!nameAlreadyExist) {
      const newPerson = {
        name: this.state.newName,
        number: this.state.newNumber,
        id: this.state.persons.length + 1
      }
      const persons = this.state.persons.concat(newPerson)
      
      this.setState({
        persons,
        newName: ''
      })
    } else {
      alert('Nimi on jo listassa')
    }
  }
  
  handleNewName = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNewNumber = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  filterPersons = (event) => {
    this.setState({ filtering: event.target.value })
  }

  render() {
    const filteredPersons = this.state.persons
      .filter(person => 
        (person.name.toLowerCase())
        .includes(this.state.filtering.toLowerCase())
      )
    
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          rajaa näytettäviä:
          <input
            value={this.state.filtering}
            onChange={this.filterPersons}
          />
        </div>
        <AddPerson 
          addPerson={this.addPerson}
          handleNewName={this.handleNewName}
          handleNewNumber={this.handleNewNumber}
          newName={this.state.newName}
          newNumber={this.state.newNumber}
        />
        <h2>Numerot</h2>
        <ul>
          {filteredPersons.map(person => 
            <li key={person.id}>
              {person.name} {person.number}
            </li>)}
        </ul>
      </div>
    )
  }
}

export default App;
