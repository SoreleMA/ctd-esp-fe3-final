import React, { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const validateForm = () => {
    if (name.trim().length <= 5) {
      return "El nombre debe tener más de 5 caracteres.";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Por favor, ingresa un correo válido.";
    }
    return null; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMsg = validateForm();

    if (errorMsg) {
      setError(errorMsg);
      setSuccess("");
    } else {
      setError(null);
      setSuccess(`Gracias ${name}, te contactaremos cuanto antes vía mail.`);
      setName(""); 
      setEmail(""); 
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingresa tu nombre completo"
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo electrónico"
          />
        </div>
        <button type="submit">Enviar</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p
          style={{
            color: "green",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          {success}
        </p>
      )}
    </div>
  );
};

export default Form;
