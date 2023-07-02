import React from "react";

const alone = ({ profil }) =>{
    return (
        <div>
            <h1>Lernender 1</h1>
            <img src={profil.image} alt="" style={{width: '200px', height: '200px'}}></img>
            <p>{profil.text}</p>
        </div>
    )
}
export default alone;