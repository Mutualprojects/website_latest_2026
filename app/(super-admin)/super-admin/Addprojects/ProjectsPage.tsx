"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  Select,
  Table,
  Modal,
  Space,
  message,
  Popconfirm,
  Card,
  Divider,
  Row,
  Col,
} from "antd";
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

// ------------------------------------
// CONFIG
// ------------------------------------
const API = "/cms-api/api";
const UPLOAD_API = `${API}/upload`;
const FILE_BASE = "/cms-api";

const META_ROBOTS_OPTIONS = [
  "index, follow",
  "noindex, follow",
  "noindex, nofollow",
];

// Token Helper
const getAuthHeaders = () => {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Resolve image from Strapi formats
const resolveImageUrl = (file: any) =>
  file?.url ||
  file?.formats?.medium?.url ||
  file?.formats?.small?.url ||
  file?.formats?.thumbnail?.url ||
  "/default-image.jpg";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDocumentId, setEditingDocumentId] = useState<string | null>(
    null
  );
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  // ------------------------------------
  //  FETCH PROJECTS
  // ------------------------------------
  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/projects?populate=*`, {
        headers: getAuthHeaders(),
      });

      setProjects(res.data.data || []);
    } catch (error) {
      console.error(error);
      message.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ------------------------------------
  // FILE UPLOAD HELPERS
  // ------------------------------------
  const uploadSingle = async (file: any) => {
    const fd = new FormData();
    fd.append("files", file.originFileObj);

    const res = await axios.post(UPLOAD_API, fd, {
      headers: getAuthHeaders(),
    });

    return res.data[0].id;
  };

  const uploadMultiple = async (files: any[]) => {
    const ids: any[] = [];

    for (const f of files) {
      const fd = new FormData();
      fd.append("files", f.originFileObj);

      const res = await axios.post(UPLOAD_API, fd, {
        headers: getAuthHeaders(),
      });

      ids.push(res.data[0].id);
    }

    return ids;
  };

  // ------------------------------------
  // CREATE / UPDATE PROJECT
  // ------------------------------------
  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);

      // Upload main image
      let imageId = editingRecord?.image?.id || null;
      if (values.image?.length) {
        imageId = await uploadSingle(values.image[0]);
      }

      // Upload OG images
      let ogImages = editingRecord?.seo?.ogImage || [];
      if (values.ogImage?.length) {
        ogImages = await uploadMultiple(values.ogImage);
      }

      const payload = {
        data: {
          title: values.title,
          description: values.description,
          projectobjective: values.projectobjective,
          startDate: values.startDate
            ? dayjs(values.startDate).toISOString()
            : null,
          endDate: values.endDate
            ? dayjs(values.endDate).toISOString()
            : null,
          image: imageId,
          seo: {
            metaTitle: values.seo?.metaTitle || "",
            metaDescription: values.seo?.metaDescription || "",
            canonicalUrl: values.seo?.canonicalUrl || "",
            metaRobots: values.seo?.metaRobots || "index, follow",
            ogTitle: values.seo?.ogTitle || "",
            ogDescription: values.seo?.ogDescription || "",
            ogImage: ogImages,
          },
        },
      };

      if (editingDocumentId) {
        await axios.put(`${API}/projects/${editingDocumentId}`, payload, {
          headers: getAuthHeaders(),
        });
        message.success("Project updated successfully");
      } else {
        await axios.post(`${API}/projects`, payload, {
          headers: getAuthHeaders(),
        });
        message.success("Project created successfully");
      }

      setModalOpen(false);
      form.resetFields();
      fetchProjects();
    } catch (err: any) {
      console.error(err);
      message.error(
        err.response?.data?.error?.message || "Error saving project"
      );
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------
  // DELETE PROJECT
  // ------------------------------------
  const handleDelete = async (documentId: string) => {
    try {
      await axios.delete(`${API}/projects/${documentId}`, {
        headers: getAuthHeaders(),
      });

      message.success("Project deleted");
      fetchProjects();
    } catch (err) {
      message.error("Failed to delete");
    }
  };

  // ------------------------------------
  // TABLE COLUMNS
  // ------------------------------------
  const columns = [
    {
      title: "Image",
      width: 120,
      render: (record: any) =>
        record.image ? (
          <img
            src={`${FILE_BASE}${resolveImageUrl(record.image)}`}
            width={80}
            height={60}
            style={{ borderRadius: 6, objectFit: "cover" }}
          />
        ) : (
          "—"
        ),
    },
    { title: "Title", dataIndex: "title" },
    { title: "Objective", dataIndex: "projectobjective" },
    { title: "Start", dataIndex: "startDate" },
    { title: "End", dataIndex: "endDate" },

    {
      title: "Actions",
      render: (record: any) => (
        <Space>
          {/* EDIT */}
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingDocumentId(record.documentId);
              setEditingRecord(record);

              form.setFieldsValue({
                title: record.title,
                description: record.description,
                projectobjective: record.projectobjective,
                startDate: record.startDate ? dayjs(record.startDate) : null,
                endDate: record.endDate ? dayjs(record.endDate) : null,
                seo: record.seo || {},
                image: [],
                ogImage: [],
              });

              setModalOpen(true);
            }}
          />

          {/* DELETE */}
          <Popconfirm
            title="Delete this project?"
            onConfirm={() => handleDelete(record.documentId)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // ------------------------------------
  // UI
  // ------------------------------------
  return (
    <>
      <Card
        title={<h2 style={{ fontSize: 24 }}>Projects Management</h2>}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              form.resetFields();
              setEditingDocumentId(null);
              setEditingRecord(null);
              setModalOpen(true);
            }}
          >
            Add Project
          </Button>
        }
        style={{ margin: 20, borderRadius: 12 }}
      >
        <Table
          dataSource={projects}
          columns={columns}
          rowKey="documentId"
          loading={loading}
          pagination={{ pageSize: 8 }}
        />
      </Card>

      {/* MODAL FORM */}
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={850}
      >
        <h2 style={{ marginBottom: 20 }}>
          {editingDocumentId ? "Edit Project" : "Create New Project"}
        </h2>

        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                <Input placeholder="Enter project title" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="projectobjective"
                label="Project Status"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value="ongoing">Ongoing</Select.Option>
                  <Select.Option value="completed">Completed</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} placeholder="Enter description" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="startDate" label="Start Date">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="endDate" label="End Date">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Divider>Main Image</Divider>

          <Form.Item
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload beforeUpload={() => false} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Upload Main Image</Button>
            </Upload>
          </Form.Item>

          <Divider>SEO Settings</Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={["seo", "metaTitle"]} label="Meta Title">
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name={["seo", "canonicalUrl"]}
                label="Canonical URL"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name={["seo", "metaDescription"]}
            label="Meta Description"
          >
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item name={["seo", "metaRobots"]} label="Meta Robots">
            <Select
              options={META_ROBOTS_OPTIONS.map((v) => ({
                label: v,
                value: v,
              }))}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={["seo", "ogTitle"]} label="OG Title">
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name={["seo", "ogDescription"]}
                label="OG Description"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Divider>OG Images</Divider>

          <Form.Item
            name="ogImage"
            label="Upload Multiple OG Images"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload beforeUpload={() => false} multiple listType="picture">
              <Button icon={<UploadOutlined />}>Upload OG Images</Button>
            </Upload>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            style={{ marginTop: 10 }}
          >
            {editingDocumentId ? "Update Project" : "Create Project"}
          </Button>
        </Form>
      </Modal>
    </>
  );
}
