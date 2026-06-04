"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Loader2,
  Briefcase,
} from "lucide-react";

import {
  Button,
  Form,
  Input,
  Modal,
  message,
  Upload,
} from "antd";

import type { UploadFile } from "antd/es/upload/interface";

interface JobOpening {
  id: number;
  title: string;
  department: string;
  location: string;
  experience: string;
  description: string;
  contactNumber: string;
  isActive: boolean;
  createdAt: string;
  postedBy?: string;
  posted_by?: string;
}

interface ApplicationFormValues {
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
}

function normalizeJob(job: any): JobOpening {
  const data = job.attributes
    ? { id: job.id, ...job.attributes }
    : job;

  return {
    id: data.id,
    title: data.title || "Untitled Role",
    department: data.department || "Unknown",
    location: data.location || "Remote",
    experience: data.experience || "Not Specified",
    description:
      data.description || "No description available.",
    contactNumber:
      data.contactNumber ||
      data.contact_number ||
      "Not Available",
    isActive:
      data.isActive ??
      data.is_active ??
      true,
    createdAt:
      data.createdAt ||
      data.created_at ||
      new Date().toISOString(),
    postedBy:
      data.postedBy ||
      data.posted_by ||
      undefined,
    posted_by:
      data.posted_by ||
      data.postedBy ||
      undefined,
  };
}

