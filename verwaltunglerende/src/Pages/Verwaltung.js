import React, {useEffect, useState} from "react";
import {FaTrash} from "react-icons/fa";
import {Link} from "react-router-dom";
import "../App.css"

const Profil = ({image, vorname, nachname, adresse, plz, ort, geburtsdatum, berufssfachschule, beruf, fachrichtung, gruppe, onDelete, onUpdateText, profileLink}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [Vorname,  setVorname] = useState(vorname);
  const [Nachname,  setNachname] = useState(nachname);
  const [Adresse,  setAdresse] = useState(adresse);
  const [PLZ,  setPLZ] = useState(plz);
  const [Ort,  setOrt] = useState(ort);
  const [Geburtsdatum,  setGeburtsdatum] = useState(geburtsdatum);
  const [Berufsfachschule,  setBerufsfachschule] = useState(berufssfachschule);
  const [Beruf,  setBeruf] = useState(beruf);
  const [Fachrichtung,  setFachrichtung] = useState(fachrichtung);
  const [Gruppe,  setGruppe] = useState(gruppe);


  const editButton = () => {
    setIsEditing(true);
    console.log(Vorname);
  };
  const saveButton = () => {
    onUpdateText();
    setIsEditing(false);
  };

  const splitStringOnWhitespace = (str) => {
    return str.split(/\s+/);
  }
  
  return (
    <div style={{display: 'flex', alignItems:'center', marginBottom:'100px', marginTop:'100px', marginLeft: '250px'}}>
      <Link to={profileLink}>
        <img src={image} alt=""style={{width:'210px', height: '240px', marginRight:'50px',alignItems:'center', borderRadius:'25%'}} />
      </Link>
      {isEditing ? (
        <div>
          <label>
            <strong>Vorname:</strong>
          <textarea value={Vorname} onChange={setVorname} style={{width:'50px', height:'50px',backgroundColor:'white', color:'black'}} /><br />
          </label>
          <textarea value={Nachname} onChange={setNachname} style={{width:'50px', height:'50px',backgroundColor:'white', color:'black'}} /><br />
          <textarea value={Adresse} onChange={setAdresse} style={{width:'50px', height:'50px',backgroundColor:'white', color:'black'}} /><br />
          <textarea value={PLZ} onChange={setPLZ} style={{width:'50px', height:'50px',backgroundColor:'white', color:'black'}} /><br />
          <textarea value={Ort} onChange={setOrt} style={{width:'50px', height:'50px',backgroundColor:'white', color:'black'}} /><br />
          <textarea value={Geburtsdatum} onChange={setGeburtsdatum} style={{width:'50px', height:'50px',backgroundColor:'white', color:'black'}} /><br />
          <textarea value={Berufsfachschule} onChange={setBerufsfachschule} style={{width:'50px', height:'50px',backgroundColor:'white', color:'black'}} /><br />
          <textarea value={Beruf}  onChange={setBeruf} style={{width:'50px', height:'50px',backgroundColor:'white', color:'black'}} /><br />
          <textarea value={Fachrichtung} onChange={setFachrichtung} style={{width:'50px', height:'50px',backgroundColor:'white', color:'black'}} /><br />
          <textarea value={Gruppe} onChange={setGruppe} style={{width:'50px', height:'50px',backgroundColor:'white', color:'black'}} /><br />
        </div>
        ):(
          <div>
            <>
            <strong>ID:</strong> {} <br />
            <strong>Vorname:</strong> {Vorname} <br />
            <strong>Nachname:</strong>  {Nachname} <br />
            <strong>Adresse:</strong> {Adresse} <br />
            <strong>PLZ:</strong> {PLZ} <br />
            <strong>Ort:</strong> {Ort} <br />
            <strong>Geburtsdatum:</strong> {geburtsdatumFormation(Geburtsdatum)} <br />
            <strong>Berufsfachschule:</strong> {Berufsfachschule}<br />
            <strong>Beruf:</strong> {Beruf}<br />
            <strong>Fachrichtung:</strong> {Fachrichtung} <br />
            <strong>Gruppe:</strong> {Gruppe}<br />
            </>  
          </div>
      )}
      <div>
        {!isEditing ? (
            <button onClick={editButton} style={{marginLeft:'10px', background:'whitesmoke', border:'none', crusor:'pointer'}}>
              Edit Information
            </button>
        ) :(
        <button onClick={saveButton} style={{marginLeft:'10px', background:'none', border:'none', crusor:'pointer', height: '100px'}}>
          Save Changes
        </button>
        )}
        <button onClick={onDelete} style={{marginLeft:'10px',background:'whitesmoke', border:'none', crusor:'pointer'}}>
          <FaTrash size={15} color="black" />
        </button>
        </div>
    </div>
  );
};
const geburtsdatumFormation = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth()+ 1).toString().padStart(2, 0);
  const day = date.getDate().toString().padStart(2, 0)
  return `${year}-${month}-${day}`
}
const Verwaltung = () =>{
  const[berufsfachschule, setberufsfachschule] = useState([]);
  const[berufe, setberufe] = useState([]);
  const[fachrichtung, setfachrichtung] = useState([]);
  const[gruppe, setgtuppe] = useState([]);
  const [personenProfil, setProfil] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect (() => {
    fetch("http://localhost:5000/personen")
    .then(res => res.json())
    .then((json) => setProfil(json));

    fetch("http://localhost:5000/berufsfachschule")
    .then(res => res.json())
    .then((json) => setberufsfachschule(json));

    fetch("http://localhost:5000/beruf")
    .then(res => res.json())
    .then((json) => setberufe(json));

    fetch("http://localhost:5000/fachrichtung")
    .then(res => res.json())
    .then((json) => setfachrichtung(json));

    fetch("http://localhost:5000/gruppe")
    .then(res => res.json())
    .then((json) => setgtuppe(json));
  }, []);

  const filterChange =(event) => {
    setFilterText(event.target.value);
  };
  const deleteButton =(id) => {
    fetch(`http://localhost:5000/personen/${id}`, {
      method:"DELETE"
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const newpicture = personenProfil.filter((profil) => profil.ID !== id);
      setProfil(newpicture);
    })
    .catch((error) => {
      console.error("Error deliting data:", error);
    });
  };
  const updateText = (profil) => {
    //console.log("ID: " + id);
    console.log(profil)
    /*fetch(`/persons/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({text: newText})
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });*/

  };


  const filteredProfiles = personenProfil.filter((profil) => {
  const searchText = filterText.toLowerCase();
  const fullName = `${profil.Vorname} ${profil.Nachname}`.toLowerCase();
  const adresse = `${profil.Adresse} ${profil.PLZ} ${profil.Ort}`.toLowerCase();
  const geburtsdatum = `${profil.Geburtsdatum}`.toLowerCase();
  const berufsfachschule = `${profil.Berufsfachschule}`.toLowerCase();
  const beruf = `${profil.Beruf}`.toLowerCase();
  const fachrichtung = `${profil.Fachrichtung}`.toLowerCase();
  const gruppe  = `${profil.Gruppe}`.toLowerCase();
  return (
    fullName.includes(searchText) ||
    adresse.includes(searchText) ||
    geburtsdatum.includes(searchText) ||
    berufsfachschule.includes(searchText) ||
    beruf.includes(searchText) ||
      fachrichtung.includes(searchText) ||
      gruppe.includes(searchText)
  );
});
  return (
    <div>
      <h1>Verwaltungssystem ZLI 2023/24</h1>
      <input type="text" value={filterText} onChange={filterChange} placeholder="Nach Text filtern" style={{marginLeft:'950px', marginTop:'30px', width:'150px', height:'30px'}} />
      {filteredProfiles.map((pr) =>(
        <Profil key={pr.ID} image='https://aicofcz.s3.eu-central-1.amazonaws.com/images/optimized_crm_7EMRYvGf8yjF84XKr4xztHPrPY4VKoJF6Jc5QRhw.jpg'
        vorname={pr.Vorname}
        nachname={pr.Nachname}
        adresse={pr.Adresse}
        plz={pr.PLZ}
        ort={pr.Ort}
        geburtsdatum={pr.Geburtsdatum}
        berufssfachschule={pr.Berufsfachschule}
        beruf={pr.Beruf}
        fachrichtung={pr.Fachrichtung}
        gruppe={pr.Gruppe}
        onDelete={() => deleteButton(pr.ID)}
        onUpdateText={() => updateText(Profil)}
        profileLink={pr.profileLink}>
        </Profil>
      ))}
        <div style={{}}>
        <Link to='../Neuerlernende.js'>
        <button className="lernendenhinzu">Lernenden hinzufügen</button>
      </Link>
        </div>
    </div>
  );
};
export default Verwaltung;