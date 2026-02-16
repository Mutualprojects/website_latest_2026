"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Form,
    Input,
    Button,
    Upload,
    Select,
    Table,
    Modal,
    Popconfirm,
    Space,
    message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const API_BASE = "http://172.30.0.200:1334/api";
const UPLOAD_API = `${API_BASE}/upload`;

const getAuthHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function CaseStudyPage() {
    const [form] = Form.useForm();
    const [caseStudies, setCaseStudies] = useState<any[]>([]);
    const [sectors, setSectors] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingDocId, setEditingDocId] = useState<string | null>(null);

    // ------------------ FETCH CASE STUDIES ------------------
    const fetchCaseStudies = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `${API_BASE}/case-studies?populate=*`,
                { headers: getAuthHeaders() }
            );
            setCaseStudies(res.data.data);
        } catch (err) {
            console.error(err);
            message.error("Failed to fetch case studies");
        } finally {
            setLoading(false);
        }
    };

    // ------------------ FETCH SECTORS ------------------
    const fetchSectors = async () => {
        try {
            const res = await axios.get(`${API_BASE}/sectors`, {
                headers: getAuthHeaders(),
            });
            setSectors(res.data.data);
        } catch {
            message.error("Failed to load sectors");
        }
    };

    useEffect(() => {
        fetchCaseStudies();
        fetchSectors();
    }, []);

    // ------------------ UPLOAD IMAGE ------------------
    const uploadImage = async (file: any) => {
        try {
            const formData = new FormData();
            formData.append("files", file);

            const uploadRes = await axios.post(UPLOAD_API, formData, {
                headers: getAuthHeaders(),
            });

            return uploadRes.data[0].id; // return only ID
        } catch {
            message.error("Image upload failed");
            return null;
        }
    };

    // ------------------ SUBMIT FORM ------------------
    const handleSubmit = async (values: any) => {
        setLoading(true);

        try {
            // --- IMAGE ID FIX ---
            let imageId = null;

            if (values.image?.length > 0) {
                const file = values.image[0];

                if (file.originFileObj) {
                    imageId = await uploadImage(file.originFileObj);
                } else {
                    imageId = file.id; // existing image ID
                }
            }

            // --- COMPONENT FIX ---
            const detailObj = {
                challanges: values.challanges || "",
                result: values.result || "",
                solutions: values.solutions || "",
            };

            const payload = {
                data: {
                    name: values.name,
                    description: values.description,
                    company: values.company,
                    role: values.role,
                    city: values.city,
                    rating: values.rating,
                    quote: values.quote,
                    detail: detailObj,
                    sector: values.sector || null,
                    image: imageId ? [imageId] : [], // MUST BE ARRAY because Strapi says "Multiple Media"
                },
            };

            if (editingDocId) {
                await axios.put(`${API_BASE}/case-studies/${editingDocId}`, payload, {
                    headers: getAuthHeaders(),
                });
                message.success("Case Study updated successfully");
            } else {
                await axios.post(`${API_BASE}/case-studies`, payload, {
                    headers: getAuthHeaders(),
                });
                message.success("Case Study created successfully");
            }

            form.resetFields();
            setModalVisible(false);
            setEditingDocId(null);
            fetchCaseStudies();
        } catch (err: any) {
            console.error(err.response?.data);
            message.error("Saving failed");
        } finally {
            setLoading(false);
        }
    };

    // ------------------ FORMAT EDIT IMAGE ------------------
    const formatImageUpload = (imageData: any) => {
        if (!imageData) return [];

        const arr = Array.isArray(imageData) ? imageData : [imageData];

        return arr.map((img: any) => ({
            uid: img.id,
            id: img.id,
            name: img.name,
            status: "done",
            url: `http://172.30.0.200:1334${img.url}`,
        }));
    };

    // ------------------ EDIT ------------------
    const handleEdit = async (record: any) => {
        setLoading(true);
        try {
            const res = await axios.get(
                `${API_BASE}/case-studies/${record.documentId}?populate=*`,
                { headers: getAuthHeaders() }
            );

            const c = res.data.data;

            form.setFieldsValue({
                name: c.name,
                description: c.description,
                company: c.company,
                role: c.role,
                city: c.city,
                rating: c.rating,
                quote: c.quote,
                challanges: c.detail?.challanges,
                result: c.detail?.result,
                solutions: c.detail?.solutions,
                sector: c.sector?.documentId,
                image: formatImageUpload(c.image),
            });

            setEditingDocId(c.documentId);
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    };

    // ------------------ DELETE ------------------
    const handleDelete = async (docId: string) => {
        try {
            await axios.delete(`${API_BASE}/case-studies/${docId}`, {
                headers: getAuthHeaders(),
            });

            message.success("Case Study deleted permanently");
            fetchCaseStudies();
        } catch {
            message.error("Delete failed");
        }
    };

    // ------------------ TABLE COLUMNS ------------------
    const columns = [
        { title: "Name", dataIndex: "name" },
        { title: "Company", dataIndex: "company" },
        { title: "Role", dataIndex: "role" },
        {
            title: "Sector",
            render: (_: any, r: any) => r?.sector?.title || "-",
        },
        {
            title: "Image",
            render: (_: any, r: any) => {
                const img = r.image?.[0];
                return img ? (
                    <img
                        src={`http://172.30.0.200:1334${img.url}`}
                        style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 6 }}
                    />
                ) : (
                    "—"
                );
            },
        },
        {
            title: "Actions",
            render: (_: any, record: any) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        Edit
                    </Button>

                    <Popconfirm
                        title="Delete permanently?"
                        onConfirm={() => handleDelete(record.documentId)}
                    >
                        <Button danger icon={<DeleteOutlined />}>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // ------------------ RENDER ------------------
    return (
        <div className="p-6 bg-white rounded-lg shadow-xl">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Case Study Management</h2>

                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        form.resetFields();
                        setEditingDocId(null);
                        setModalVisible(true);
                    }}
                >
                    Add Case Study
                </Button>
            </div>

            <Table
                rowKey="documentId"
                loading={loading}
                columns={columns}
                dataSource={caseStudies}
                pagination={{ pageSize: 10 }}
            />

            {/* --------- MODAL FORM ---------- */}
            <Modal open={modalVisible} footer={null} onCancel={() => setModalVisible(false)} width={750}>
                <Form layout="vertical" form={form} onFinish={handleSubmit}>
                    <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item label="Company" name="company" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Role" name="role" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="City" name="city">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Rating" name="rating">
                        <Input type="number" min={1} max={5} />
                    </Form.Item>

                    <Form.Item label="Quote" name="quote">
                        <TextArea rows={3} />
                    </Form.Item>

                    <h3 className="font-bold mt-4 mb-2">Detail Component</h3>

                    <Form.Item label="Challenges" name="challanges">
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item label="Result" name="result">
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item label="Solutions" name="solutions">
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item label="Sector" name="sector">
                        <Select allowClear placeholder="Select a sector">
                            {sectors.map((s) => (
                                <Option key={s.documentId} value={s.documentId}>
                                    {s.title}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => e?.fileList || []}
                    >
                        <Upload listType="picture-card" beforeUpload={() => false} maxCount={1}>
                            <UploadOutlined />
                            <div>Upload</div>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" block htmlType="submit" loading={loading}>
                            {editingDocId ? "Update Case Study" : "Create Case Study"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
