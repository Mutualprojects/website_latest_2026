"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Form,
    Input,
    Button,
    Table,
    Modal,
    Upload,
    Select,
    message,
    Space,
    Switch,
} from "antd";
import {
    UploadOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
} from "@ant-design/icons";

const API_BASE = "/cms-api/api";
const STRAPI_URL = "/cms-api";

const getAuthHeaders = () => {
    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function MembersPage() {
    const [form] = Form.useForm();
    const [members, setMembers] = useState<any[]>([]);
    const [departments, setDepartments] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingMember, setEditingMember] = useState<any>(null);
    const [darkMode, setDarkMode] = useState(false);

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [existingImageId, setExistingImageId] = useState<number | null>(null);
    const [isImageRemoved, setIsImageRemoved] = useState(false);

    const [selectedDepartmentFilter, setSelectedDepartmentFilter] =
        useState<string>("all");

    useEffect(() => {
        fetchMembers();
        fetchDepartments();
    }, []);

    // ---------------------------------------------------------------------
    // FETCH DATA
    // ---------------------------------------------------------------------
    const fetchMembers = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${API_BASE}/members?populate[0]=image&populate[1]=department`,
                { headers: getAuthHeaders() }
            );
            setMembers(res.data.data || []);
        } catch {
            message.error("Failed to fetch members");
        } finally {
            setLoading(false);
        }
    };

    const fetchDepartments = async () => {
        try {
            const res = await axios.get(`${API_BASE}/departments`, {
                headers: getAuthHeaders(),
            });
            setDepartments(res.data.data || []);
        } catch {
            message.error("Failed to fetch departments");
        }
    };

    // ---------------------------------------------------------------------
    // MODAL + IMAGE STATE
    // ---------------------------------------------------------------------
    const resetImageState = () => {
        setImagePreview(null);
        setImageFile(null);
        setExistingImageId(null);
        setIsImageRemoved(false);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setEditingMember(null);
        resetImageState();
        form.resetFields();
    };

    // Open modal for Add/Edit
    const openModal = async (record: any = null) => {
        setEditingMember(record);
        form.resetFields();
        resetImageState();

        if (record) {
            const res = await axios.get(
                `${API_BASE}/members?filters[documentId][$eq]=${record.documentId}&populate[0]=image&populate[1]=department`,
                { headers: getAuthHeaders() }
            );

            const member = res.data.data[0];
            if (!member) return;

            form.setFieldsValue({
                tittle: member.tittle,
                slug: member.slug,
                linkdin: member.linkdin,
                order: member.order,
                About: member.About,
                designation: member.designation, // ← ADDED
                department: member.department?.documentId || null,
            });

            if (member.image?.url) {
                setImagePreview(`${STRAPI_URL}${member.image.url}`);
                setExistingImageId(member.image.id);
            }
        }

        setIsModalVisible(true);
    };

    // ---------------------------------------------------------------------
    // IMAGE UPLOAD & DELETE
    // ---------------------------------------------------------------------
    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("files", file);
        const res = await axios.post(`${API_BASE}/upload`, formData, {
            headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
        });
        return res.data[0];
    };

    const deleteImageFile = async (fileId: number) => {
        try {
            await axios.delete(`${API_BASE}/upload/files/${fileId}`, {
                headers: getAuthHeaders(),
            });
        } catch (err) {
            console.warn("Failed to delete image file:", err);
        }
    };

    // ---------------------------------------------------------------------
    // SUBMIT FORM
    // ---------------------------------------------------------------------
    const handleSubmit = async (values: any) => {
        try {
            setLoading(true);
            let newImageId: number | null = null;

            // Upload new image if exists
            if (imageFile) {
                const uploaded = await handleImageUpload(imageFile);
                newImageId = uploaded.id;
            }

            // Create payload
            const data: any = {
                tittle: values.tittle,
                slug: values.slug,
                linkdin: values.linkdin,
                order: values.order,
                About: values.About,
                designation: values.designation || null, // ← ADDED
            };

            // Add department relation
            data.department = values.department
                ? { connect: [values.department] }
                : null;

            // Handle image logic
            if (editingMember) {
                if (newImageId !== null) data.image = newImageId;
                else if (isImageRemoved) data.image = null;
            } else if (newImageId !== null) {
                data.image = newImageId;
            }

            const payload = { data };

            if (editingMember) {
                await axios.put(
                    `${API_BASE}/members/${editingMember.documentId}`,
                    payload,
                    { headers: getAuthHeaders() }
                );
                message.success("Member updated successfully");

                if (existingImageId && (newImageId !== null || isImageRemoved)) {
                    await deleteImageFile(existingImageId);
                }
            } else {
                await axios.post(`${API_BASE}/members`, payload, {
                    headers: getAuthHeaders(),
                });
                message.success("Member added successfully");
            }

            handleModalClose();
            fetchMembers();
        } catch (err) {
            console.error(err);
            message.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------------------------------------------------
    // DELETE MEMBER
    // ---------------------------------------------------------------------
    const deleteMember = (record: any) => {
        Modal.confirm({
            title: "Delete member?",
            okType: "danger",
            onOk: async () => {
                try {
                    await axios.delete(`${API_BASE}/members/${record.documentId}`, {
                        headers: getAuthHeaders(),
                    });

                    if (record.image?.id) {
                        await deleteImageFile(record.image.id);
                    }

                    fetchMembers();
                    message.success("Member deleted successfully");
                } catch {
                    message.error("Failed to delete");
                }
            },
        });
    };

    // ---------------------------------------------------------------------
    // TABLE COLUMNS
    // ---------------------------------------------------------------------
    const columns = [
        { title: "Title", dataIndex: "tittle" },
        { title: "Slug", dataIndex: "slug" },
        {
            title: "Designation",
            dataIndex: "designation",
            render: (text: string) => text || "N/A",
        },
        {
            title: "LinkedIn",
            dataIndex: "linkdin",
            render: (link: string) =>
                link ? (
                    <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        Profile
                    </a>
                ) : (
                    "N/A"
                ),
        },
        {
            title: "Department",
            render: (record: any) => record?.department?.title || "N/A",
        },
        {
            title: "Image",
            render: (record: any) =>
                record.image?.url ? (
                    <img
                        src={`${STRAPI_URL}${record.image.url}`}
                        alt="Member"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                ) : (
                    "No Image"
                ),
        },
        {
            title: "Actions",
            render: (record: any) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => openModal(record)} />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => deleteMember(record)}
                    />
                </Space>
            ),
        },
    ];

    // ---------------------------------------------------------------------
    // FILTER
    // ---------------------------------------------------------------------
    const filteredMembers =
        selectedDepartmentFilter === "all"
            ? members
            : members.filter(
                (m: any) => m.department?.documentId === selectedDepartmentFilter
            );

    // ---------------------------------------------------------------------
    // RENDER UI
    // ---------------------------------------------------------------------
    return (
        <div
            className={`p-4 sm:p-6 lg:p-8 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50"
                }`}
        >
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold">Members Management</h1>
                    <p
                        className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"
                            } mt-1`}
                    >
                        Manage team members, their departments & profile images.
                    </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <Select
                        value={selectedDepartmentFilter}
                        onChange={setSelectedDepartmentFilter}
                        className="min-w-[200px]"
                    >
                        <Select.Option value="all">All Departments</Select.Option>
                        {departments.map((d: any) => (
                            <Select.Option key={d.documentId} value={d.documentId}>
                                {d.title}
                            </Select.Option>
                        ))}
                    </Select>

                    <Space>
                        <span className="text-sm">Dark Mode</span>
                        <Switch checked={darkMode} onChange={setDarkMode} />
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>
                            Add Member
                        </Button>
                    </Space>
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Table
                    columns={columns}
                    dataSource={filteredMembers}
                    rowKey="documentId"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                />
            </div>

            {/* MODAL */}
            <Modal
                title={editingMember ? "Update Member" : "Add Member"}
                open={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item name="tittle" label="Title" rules={[{ required: true }]}>
                        <Input placeholder="Enter member name" />
                    </Form.Item>

                    <Form.Item name="slug" label="Slug">
                        <Input placeholder="Slug (optional)" />
                    </Form.Item>

                    <Form.Item name="designation" label="Designation">
                        <Input placeholder="Enter designation" />
                    </Form.Item>

                    <Form.Item name="department" label="Department">
                        <Select placeholder="Select department" allowClear>
                            {departments.map((d: any) => (
                                <Select.Option key={d.documentId} value={d.documentId}>
                                    {d.title}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="linkdin" label="LinkedIn URL">
                        <Input placeholder="https://linkedin.com/in/..." />
                    </Form.Item>

                    <Form.Item label="Image">
                        <Upload
                            accept="image/*"
                            showUploadList={false}
                            beforeUpload={(file) => {
                                setImageFile(file as File);
                                setIsImageRemoved(false);
                                setImagePreview(URL.createObjectURL(file));
                                return false;
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                        </Upload>

                        {imagePreview && (
                            <div className="mt-3 flex items-center gap-3">
                                <img
                                    src={imagePreview}
                                    className="w-20 h-20 rounded-md object-cover border"
                                />
                                <Button
                                    danger
                                    size="small"
                                    onClick={() => {
                                        setImagePreview(null);
                                        setImageFile(null);
                                        setIsImageRemoved(true);
                                    }}
                                >
                                    Remove Image
                                </Button>
                            </div>
                        )}
                    </Form.Item>

                    <Form.Item name="order" label="Order">
                        <Input type="number" placeholder="1, 2, 3..." />
                    </Form.Item>

                    <Form.Item name="About" label="About">
                        <Input.TextArea rows={3} placeholder="Short bio / description" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" loading={loading} block>
                        {editingMember ? "Update Member" : "Add Member"}
                    </Button>
                </Form>
            </Modal>
        </div>
    );
}
