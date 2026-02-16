"use client";

import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  Form,
  Input,
  Select,
  Button,
  Table,
  Modal,
  message,
  Spin,
} from "antd";
import {
  MoonOutlined,
  SunOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const API_URL = "http://172.30.0.200:1334/api/categories";

type SEO = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  metaRobots?: string;
  ogTitle?: string;
  ogDescription?: string;
};

type Category = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  type: string;
  seo?: SEO;
};

const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [form] = Form.useForm();

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Fetch Categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL, { headers: getAuthHeaders() });
      setCategories(res.data.data);
    } catch {
      message.error("Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Open Modal
  const openEditModal = (category?: Category) => {
    if (category) {
      setEditingDocId(category.documentId);
      form.setFieldsValue({
        title: category.title,
        slug: category.slug,
        type: category.type,
        ...category.seo,
      });
    } else {
      setEditingDocId(null);
      form.resetFields();
    }
    setOpenModal(true);
  };

  // Submit Form
  const handleSubmit = async (values: any) => {
    setSaving(true);
    const payload = {
      data: {
        title: values.title,
        slug: values.slug,
        type: values.type,
        seo: {
          metaTitle: values.metaTitle,
          metaDescription: values.metaDescription,
          canonicalUrl: values.canonicalUrl,
          metaRobots: values.metaRobots,
          ogTitle: values.ogTitle,
          ogDescription: values.ogDescription,
        },
      },
    };

    try {
      if (editingDocId) {
        await axios.put(`${API_URL}/${editingDocId}`, payload, {
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        });
        message.success("Category updated successfully");
      } else {
        await axios.post(API_URL, payload, {
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        });
        message.success("Category created successfully");
      }

      fetchCategories();
      setOpenModal(false);
    } catch (err: any) {
      message.error(err.response?.data?.error?.message || "Error saving category");
    } finally {
      setSaving(false);
    }
  };

  // Confirm delete
  const handleDelete = (documentId: string) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this category?",
      okText: "Delete",
      okType: "danger",
      onOk: async () => {
        try {
          await axios.delete(`${API_URL}/${documentId}`, { headers: getAuthHeaders() });
          message.success("Category deleted");
          fetchCategories();
        } catch {
          message.error("Error deleting category");
        }
      },
    });
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Title", dataIndex: "title" },
    { title: "Slug", dataIndex: "slug" },
    { title: "Type", dataIndex: "type" },
    {
      title: "Actions",
      render: (row: Category) => (
        <div className="space-x-2">
          <Button type="link" icon={<EditOutlined />} onClick={() => openEditModal(row)}>
            Edit
          </Button>
          <Button
            danger
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(row.documentId)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen px-4 py-6 overflow-x-hidden dark:bg-gray-900 dark:text-white transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Category Management</h1>
        <Button
          shape="circle"
          onClick={() => setDarkMode(!darkMode)}
          icon={darkMode ? <SunOutlined /> : <MoonOutlined />}
        />
      </div>

      <Button type="primary" className="mb-4" onClick={() => openEditModal()}>
        + Add Category
      </Button>

      {/* LIST VIEW — TABLE on desktop, CARDS on mobile */}
      {loading ? (
        <Spin />
      ) : isMobile ? (
        <div className="grid gap-4">
          {categories.map((cat) => (
            <div
              key={cat.documentId}
              className="p-4 rounded-lg border shadow-sm dark:bg-gray-800 transition duration-200"
            >
              <p><b>ID:</b> {cat.id}</p>
              <p><b>Title:</b> {cat.title}</p>
              <p><b>Slug:</b> {cat.slug}</p>
              <p><b>Type:</b> {cat.type}</p>
              <div className="flex gap-2 mt-3">
                <Button type="primary" onClick={() => openEditModal(cat)}>Edit</Button>
                <Button danger onClick={() => handleDelete(cat.documentId)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Table dataSource={categories} columns={columns} rowKey="documentId" />
      )}

      {/* MODAL FOR CREATE / EDIT */}
      <Modal
        title={editingDocId ? "Edit Category" : "Create Category"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        className="dark:[&_.ant-modal-content]:bg-gray-800 dark:[&_.ant-modal-content]:text-white"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input onChange={(e) =>
              form.setFieldValue(
                "slug",
                e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-")
              )
            } />
          </Form.Item>

          <Form.Item label="Slug" name="slug" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Type" name="type" rules={[{ required: true }]}>
            <Select>
              <Option value="product">product</Option>
              <Option value="blog">blog</Option>
              <Option value="service">service</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Meta Title" name="metaTitle" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Meta Description" name="metaDescription" rules={[{ required: true }]}>
            <TextArea rows={2} />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={saving}>
            {editingDocId ? "Update" : "Create"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryPage;
