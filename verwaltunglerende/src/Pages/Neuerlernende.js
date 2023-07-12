import React, { useState } from "react";
import "../App.css";

const NewLernende = () => {
  const texts = [ //Text vor labels
    "Vorname: ",
    "Nachname: ",
    "Adresse:  ",
    "PLZ: ",
    "Ort: ",
    "Geburtsdatum: ",
    "Berufsfachschule: ",
    "Beruf: ",
    "Fachrichtung: ",
    "Gruppe: ",
  ];
  const [formData, setFormData] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submit = async (event) => { // Funktion Button
    event.preventDefault();
    console.log("Daten des neu erstellten Lernenden: ", formData);
    try {
      console.log("Daten erfolgreich gespeichert.");
      window.history.back();//Geht  zur letzten Page auf der man war.
    } catch (error) {
      console.error("Fehler beim Speichern der Daten:", error);
    }
  };

  return (
    <div>
      <h1>Lernenden Erstellen</h1>
      <form onSubmit={submit}>
        <div className="neu-container">
          <p>Infos hier eingeben:</p>
          {texts.map((text, index) => (
            <div className="neu-group">
            <label className="neu-label">
              {text}
              <textarea
              className="neu-textarea"
                type="text"
                name={text.split(":")[0].trim()}
                value={formData[text.split(":")[0].trim()] || ""}
                onChange={handleInput}
              />
            </label>
            </div>
          ))}
        </div>
        <button className="absenden">Absenden</button>
      </form>
    </div>
  );
};

export default NewLernende;
