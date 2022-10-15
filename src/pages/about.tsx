import { Form, Input, Button,Select, Checkbox, Divider, Col, Row, Radio } from 'antd';
import 'antd/dist/antd.css';
import { getServers } from 'dns';
import {Task}  from "src/interfaces/Task"
import {ChangeEvent, FormEvent, useState} from 'react';
import { DefaultOptionType, SelectHandler } from 'rc-select/lib/Select';

const {Item} = Form;
const {Password} = Input;

interface Props{
  tasks: Task[]
}


export default function about(props: Props) {

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


  });

  const handleChange= ({
    target: {name,value},
  }: ChangeEvent<HTMLInputElement>) =>
  setTask({...task, [name]: value});


  const handleSudmit = (e: FormEvent<Element>) => {
    console.log(task);
  };

  const formFailed=(error)=>{
    console.log("Error" ,error);

  }

  return (
    <div>
      <br />
        <Row>
        <Divider><h3>Formulario Predio</h3></Divider>
        <Col xs={1} sm={2} md={6} lg={7}> </Col>

        <Col xs={22} sm={20} md={12} lg={10}>

        <Form name='Formulario'
        onFinish={handleSudmit}
        onFinishFailed={formFailed}>

          <Item label="Nombre Predio"
          rules={[{
            required: true,
            message: "Por favor ingrese el nombre de su predio"
          }
          ]}>
            <Input onChange={handleChange} name="NombrePredio" />
          </Item>


          <Item label="Avalúo"
          rules={[{
            required: true,
            message: "Por favor ingrese el nombre de su predio"
          }
          ]}>
            <Input onChange={handleChange} name="Avaluo" />
          </Item>

          <Item label="Departamento">
          <Select
          onChange={(value) => {
            setTask({...task, ["Departamento"]: value});
          }}
          placeholder="Please select a category">
          <Select.Option value="Amazonas">Amazonas </ Select.Option >
          <Select.Option value="Antioquia" >Antioquia</Select.Option>
          <Select.Option value="Arauca" >Arauca</Select.Option>
          <Select.Option value="Atlántico" >Atlántico</Select.Option>
          <Select.Option value="Bolívar" >Bolívar</Select.Option>
          <Select.Option value="Boyacá" >Boyacá</Select.Option>
          <Select.Option value="Caldas" >Caldas</Select.Option>
          <Select.Option value="Caquetá" >Caquetá</Select.Option>
          <Select.Option value="Casanare">Casanare</Select.Option>
          </Select>
          </Item>


          <Item label="Municipio"
          name="Municipio"
          rules={[{
            required: true,
            message: "Por favor ingrese un Municipio"
          }
          ]}>
            <Input onChange={handleChange} name="Municipio"/>
          </Item>


          <Item label="Tipo de propietario">
          <Radio.Group>
            <Radio value="natural"> Natural </Radio>
            <Radio value="juridico"> Juridico </Radio>
            </Radio.Group>
          </Item>

          <Item label="Tipo de Documento">
          <Select
          onChange={(value) => {
            setTask({...task, ["TipoDocumento"]: value});
          }}
          placeholder="Please select a category">
          <Select.Option value="Cedula">Cedula de Ciudadania</Select.Option>
          <Select.Option value="RegistroCivil">Registro Civil</Select.Option>
          <Select.Option value="TarjetaDeIdentidad">Tarjeta de Identidad</Select.Option>
          </Select>
          </Item>

          <Item label="Numero de documento"
          name="NumeroDeDocumento"
          rules={[{
            required: true,
            message: "Por favor ingrese el numero de documento"
          }
          ]}>
          <Input onChange={handleChange} name="NumeroDeDocumento" />
          </Item>

          <Item label="Nombres Del Propietario"
          name="NombresPropietario"
          rules={[{
            required: true,
            message: "Por favor ingrese el nombre del propietario"
          }
          ]}>
          <Input onChange={handleChange} name="NombresPropietario"/>
          </Item>

          <Item label="Apellidos Del Propietario"
          name="ApellidosPropietario"
          rules={[{
            required: true,
            message: "Por favor ingrese el Apellido del propietario"
          }
          ]}>
          <Input onChange={handleChange} name="ApellidosPropietario" />
          </Item>

          <Item label="NIT (solo juridico)"
          name="NIT"
          rules={[{
            required: true,
            message: "Por favor ingrese el NIT"
          }
          ]}>
          <Input onChange={handleChange} name="NIT"/>
          </Item>

          <Item  label="Razon Social (solo juridico) "
          name="Razon"
          rules={[{
            required: true,
            message: "Por favor ingrese la razon social"
          }
          ]}>
          <Input onChange={handleChange} name="Razon"/>

          </Item>


          <Item>
          <Button type='primary' size='large' shape='round' htmlType='submit'>Guardar Predio</Button>
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