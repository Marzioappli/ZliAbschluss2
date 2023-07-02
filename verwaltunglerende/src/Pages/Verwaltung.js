import React, {useEffect, useState} from "react";
import {FaTrash} from "react-icons/fa";
import {Link} from "react-router-dom";
import "../App.css"

const splitStringOnWhitespace = (str) => {
  return str.split(/\s+/);
}

const Profilbild = ({image, text, onDelete, onUpdateText, profileLink}) => {
  const [editableText, setEditableText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);

  useEffect (() => {
    setEditableText(bearbeiteText(text));
  }, [text]);
  const bearbeiteText = (text) => {
    let bearbeiteterText = "";

    if(React.isValidElement(text)) {
      React.Children.forEach(text.props.children, (child) => {
        if (typeof child === "string") {
          bearbeiteterText += child;
        }
      });
    }else if (typeof text === "string"){
      bearbeiteterText = text;
    }
    return bearbeiteterText;
  };
  const textChange = (event) =>{
    setEditableText(event.target.value);
  };
  const editButton = () => {
    setIsEditing(true);
  };
  const saveButton = () => {
    console.log(editableText);
    let data = (splitStringOnWhitespace(editableText));
    const person = {
      Vorname: data[0],
      Nachname: data[1],
      Adresse: data[2],
      PLZ: data[3],
      Ort: data[4],
      Geburtsdatum: data[5],
      Berufsfachschule: data[6],
      Beruf: data[7],
      Fachrichtung: data[8],
      Gruppe: data[9]
    };
    onUpdateText(person);
    setIsEditing(false);
  };
  return (
    <div style={{display: 'flex', alignItems:'center', marginBottom:'100px', marginTop:'100px', marginLeft: '250px'}}>
      <Link to={profileLink}>
        <img src={image} alt=""style={{width:'210px', height: '240px', marginRight:'50px',alignItems:'center', borderRadius:'25%'}} />
      </Link>
      {isEditing ? (
        <textarea value={editableText}onChange={textChange} style={{width:'450px', height:'100px',backgroundColor:'white', color:'black'}} />
        ):(
          <div>{text}</div>
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
  const [profilbild, setProfilbild] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect (() => {
    fetch("http://localhost:5000/personen")
    .then(res => res.json())
    .then((json) => setProfilbild(json));

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
      const newpicture = profilbild.filter((profil) => profil.ID !== id);
      setProfilbild(newpicture);
    })
    .catch((error) => {
      console.error("Error deliting data:", error);
    });
  };
  const updateText = (id, newText) => {
    console.log("ID: " + id);
    console.log("Text: " + JSON.stringify(newText));
    fetch(`/persons/${id}`, {
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
      });
    const newpicture=profilbild.map((profil) => {
      if (profil.ID === id) {
        return {...profil, text: newText}
      }
      return profil;
    });
    setProfilbild(newpicture);
  };


const filteredProfilbild = profilbild.filter((profil) => {
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
      {filteredProfilbild.map((profil) =>(
        <Profilbild key={profil.ID} image='https://aicofcz.s3.eu-central-1.amazonaws.com/images/optimized_crm_7EMRYvGf8yjF84XKr4xztHPrPY4VKoJF6Jc5QRhw.jpg'text={
          <>
          <strong>ID:</strong> {profil.ID} <br />
          <strong>Vorname:</strong> {profil.Vorname} <br />
          <strong>Nachname:</strong>  {profil.Nachname} <br />
          <strong>Adresse:</strong> {profil.Adresse} <br />
          <strong>PLZ:</strong> {profil.PLZ} <br />
          <strong>Ort:</strong> {profil.Ort} <br />
          <strong>Geburtsdatum:</strong> {geburtsdatumFormation(profil.Geburtsdatum)} <br />
          <strong>Berufsfachschule:</strong> {profil.Berufsfachschule}<br />
          <strong>Beruf:</strong> {profil.Beruf}<br />
          <strong>Fachrichtung:</strong> {profil.Fachrichtung} <br />
          <strong>Gruppe:</strong> {profil.Gruppe}<br />
          </>
        }
        onDelete={() => deleteButton(profil.ID)}
        onUpdateText={(newText) => updateText(profil.ID, newText)}
        profileLink={profil.profileLink}>
        </Profilbild>
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