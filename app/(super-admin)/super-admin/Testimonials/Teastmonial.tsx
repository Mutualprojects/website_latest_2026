"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Table,
    Modal,
    Form,
    Input,
    Button,
    Upload,
    message,
    Space,
    Popconfirm,
} from "antd";
import {
    UploadOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const API = "/cms-api/api";
const UPLOAD_API = `${API}/upload`;
const STRAPI_URL = "/cms-api";

// 🔐 Auth Headers
const getAuthHeaders = () => {
    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// 🖼 Resolve Image URL
const resolveImageUrl = (profile: any) => {
    if (!profile?.url) return "/default-profile.png";
    return `${STRAPI_URL}${profile.formats?.thumbnail?.url || profile.url}`;
};

export default function TestimonialsPage() {
    const [form] = Form.useForm();
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<any>(null);
    const [fileList, setFileList] = useState<any[]>([]);

    // 📌 Fetch Data
    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}/testimonials?populate=*`);
            setTestimonials(res.data.data || []);
        } catch {
            message.error("Failed to fetch testimonials");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    // 📍 Submit Handler
    const handleSubmit = async (values: any) => {
        try {
            setLoading(true);
            let uploadedFileId = editingRecord?.Profile?.id || null;

            // Upload new image if selected
            if (fileList.length && fileList[0].originFileObj) {
                const formData = new FormData();
                formData.append("files", fileList[0].originFileObj);
                const uploadRes = await axios.post(UPLOAD_API, formData, {
                    headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
                });
                uploadedFileId = uploadRes.data[0]?.id;
            }

            // Build Payload
            const payload: any = {
                data: {
                    fullname: values.fullname,
                    Designation: values.Designation,
                    Company: values.Company,
                    Message: values.Message,
                    ...(uploadedFileId ? { Profile: uploadedFileId } : {}),
                },
            };

            if (editingRecord) {
                // IMPORTANT: Use documentId instead of id
                await axios.put(
                    `${API}/testimonials/${editingRecord.documentId}`,
                    payload,
                    { headers: getAuthHeaders() }
                );
                message.success("Testimonial Updated Successfully");
            } else {
                await axios.post(`${API}/testimonials`, payload, {
                    headers: getAuthHeaders(),
                });
                message.success("Testimonial Added Successfully");
            }

            closeModal();
            fetchTestimonials();
        } catch (err: any) {
            message.error(
                err?.response?.data?.error?.message || "Failed to save testimonial"
            );
        } finally {
            setLoading(false);
        }
    };

    // ✏️ Edit Action
    const handleEdit = (record: any) => {
        setEditingRecord(record);
        form.setFieldsValue(record);

        setFileList(
            record.Profile
                ? [
                    {
                        uid: "-1",
                        name: record.Profile.name,
                        status: "done",
                        url: resolveImageUrl(record.Profile),
                    },
                ]
                : []
        );

        setModalOpen(true);
    };

    // ❌ Delete Action
    const handleDelete = async (record: any) => {
        try {
            await axios.delete(`${API}/testimonials/${record.documentId}`, {
                headers: getAuthHeaders(),
            });
            message.success("Deleted Successfully");
            fetchTestimonials();
        } catch {
            message.error("Failed to delete");
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingRecord(null);
        form.resetFields();
        setFileList([]);
    };

    // 📊 Table Columns
    const columns = [
        {
            title: "Image",
            dataIndex: "Profile",
            render: (p: any) => (
                <img src={resolveImageUrl(p)} className="w-10 h-10 rounded-full" />
            ),
        },
        { title: "Name", dataIndex: "fullname" },
        { title: "Designation", dataIndex: "Designation" },
        { title: "Company", dataIndex: "Company" },
        { title: "Message", dataIndex: "Message", ellipsis: true },
        {
            title: "Created",
            dataIndex: "createdAt",
            render: (date: string) => dayjs(date).format("DD MMM YYYY"),
        },
        {
            title: "Actions",
            render: (_: any, record: any) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Popconfirm
                        title="Are you sure you want to delete?"
                        onConfirm={() => handleDelete(record)}
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold dark:text-white">
                    Testimonials Management
                </h1>
                <Button icon={<PlusOutlined />} type="primary" onClick={() => setModalOpen(true)}>
                    Add Testimonial
                </Button>
            </div>

            <Table columns={columns} dataSource={testimonials} rowKey="documentId" loading={loading} />

            <Modal
                open={modalOpen}
                title={editingRecord ? "Edit Testimonial" : "Add Testimonial"}
                footer={null}
                onCancel={closeModal}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item name="fullname" label="Full Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="Designation" label="Designation">
                        <Input />
                    </Form.Item>
                    <Form.Item name="Company" label="Company">
                        <Input />
                    </Form.Item>
                    <Form.Item name="Message" label="Message" rules={[{ required: true }]}>
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Form.Item label="Profile Photo">
                        <Upload
                            beforeUpload={() => false}
                            fileList={fileList}
                            onChange={({ fileList }) => setFileList(fileList)}
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Upload / Replace</Button>
                        </Upload>
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block loading={loading}>
                        {editingRecord ? "Update" : "Save"}
                    </Button>
                </Form>
            </Modal>
        </div>
    );
}
