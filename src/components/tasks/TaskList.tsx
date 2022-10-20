import { TableContainer, Table,TableHead,TableRow,TableCell,TableBody} from "@mui/material";
import { Divider,Button, Input, Form,Select,Radio,Modal,Popconfirm,message} from "antd";
import { useEffect,useState,ChangeEvent, FormEvent } from "react";
import { Task } from "src/interfaces/Task"
import tasks from "src/pages/api/tasks";
import {DeleteOutlined,EditOutlined} from '@ant-design/icons';
import { useRouter } from "next/router";
import makeStyles from "@mui/material";




const {Item} = Form;
interface Props{
    tasks: Task[];
}



function TaskList({tasks}:Props) {

  const router=useRouter()

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

/***********************************************************************************************************
    * Nombre Método: handleDelete
    * Propósito: Permite la eliminacion de un predio segun su id principal
    * Variables utilizadas:id
    * Precondición: ser llamada por un boton o un metodo
    * Postcondición: Eliminar el dato segun su id en la tabla de la base de datos
    **********************************************************************************************************/


  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/tasks/" + id, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

/***********************************************************************************************************
    * Nombre Método: showPopconfirm
    * Propósito: Permite mostrar la ventana de confirmacion de eliminacion
    * Variables utilizadas:
    * Precondición: ser llamada por un boton o un metodo
    * Postcondición: Mostrar ventana de confirmacion 
    **********************************************************************************************************/

  const showPopconfirm = () => {
    setOpen(true);
  };

  /***********************************************************************************************************
    * Nombre Método: confirm
    * Propósito: Permite eliminar el dato al precionar el boton ok de la ventana de confirmacion 
    * Variables utilizadas:id
    * Precondición: ser llamada por un boton o un metodo
    * Postcondición: Confirmar eliminacion de predio 
    **********************************************************************************************************/
  const confirm = (id: string) => {
    console.log(id)
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
    handleDelete(id);
    message.success('Su predio a sido eliminado exitosamente');
  };

  /***********************************************************************************************************
    * Nombre Método: cancel
    * Propósito: Permite cancelar la eliminacion 
    * Variables utilizadas:
    * Precondición: ser llamada por un boton o un metodo
    * Postcondición: Cancela la eliminacion 
    **********************************************************************************************************/

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error('Click on No');
    setOpen(false);
  };

  return (
    <div>
      <Divider>Tabla Predios</Divider>
    <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>NumeroPredial</TableCell>
          <TableCell>NombrePredio</TableCell>
          <TableCell>Avaluo</TableCell>
          <TableCell>Departamento</TableCell>
          <TableCell>Municipio</TableCell>
          <TableCell>NumeroDocumentoPropietario</TableCell>
          <TableCell>Nit</TableCell>
          <TableCell>Construccion</TableCell>
          <TableCell>Terreno</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map(task=>(
          <TableRow key={task.id}>
            <TableCell>{task.id}</TableCell>
            <TableCell>{task.nombrepredio}</TableCell>
            <TableCell>{task.avaluo}</TableCell>
            <TableCell>{task.departamento}</TableCell>
            <TableCell>{task.municipio}</TableCell>
            <TableCell>{task.numerodedocumento}</TableCell>
            <TableCell>{task.nit}</TableCell>
            <TableCell>{task.nombreconstruccion}</TableCell>
            <TableCell>{task.nombreterreno}</TableCell>
            <TableCell>
            <EditOutlined style={{color:"blue",fontSize:18}}  onClick={()=>router.push(`/tasks/edit/${task.id}`)}/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Popconfirm
              title={"Esta seguro de eliminar este predio? numero predial: "+task.id}
              onConfirm={()=>confirm(task.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
                >
              <DeleteOutlined style={{color:"red",fontSize:18}}  onClick={()=>showPopconfirm()}/>
            </Popconfirm>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    </TableContainer>

    <Divider><Button onClick={()=>router.push(`/about`)}>Ingresar Nuevo Predio</Button></Divider>




    <br /><br /><br /><br />
    <Divider>Tabla Propietarios</Divider>
    <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
        <TableCell>NumeroPredial</TableCell>
          <TableCell>NumeroDeDocumento</TableCell>
          <TableCell>TipoDeDocumento</TableCell>
          <TableCell>Nombres</TableCell>
          <TableCell>Apellidos</TableCell>
          <TableCell>Nit</TableCell>
          <TableCell>RazonSocial</TableCell>
          <TableCell>Direccion</TableCell>
          <TableCell>Telefono</TableCell>
          <TableCell>CorreoElectronico</TableCell>
          <TableCell>Editar o eliminar</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map(task=>(
          <TableRow key={task.numerodedocumento}>
            <TableCell>{task.id}</TableCell>
            <TableCell>{task.numerodedocumento}</TableCell>
            <TableCell>{task.tipodocumento}</TableCell>
            <TableCell>{task.nombrespropietario}</TableCell>
            <TableCell>{task.apellidospropietario}</TableCell>
            <TableCell>{task.nit}</TableCell>
            <TableCell>{task.razon}</TableCell>
            <TableCell>{task.direccion}</TableCell>
            <TableCell>{task.telefono}</TableCell>
            <TableCell>{task.correoelectronico}</TableCell>
            <TableCell>
            <EditOutlined style={{color:"blue",fontSize:18}}  onClick={()=>router.push(`/tasks/edit/${task.id}`)}/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    </TableContainer>



    <br /><br /><br /><br />
    <Divider>Tabla Construcciones</Divider>
    <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>NumeroPredial</TableCell>
          <TableCell>CodigoConstruccion</TableCell>
          <TableCell>NumeroDePisos</TableCell>
          <TableCell>AreaTotal</TableCell>
          <TableCell>TipoDeConstruccion</TableCell>
          <TableCell>Direccion</TableCell>
          <TableCell>Editar o eliminar</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map(task=>(
          <TableRow key={task.id}>
            <TableCell>{task.id}</TableCell>
            <TableCell>{task.nombreconstruccion}</TableCell>
            <TableCell>{task.construccionnumeropisos}</TableCell>
            <TableCell>{task.construccionareatotal}</TableCell>
            <TableCell>{task.tipodeconstruccion}</TableCell>
            <TableCell>{task.construcciondireccion}</TableCell>
            <TableCell>
            <EditOutlined style={{color:"blue",fontSize:18}}  onClick={()=>router.push(`/tasks/edit/${task.id}`)}/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    </TableContainer>




    <br /><br /><br /><br />
    <Divider>Tabla Terrenos</Divider>
    <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>NumeroPredial</TableCell>
          <TableCell>CodigoTerreno</TableCell>
          <TableCell>Area</TableCell>
          <TableCell>ValorComercial</TableCell>
          <TableCell>ProximidadAFuenteDeAgua</TableCell>
          <TableCell>TipoDeTerreno</TableCell>
          <TableCell>Editar o eliminar</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map(task=>(
          <TableRow key={task.id}>
            <TableCell>{task.id}</TableCell>
            <TableCell>{task.nombreterreno}</TableCell>
            <TableCell>{task.terrenoarea}</TableCell>
            <TableCell>{task.terrenovalorcomercial}</TableCell>
            <TableCell>{task.terrenofuentedeagua}</TableCell>
            <TableCell>{task.tipoterreno}</TableCell>
            <TableCell>
            <EditOutlined style={{color:"blue",fontSize:18}}  onClick={()=>router.push(`/tasks/edit/${task.id}`)}/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    </TableContainer>




    </div>

  );
};

export default TaskList