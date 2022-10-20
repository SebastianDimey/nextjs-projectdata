import { NextApiRequest, NextApiResponse } from "next"
import {conn} from "src/utils/database";

export default async(req:NextApiRequest, res:NextApiResponse) =>{
  const {method,
    body,
    query:{ id },
  }=req;

  switch (method) {
    case "GET": 
      try {
        const text= "SELECT * FROM prueba WHERE id= $1";
        const values = [id]; 
        const result = await conn.query(text, values);

        if (result.rows.length==0)
            return res.status(404).json({message: "Task not found"});

        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(500).json({error: error.message});
      }
    case "PUT":
        try {
            const{NombrePredio, Avaluo, Departamento, Municipio,
              TipoDocumento,NumeroDeDocumento,NombresPropietario,ApellidosPropietario,NIT,Razon,Direccion,
              Telefono,CorreoElectronico,NombreConstruccion,NumeroDePisos,AreaTotal,TipoConstruccion,
              DireccionConstruccion,NombreTerreno,AreaTerreno,ValorComercial,FuenteDeAgua,TipoTerreno} = body;
            const text= "UPDATE prueba SET nombrepredio =$1, avaluo =$2, departamento=$3, municipio=$4, tipodocumento=$5,numerodedocumento=$6,nombrespropietario=$7,apellidospropietario=$8,nit=$9, razon=$10,direccion=$11,telefono=$12,correoelectronico=$13,nombreconstruccion=$14,construccionnumeropisos=$15,construccionareatotal=$16,tipodeconstruccion=$17,construcciondireccion=$18,nombreterreno=$19,terrenoarea=$20,terrenovalorcomercial=$21,terrenofuentedeagua=$22,tipoterreno=$23 WHERE id= $24 RETURNING *";
            const values = [NombrePredio, Avaluo, Departamento, Municipio,
              TipoDocumento,NumeroDeDocumento,NombresPropietario,ApellidosPropietario,NIT,Razon,Direccion,
              Telefono,CorreoElectronico,NombreConstruccion,NumeroDePisos,AreaTotal,TipoConstruccion,
              DireccionConstruccion,NombreTerreno,AreaTerreno,ValorComercial,FuenteDeAgua,TipoTerreno,id];
            const result = await conn.query(text, values);

            if (result.rows.length==0)
                return res.status(404).json({message: "Task not found"});
            return res.json(result.rows[0]);
          } catch (error: any) {
            return res.status(500).json({error: error.message});
          }

    case "DELETE":
      try {
        const text = "DELETE FROM prueba WHERE id = $1 RETURNING *";
        const values = [id];
        const result = await conn.query(text, values);

        if (result.rowCount === 0)
          return res.status(404).json({ message: "Task Not Found" });

        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }

    default:
      return res.status(400).json({ message: "Method are not supported" });


  }
};
