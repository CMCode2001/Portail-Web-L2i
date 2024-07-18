import React from "react";
import { Space, Table, Tag, Button, Modal, Form, Input } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";
import { useState } from "react";

const CrudTable = ({ data, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  const showEditModal = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onEdit(currentRecord.id, values);
        setIsModalOpen(false);
        setCurrentRecord(null);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
  };

  const generateColumns = (data) => {
    if (!data || data.length === 0) {
      return [];
    }

    const sample = data[0];
    const columns = Object.keys(sample).map((key) => {
      if (Array.isArray(sample[key])) {
        return {
          title: key.charAt(0).toUpperCase() + key.slice(1),
          dataIndex: key,
          key,
          render: (tags) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? "geekblue" : "green";
                if (tag === "loser") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        };
      } else {
        return {
          title: key.charAt(0).toUpperCase() + key.slice(1),
          dataIndex: key,
          key,
        };
      }
    });

    columns.push({
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Edit
            style={{ color: "blue" }}
            onClick={() => showEditModal(record)}
          />
          <DeleteIcon
            style={{ color: "red" }}
            onClick={() => onDelete(record.id)}
          />
        </Space>
      ),
    });

    return columns;
  };

  const columns = generateColumns(data);
  const dataSource = data.map((item, index) => ({
    key: index,
    ...item,
  }));

  return (
    <>
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        title="Edit Record"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          {Object.keys(currentRecord || {}).map((key) => (
            <Form.Item
              key={key}
              name={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
            >
              <Input />
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </>
  );
};

export default CrudTable;
