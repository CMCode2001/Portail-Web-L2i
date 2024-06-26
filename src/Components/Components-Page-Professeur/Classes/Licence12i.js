import React, { useRef, useState } from 'react';
import { SearchOutlined, TeamOutlined, DownloadOutlined, PlusOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Drawer, Form, Col, Row, Upload } from 'antd';
import Highlighter from 'react-highlight-words';
import '../../../Styles/Professeur/Classes/Licence12i.css';

const { TextArea } = Input;

const data = [
  {
    key: '1',
    prenom: 'Cheikh Mbacke',
    nom: 'COLY',
    email: 'cm.c@zig.univ.sn',
    cin: '202000142',
  },
  {
    key: '1',
    prenom: 'Cheikh Mbacke',
    nom: 'COLY',
    email: 'cm.c@zig.univ.sn',
    cin: '202000142',
  }, 
  {
    key: '1',
    prenom: 'Cheikh Mbacke',
    nom: 'COLY',
    email: 'cm.c@zig.univ.sn',
    cin: '202000142',
  },
 
];

const Licence12i = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [open, setOpen] = useState(false);
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Prénom',
      dataIndex: 'prenom',
      key: 'prenom',
      width: '30%',
      ...getColumnSearchProps('prenom'),
    },
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
      width: '20%',
      ...getColumnSearchProps('nom'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'CIN',
      dataIndex: 'cin',
      key: 'cin',
      ...getColumnSearchProps('cin'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div id='samaDivContainer'>
      <div className="headerSection">
        <h2 className='leftAlign'>
          <TeamOutlined />
          Classe Licence 1-2i
        </h2>
        <Button className='rightAlign' id='btnPro2' type="primary" icon={<DownloadOutlined />} size="large" onClick={showDrawer}>
          Ajouter Cours
        </Button>
      </div>
      <div className="tableSection">
        <h4 style={{textAlign:"center"}}>Liste des etudiants</h4>
        <Table columns={columns} dataSource={data} />
      </div>
      <Drawer
        title="Ajouter un nouveau cours"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Fermer</Button>
            <Button onClick={onClose} type="primary" id='btnPro2'>
              Envoyer <SendOutlined />
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="courseTitle"
                label="Titre du Cours (Intitulé)"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the course title',
                  },
                ]}
              >
                <Input placeholder="Please enter the course title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="professorMail"
                label="Email Professeur"
                rules={[
                  {
                    required: true,
                    message: 'Veuillez entrer votre email',
                  },
                ]}
              >
                <Input placeholder="Veuillez entrer votre email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="studentsMail"
                label="Email Etudiants"
                rules={[
                  {
                    required: true,
                    message: 'Veuillez entrer les mails des etudiants',
                  },
                ]}
              >
                <TextArea rows={6} placeholder="Veuillez entrer les mails des etudiants" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="pdf"
                label="PDF"
                rules={[
                  {
                    required: true,
                    message: 'Please upload the PDF file',
                  },
                ]}
              >
                <Upload>
                  <Button icon={<PlusOutlined />}>Upload PDF</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default Licence12i;
