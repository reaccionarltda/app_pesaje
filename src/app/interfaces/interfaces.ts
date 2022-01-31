export interface RespuestaRegistros {
  ok: boolean;
  mensaje: string;
  pagina: number;
  registros: Registro[];
}

export interface Registro {
      horaCargado?: string;
      imgsIngreso?: string[];
      imgsCargado?: string[];
      imgsDescargado?: string[];
      _id?: string;
      tipo?: string;
      horaLlegada?: string;
      placa?: string;
      destino?: string;
      pesoOrigen?: number;
      bultos?: number;
      usuario?: Usuario;
      fechaCreacion?: string;
      updatedAt?: string;
}

export interface Usuario {
      role?: string;
      _id?: string;
      updatedAt?: string;
      fechaCreacion?: string;
      nombre?: string;
      email?: string;
      nivelAcceso?: number;
      intentos?: number;
};
