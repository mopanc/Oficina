import React, {useEffect, useState} from 'react';
import { Table, Button, Modal, Input, Form, Layout, Divider } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
const { Header, Content, Footer } = Layout;
const {Item} = Form;
const baseUrl="http://localhost:3015/service_kinds";

const layout={
  labelCol:{
    span: 8
  },
  wrapperCol:{
    span:16
  }
}

function ServiceKindCrud() {

  const [data, setData]=useState([]);
  const [modalInsert, setModalInsert]=useState(false);
  const [modalUpdate, setModalUpdate]=useState(false);
  const [modalDestroy, setModalDestroy]=useState(false);
  const [service_kind, setServiceKind]=useState({
    id: '',
    name: '',
    description: '',
    price: '',
    date : ''
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
    setServiceKind({...service_kind,
    [name]: value});
    console.log(service_kind);
  }

  const selectServiceKind=(service_kind, obj)=>{
    setServiceKind(service_kind);
    (obj=="Editar")?openCloseModalUpdate():openCloseModalDestroy();
  }

  const columns=[
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Preço base',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Data de Cadastro',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (fila) => (
        <>
          <Button type="primary" onClick={()=>selectServiceKind(fila, "Editar")}>Editar</Button> {"    "}
          <Button type="primary" danger onClick={()=>selectServiceKind(fila, "Destroy")}>
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

  const pedidoPost=async()=>{
    delete service_kind.id;
    await axios.post(baseUrl, service_kind)
    .then(response=>{
      setData(data.concat(response.data));
      openCloseModalInsert();
    }).catch(error=>{
      console.log(error);
    })
  }

  const pedidoPut=async()=>{
    await axios.put(baseUrl+"/"+service_kind.id, service_kind)
    .then(response=>{
      var dataAuxiliar=data;
      dataAuxiliar.map(element=>{
        if(element.id===service_kind.id){
          element.name=service_kind.name;
          element.description=service_kind.description;
          element.price=service_kind.price;
          element.date=service_kind.date;
        }
      });

      setData(dataAuxiliar);
      openCloseModalUpdate();
    }).catch(error=>{
      console.log(error);
    })
  } 

  const pedidoDelete=async()=>{
    await axios.delete(baseUrl+"/"+service_kind.id)
    .then(response=>{
      setData(data.filter(element=>element.id!==service_kind.id));
      openCloseModalDestroy();
    }).catch(error=>{
      console.log(error);
    })
  } 

  useEffect(()=>{
    pedidoGet();
  }, []);

  return (
    <div className="site-layout">
      <Divider plain>Tipos de Atendimento</Divider>
      <Button type="secondary" className="buttonInsertKind" onClick={openCloseModalInsert}>Adicionar Tipo de Atendimento</Button>
      <br />
      <br />
      <Table columns={columns} dataSource={data} />
      <br />
      <Modal
      visible={modalInsert}
      title="Tipo de Atendimento"
      destroyOnClose={true}
      onCancel={openCloseModalInsert}
      centered
      footer={[
        <Button onClick={openCloseModalInsert}>Cancelar</Button>,
        <Button type="primary" onClick={pedidoPost}>Inserir</Button>
      ]}
      >
        <Form {...layout}>
          <Item label="Nome">
            <Input name="name" onChange={handleChange} />
          </Item>
          <Item label="Descrição">
            <Input name="description" onChange={handleChange} />
          </Item>
          <Item label="Preço base">
            <Input name="price" onChange={handleChange} />
          </Item>
          <Item label="Data">
            <Input name="date" onChange={handleChange} />
          </Item>
        </Form>
      </Modal>

      <Modal
      visible={modalUpdate}
      title="Editar Tipo de Atendimento"
      onCancel={openCloseModalUpdate}
      centered
      footer={[
        <Button onClick={openCloseModalUpdate}>Cancelar</Button>,
        <Button type="primary" onClick={pedidoPut}>Editar</Button>
      ]}
      >
        <Form {...layout}>
          <Item label="Nome">
            <Input name="name" onChange={handleChange} value={service_kind && service_kind.name} />
          </Item>
          <Item label="Descrição">
            <Input name="description" onChange={handleChange} value={service_kind && service_kind.description} />
          </Item>
          <Item label="Preço">
            <Input name="price" onChange={handleChange} value={service_kind && service_kind.price} />
          </Item>
          <Item label="Data">
            <Input name="date" onChange={handleChange} value={service_kind && service_kind.date} />
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
        Tem a certeza que pretende eliminar este serviço <b>{service_kind && service_kind.service_kind}</b>?
      </Modal>
    </div>
  );
}

export default ServiceKindCrud;