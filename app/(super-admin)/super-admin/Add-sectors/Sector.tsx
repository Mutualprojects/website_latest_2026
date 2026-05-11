"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Form,
    Input,
    Button,
    Table,
    Modal,
    Popconfirm,
    Space,
    message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const API_BASE = "/cms-api/api";

const getAuthHeaders = () => {
    if (typeof window === "undefined") return {};
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function CaseStudySectorPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [sectors, setSectors] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingDocId, setEditingDocId] = useState<string | null>(null);

    // 🔹 Load Sector List
    const fetchSectors = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE}/sectors`, {
                headers: getAuthHeaders(),
            });
            setSectors(res.data.data);
        } catch (error) {
            console.log(error);
            message.error("Failed to fetch sectors");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSectors();
    }, []);

    // 🔹 Submit (Create / Update)
    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const payload = {
                data: {
                    title: values.title,
                    slug: values.slug || values.title.toLowerCase().replace(/\s+/g, "-"),
                },
            };

            if (editingDocId) {
                await axios.put(`${API_BASE}/sectors/${editingDocId}`, payload, {
                    headers: getAuthHeaders(),
                });
                message.success("Sector updated successfully");
            } else {
                await axios.post(`${API_BASE}/sectors`, payload, {
                    headers: getAuthHeaders(),
                });
                message.success("Sector created successfully");
            }

            fetchSectors();
            form.resetFields();
            setEditingDocId(null);
            setModalVisible(false);
        } catch (error) {
            console.log(error);
            message.error("Error saving sector");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Delete Sector
    const handleDelete = async (docId: string) => {
        try {
            await axios.delete(`${API_BASE}/sectors/${docId}`, {
                headers: getAuthHeaders(),
            });
            message.success("Sector deleted");
            fetchSectors();
        } catch (error) {
            console.log(error);
            message.error("Failed to delete sector");
        }
    };

    // 🔹 Edit Mode
    const handleEdit = (record: any) => {
        setEditingDocId(record.documentId);
        form.setFieldsValue({
            title: record.title,
            slug: record.slug,
        });
        setModalVisible(true);
    };

    // 🔹 Table Columns
    const columns = [
        { title: "Title", dataIndex: "title" },
        { title: "Slug", dataIndex: "slug" },
        {
            title: "Actions",
            render: (record: any) => (
                <Space>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Confirm Delete?"
                        onConfirm={() => handleDelete(record.documentId)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<DeleteOutlined />}>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-3"> Case Study – Sector Management</h2>

            <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
                Add Sector
            </Button>

            <Table
                className="mt-4"
                dataSource={sectors}
                columns={columns}
                rowKey="documentId"
                loading={loading}
            />

            {/* Modal */}
            <Modal
                title={editingDocId ? "Edit Sector" : "Add New Sector"}
                open={modalVisible}
                onCancel={() => {
                    setModalVisible(false);
                    form.resetFields();
                    setEditingDocId(null);
                }}
                footer={null}
            >
                <Form layout="vertical" form={form} onFinish={handleSubmit}>
                    <Form.Item
                        name="title"
                        label="Sector Title"
                        rules={[{ required: true, message: "Title required" }]}
                    >
                        <Input placeholder="e.g. Government" />
                    </Form.Item>

                    <Form.Item name="slug" label="Slug (optional)">
                        <Input placeholder="e.g. government" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                        {editingDocId ? "Update Sector" : "Create Sector"}
                    </Button>
                </Form>
            </Modal>
        </div>
    );
}
