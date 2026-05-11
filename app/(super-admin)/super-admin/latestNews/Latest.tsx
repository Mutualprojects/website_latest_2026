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
    DatePicker,
    Space,
    message,
    Popconfirm,
} from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const API = "/cms-api/api";
const STRAPI_URL = "/cms-api";
const UPLOAD_API = `${API}/upload`;

const getAuthHeaders = () => {
    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Resolve image URLs
const resolveImageUrl = (item: any) => {
    if (!item?.url) return "/default-image.png";
    return `${STRAPI_URL}${item.formats?.thumbnail?.url || item.url}`;
};

export default function LatestNewsPage() {
    const [form] = Form.useForm();
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<any>(null);
    const [fileList, setFileList] = useState<any[]>([]);

    // Fetch Latest News
    const fetchNews = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}/latestnews?populate=*`);
            setNews(res.data.data || []);
        } catch {
            message.error("Failed to fetch news");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    // Submit Add/Edit
    const handleSubmit = async (values: any) => {
        try {
            setLoading(true);
            const uploadedMediaIds: number[] = [];

            // Upload selected media
            for (const file of fileList) {
                if (file.originFileObj) {
                    const formData = new FormData();
                    formData.append("files", file.originFileObj);

                    const uploadRes = await axios.post(UPLOAD_API, formData, {
                        headers: {
                            ...getAuthHeaders(),
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    uploadedMediaIds.push(uploadRes.data[0]?.id);
                } else if (file.id) {
                    uploadedMediaIds.push(file.id);
                }
            }

            // Prepare payload
            const payload: any = {
                data: {
                    tittle: values.tittle,
                    newsdescription: values.newsdescription,
                    date: values.date ? dayjs(values.date).format("YYYY-MM-DD") : null,
                    latestmedia: uploadedMediaIds.length > 0 ? uploadedMediaIds : [],
                },
            };

            if (editingRecord) {
                await axios.put(
                    `${API}/latestnews/${editingRecord.documentId}`,
                    payload,
                    { headers: getAuthHeaders() }
                );
                message.success("News updated successfully");
            } else {
                await axios.post(`${API}/latestnews`, payload, {
                    headers: getAuthHeaders(),
                });
                message.success("News added successfully");
            }

            closeModal();
            fetchNews();
        } catch (err: any) {
            message.error(
                err?.response?.data?.error?.message || "Failed to save news"
            );
        } finally {
            setLoading(false);
        }
    };

    // Handle Edit
    const handleEdit = (record: any) => {
        setEditingRecord(record);
        form.setFieldsValue({
            ...record,
            date: record.date ? dayjs(record.date) : null,
        });

        setFileList(
            record.latestmedia?.map((m: any) => ({
                uid: m.documentId,
                id: m.id,
                name: m.name,
                status: "done",
                url: resolveImageUrl(m),
            })) || []
        );

        setModalOpen(true);
    };

    // Delete Action
    const handleDelete = async (record: any) => {
        try {
            await axios.delete(`${API}/latestnews/${record.documentId}`, {
                headers: getAuthHeaders(),
            });
            message.success("Deleted successfully");
            fetchNews();
        } catch {
            message.error("Failed to delete");
        }
    };

    // Close Modal
    const closeModal = () => {
        setModalOpen(false);
        setEditingRecord(null);
        form.resetFields();
        setFileList([]);
    };

    // Table Columns
    const columns = [
        {
            title: "Media",
            render: (record: any) =>
                record.latestmedia?.length ? (
                    <img
                        src={resolveImageUrl(record.latestmedia[0])}
                        className="w-14 h-14 rounded-md object-cover"
                    />
                ) : (
                    "No media"
                ),
        },
        { title: "Title", dataIndex: "tittle" },
        {
            title: "Date",
            dataIndex: "date",
            render: (date: string) => dayjs(date).format("DD MMM YYYY"),
        },
        { title: "Description", dataIndex: "newsdescription", ellipsis: true },
        {
            title: "Actions",
            render: (_: any, record: any) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Popconfirm
                        title="Are you sure to delete this news?"
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
                    Latest News Management
                </h1>
                <Button icon={<PlusOutlined />} type="primary" onClick={() => setModalOpen(true)}>
                    Add News
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={news}
                rowKey="documentId"
                loading={loading}
            />

            <Modal
                open={modalOpen}
                title={editingRecord ? "Edit News" : "Add News"}
                footer={null}
                onCancel={closeModal}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        name="tittle"
                        label="Title"
                        rules={[{ required: true, message: "Title is required" }]}
                    >
                        <Input placeholder="Enter news title" />
                    </Form.Item>

                    <Form.Item name="newsdescription" label="Description">
                        <Input.TextArea rows={4} placeholder="Enter news description" />
                    </Form.Item>

                    <Form.Item name="date" label="News Date">
                        <DatePicker className="w-full" />
                    </Form.Item>

                    <Form.Item label="Media (Images)">
                        <Upload
                            multiple
                            listType="picture"
                            beforeUpload={() => false}
                            fileList={fileList}
                            onChange={({ fileList }) => setFileList(fileList)}
                        >
                            <Button icon={<UploadOutlined />}>Upload / Replace</Button>
                        </Upload>
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block loading={loading}>
                        {editingRecord ? "Update News" : "Save News"}
                    </Button>
                </Form>
            </Modal>
        </div>
    );
}
