"use client";

import React, { useEffect, useState } from "react";
import {
    Loader2,
    User,
    Mail,
    Phone,
    MessageSquare,
    Calendar,
    AlertTriangle,
} from "lucide-react";

const API = "http://172.30.0.200:1334/api";

// ✅ FIXED: Type-safe Auth Headers
const getAuthHeaders = (): HeadersInit => {
    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // Never return Authorization: undefined (Vercel will fail)
    if (!token) return {};

    return {
        Authorization: `Bearer ${token}`,
    };
};

// Format date function
const formatDate = (dateString: string) => {
    try {
        return new Date(dateString).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    } catch {
        return "Invalid Date";
    }
};

export default function ContactsPage() {
    const [contacts, setContacts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch contacts
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await fetch(`${API}/contacts?populate=*`, {
                    // ✅ FIXED: Spread headers to avoid undefined type errors
                    headers: {
                        ...getAuthHeaders(),
                    },
                });

                if (!res.ok) throw new Error(`Failed: ${res.status}`);
                const data = await res.json();
                setContacts(data?.data || []);
            } catch (err: any) {
                setError(err.message || "Failed to fetch contacts");
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, []);

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-slate-100 to-white dark:from-slate-900 dark:to-slate-800">
            <h1 className="text-2xl font-bold mb-6 dark:text-white">
                Contact Responses
            </h1>

            {/* Error State */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center gap-2 dark:bg-red-900 dark:text-red-300 dark:border-red-700">
                    <AlertTriangle size={18} /> {error}
                </div>
            )}

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center h-[50vh]">
                    <Loader2 size={60} className="animate-spin text-blue-500" />
                </div>
            ) : contacts.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">
                    No contact responses found.
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {contacts.map((contact, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-blue-500 dark:hover:border-sky-400"
                        >
                            {/* Header */}
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-600 text-white rounded-full flex items-center justify-center font-semibold text-xl">
                                    {contact.Name?.[0]?.toUpperCase() || "?"}
                                </div>
                                <div className="ml-3">
                                    <p className="text-lg font-bold dark:text-white">
                                        {contact.Name}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {formatDate(contact.createdAt)}
                                    </p>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-2 text-gray-600 dark:text-gray-200">
                                <p className="flex items-center gap-2">
                                    <User size={18} /> <span>{contact.Name || "N/A"}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <Mail size={18} /> <span>{contact.email || "N/A"}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <Phone size={18} />{" "}
                                    <span>{contact.mobilenumber || "N/A"}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <MessageSquare size={18} />{" "}
                                    <span>{contact.message || "No message provided"}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <Calendar size={18} />{" "}
                                    <span>{formatDate(contact.createdAt)}</span>
                                </p>
                            </div>

                            {/* Action */}
                            <div className="mt-4 text-right"></div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
