import React, { useState } from "react";
import "../App.css"

const NewLernende = () => {
    const texts = [
        "Vorname: ",
        "Nachname: ",
        "Adresse:  ",
        "PLZ: ",
        "Ort: ",
        "Geburtsdatum: ",
        "Berufsfachschule: ",
        "Beruf: ",
        "Fachrichtung: ",
        "Gruppe: "
    ];
    const  [formData, setFormData] = useState([]);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    const submit = (event) => {
        event.preventDefault();
        console.log("Erstellung eines neuen: ", formData);
    };

    return (
        <div>
            <h1>Lernenden Erstellen</h1>
            <form onSubmit={submit}>
                <label className="label" style={{width:'100%', height: '300px', textAlign: 'center'}}>
                    <p>Infos hier eingeben:</p>
                    {texts.map((text, int) =>(
                        <input key={int}type="text" name={text.split(":")[0].trim()} placeholder={`${text}`}value={formData[text.split(":")[0].trim()] || ""}onChange={handleInput} />
                    ))}
                </label>
                <button className="absenden">Absenden</button>
            </form>
        </div>
    );
}

export default NewLernende;
