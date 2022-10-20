import { Form, Input, Button,Select, Checkbox, Divider, Col, Row, Radio,message,InputNumber } from 'antd';
import 'antd/dist/antd.css';
import { getServers } from 'dns';
import {Task}  from "src/interfaces/Task"
import {ChangeEvent, FormEvent, useState,useEffect} from 'react';
import { DefaultOptionType, SelectHandler } from 'rc-select/lib/Select';
import {useRouter}  from "next/router";

const {Item} = Form;
const {Password} = Input;

interface Props{
  tasks: Task[]

}


export default function about(props: Props) {
  const router=useRouter()
  /***********************************************************************************************************
    * Nombre Método: setTask
    * Propósito: Seleccionar los datos dentro de un arreglo de variables
    * Variables utilizadas: task
    * Precondición: ser llamada por un boton o dentro de otro metodo
    * Postcondición: Llenar el arreglo con los datos
    **********************************************************************************************************/

  const[task,setTask] = useState({
    NombrePredio: "",
    Avaluo: "",
    Departamento: "",
    Municipio: "",
    TipoDocumento: "",
    NumeroDeDocumento: "",
    NombresPropietario: "",
    ApellidosPropietario: "",
    NIT: "",
    Razon: "",
    Direccion: "",
    Telefono: "",
    CorreoElectronico: "",
    NombreConstruccion: "",
    NumeroDePisos: "",
    AreaTotal: "",
    TipoConstruccion: "",
    DireccionConstruccion: "",
    NombreTerreno: "",
    AreaTerreno: "",
    ValorComercial: "",
    FuenteDeAgua: "",
    TipoTerreno: "",

  });

  /***********************************************************************************************************
    * Nombre Método: handleChange
    * Propósito: Seleccionar los datos dentro de el formulario y guardarlos en el arreglo
    * Variables utilizadas: name,value
    * Precondición: ser llamada por el formulario
    * Postcondición: Llenar el arreglo con los datos del formulario
    **********************************************************************************************************/
  const handleChange= ({
    target: {name,value},
  }: ChangeEvent<HTMLInputElement>) =>
  setTask({...task, [name]: value});

   /***********************************************************************************************************
    * Nombre Método: createTask
    * Propósito: Llama la funcion post de la base de datos para guardar los datos del arreglo dentro de la base de datos
    * Variables utilizadas: task
    * Precondición: ser llamada por un boton o dentro de otro metodo
    * Postcondición: Enviar los datos del arreglo a la base de datos 
    **********************************************************************************************************/

  const createTask = async(task: Task)=>{
    await fetch("http://localhost:3000/api/tasks",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    } )
  }

   /***********************************************************************************************************
    * Nombre Método: updateTask
    * Propósito: Llama la funcion put de la base de datos para actualizar los datos de la base de datos
    * Variables utilizadas: task
    * Precondición: ser llamada por un boton o dentro de otro metodo
    * Postcondición: Enviar los datos del arreglo a la base de datos
    **********************************************************************************************************/

  const updateTask = async (id: string, task: Task) =>
    await fetch("http://localhost:3000/api/tasks/" + id, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });

 /***********************************************************************************************************
    * Nombre Método: loadTask
    * Propósito: Llama la funcion fetch para cargar la base de datos y todo lo que tenga para asi guardarlos en un arreglo 
    * Variables utilizadas: id
    * Precondición: ser llamada por un boton o dentro de otro metodo
    * Postcondición: Enviar los datos de la base de datos al arreglo
    **********************************************************************************************************/


  const loadTask = async (id: string) => {
    const res = await fetch("http://localhost:3000/api/tasks/" + id);
    const task = await res.json();
    setTask({ NombrePredio: task.nombrepredio, Avaluo: task.avaluo, Departamento: task.departamento, Municipio: task.municipio,
      TipoDocumento: task.tipodocumento,NumeroDeDocumento: task.numerodedocumento, NombresPropietario: task.nombrespropietario, ApellidosPropietario: task.apellidospropietario, NIT: task.nit, Razon: task.razon, Direccion: task.direccion, Telefono: task.telefono, CorreoElectronico: task.correoelectronico,
    NombreConstruccion: task.nombreconstruccion, NumeroDePisos: task.construccionnumeropisos, AreaTotal: task.construccionareatotal, TipoConstruccion: task.tipodeconstruccion, DireccionConstruccion: task.construcciondireccion,
    NombreTerreno: task.nombreterreno, AreaTerreno: task.terrenoarea, ValorComercial: task.terrenovalorcomercial, FuenteDeAgua: task.terrenofuentedeagua, TipoTerreno: task.tipoterreno});
  };