function isHRPosted(job: JobOpening) {
  const postedBy = (
    job.postedBy ||
    job.posted_by ||
    ""
  )
    .toString()
    .trim()
    .toLowerCase();

  return (
    postedBy === "hr" ||
    postedBy === "human resources" ||
    postedBy === "human-resource"
  );
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [applyModalOpen, setApplyModalOpen] =
    useState(false);

  const [selectedJob, setSelectedJob] =
    useState<JobOpening | null>(null);

  const [submitting, setSubmitting] =
    useState(false);

  const [resumeFileList, setResumeFileList] =
    useState<UploadFile[]>([]);

  const [resumeFile, setResumeFile] =
    useState<File | null>(null);

  const [form] =
    Form.useForm<ApplicationFormValues>();

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "/strapi/api/job-openings?sort=createdAt:desc&pagination[pageSize]=100&filters[isActive][$eq]=true"
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load vacancies (${response.status})`
          );
        }

        const json = await response.json();

        const rawJobs = json.data || [];

        const normalizedJobs =
          rawJobs.map(normalizeJob);

        setJobs(normalizedJobs);
      } catch (err: any) {
        setError(
          err?.message ||
            "Failed to load vacancies."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const hasPostedByField = useMemo(() => {
    return jobs.some(
      (job) =>
        Boolean(job.postedBy || job.posted_by)
    );
  }, [jobs]);

  const hrJobs = useMemo(() => {
    if (!hasPostedByField) return jobs;

    return jobs.filter(isHRPosted);
  }, [jobs, hasPostedByField]);

  const filteredJobs = useMemo(() => {
    return hrJobs.filter((job) => {
      const query =
        searchQuery.toLowerCase();

      return (
        job.title
          .toLowerCase()
          .includes(query) ||
        job.department
          .toLowerCase()
          .includes(query) ||
        job.location
          .toLowerCase()
          .includes(query) ||
        job.description
          .toLowerCase()
          .includes(query)
      );
    });
  }, [hrJobs, searchQuery]);

  const openApplyModal = (
    job: JobOpening
  ) => {
    setSelectedJob(job);

    form.resetFields();

    setResumeFile(null);

    setResumeFileList([]);

    setApplyModalOpen(true);
  };

  const handleResumeChange = ({
    fileList,
  }: {
    fileList: UploadFile[];
  }) => {
    const latestFile =
      fileList.slice(-1);

    setResumeFileList(latestFile);

    const file =
      latestFile?.[0]
        ?.originFileObj;

    if (file instanceof File) {
      setResumeFile(file);
    } else {
      setResumeFile(null);
    }
  };

  const handleApplicationSubmit =
    async (
      values: ApplicationFormValues
    ) => {
      if (!selectedJob) return;

      if (!resumeFile) {
        message.error(
          "Please upload your resume."
        );
        return;
      }

      setSubmitting(true);

      try {
        const uploadForm =
          new FormData();

        uploadForm.append(
          "files",
          resumeFile
        );

        const uploadResponse =
          await fetch(
            "/strapi/api/upload",
            {
              method: "POST",
              body: uploadForm,
            }
          );

        if (!uploadResponse.ok) {
          throw new Error(
            "Resume upload failed"
          );
        }

        const uploadJson =
          await uploadResponse.json();

        const resumeId =
          uploadJson?.[0]?.id;

        const response =
          await fetch(
            "/strapi/api/job-applications",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                data: {
                  fullName:
                    values.fullName,
                  email: values.email,
                  phone: values.phone,
                  coverLetter:
                    values.coverLetter,
                  statu: "Applied",
                  job_opening:
                    selectedJob.id,
                  ...(resumeId
                    ? {
                        resume:
                          resumeId,
                      }
                    : {}),
                },
              }),
            }
          );

        if (!response.ok) {
          const errorData =
            await response
              .json()
              .catch(() => null);

          throw new Error(
            errorData?.error
              ?.message ||
              "Application failed"
          );
        }

        message.success(
          "Application submitted successfully"
        );

        setApplyModalOpen(false);

        setSelectedJob(null);

        setResumeFile(null);

        setResumeFileList([]);

        form.resetFields();
      } catch (err: any) {
        console.error(err);

        message.error(
          err?.message ||
            "Failed to submit application"
        );
      } finally {
        setSubmitting(false);
      }
    };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* HEADER */}

        <div className="mb-10 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                Careers
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-tight">
                Open Vacancies
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Browse active HR job postings.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">

              <div className="flex items-center gap-3">

                <Briefcase size={20} />

                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    Vacancies
                  </p>

                  <p className="text-lg font-semibold">
                    {filteredJobs.length}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* SEARCH */}

          <div className="mt-8 relative max-w-xl">

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              placeholder="Search roles..."
              className="w-full rounded-3xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-sm outline-none"
            />

          </div>

        </div>

        {/* CONTENT */}

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">

            <Loader2
              className="animate-spin"
              size={36}
            />

          </div>
        ) : error ? (
          <div className="rounded-3xl bg-red-50 p-8 text-red-700">
            {error}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center">
            No vacancies found.
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">

            {filteredJobs.map((job) => (
              <article
                key={job.id}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
              >

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                      {job.department}
                    </p>

                    <h2 className="mt-3 text-2xl font-black">
                      {job.title}
                    </h2>
                  </div>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold uppercase text-emerald-800">
                    Active
                  </span>

                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">

                  <div className="flex items-center gap-2 rounded-3xl bg-slate-50 px-4 py-3 text-sm">

                    <MapPin
                      size={16}
                      className="text-slate-400"
                    />

                    {job.location}

                  </div>

                  <div className="flex items-center gap-2 rounded-3xl bg-slate-50 px-4 py-3 text-sm">

                    <Calendar
                      size={16}
                      className="text-slate-400"
                    />

                    {job.experience}

                  </div>

                </div>

                <p className="mt-6 text-sm leading-6 text-slate-600">
                  {job.description}
                </p>

                <button
                  onClick={() =>
                    openApplyModal(job)
                  }
                  className="mt-8 rounded-full bg-[#07518a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0a5dc8]"
                >
                  Apply Now
                </button>

              </article>
            ))}

          </div>
        )}

      </div>

      {/* APPLY MODAL */}

      <Modal
        title={
          selectedJob
            ? `Apply for ${selectedJob.title}`
            : "Apply"
        }
        open={applyModalOpen}
        onCancel={() =>
          setApplyModalOpen(false)
        }
        footer={null}
        destroyOnClose
      >

        <Form
          form={form}
          layout="vertical"
          onFinish={
            handleApplicationSubmit
          }
        >

          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message:
                  "Please enter your full name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message:
                  "Please enter your email",
              },
              {
                type: "email",
                message:
                  "Enter valid email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message:
                  "Please enter phone number",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Cover Letter"
            name="coverLetter"
            rules={[
              {
                required: true,
                message:
                  "Please enter cover letter",
              },
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>

          <Form.Item
            label="Resume"
            required
          >
            <Upload
              beforeUpload={() => false}
              fileList={resumeFileList}
              onChange={
                handleResumeChange
              }
              accept=".pdf,.doc,.docx"
              maxCount={1}
            >
              <Button>
                Upload Resume
              </Button>
            </Upload>
          </Form.Item>

          <div className="flex justify-end gap-3">

            <Button
              onClick={() =>
                setApplyModalOpen(false)
              }
            >
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
            >
              Submit Application
            </Button>

          </div>

        </Form>

      </Modal>
    </div>
  );
}