import React, {useEffect, useState} from 'react';
import { Table, Button, Modal, Input, Form, Layout, Divider, Select } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Link, Option } from 'react-router-dom'

const { Header, Content, Footer, option } = Layout;
const {Item} = Form;
const baseUrl="http://localhost:3015/services";

const layout={
  labelCol:{
    span: 8
  },
  wrapperCol:{
    span:16
  }
}

function App() {

  const [data, setData]=useState([]);
  const [modalInsert, setModalInsert]=useState(false);
  const [modalUpdate, setModalUpdate]=useState(false);
  const [modalDestroy, setModalDestroy]=useState(false);
  const [service, setService]=useState({
    id: '',
    registration: '',
    name: '',
    service_kind: '',
    description : '',
    date: '',
    hour: '',
    status: '',
  })

  const openCloseModalInsert=()=>{
    setModalInsert(!modalInsert);
  }

  const openCloseModalUpdate=()=>{
    setModalUpdate(!modalUpdate);
  }

  const openCloseModalDestroy=()=>{
    setModalDestroy(!modalDestroy);
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setService({...service,
    [name]: value});
    console.log(service);
  }

  const selectService=(service, obj)=>{
    setService(service);
    (obj=="Editar")?openCloseModalUpdate():openCloseModalDestroy();
  }

  const columns=[
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Registration',
      dataIndex: 'registration',
      key: 'registration'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Service_kind',
      dataIndex: 'service_kind',
      key: 'service_kind'
    },
    {
      title: 'Description ',
      dataIndex: 'description ',
      key: 'description '
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Hour',
      dataIndex: 'hour',
      key: 'hour'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (fila) => (
        <>
          <Button type="primary" onClick={()=>selectService(fila, "Editar")}>Editar</Button> {"    "}
          <Button type="primary" danger onClick={()=>selectService(fila, "Destroy")}>
            Eliminar
          </Button>
        </>
      )
    } 
  ];

  const pedidoGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  } 

  const pedidoPut=async()=>{
    await axios.put(baseUrl+"/"+service.id, service)
    .then(response=>{
      var dataAuxiliar=data;
      dataAuxiliar.map(element=>{
        if(element.id===service.id){
          element.registration=service.registration;
          element.name=service.name;
          element.service_kind=service.service_kind;
          element.description=service.description;
          element.date=service.date;
          element.hour=service.hour;
          element.status=service.status;
        }
      });

      setData(dataAuxiliar);
      openCloseModalUpdate();
    }).catch(error=>{
      console.log(error);
    })
  } 

  const pedidoDelete=async()=>{
    await axios.delete(baseUrl+"/"+service.id)
    .then(response=>{
      setData(data.filter(element=>element.id!==service.id));
      openCloseModalDestroy();
    }).catch(error=>{
      console.log(error);
    })
  } 

  const status_options = [
    {
      label: "Agendado",
      value: "Agendado",
    },
    {
      label: "Cancelado",
      value: "Cancelado",
    },
    {
      label: "Finalizado",
      value: "Finalizado",
    }
  ];

  useEffect(()=>{
    pedidoGet();
  }, []);

  return (
    <div className="site-layout">
      <Divider plain>Gerir Agendamentos</Divider>
      <Table columns={columns} dataSource={data} />

      <Modal
      visible={modalUpdate}
      title="Update Service"
      onCancel={openCloseModalUpdate}
      centered
      footer={[
        <Button onClick={openCloseModalUpdate}>Cancelar</Button>,
        <Button type="primary" onClick={pedidoPut}>Editar</Button>
      ]}
      >
        <Form {...layout}>
          <Item label="Registration">
            <Input name="registration" onChange={handleChange} value={service && service.registration} />
          </Item>
          <Item label="Name">
            <Input name="name" onChange={handleChange} value={service && service.name} />
          </Item>
          <Item label="Service_kind">
            <Input name="service_kind" onChange={handleChange} value={service && service.service_kind} />
          </Item>
          <Item label="Date">
            <Input name="date" onChange={handleChange} value={service && service.date} />
          </Item>
          <Item label="Hour">
            <Input name="hour" onChange={handleChange} value={service && service.hour} />
          </Item>
          <Item label="Status">
            <Select
              label="Status"
              placeholder="Select a option and change input text above"
              allowClear
            >
              {status_options.map((option) => (
                <option name="status" onChange={handleChange} value={option.status}>{option.label}</option>
              ))}
            </Select>
          </Item>
        </Form>
      </Modal>

      <Modal
      visible={modalDestroy}
      onCancel={openCloseModalDestroy}
      centered
      footer={[
        <Button onClick={openCloseModalDestroy}>Não</Button>,
        <Button type="primary" danger onClick={pedidoDelete}>Sim</Button>
      ]}
      >
        Tem a certeza que pretende eliminar este serviço? <b>{service && service.service}</b>?
      </Modal>
    </div>
  );
}

export default App;