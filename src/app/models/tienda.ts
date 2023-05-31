export class Tienda {

    _id?: string;
    departamento: string;
    distrito: string;
    cantidad: string;

    constructor(departamento:string, distrito:string, cantidad: string){
        this.departamento = departamento;
        this.distrito = distrito;
        this.cantidad = cantidad;
    }

}