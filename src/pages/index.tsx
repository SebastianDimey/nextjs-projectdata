import { DatePicker, Button, Row, Col, Divider} from 'antd';
import 'antd/dist/antd.css';
import Image from 'next/image';


export default function index() {
  return (
    <div>
      <br /><br />
      <Divider><h3>BIENVENIDO A MI PAGINA WEB</h3></Divider>
      <Row  gutter={760}>
        <Col><Button type='primary' size='large' href='/about' shape='round'>Inscripcion</Button></Col>
        <Col><Button type='primary' size='large' href='/about' shape='round'>Edición</Button></Col>
        <Col><Button type='primary' size='large' href='/about' shape='round'>Eliminación</Button></Col>
      </Row>
      <br /><br />
      <Divider><Image src="/images/colombia.png" width={800} height={800}  /></Divider>
    </div>
  )
}

