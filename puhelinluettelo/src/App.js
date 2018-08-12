import React from "react";
import AddPerson from "./components/AddPerson.js";
import EventMessage from "./components/EventMessage.js";
import "./App.css";
import personService from "./services/persons.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      // for form inputs
      newName: "",
      newNumber: "",
      filtering: "",
      eventMessage: null
    };

    this.addPerson = this.addPerson.bind(this);
    this.handleNewName = this.handleNewName.bind(this);
    this.handleNewNumber = this.handleNewNumber.bind(this);
  }

  componentDidMount() {
    personService.getAll().then(persons => {
      this.setState({ persons });
    });
  }

  // Lyhytaikaisen ifoviestin muodostaminen
  setMessage = message => {
    this.setState({
      eventMessage: message
    });
    setTimeout(() => {
      this.setState({ eventMessage: null });
    }, 5000);
  };

  // Uuden numeron lisääminen
  addPerson = event => {
    event.preventDefault();

    const nameAlreadyExist = this.state.persons
      .map(person => person.name)
      .includes(this.state.newName);

    if (!nameAlreadyExist) {
      const newPerson = {
        name: this.state.newName,
        number: this.state.newNumber,
        id: this.state.persons.length + 1
      };
      const persons = this.state.persons.concat(newPerson);

      this.setState({
        persons,
        newName: "",
        newNumber: ""
      });

      personService.create({
        name: this.state.newName,
        number: this.state.newNumber
      });
      this.setMessage(`lisättiin ${this.state.newName}`)
    } else {
      if (
        window.confirm(
          this.state.newName +
            " on jo luettelossa, korvataanko vanha numero uudella?"
        )
      ) {
        const person = this.state.persons.find(person =>
          person.name.includes(this.state.newName)
        );
        const updatedPerson = { ...person, number: this.state.newNumber };

        personService.update(person.id, updatedPerson).then(() => {
          personService.getAll().then(persons => {
            this.setState({ persons });
          });
          this.setMessage("Numero vaihdettu!")
        })
        .catch(error => {
          alert("Virhe! Henkilö on kenties poistettu palvelimelta.");
          this.setState({persons: this.state.persons.filter(p => p !== person)})
        })

        this.setState({
          newName: "",
          newNumber: ""
        });
        
      }
    }
  };

  handleNewName = event => {
    this.setState({ newName: event.target.value });
  };
  handleNewNumber = event => {
    this.setState({ newNumber: event.target.value });
  };
  filterPersons = event => {
    this.setState({ filtering: event.target.value });
  };

  handleDelete = id => {
    return () => {
      // Määritellään poistettavan henkilön nimi
      const nimi = this.state.persons
        .filter(person => person.id === id)
        .map(person => person.name);

      // Poistetaan henkilö serveriltä
      if (window.confirm("Poistetaanko " + nimi)) {
        personService.destroy(id).then(() => {
          personService.getAll().then(persons => {
            this.setState({ persons });
          });
          this.setMessage(`Poistettiin ${nimi}`)
        })
        .catch(error => {
          alert("Henkilö on jo kenties poistettu palvelimelta.")
          this.setState({persons: this.state.persons.filter(p => p.id !== id)})
        })
      }
    };
  };

  render() {
    const filteredPersons = this.state.persons.filter(person =>
      person.name.toLowerCase().includes(this.state.filtering.toLowerCase())
    );

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <EventMessage message={this.state.eventMessage} />
        <div>
          rajaa näytettäviä:
          <input value={this.state.filtering} onChange={this.filterPersons} />
        </div>
        <AddPerson
          addPerson={this.addPerson}
          handleNewName={this.handleNewName}
          handleNewNumber={this.handleNewNumber}
          newName={this.state.newName}
          newNumber={this.state.newNumber}
        />
        <h2>Numerot</h2>
        <table>
          <tbody>
            {filteredPersons.map(person => {
              return (
                <tr key={person.id}>
                  <td>{person.name}</td>
                  <td>{person.number}</td>
                  <td>
                    <button
                      type="button"
                      onClick={this.handleDelete(person.id)}
                    >
                      poista
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
