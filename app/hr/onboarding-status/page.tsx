"use client";

import React, {
  useEffect,
  useState,
  useCallback,
} from "react";

import axios from "axios";

import {
  Loader2,
  Search,
  FileText,
  User2,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";

import {
  Card,
  Tag,
  Select,
  message,
} from "antd";

const API_URL =
  "/strapi/api/job-applications";

interface Application {
  id: number;

  fullName: string;

  email: string;

  phone: string;

  coverLetter: string;

  aiMatchScore: number;

  aiSummary: string;

  statu: string;

  resume?: {
    url: string;
  };

  job_opening?: {
    title: string;
    department: string;
  };
}

export default function ApplicationsPage() {
  const [applications, setApplications] =
    useState<Application[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const getHeaders = useCallback(() => {
    const token =
      localStorage.getItem("hr_token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }, []);

  const fetchApplications =
    useCallback(async () => {
      try {
        setLoading(true);

        const response =
          await axios.get(
            `${API_URL}?populate=*`,
            getHeaders()
          );

        const raw =
          response.data.data || [];

        const normalized = raw.map(
          (item: any) => {
            const data =
              item.attributes ||
              item;

            return {
              id: item.id,

              fullName:
                data.fullName,

              email: data.email,

              phone: data.phone,

              coverLetter:
                data.coverLetter,

              aiMatchScore:
                data.aiMatchScore || 0,

              aiSummary:
                data.aiSummary || "",

              statu:
                data.statu ||
                "Applied",

              resume:
                data.resume?.data
                  ?.attributes
                  ? {
                      url:
                        data.resume
                          .data
                          .attributes
                          .url,
                    }
                  : undefined,

              job_opening:
                data.job_opening
                  ?.data
                  ?.attributes
                  ? {
                      title:
                        data
                          .job_opening
                          .data
                          .attributes
                          .title,

                      department:
                        data
                          .job_opening
                          .data
                          .attributes
                          .department,
                    }
                  : undefined,
            };
          }
        );

        setApplications(normalized);
      } catch (err) {
        console.error(err);

        message.error(
          "Failed to load applications"
        );
      } finally {
        setLoading(false);
      }
    }, [getHeaders]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const filtered =
    applications.filter((app) =>
      app.fullName
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const updateStatus = async (
    id: number,
    value: string
  ) => {
    try {
      await axios.put(
        `${API_URL}/${id}`,
        {
          data: {
            statu: value,
          },
        },
        getHeaders()
      );

      message.success(
        "Status updated"
      );

      fetchApplications();
    } catch (err) {
      console.error(err);

      message.error(
        "Failed to update status"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-black">
            Applications
          </h1>

          <p className="mt-2 text-slate-500">
            HR Candidate Dashboard
          </p>
        </div>

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search candidate..."
            className="rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none"
          />

        </div>

      </div>

      {loading ? (
        <div className="flex h-[400px] items-center justify-center">

          <Loader2
            size={40}
            className="animate-spin"
          />

        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">

          {filtered.map((app) => (

            <Card
              key={app.id}
              className="rounded-[2rem]"
            >

              <div className="flex items-start justify-between">

                <div>

                  <h2 className="text-2xl font-black">
                    {app.fullName}
                  </h2>

                  <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">

                    <div className="flex items-center gap-2">
                      <Mail size={15} />
                      {app.email}
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone size={15} />
                      {app.phone}
                    </div>

                    <div className="flex items-center gap-2">
                      <Briefcase size={15} />
                      {app.job_opening
                        ?.title ||
                        "Unknown Role"}
                    </div>

                  </div>

                </div>

                <div className="text-right">

                  <p className="text-sm text-slate-500">
                    Match Score
                  </p>

                  <div className="mt-2 text-4xl font-black text-[#07518a]">
                    {app.aiMatchScore}%
                  </div>

                </div>

              </div>

              <div className="mt-6">

                <Tag
                  color={
                    app.aiMatchScore >= 80
                      ? "green"
                      : app.aiMatchScore >= 60
                      ? "gold"
                      : "red"
                  }
                >
                  {app.aiMatchScore >= 80
                    ? "Strong Match"
                    : app.aiMatchScore >= 60
                    ? "Moderate Match"
                    : "Weak Match"}
                </Tag>

              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-5">

                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  AI Summary
                </p>

                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {app.aiSummary ||
                    "No AI summary generated yet."}
                </p>

              </div>

              <div className="mt-6">

                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                  Cover Letter
                </p>

                <p className="text-sm leading-7 text-slate-700">
                  {app.coverLetter}
                </p>

              </div>

              <div className="mt-8 flex items-center justify-between">

                <div className="flex gap-3">

                  {app.resume?.url && (
                    <a
                      href={app.resume.url}
                      target="_blank"
                      className="flex items-center gap-2 rounded-xl bg-[#07518a] px-4 py-2 text-sm font-semibold text-white"
                    >
                      <FileText size={16} />
                      Resume
                    </a>
                  )}

                </div>

                <Select
                  value={app.statu}
                  style={{
                    width: 160,
                  }}
                  onChange={(value) =>
                    updateStatus(
                      app.id,
                      value
                    )
                  }
                  options={[
                    {
                      label:
                        "Applied",
                      value:
                        "Applied",
                    },
                    {
                      label:
                        "Shortlisted",
                      value:
                        "Shortlisted",
                    },
                    {
                      label:
                        "Interview",
                      value:
                        "Interview",
                    },
                    {
                      label:
                        "Rejected",
                      value:
                        "Rejected",
                    },
                    {
                      label:
                        "Selected",
                      value:
                        "Selected",
                    },
                  ]}
                />

              </div>

            </Card>

          ))}

        </div>
      )}
    </div>
  );
}