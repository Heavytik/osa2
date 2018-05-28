import React from 'react';

const Kurssi = (props) => {
  let nimi, osat
  ({nimi, osat} = props.kurssikuvaus)
  const tehtavienMaara = osat.reduce((alkuperainen, osa) => alkuperainen + osa.tehtavia, 0)
  return(
    <div>
      <h1>{nimi}</h1>
      {osat.map((osa, i) => <p key={i}> {osa.nimi} {osa.tehtavia} </p>)}
      <p>Yhteensä {tehtavienMaara} tehtavää.</p>
    </div>
  )
}

export default Kurssi