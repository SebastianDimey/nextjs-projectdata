import { DatePicker, Button, Row, Col, Divider} from 'antd';
import 'antd/dist/antd.css';
import Image from 'next/image';
import { Task } from 'src/interfaces/Task';
import {useRouter}  from "next/router";
import TaskList from 'src/components/tasks/TaskList';

interface Props {
  tasks: Task[];
}

export default function index({tasks}: Props) {

  
  const router = useRouter()
  console.log(tasks)
  return (
  <>
    {tasks.length ===0 ? (
      <div>
        <Divider><h1>NO EXISTEN PREDIOS</h1></Divider>
        <Divider><Button onClick={()=> router.push("/about")}>Create One</Button></Divider>
      </div>
      ):(
      <TaskList tasks={tasks}/>
    )}
    </>
  );
}

//permite ejecutar codigo desde backend para pasar objetos desde frontend
export const getServerSideProps = async() =>{
  const res= await fetch ("http://localhost:3000/api/tasks");
  const tasks = await res.json();

  return{
    props:{
      tasks: tasks,
    },
  };
};
