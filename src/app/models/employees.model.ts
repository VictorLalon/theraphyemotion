
import { Historiaclinica } from "./historiaclinica.model";

export interface Employees {
    id: string,
    name: string,
    apellido: string,
    fechadenacimiento: string,
    cedula: number,
    salario: number,
    plantel: string,
    cargo: string,
    correo:string,
    referido:string,
    historiaclinica: string,
    fechaconsulta: string,
    motivoconsulta: string,
    historialdeenfermedad: string,
    antecendentesmedicos: string,
    desarollodefisioterapia: string,
    antecedentes_medicos:string,
    habitos:string,
    evaluacionterapuetica:string,
    pruebasfisicas:string,
    diagnosticofisioterapeutico:string,
    plandetratamiento:string,
    resultados:string,
    consentiemiento:string,
    cicatrizquirurguica:string,
    firma:string,

    title: string;
    description: string;
    date: string;
    time: string;
    historia: Historiaclinica[]
    

    
}