import React, { useState } from "react";
import { Table, Button, message, Modal, Spin, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import FormComponent from "../../components/Form/Form";
import {
  useGetWorkspacesQuery,
  useDeleteWorkspaceMutation,
} from "../../services/apiSlice";
import "./workspace.css";

const { Title } = Typography;

const WorkspacePage = () => {
  const navigate = useNavigate();
  const [isFormVisible, setFormVisible] = useState(false);

  const { data: workspaces, isLoading, isError } = useGetWorkspacesQuery();

  const [deleteWorkspace] = useDeleteWorkspaceMutation();

  if (!localStorage.getItem("accessToken")) {
    navigate("/auth");
  }

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Confirm workspace deletion?",
      onOk: async () => {
        try {
          await deleteWorkspace(id).unwrap();
          message.success("Workspace deleted successfully.");
        } catch (error) {
          message.error("Failed to delete workspace.");
        }
      },
    });
  };

  const columns = [
    // { title: "ID", dataIndex: "_id", key: "_id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Slug", dataIndex: "slug", key: "slug" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button danger onClick={() => handleDelete(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div
      className="workspace"
      style={{
        display: "flex",
        height: "80vh",
        position: "relative",
        flexDirection: "column",
      }}
    >
      <Title level={2} style={{ whiteSpace: "nowrap" }}>
        Manage Workspaces
      </Title>

      {isLoading ? (
        <Spin size="large" />
      ) : isError ? (
        message.error("Error fetching workspaces")
      ) : (
        <div style={{ width: "100%", overflowX: "auto", padding: "30px" }}>
          <div style={{ minWidth: "600px" }}>
            <Table
              dataSource={workspaces}
              columns={columns}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
              scroll={{ x: 600 }}
            />
          </div>
        </div>
      )}

      <Button
        type="primary"
        onClick={() => setFormVisible(true)}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Add Workspace
      </Button>

      <FormComponent
        visible={isFormVisible}
        onClose={() => setFormVisible(false)}
      />
    </div>
  );
};

export default WorkspacePage;
