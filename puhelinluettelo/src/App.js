import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas',
          number: '123456789',
          id: 1
        }
      ],
      // for form inputs
      newName: '',
      newNumber: ''
    }
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

  handleNewPerson = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNewNumber = (event) => {
    this.setState({ newNumber: event.target.value })
  }


  
  render() {

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            <div>
              nimi: 
              <input 
                value={this.state.newName}
                onChange={this.handleNewPerson}
              />
            </div>
            <div>
              numero:
              <input
                value={this.state.newNumber}
                onChange={this.handleNewNumber}
              />
            </div>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.map(person => 
            <li key={person.id}>
              {person.name} {person.number}
            </li>)}
        </ul>
      </div>
    )
  }
}

export default App;
