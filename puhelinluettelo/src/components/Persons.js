import React from 'react'

const Persons = ({persons, filtering}) => {
  
  const filteredPersons = persons
    .filter(person => 
      (person.name.toLowerCase())
      .includes(filtering.toLowerCase())
    )
  
  return(
    <div>
      <ul>
        {filteredPersons.map(person => 
          <li key={person.id}>
            {person.name} {person.number}
          </li>)}
      </ul>
    </div>  
  )
}