import React from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";

const CrudTable = ({ data }) => {
  // Fonction pour générer les colonnes dynamiquement
  const generateColumns = (data) => {
    if (!data || data.length === 0) {
      return [];
    }

    const sample = data[0];
    const columns = Object.keys(sample).map((key) => {
      if (Array.isArray(sample[key])) {
        // Cas où la clé est un array, comme 'tags'
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
        // Cas standard
        return {
          title: key.charAt(0).toUpperCase() + key.slice(1),
          dataIndex: key,
          key,
        };
      }
    });

    // Ajouter une colonne pour les actions
    columns.push({
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          {/* <a>Delete</a> */}
          <Edit style={{ color: "blue" }} />
          <DeleteIcon style={{ color: "red" }} />
        </Space>
      ),
    });

    return columns;
  };

  const columns = generateColumns(data);

  // Ajouter une clé unique à chaque élément de données
  const dataSource = data.map((item, index) => ({
    key: index,
    ...item,
  }));

  return <Table columns={columns} dataSource={dataSource} />;
};

export default CrudTable;
