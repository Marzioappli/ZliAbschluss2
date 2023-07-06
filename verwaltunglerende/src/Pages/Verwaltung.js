import React, {useEffect, useState} from "react";
import {FaTrash} from "react-icons/fa";
import {Link} from "react-router-dom";
import 'whatwg-fetch';
import "../App.css"

class Profil extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      data: {
        ID: props.id,
        Vorname: props.vorname,
        Nachname: props.nachname,
        Adresse: props.adresse,
        PLZ: props.plz,
        Ort: props.ort,
        Geburtsdatum: props.geburtsdatum,
        Berufsfachschule: props.berufssfachschule,
        Beruf: props.beruf,
        Fachrichtung: props.fachrichtung,
        Gruppe: props.gruppe
      }
    };
  }

  editButton = () => {
    this.setState({ isEditing: true });
    console.log(this.state.data.Vorname);
  };

  saveButton = () => {
    console.log(this.state);
    this.updateText();
    this.setState({ isEditing: false });
  };

  updateText = () => {
    console.log("ID: " + this.props.id);
    console.log(this.state);
    console.log(this.state.data.Geburtsdatum);
    fetch(`http://localhost:5000/personen/${this.props.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  splitStringOnWhitespace = str => {
    return str.split(/\s+/);
  };

  render() {
    const { image, profileLink, onDelete } = this.props;
    const {
      isEditing,
      data: {
        Vorname,
        Nachname,
        Adresse,
        PLZ,
        Ort,
        Geburtsdatum,
        Berufsfachschule,
        Beruf,
        Fachrichtung,
        Gruppe
      }
    } = this.state;

    return (
      <div
        style={{display: 'flex',alignItems: 'center',marginBottom: '100px',marginTop: '100px',marginLeft: '250px'}}>
        <Link to={profileLink}>
          <img
            src={image}
            alt=""
            style={{width: '210px',height: '240px',marginRight: '50px',alignItems: 'center',borderRadius: '25%'}}/>
        </Link>
        {isEditing ? (
          <div>
            <label>
              <strong>Vorname:</strong>
              <textarea
                value={Vorname}
                onChange={e =>
                  this.setState({
                    data: { ...this.state.data, Vorname: e.target.value }
                  })
                }
                style={{width: '200px',height: '50px',backgroundColor: 'whitesmoke',color: 'black'}}/>
              <br />
            </label>
            <strong>Nachname:</strong>
            <textarea
              value={Nachname}
              onChange={e =>
                this.setState({
                  data: { ...this.state.data, Nachname: e.target.value }
                })
              }
              style={{width: '200px',height: '50px',backgroundColor: 'whitesmoke',color: 'black'}}/>
            <br />
            <strong>Adresse:</strong>
            <textarea
              value={Adresse}
              onChange={e =>
                this.setState({
                  data: { ...this.state.data, Adresse: e.target.value }
                })
              }
              style={{width: '200px',height: '50px',backgroundColor: 'whitesmoke',color: 'black'}}/>
            <br />
            <strong>PLZ:</strong>
            <textarea
              value={PLZ}
              onChange={e =>
                this.setState({
                  data: { ...this.state.data, PLZ: e.target.value }
                })
              }
              style={{width: '200px',height: '50px',backgroundColor: 'whitesmoke',color: 'black'}}/>
            <br />
            <strong>Ort:</strong>
            <textarea
              value={Ort}
              onChange={e =>
                this.setState({
                  data: { ...this.state.data, Ort: e.target.value }
                })
              }
              style={{width: '200px',height: '50px',backgroundColor: 'whitesmoke',color: 'black'}}/>
            <br />
            <strong>Geburtsdatum:</strong>
            <textarea
              value={Geburtsdatum}
              onChange={e =>
                this.setState({
                  data: { ...this.state.data, Geburtsdatum: e.target.value }
                })
              }
              style={{width: '200px',height: '50px',backgroundColor: 'whitesmoke',color: 'black'}}/>
            <br />
            <strong>Berufsfachschule:</strong>
            <textarea
              value={Berufsfachschule}
              onChange={e =>
                this.setState({
                  data: { ...this.state.data, Berufsfachschule: e.target.value }
                })
              }
              style={{width: '200px',height: '50px',backgroundColor: 'whitesmoke',color: 'black'}}/>
            <br />
            <strong>Beruf:</strong>
            <textarea
              value={Beruf}
              onChange={e =>
                this.setState({
                  data: { ...this.state.data, Beruf: e.target.value }
                })
              }
              style={{width: '200px',height: '50px',backgroundColor: 'whitesmoke',color: 'black'}}/>
            <br />
            <strong>Fachrichtung:</strong>
            <textarea
              value={Fachrichtung}
              onChange={e =>
                this.setState({
                  data: { ...this.state.data, Fachrichtung: e.target.value }
                })
              }
              style={{width: '200px',height: '50px',backgroundColor: 'whitesmoke',color: 'black'}}/>
            <br />
            <strong>Gruppe:</strong>
            <textarea
              value={Gruppe}
              onChange={e =>
                this.setState({
                  data: { ...this.state.data, Gruppe: e.target.value }
                })
              }
              style={{width: '200px',height: '50px',backgroundColor: 'whitesmoke',color: 'black'}}/>
            <br />
          </div>
        ) : (
          <div>
            <>
              <strong>Vorname:</strong> {Vorname} <br />
              <strong>Nachname:</strong> {Nachname} <br />
              <strong>Adresse:</strong> {Adresse} <br />
              <strong>PLZ:</strong> {PLZ} <br />
              <strong>Ort:</strong> {Ort} <br />
              <strong>Geburtsdatum:</strong> {geburtsdatumFormation(Geburtsdatum)}  <br />
              <strong>Berufsfachschule:</strong> {Berufsfachschule} <br />
              <strong>Beruf:</strong> {Beruf} <br />
              <strong>Fachrichtung:</strong> {Fachrichtung} <br />
              <strong>Gruppe:</strong> {Gruppe} <br />
            </>
          </div>
        )}
        <div>
          {!isEditing ? (
            <button
              onClick={this.editButton}
              style={{marginLeft: '10px',background: 'whitesmoke',border: 'none',cursor: 'pointer', height:'40px', backgroundColor:'transparent', fontSize: 'large'}}>Edit Information
            </button>
          ) : (
            <button
              onClick={this.saveButton} className="save-changes"
              style={{marginLeft: '10px',background: 'none',border: 'none',cursor: 'pointer',height: '100px'}}>
              Save Changes
            </button>
          )}
          <button
            onClick={onDelete}
            style={{marginLeft: '10px',background: 'whitesmoke',border: 'none',cursor: 'pointer'}}>
            <FaTrash size={20} color="black" />
          </button>
        </div>
      </div>
    );
  }
}


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
  const deleteButton = (ID) => {
    fetch(`http://localhost:5000/personen/${ID}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (res.ok) {
          const newProfiles = personenProfil.filter((profil) => profil.ID !== ID);
          setProfil(newProfiles);
        } else {
          console.log("Delete fehlgeschlagen!");
        }
      })
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
        <Profil key={pr.ID} id={pr.ID} image='https://aicofcz.s3.eu-central-1.amazonaws.com/images/optimized_crm_7EMRYvGf8yjF84XKr4xztHPrPY4VKoJF6Jc5QRhw.jpg'
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
        onDelete={() => deleteButton(pr.Vorname)}
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