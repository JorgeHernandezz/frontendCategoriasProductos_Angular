export interface Producto {
  idproducto: number;
  nombreproducto: string;
  descripcionproducto: string;
  existencia: number;
  precio: number;
  idcategoria: {
    idcategoria: number;
    nombrecategoria: string;
    descripcioncategoria: string;
    fechacreacion: string;
  };
}
