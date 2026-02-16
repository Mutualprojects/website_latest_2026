"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Form,
    Input,
    Button,
    Upload,
    Select,
    message,
    DatePicker,
    Space,
    Table,
    Modal,
    Popconfirm,
    Spin,
} from "antd";
import {
    UploadOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;

const API = "http://172.30.0.200:1334/api";
const UPLOAD_API = `${API}/upload`;

const getHeaders = () => {
    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const resolveImageUrl = (file: any) => {
    if (!file) return "/default-image.jpg";
    const url =
        file?.formats?.large?.url ||
        file?.formats?.medium?.url ||
        file?.formats?.small?.url ||
        file?.url;
    return url?.startsWith("http")
        ? url
        : `http://172.30.0.200:1334${url}`;
};

const mapSingleImage = (file: any) =>
    file
        ? [
            {
                uid: file.documentId,
                name: file.name,
                status: "done",
                url: resolveImageUrl(file),
            },
        ]
        : [];

const mapGalleryImages = (gallery: any[]) =>
    gallery?.map((file) => ({
        uid: file.documentId,
        name: file.name,
        status: "done",
        url: resolveImageUrl(file),
    })) || [];

const uploadFiles = async (files: any[]) => {
    const ids: number[] = [];
    for (const f of files) {
        if (f.originFileObj) {
            const fd = new FormData();
            fd.append("files", f.originFileObj);
            try {
                const res = await axios.post(UPLOAD_API, fd, {
                    headers: { ...getHeaders(), "Content-Type": "multipart/form-data" },
                });
                ids.push(res.data[0].id);
            } catch (error) {
                console.error("Upload error:", error);
            }
        } else {
            try {
                const res = await axios.get(
                    `${API}/upload/files?filters[documentId][$eq]=${f.uid}`,
                    { headers: getHeaders() }
                );
                if (res.data?.[0]?.id) ids.push(res.data[0].id);
            } catch (error) {
                console.error("Fetch file error:", error);
            }
        }
    }
    return ids;
};

export default function Events() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingDocumentId, setEditingDocumentId] = useState<string | null>(null);
    const [form] = Form.useForm();

    const fetchEvents = async () => {
        try {
            const res = await axios.get(`${API}/events?populate=*`, {
                headers: getHeaders(),
            });
            setEvents(
                res.data.data.map((e: any) => ({
                    key: e.documentId,
                    id: e.id,
                    documentId: e.documentId,
                    title: e.eventTitle,
                    type: e.eventType,
                    slug: e.slug,
                    date: e.eventDate,
                    image: resolveImageUrl(e.mainImage),
                }))
            );
        } catch (err) {
            console.error("Fetch error:", err);
            message.error("Failed to load events");
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleEdit = async (record: any) => {
        setLoading(true);
        try {
            const res = await axios.get(
                `${API}/events/${record.documentId}?populate=*`,
                { headers: getHeaders() }
            );

            const event = res.data.data;
            if (!event) {
                message.error("Event not found");
                return;
            }

            setEditingDocumentId(event.documentId);

            form.setFieldsValue({
                eventTitle: event.eventTitle,
                eventType: event.eventType,
                eventDate: event.eventDate ? dayjs(event.eventDate) : null,
                eventDescription: event.eventDescription,
                slug: event.slug, // ADDED HERE
                mainImage: mapSingleImage(event.mainImage),
                eventGallery: mapGalleryImages(event.eventGallery),
            });

            setModalOpen(true);
        } catch (err: any) {
            console.error("Edit error:", err);
            message.error("Error loading event");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (record: any) => {
        try {
            await axios.delete(`${API}/events/${record.documentId}`, {
                headers: getHeaders(),
            });
            message.success("Event deleted");
            fetchEvents();
        } catch (err: any) {
            console.error("Delete error:", err);
            message.error("Failed to delete event");
        }
    };

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const mainImageIds = await uploadFiles(values.mainImage || []);
            const galleryIds = await uploadFiles(values.eventGallery || []);

            const payload = {
                data: {
                    eventTitle: values.eventTitle,
                    eventType: values.eventType,
                    eventDate: values.eventDate?.format("YYYY-MM-DD"),
                    eventDescription: values.eventDescription,
                    slug: values.slug || null, // ADDED HERE
                    mainImage: mainImageIds.length > 0 ? mainImageIds[0] : undefined,
                    eventGallery: galleryIds.length > 0 ? galleryIds : undefined,
                },
            };

            if (editingDocumentId !== null) {
                await axios.put(`${API}/events/${editingDocumentId}`, payload, {
                    headers: getHeaders(),
                });
                message.success("Event updated successfully");
            } else {
                await axios.post(`${API}/events`, payload, {
                    headers: getHeaders(),
                });
                message.success("Event created successfully");
            }

            form.resetFields();
            setModalOpen(false);
            fetchEvents();
            setEditingDocumentId(null);
        } catch (e: any) {
            console.error("Submit error:", e);
            message.error(
                e.response?.data?.error?.message || "Error saving event."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setModalOpen(false);
        setEditingDocumentId(null);
        form.resetFields();
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-xl">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Events Manager</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        setEditingDocumentId(null);
                        form.resetFields();
                        setModalOpen(true);
                    }}
                >
                    Add Event
                </Button>
            </div>

            <Table
                dataSource={events}
                pagination={{ pageSize: 5 }}
                columns={[
                    { title: "Title", dataIndex: "title", key: "title" },
                    { title: "Slug", dataIndex: "slug", key: "slug" }, // ADDED COLUMN
                    { title: "Type", dataIndex: "type", key: "type" },
                    {
                        title: "Date",
                        dataIndex: "date",
                        key: "date",
                        render: (d) => (d ? dayjs(d).format("DD/MM/YYYY") : "N/A"),
                    },
                    {
                        title: "Image",
                        dataIndex: "image",
                        key: "image",
                        render: (src) => (
                            <img
                                src={src}
                                width={60}
                                height={60}
                                alt="event"
                                style={{ objectFit: "cover", borderRadius: "4px" }}
                            />
                        ),
                    },
                    {
                        title: "Actions",
                        key: "actions",
                        render: (_, r) => (
                            <Space>
                                <Button icon={<EditOutlined />} onClick={() => handleEdit(r)} />
                                <Popconfirm
                                    title="Are you sure you want to delete this event?"
                                    onConfirm={() => handleDelete(r)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button danger icon={<DeleteOutlined />} />
                                </Popconfirm>
                            </Space>
                        ),
                    },
                ]}
            />

            <Modal
                open={modalOpen}
                onCancel={handleCancel}
                footer={null}
                width={700}
                title={editingDocumentId ? "Edit Event" : "Create Event"}
                destroyOnClose
            >
                <Spin spinning={loading}>
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>

                        {/* SLUG FIELD */}
                        <Form.Item
                            name="slug"
                            label="Slug"
                            rules={[
                                { required: true, message: "Please enter slug" },
                                { pattern: /^[a-z0-9-]+$/, message: "Slug must be URL friendly" },
                            ]}
                        >
                            <Input placeholder="event-slug-here" />
                        </Form.Item>

                        <Form.Item
                            name="eventTitle"
                            label="Title"
                            rules={[{ required: true, message: "Please enter event title" }]}
                        >
                            <Input placeholder="Enter event title" />
                        </Form.Item>

                        <Form.Item
                            name="eventType"
                            label="Type"
                            rules={[{ required: true, message: "Please select event type" }]}
                        >
                            <Select placeholder="Select event type">
                                <Option value="CULTURAL">EXPO</Option>
                                <Option value="CELEBRATION">CELEBRATION</Option>
                                <Option value="TECHNICAL">AWARD</Option>
                                <Option value="TECHNICAL">DRIVE</Option>
                                <Option value="TECHNICAL">TRIP</Option>
                                <Option value="EXPO">SEMINAR</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="eventDate"
                            label="Date"
                            rules={[{ required: true, message: "Please select event date" }]}
                        >
                            <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item
                            name="mainImage"
                                label="Main Image"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                                rules={[{ required: true, message: "Please upload main image" }]}
                            >
                                <Upload listType="picture-card" beforeUpload={() => false} maxCount={1}>
                                    <div>
                                        <UploadOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                        </Form.Item>

                        <Form.Item
                            name="eventGallery"
                            label="Gallery (Optional)"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                        >
                            <Upload multiple listType="picture-card" beforeUpload={() => false}>
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            name="eventDescription"
                            label="Description"
                            rules={[
                                { required: true, message: "Please enter event description" },
                            ]}
                        >
                            <TextArea rows={4} placeholder="Enter event description" />
                        </Form.Item>

                        <Form.Item>
                            <Space style={{ width: "100%" }}>
                                <Button type="primary" htmlType="submit" loading={loading} block>
                                    {editingDocumentId ? "Update Event" : "Create Event"}
                                </Button>
                                <Button onClick={handleCancel} disabled={loading}>
                                    Cancel
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </div>
    );
}
