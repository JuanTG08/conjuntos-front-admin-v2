const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "PATH", uid: "path", sortable: true},
  {name: "MÉTODO", uid: "method", sortable: true},
  {name: "NOMBRE", uid: "name", sortable: true},
  {name: "DESCRIPCIÓN", uid: "description"},
  {name: "ESTADO", uid: "status", sortable: true},
  {name: "OPCIONES", uid: "actions"},
];

const statusOptions = [
  {name: "ACTIVO", uid: "Activo"},
  {name: "INACTIVO", uid: "Inactivo"},
];

export {columns, statusOptions};
