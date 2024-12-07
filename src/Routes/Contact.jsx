import React, { useContext } from "react";
import Form from "../Components/Form";
import { ContextGlobal } from "../Components/utils/global.context";

const Contact = () => {
  const { state } = useContext(ContextGlobal);

  return (
    <div className={state.theme}> {/* Aplicar la clase basada en el tema */}
      <h2>¿Quieres saber mas?</h2>
      <p>Envianos tu pregunta y nos contactaremos contigo</p>
      <Form />
    </div>
  );
};

export default Contact;