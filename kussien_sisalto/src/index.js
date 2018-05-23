
import React from 'react';
import ReactDOM from 'react-dom';

const Kurssi = (props) => {
  let nimi, osat
  ({nimi, osat} = props.kurssikuvaus)
  
  return(
    <div>
      <h1>{nimi}</h1>
      {osat.map((osa, i) => <p key={i}> {osa.nimi} {osa.tehtavia} </p>)}
    </div>
  )
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
    <div>
      <Kurssi kurssikuvaus={kurssi} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

ReactDOM.render(<App />, document.getElementById('root'));

