"use client";

/* ========================================================================
   📦 1. IMPORT LIBRARIES
   ======================================================================== */
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
    Divider,
} from "antd";
import {
    UploadOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";

/* ========================================================================
   🔧 2. CONSTANTS
   ======================================================================== */
const BASE_URL = "http://172.30.0.200:1334";
const API = `${BASE_URL}/api`;
const MEDIA_API = `${API}/upload`;

const { TextArea } = Input;
const { Option } = Select;

/* ========================================================================
   🔏 3. AUTH HELPER
   ======================================================================== */
const getHeaders = () => {
    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

/* ========================================================================
   🖼 4. FILE NORMALIZER
   Convert Strapi media to AntD Upload format
   ======================================================================== */
const normalizeMedia = (media: any): UploadFile[] => {
    if (!media) return [];
    const list = Array.isArray(media) ? media : [media];

    return list
        .filter((m: any) => m?.url)
        .map((m: any) => ({
            uid: m.documentId || String(m.id),
            name: m.name,
            status: "done" as const,
            url: m.url.startsWith("http") ? m.url : `${BASE_URL}${m.url}`,
            thumbUrl: m.url.startsWith("http") ? m.url : `${BASE_URL}${m.url}`,
        }));
};

/* ========================================================================
   📁 5. GET FILE LIST FROM EVENT
   ======================================================================== */
const getValueFromEvent = (e: any): UploadFile[] => {
    if (Array.isArray(e)) return e;
    return e?.fileList || [];
};

/* ========================================================================
   📤 6. MEDIA UPLOAD HANDLER
   ======================================================================== */
const handleMediaUpload = async (fileList: any[]): Promise<number[]> => {
    const uploadedIds: number[] = [];

    for (const file of fileList || []) {
        const actualFile = file.originFileObj || file.file?.originFileObj;

        if (actualFile) {
            const formData = new FormData();
            formData.append("files", actualFile);

            const res = await axios.post(MEDIA_API, formData, {
                headers: {
                    ...getHeaders(),
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data?.[0]?.id) {
                uploadedIds.push(res.data[0].id);
            }
        } else if (file.uid && !String(file.uid).startsWith("rc-upload")) {
            const maybeId = Number(file.uid);
            if (!Number.isNaN(maybeId)) uploadedIds.push(maybeId);
        }
    }

    return uploadedIds;
};

/* ========================================================================
   🧠 7. MAIN COMPONENT
   ======================================================================== */
export default function ItemsPage() {
    const [form] = Form.useForm();
    const [items, setItems] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    /* ========================================================================
       📡 8. FETCH ITEMS
       ======================================================================== */
    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `${API}/items?populate[0]=image&populate[1]=category&populate[2]=seo.ogImage&populate[3]=feature.icon`,
                { headers: getHeaders() }
            );
            setItems(res.data?.data || []);
        } catch (error) {
            console.error("❌ FETCH ITEMS ERROR", error);
            message.error("Failed to fetch items.");
        } finally {
            setLoading(false);
        }
    };

    /* ========================================================================
       📡 9. FETCH CATEGORIES
       ======================================================================== */
    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${API}/categories`, {
                headers: getHeaders(),
            });
            setCategories(res.data?.data || []);
        } catch (error) {
            console.error("❌ FETCH CATEGORIES ERROR", error);
            message.error("Failed to fetch categories.");
        }
    };

    /* ========================================================================
       🪝 10. USE EFFECT
       ======================================================================== */
    useEffect(() => {
        fetchItems();
        fetchCategories();
    }, []);

    /* ========================================================================
       📝 11. OPEN MODAL
       ======================================================================== */
    const openModal = (item: any = null) => {
        setEditingItem(item);

        if (item) {
            form.setFieldsValue({
                title: item.title,
                slug: item.slug,
                description: item.description,
                category: item.category?.documentId || null,
                image: normalizeMedia(item.image),
                feature:
                    item.feature?.map((f: any) => ({
                        label: f.label,
                        icon: f.icon ? normalizeMedia(f.icon) : [],
                    })) || [],
                seo: {
                    metaTitle: item.seo?.metaTitle,
                    metaDescription: item.seo?.metaDescription,
                    canonicalUrl: item.seo?.canonicalUrl,
                    metaRobots: item.seo?.metaRobots,
                    ogTitle: item.seo?.ogTitle,
                    ogDescription: item.seo?.ogDescription,
                    ogImage: item.seo?.ogImage ? normalizeMedia(item.seo.ogImage) : [],
                },
            });
        } else {
            form.resetFields();
        }

        setModalVisible(true);
    };

    /* ========================================================================
       💾 12. SUBMIT HANDLER (CREATE / UPDATE)
       ======================================================================== */
    const handleSubmit = async (values: any) => {
        try {
            // 1️⃣ Upload media
            const imageIds = values.image
                ? await handleMediaUpload(values.image)
                : [];

            const ogImageIds =
                values.seo?.ogImage && values.seo.ogImage.length
                    ? await handleMediaUpload(values.seo.ogImage)
                    : [];

            const cleanedFeatures =
                values.feature && values.feature.length
                    ? await Promise.all(
                        values.feature.map(async (f: any) => {
                            if (!f.icon || !f.icon.length) {
                                return { label: f.label };
                            }
                            const iconIds = await handleMediaUpload(f.icon);
                            return {
                                label: f.label,
                                icon: iconIds[0],
                            };
                        })
                    )
                    : [];

            // 2️⃣ Clean SEO
            const cleanedSEO: any = {
                metaTitle: values.seo?.metaTitle,
                metaDescription: values.seo?.metaDescription,
                canonicalUrl: values.seo?.canonicalUrl || null,
                metaRobots: values.seo?.metaRobots,
            };

            if (!cleanedSEO.metaTitle || !cleanedSEO.metaDescription) {
                message.error("SEO Meta Title and Meta Description are required.");
                return;
            }

            if (values.seo?.ogTitle) cleanedSEO.ogTitle = values.seo.ogTitle;
            if (values.seo?.ogDescription)
                cleanedSEO.ogDescription = values.seo.ogDescription;
            if (ogImageIds.length) cleanedSEO.ogImage = ogImageIds;

            // 3️⃣ Build payload
            const baseData: any = {
                title: values.title,
                slug:
                    values.slug ||
                    values.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-"),
                description: values.description || "",
                image: imageIds,
                feature: cleanedFeatures,
                seo: cleanedSEO,
            };

            if (values.category) {
                baseData.category = {
                    connect: [{ documentId: values.category }],
                };
            }

            const payload = { data: baseData };

            console.log(
                "🚀 FINAL PAYLOAD",
                JSON.stringify(payload, null, 2),
                "EDITING:",
                !!editingItem
            );

            // 4️⃣ API CALL
            if (editingItem) {
                await axios.put(
                    `${API}/items/${editingItem.documentId}`,
                    payload,
                    { headers: getHeaders() }
                );
                message.success("Item updated successfully.");
            } else {
                await axios.post(`${API}/items`, payload, {
                    headers: getHeaders(),
                });
                message.success("Item created successfully.");
            }

            setModalVisible(false);
            fetchItems();
        } catch (error: any) {
            console.error("❌ API ERROR", error?.response?.data || error);
            message.error(
                error?.response?.data?.error?.message || "Failed to save item."
            );
        }
    };

    /* ========================================================================
       ❌ 13. DELETE HANDLER
       ======================================================================== */
    const handleDelete = (documentId: string) => {
        Modal.confirm({
            title: "Are you sure you want to delete this item?",
            okType: "danger",
            onOk: async () => {
                try {
                    await axios.delete(`${API}/items/${documentId}`, {
                        headers: getHeaders(),
                    });
                    message.success("Item deleted successfully.");
                    fetchItems();
                } catch (error) {
                    console.error("❌ DELETE ERROR", error);
                    message.error("Failed to delete item.");
                }
            },
        });
    };

    /* ========================================================================
       🖥 14. RENDER UI
       ======================================================================== */
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold text-gray-800">
                    Items Management – Brihaspathi CMS
                </h1>
                <div>
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={fetchItems}
                        className="mr-2"
                    >
                        Refresh
                    </Button>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => openModal(null)}
                    >
                        Add New Item
                    </Button>
                </div>
            </div>

            {/* TABLE */}
            <Table
                rowKey="documentId"
                dataSource={items}
                loading={loading}
                bordered
                pagination={{ pageSize: 10 }}
                columns={[
                    {
                        title: "Image",
                        render: (row: any) =>
                            row.image?.[0]?.url ? (
                                <img
                                    src={
                                        row.image[0].url.startsWith("http")
                                            ? row.image[0].url
                                            : `${BASE_URL}${row.image[0].url}`
                                    }
                                    alt="preview"
                                    width={60}
                                    className="rounded"
                                />
                            ) : (
                                "No Image"
                            ),
                    },
                    { title: "Title", dataIndex: "title" },
                    { title: "Slug", dataIndex: "slug" },
                    {
                        title: "Category",
                        render: (row: any) => row?.category?.title || "—",
                    },
                    {
                        title: "Actions",
                        width: 180,
                        render: (row: any) => (
                            <Space>
                                <Button
                                    icon={<EditOutlined />}
                                    onClick={() => openModal(row)}
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
            />

            {/* MODAL */}
            <Modal
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={900}
                destroyOnHidden
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    {/* BASIC DETAILS */}
                    <Form.Item
                        name="title"
                        label="Item Title"
                        rules={[{ required: true, message: "Title is required" }]}
                    >
                        <Input
                            placeholder="Enter item name"
                            onChange={(e) =>
                                form.setFieldValue(
                                    "slug",
                                    e.target.value
                                        .toLowerCase()
                                        .trim()
                                        .replace(/[^a-z0-9]+/g, "-")
                                )
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        name="slug"
                        label="Slug (Auto-generated if empty)"
                        rules={[{ required: true, message: "Slug is required" }]}
                    >
                        <Input placeholder="item-name-example" />
                    </Form.Item>

                    <Form.Item name="description" label="Description">
                        <TextArea rows={3} placeholder="Enter description" />
                    </Form.Item>

                    {/* CATEGORY */}
                    <Form.Item name="category" label="Category">
                        <Select placeholder="Select category" allowClear>
                            {categories.map((c: any) => (
                                <Option key={c.documentId} value={c.documentId}>
                                    {c.title}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* IMAGE */}
                    <Form.Item
                        name="image"
                        label="Feature Image"
                        valuePropName="fileList"
                        getValueFromEvent={getValueFromEvent}
                    >
                        <Upload listType="picture-card" beforeUpload={() => false}>
                            <UploadOutlined /> Upload
                        </Upload>
                    </Form.Item>

                    {/* FEATURES */}
                    <Divider>Features</Divider>
                    <Form.List name="feature">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name }) => (
                                    <Space
                                        key={key}
                                        align="start"
                                        style={{ display: "flex", marginBottom: 8 }}
                                    >
                                        <Form.Item
                                            name={[name, "label"]}
                                            rules={[{ required: true, message: "Label is required" }]}
                                        >
                                            <Input placeholder="Feature label" />
                                        </Form.Item>

                                        <Form.Item
                                            name={[name, "icon"]}
                                            valuePropName="fileList"
                                            getValueFromEvent={getValueFromEvent}
                                        >
                                            <Upload
                                                listType="picture-card"
                                                beforeUpload={() => false}
                                            >
                                                <UploadOutlined /> Upload
                                            </Upload>
                                        </Form.Item>

                                        <Button danger onClick={() => remove(name)}>
                                            Remove
                                        </Button>
                                    </Space>
                                ))}

                                <Button
                                    type="dashed"
                                    icon={<PlusOutlined />}
                                    onClick={() => add()}
                                >
                                    Add Feature
                                </Button>
                            </>
                        )}
                    </Form.List>

                    {/* SEO SETTINGS */}
                    <Divider>SEO Settings</Divider>
                    <Form.Item
                        name={["seo", "metaTitle"]}
                        label="Meta Title"
                        rules={[{ required: true, message: "Meta title is required" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name={["seo", "metaDescription"]}
                        label="Meta Description"
                        rules={[{ required: true, message: "Meta description is required" }]}
                    >
                        <TextArea rows={2} />
                    </Form.Item>

                    <Form.Item name={["seo", "canonicalUrl"]} label="Canonical URL">
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name={["seo", "metaRobots"]}
                        label="Meta Robots Directive"
                        rules={[{ required: true, message: "Robots directive is required" }]}
                    >
                        <Select>
                            <Option value="index, follow">index, follow</Option>
                            <Option value="noindex, follow">noindex, follow</Option>
                            <Option value="noindex, nofollow">noindex, nofollow</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name={["seo", "ogTitle"]} label="Open Graph Title">
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name={["seo", "ogDescription"]}
                        label="Open Graph Description"
                    >
                        <TextArea rows={2} />
                    </Form.Item>

                    <Form.Item
                        name={["seo", "ogImage"]}
                        label="Open Graph Preview Image"
                        valuePropName="fileList"
                        getValueFromEvent={getValueFromEvent}
                    >
                        <Upload listType="picture-card" beforeUpload={() => false}>
                            <UploadOutlined /> Upload
                        </Upload>
                    </Form.Item>

                    {/* SUBMIT */}
                    <Button type="primary" htmlType="submit" block>
                        {editingItem ? "Update Item" : "Create Item"}
                    </Button>
                </Form>
            </Modal>
        </div>
    );
}