/***********************************************************************************************************
    * Nombre Método: handleSubmit
    * Propósito: Llama las funciones de guardar actualizar anteriormente declaradas
    * Variables utilizadas:
    * Precondición: ser llamada por el boton de sudmit del formulario
    * Postcondición: Enviar los datos a la base de datos
    **********************************************************************************************************/

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //e.preventDefault();

    try {
      if (typeof router.query.id ==="string") {
        updateTask(router.query.id, task);
        console.log("updating")
      } else{
        await createTask(task);
        message.success('Su predio a sido guardado exitosamente');
      }
      router.push("/")
    } catch (error) {
      console.log(error);
    }
  };

  const formFailed=(error)=>{
    console.log("Error" ,error);

  }

/***********************************************************************************************************
    * Nombre Método: useEffect
    * Propósito: Funcion para cargar datos
    * Variables utilizadas:
    * Precondición: ser llamada 
    * Postcondición: Cargar los datos 
    **********************************************************************************************************/

  useEffect(() => {
    if (typeof router.query.id === "string") loadTask(router.query.id);
  }, [router.query]);

  return (
    <div>
      <br />
        <Row>
        <Divider><h3>Formulario Predio</h3></Divider>
        <Col xs={1} sm={2} md={6} lg={7}> </Col>

        <Col xs={22} sm={20} md={12} lg={10}>

        <Form name='Formulario'
        onFinish={handleSubmit}
        onFinishFailed={formFailed}>

          <Item label="Nombre Predio"
          rules={[{
            required: true,
            message: "Por favor ingrese el nombre de su predio"
          }
          ]}>
            <Input onChange={handleChange} name="NombrePredio" value={task.NombrePredio} />
          </Item>


          <Item label="Avalúo"
          rules={[{
            required: true,
            message: "Por favor ingrese el nombre de su predio"
          }
          ]}>
            <Input onChange={handleChange} name="Avaluo" value={task.Avaluo} />
          </Item>

          <Item label="Departamento">
          <Select
          onChange={(value) => {
            setTask({...task, ["Departamento"]: value});
          }}
          value={task.Departamento}>
          <Select.Option value="Amazonas">Amazonas </ Select.Option >
          <Select.Option value="Antioquia" >Antioquia</Select.Option>
          <Select.Option value="Arauca" >Arauca</Select.Option>
          <Select.Option value="Atlántico" >Atlántico</Select.Option>
          <Select.Option value="Bolívar" >Bolívar</Select.Option>
          <Select.Option value="Boyacá" >Boyacá</Select.Option>
          <Select.Option value="Caldas" >Caldas</Select.Option>
          <Select.Option value="Caquetá" >Caquetá</Select.Option>
          <Select.Option value="Casanare">Casanare</Select.Option>
          <Select.Option value="Cauca">Cauca</Select.Option>
          <Select.Option value="Cesar">Cesar</Select.Option>
          <Select.Option value="Choco">Choco</Select.Option>
          <Select.Option value="Córdoba">Córdoba</Select.Option>
          <Select.Option value="Cundinamarca">Cundinamarca</Select.Option>
          <Select.Option value="Guainía">Guainía</Select.Option>
          <Select.Option value="Guaviare">Guaviare</Select.Option>
          <Select.Option value="Huila">Huila</Select.Option>
          <Select.Option value="La Guajira">La Guajira</Select.Option>
          <Select.Option value="Magdalena">Magdalena</Select.Option>
          <Select.Option value="Meta">Meta</Select.Option>
          <Select.Option value="Nariño">Nariño</Select.Option>
          <Select.Option value="Norte de Santander">Norte de Santander</Select.Option>
          <Select.Option value="Putumayo">Putumayo</Select.Option>
          <Select.Option value="Quindío">Quindío</Select.Option>
          <Select.Option value="Risaralda">Risaralda</Select.Option>
          <Select.Option value="San Andrés y Providencia">San Andrés y Providencia</Select.Option>
          <Select.Option value="Santander">Santander</Select.Option>
          <Select.Option value="Sucre">Sucre</Select.Option>
          <Select.Option value="Tolima">Tolima</Select.Option>
          <Select.Option value="Valle del Cauca">Valle del Cauca</Select.Option>
          <Select.Option value="Vaupés">Vaupés</Select.Option>
          <Select.Option value="Vichada">Vichada</Select.Option>
          </Select>
          </Item>


          <Item label="Municipio"
          rules={[{
            required: true,
            message: "Por favor ingrese un Municipio"
          }
          ]}>
            <Input onChange={handleChange} name="Municipio" value={task.Municipio}/>
          </Item>

          <Item>
          <h3> Informacion Propietario</h3>
          </Item>

          <Item label="Tipo de propietario">
          <Checkbox.Group options={["Natural","Juridico"]}/>
          </Item>

          <Item label="Tipo de Documento">
          <Select
          onChange={(value) => {
            setTask({...task, ["TipoDocumento"]: value});
          }}
          value={task.TipoDocumento}>
          <Select.Option value={null} ></Select.Option>
          <Select.Option value="CedulaDeCiudadania">Cedula de Ciudadania</Select.Option>
          <Select.Option value="RegistroCivil">Registro Civil</Select.Option>
          <Select.Option value="TarjetaDeIdentidad">Tarjeta de Identidad</Select.Option>
          </Select>
          </Item>

          <Item label="Numero de documento"
          rules={[{
            required: true,
            message: "Por favor ingrese el numero de documento"
          }
          ]}>
          <Input onChange={handleChange} name="NumeroDeDocumento" value={task.NumeroDeDocumento} />
          </Item>

          <Item label="Nombres Del Propietario"
          rules={[{
            required: true,
            message: "Por favor ingrese el nombre del propietario"
          }
          ]}>
          <Input onChange={handleChange} name="NombresPropietario" value={task.NombresPropietario}/>
          </Item>

          <Item label="Apellidos Del Propietario"
          rules={[{
            required: true,
            message: "Por favor ingrese el Apellido del propietario"
          }
          ]}>
          <Input onChange={handleChange} name="ApellidosPropietario" value={task.ApellidosPropietario} />
          </Item>

          <Item label="NIT (solo juridico)"
          rules={[{
            required: true,
            message: "Por favor ingrese el NIT"
          }
          ]}>
          <Input onChange={handleChange} name="NIT" value={task.NIT}/>
          </Item>

          <Item  label="Razon Social (solo juridico) "
          rules={[{
            required: true,
            message: "Por favor ingrese la razon social"
          }
          ]}>
          <Input onChange={handleChange} name="Razon" value={task.Razon}/>

          </Item>

          <Item  label="Direccion"
          rules={[{
            required: true,
            message: "Por favor ingrese la direccion"
          }
          ]}>
          <Input onChange={handleChange} name="Direccion" value={task.Direccion}/>

          </Item>



          <Item  label="Telefono"
          rules={[{
            required: true,
            message: "Por favor ingrese la direccion"
          }
          ]}>
          <Input onChange={handleChange} name="Telefono" value={task.Telefono}/>

          </Item>



          <Item  label="Correo electronico"
          rules={[{
            required: true,
            message: "Por favor ingrese Correo electronico"
          }
          ]}>
          <Input onChange={handleChange} name="CorreoElectronico" value={task.CorreoElectronico}/>

          </Item>

          <Item>
          <h3> Informacion construcciones</h3>
          </Item>

          <Item  label="Nombre De La Construccion"
          rules={[{
            required: true,
            message: "Por favor ingrese Correo electronico"
          }
          ]}>
          <Input onChange={handleChange} name="NombreConstruccion" value={task.NombreConstruccion}/>

          </Item>


          <Item  label="Numero de pisos"
          rules={[{
            required: true,
            message: "Por favor ingrese Correo electronico"
          }
          ]}>
          <Input onChange={handleChange} name="NumeroDePisos" value={task.NumeroDePisos}/>

          </Item>

         

          <Item  label="Area Total"
          rules={[{
            required: true,
            message: "Por favor ingrese Correo electronico"
          }
          ]}>
          <Input onChange={handleChange} name="AreaTotal" value={task.AreaTotal}/>

          </Item>


          <Item label="Tipo de construccion">
          <Select
          onChange={(value) => {
            setTask({...task, ["TipoConstruccion"]: value});
          }}
          value={task.TipoConstruccion}>
            <Select.Option value={null} ></Select.Option>
          <Select.Option value="Industrial">Industrial</Select.Option>
          <Select.Option value="Comercial">Comercial</Select.Option>
          <Select.Option value="Residencial">Residencial</Select.Option>
          </Select>
          </Item>

          <Item label="Direccion"
          rules={[{
            required: true,
            message: "Por favor ingrese el nombre del propietario"
          }
          ]}>
          <Input onChange={handleChange} name="DireccionConstruccion" value={task.DireccionConstruccion}/>
          </Item>

          <Item>
          <h3> Informacion Terreno</h3>
          </Item>



          <Item  label="Nombre De El Terreno"
          rules={[{
            required: true,
            message: "Por favor ingrese Correo electronico"
          }
          ]}>
          <Input onChange={handleChange} name="NombreTerreno" value={task.NombreTerreno}/>

          </Item>



          <Item  label="Area terreno"
          rules={[{
            required: true,
            message: "Por favor ingrese la direccion"
          }
          ]}>
          <Input onChange={handleChange} name="AreaTerreno" value={task.AreaTerreno}/>

          </Item>


          <Item  label="Valor comercial"
          rules={[{
            required: true,
            message: "Por favor ingrese la direccion"
          }
          ]}>
          <Input onChange={handleChange} name="ValorComercial" value={task.ValorComercial}/>

          </Item>

          <Item  label="Proximidad a fuente de agua"
          rules={[{
            required: true,
            message: "Por favor ingrese la direccion"
          }
          ]}>
          <Input onChange={handleChange} name="FuenteDeAgua" value={task.FuenteDeAgua}/>

          </Item>

          <Item label="Tipo de terreno">
          <Select
          onChange={(value) => {
            setTask({...task, ["TipoTerreno"]: value});
          }}
          value={task.TipoTerreno}>
          <Select.Option value={null} ></Select.Option>
          <Select.Option value="Rural">Rural</Select.Option>
          <Select.Option value="Urbano">Urbano</Select.Option>
          </Select>
          </Item>



          <Item>
            {
              router.query.id?(

                <Button style={{ background: "teal", borderColor: "teal" }} type='primary' size='large' shape='round' htmlType='submit'>Actualizar Predio</Button>
              ) : (

                <Button type='primary' size='large' shape='round' htmlType='submit'>Guardar Predio</Button>
              )
            }

          </Item>


        </Form>

        </Col>

        <Col xs={1} sm={2} md={6} lg={7}> </Col>


        </Row>

      </div>
  )
}

//permite ejecutar codigo desde backend para pasar objetos desde frontend
export const getServerSideProps = () =>{

  return{
    props:{
      hello:"world",
    },

  };
};