"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Form,
    Input,
    Button,
    Select,
    message,
    Table,
    Modal,
    Space,
    Spin,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useSearchParams, useRouter } from "next/navigation";

const { Option } = Select;

const API = "http://172.30.0.200:1334/api";

// Get token stored in localStorage
const getHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function Department() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState<any[]>([]);
    const [membersList, setMembersList] = useState<any[]>([]);
    const params = useSearchParams();
    const router = useRouter();
    const editingId = params.get("edit");

    // Fetch departments & members on page load
    useEffect(() => {
        fetchDepartments();
        fetchMembers();
        if (editingId) fetchDepartment();
    }, [editingId]);

    const fetchDepartments = async () => {
        try {
            const res = await axios.get(`${API}/departments`, { headers: getHeaders() });
            setDepartments(res.data?.data || []);
        } catch {
            message.error("Failed to fetch departments");
        }
    };

    const fetchMembers = async () => {
        try {
            // Example: assume members come from /api/users or another endpoint
            const res = await axios.get(`${API}/users`, { headers: getHeaders() });
            setMembersList(res.data?.data || []);
        } catch {
            message.error("Failed to fetch members");
        }
    };

    // Fetch single department for editing
    const fetchDepartment = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}/departments/${editingId}`, { headers: getHeaders() });
            const data = res.data?.data;
            form.setFieldsValue({
                title: data.title,
                slug: data.slug,
                members: data.members?.map((m: any) => m.documentId),
            });
        } catch {
            message.error("Failed to load department");
        } finally {
            setLoading(false);
        }
    };

    // Submit Create or Update
    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const payload = {
                data: {
                    title: values.title,
                    slug: values.slug || values.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                    members: values.members ? { connect: values.members } : undefined,
                },
            };

            if (editingId) {
                await axios.put(`${API}/departments/${editingId}`, payload, { headers: getHeaders() });
                message.success("Department updated successfully");
            } else {
                await axios.post(`${API}/departments`, payload, { headers: getHeaders() });
                message.success("Department created successfully");
            }

            router.push("/super-admin/Add-departments");
            form.resetFields();
            fetchDepartments();
        } catch (err: any) {
            message.error(err.response?.data?.error?.message || "Error saving department");
        } finally {
            setLoading(false);
        }
    };

    // Delete
    const handleDelete = (id: string) => {
        Modal.confirm({
            title: "Are you sure?",
            okType: "danger",
            onOk: async () => {
                await axios.delete(`${API}/departments/${id}`, { headers: getHeaders() });
                message.success("Department deleted");
                fetchDepartments();
            },
        });
    };

    return (
        <div className="p-4 md:p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
                {editingId ? "Edit Department" : "Create Department"}
            </h2>

            {loading && editingId ? (
                <Spin size="large" className="flex justify-center" />
            ) : (
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    {/* Title + Slug */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                            <Input
                                placeholder="Enter title"
                                onChange={(e) =>
                                    form.setFieldValue(
                                        "slug",
                                        e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                                    )
                                }
                            />
                        </Form.Item>

                        <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
                            <Input placeholder="Auto-generated or custom" />
                        </Form.Item>
                    </div>

                    {/* Members Select */}
                    <Form.Item name="members" label="Members (Optional)">
                        <Select
                            mode="multiple"
                            placeholder="Select members"
                            allowClear
                        >
                            {membersList.map((m) => (
                                <Option key={m.documentId} value={m.documentId}>
                                    {m.username || m.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Button type="primary" htmlType="submit" loading={loading} block>
                        {editingId ? "Update Department" : "Create Department"}
                    </Button>
                </Form>
            )}

            {/* Departments List */}
            <h2 className="text-xl font-semibold mt-6 mb-2">All Departments</h2>
            <Table
                rowKey="documentId"
                dataSource={departments}
                columns={[
                    { title: "Title", dataIndex: "title" },
                    { title: "Slug", dataIndex: "slug" },
                    {
                        title: "Members",
                        render: (row) => (
                            <span>
                                {row.members?.map((m: any) => m.username || m.name).join(", ")}
                            </span>
                        ),
                    },
                    {
                        title: "Actions",
                        render: (row) => (
                            <Space>
                                <Button
                                    icon={<EditOutlined />}
                                    onClick={() => router.push(`/super-admin/Add-departments?edit=${row.documentId}`)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleDelete(row.documentId)}
                                >
                                    Delete
                                </Button>
                            </Space>
                        ),
                    },
                ]}
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
}
