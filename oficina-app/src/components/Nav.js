import React, {useEffect, useState} from 'react';
import { Table, Button, Modal, Input, Form, Layout, Typography, Space, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CarOutlined, CalendarOutlined, HomeOutlined, ToolOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Item } = Form;
const { Title } = Typography;
const baseUrl="http://localhost:3015/services";

const layout={
    labelCol:{
        span: 8
},
wrapperCol:{
    span:16
}
}

function Nav() {

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
    hour: ''
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
    (obj==="Editar")?openCloseModalUpdate():openCloseModalDestroy();
}

const pedidoGet=async()=>{
    await axios.get(baseUrl)
        .then(response=>{
        setData(response.data);
    }).catch(error=>{
        console.log(error);
    })
} 

const pedidoPost=async()=>{
    delete service.id;
        await axios.post(baseUrl, service)
    .then(response=>{
        setData(data.concat(response.data));
    openCloseModalInsert();
    }).catch(error=>{
        console.log(error);
    })
}

const pedidoPut=async()=>{
    await axios.put(baseUrl+"/"+service.id, service)
        .then(response=>{
var dataAuxiliar=data;
    dataAuxiliar.forEach(element=>{
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

setData([...dataAuxiliar]);
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

useEffect(()=>{
    pedidoGet();
}, []);
    const columns = [
        {
            title: '🚗 License Plate',
            dataIndex: 'registration',
            key: 'registration',
            align: 'center',
            render: (text) => <Tag color="blue" style={{ fontWeight: 'bold' }}>{text}</Tag>
        },
        {
            title: '👤 Customer',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        },
        {
            title: '🔧 Service Type',
            dataIndex: 'service_kind',
            key: 'service_kind',
            align: 'center',
            render: (text) => <Tag color="purple">{text}</Tag>
        },
        {
            title: '📝 Description',
            dataIndex: 'description',
            key: 'description',
            align: 'center'
        },
        {
            title: '📅 Date',
            dataIndex: 'date',
            key: 'date',
            align: 'center',
            render: (text) => <Tag color="green">{text}</Tag>
        },
        {
            title: '⏰ Time',
            dataIndex: 'hour',
            key: 'hour',
            align: 'center',
            render: (text) => <Tag color="orange">{text}</Tag>
        },
        {
            title: '⚡ Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status) => {
                const color = status === 'Completed' ? 'green' : status === 'In Progress' ? 'orange' : 'blue';
                return <Tag color={color}>{status || 'Scheduled'}</Tag>
            }
        },
        {
            title: '🛠️ Actions',
            key: 'actions',
            align: 'center',
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => selectService(record, "Edit")}
                        style={{ borderRadius: '6px' }}
                    >
                        Edit
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => selectService(record, "Delete")}
                        style={{ borderRadius: '6px' }}
                    >
                        Delete
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <div className="App">
            <Layout style={{ minHeight: '100vh' }}>
                <Header className="ant-layout-header">
                    <Link to="/" className="header-brand">
                        <CarOutlined style={{ marginRight: '10px' }} />
                        Digital Garage
                    </Link>
                    <div className="header-buttons">
                        <Button
                            type="primary"
                            className="header-button"
                            icon={<PlusOutlined />}
                            onClick={openCloseModalInsert}
                        >
                            New Booking
                        </Button>
                        <Button
                            className="header-button"
                            icon={<ToolOutlined />}
                        >
                            <Link to="/administrators">Administration</Link>
                        </Button>
                        <Button
                            className="header-button"
                            icon={<HomeOutlined />}
                        >
                            <Link to="/">Home</Link>
                        </Button>
                    </div>
                </Header>

                <Content className="main-content">
                    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
                        <div className="modern-card fade-in">
                            <Title level={2} style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>
                                <CalendarOutlined style={{ marginRight: '15px', color: '#1890ff' }} />
                                Booking Management
                            </Title>

                            <Table
                                columns={columns}
                                dataSource={data}
                                rowKey="id"
                                pagination={{
                                    pageSize: 10,
                                    showSizeChanger: true,
                                    showQuickJumper: true,
                                    showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} agendamentos`
                                }}
                                style={{ marginTop: '20px' }}
                                scroll={{ x: 1200 }}
                            />
                        </div>
                    </div>
                </Content>

            <Modal
                visible={modalInsert}
                title={
                    <div style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>
                        <PlusOutlined style={{ marginRight: '10px' }} />
                        New Service Booking
                    </div>
                }
                destroyOnClose={true}
                onCancel={openCloseModalInsert}
                centered
                width={600}
                footer={[
                    <Button
                        key="cancel"
                        onClick={openCloseModalInsert}
                        style={{ borderRadius: '6px' }}
                    >
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={pedidoPost}
                        style={{ borderRadius: '6px' }}
                        icon={<PlusOutlined />}
                    >
                        Book Service
                    </Button>
                ]}>
                <Form {...layout} style={{ marginTop: '20px' }}>
                    <Item label="🚗 License Plate">
                        <Input
                            name="registration"
                            onChange={handleChange}
                            value={service && service.registration}
                            placeholder="Ex: 12-34-AB"
                            style={{ borderRadius: '6px' }}
                        />
                    </Item>
                    <Item label="👤 Customer Name">
                        <Input
                            name="name"
                            onChange={handleChange}
                            placeholder="Nome completo do cliente"
                            style={{ borderRadius: '6px' }}
                        />
                    </Item>
                    <Item label="🔧 Service Type">
                        <Input
                            name="service_kind"
                            onChange={handleChange}
                            placeholder="Ex: Mudança de óleo, Revisão, Reparação..."
                            style={{ borderRadius: '6px' }}
                        />
                    </Item>
                    <Item label="📅 Service Date">
                        <Input
                            name="date"
                            onChange={handleChange}
                            placeholder="DD/MM/AAAA"
                            style={{ borderRadius: '6px' }}
                        />
                    </Item>
                    <Item label="⏰ Service Time">
                        <Input
                            name="hour"
                            onChange={handleChange}
                            placeholder="HH:MM"
                            style={{ borderRadius: '6px' }}
                        />
                    </Item>
                    <Item label="📝 Description">
                        <Input.TextArea
                            name="description"
                            onChange={handleChange}
                            placeholder="Descreva detalhes sobre o serviço a realizar..."
                            rows={3}
                            style={{ borderRadius: '6px' }}
                        />
                    </Item>
                </Form>
            </Modal>

            <Modal
                visible={modalUpdate}
                title={
                    <div style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>
                        <EditOutlined style={{ marginRight: '10px' }} />
                        Edit Booking
                    </div>
                }
                onCancel={openCloseModalUpdate}
                centered
                width={600}
                footer={[
                    <Button
                        key="cancel"
                        onClick={openCloseModalUpdate}
                        style={{ borderRadius: '6px' }}
                    >
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={pedidoPut}
                        style={{ borderRadius: '6px' }}
                        icon={<EditOutlined />}
                    >
                        Update Service
                    </Button>
                ]}>
                <Form {...layout} style={{ marginTop: '20px' }}>
                    <Item label="🚗 License Plate">
                        <Input
                            name="registration"
                            onChange={handleChange}
                            value={service && service.registration}
                            style={{ borderRadius: '6px' }}
                        />
                    </Item>
                    <Item label="👤 Customer Name">
                        <Input
                            name="name"
                            onChange={handleChange}
                            value={service && service.name}
                            style={{ borderRadius: '6px' }}
                        />
                    </Item>
                    <Item label="🔧 Service Type">
                        <Input
                            name="service_kind"
                            onChange={handleChange}
                            value={service && service.service_kind}
                            style={{ borderRadius: '6px' }}
                        />
                    </Item>
                    <Item label="📅 Service Date">
                        <Input
                            name="date"
                            onChange={handleChange}
                            value={service && service.date}
                            style={{ borderRadius: '6px' }}
                        />
                    </Item>
                    <Item label="⏰ Service Time">
                        <Input
                            name="hour"
                            onChange={handleChange}
                            value={service && service.hour}
                            style={{ borderRadius: '6px' }}
                        />
                    </Item>
                    <Item label="📝 Description">
                        <Input.TextArea
                            name="description"
                            onChange={handleChange}
                            value={service && service.description}
                            rows={3}
                            style={{ borderRadius: '6px' }}
                        />
                    </Item>
                    <Item label="⚡ Status">
                        <Input
                            name="status"
                            onChange={handleChange}
                            value={service && service.status}
                            placeholder="Ex: Agendado, Em Andamento, Concluído"
                            style={{ borderRadius: '6px' }}
                        />
                    </Item>
                </Form>
            </Modal>

            <Modal
                visible={modalDestroy}
                title={
                    <div style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>
                        <DeleteOutlined style={{ marginRight: '10px' }} />
                        Confirm Deletion
                    </div>
                }
                onCancel={openCloseModalDestroy}
                centered
                width={500}
                footer={[
                    <Button
                        key="cancel"
                        onClick={openCloseModalDestroy}
                        style={{ borderRadius: '6px' }}
                    >
                        ❌ Cancelar
                    </Button>,
                    <Button
                        key="confirm"
                        type="primary"
                        danger
                        onClick={pedidoDelete}
                        style={{ borderRadius: '6px' }}
                        icon={<DeleteOutlined />}
                    >
                        ✅ Confirm Deletion
                    </Button>
                ]}>
                <div style={{ padding: '20px 0', textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
                    <div style={{ fontSize: '18px', marginBottom: '15px', color: '#2c3e50' }}>
                        Tem a certeza que pretende eliminar este agendamento?
                    </div>
                    <div style={{
                        backgroundColor: '#f5f5f5',
                        padding: '15px',
                        borderRadius: '8px',
                        border: '1px solid #d9d9d9'
                    }}>
                        <div><strong>Cliente:</strong> {service && service.name}</div>
                        <div><strong>Placa:</strong> {service && service.registration}</div>
                        <div><strong>Serviço:</strong> {service && service.service_kind}</div>
                        <div><strong>Data:</strong> {service && service.date} às {service && service.hour}</div>
                    </div>
                    <div style={{ marginTop: '15px', color: '#ff4d4f', fontWeight: '500' }}>
                        ⚠️ Esta ação não pode ser desfeita!
                    </div>
                </div>
            </Modal>

            <Footer className="ant-layout-footer">
                <div>
                    ©2024 Garage Management System • Developed by Jorge Morais
                </div>
                <div style={{ marginTop: '10px', fontSize: '14px', opacity: 0.8 }}>
                    🚀 Modernized with current technologies
                </div>
            </Footer>

            </Layout>
        </div>
    );
}

export default Nav;