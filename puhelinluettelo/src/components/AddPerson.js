import React from 'react'

const AddPerson = ({addPerson, handleNewName, handleNewNumber,
  newName, newNumber}) => {
  console.log(newName)
  console.log(newNumber)
  return(
    <div>
      <form onSubmit={addPerson}>
        <div>
          <div>
            nimi: 
            <input 
              value={newName}
              onChange={handleNewName}
            />
          </div>
          <div>
            numero:
            <input
              value={newNumber}
              onChange={handleNewNumber}
            />
          </div>
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    </div>
  )
}

export default AddPerson 