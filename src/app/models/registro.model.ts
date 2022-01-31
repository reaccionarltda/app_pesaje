export class Registro {
    constructor(
     public tipo: string,
     public horaLlegada: Date,
     public conductor: string,
     public placa: string,
     public procedencia: string,
     public destino: string,
     public pesoOrigen?: number,
     public bultos?: number,
     public novedadLlegada?: string,
     public horaCargado?: Date,
     public pesoCargado?: number,
     public novedadCargado?: string,
     public horaDescargado?: Date,
     public pesoDescargado?: number,
     public novedadDescargado?: string,
     public diferencia?: number,
     public referencia?: number
     ){}
};
