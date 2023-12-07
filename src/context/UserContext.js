// UserContext.js - Define un contexto para almacenar la información del usuario
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ dataUser = null, children }) {
  const [user, setUser] = useState(dataUser); // Inicialmente, el usuario puede ser null o algún valor por defecto

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
