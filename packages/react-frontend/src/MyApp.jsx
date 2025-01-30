import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE", 
    })
    .then((res) => {
      if (res.status === 204) {
        setCharacters((prevCharacters) => prevCharacters.filter((character) => character.id !==id))
      } else if (res.status === 404) {
        console.error("User not found");
      }
    })
    .catch((error) => console.error("Error deleting user:", error));
  }

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form 
      handleSubmit={updateList} 
      />
    </div>
  );  
}

export default MyApp;