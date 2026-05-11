import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Button, message } from 'antd';
import { X, Save, Loader2, ImageIcon, Linkedin } from 'lucide-react';
import { Member } from '@/types';
import { getPhotoUrl } from '@/lib/api';

interface Props {
  open: boolean;
  onClose: () => void;
  editingMember: Member | null;
  onSave: (values: any, file?: File) => Promise<void>;
  syncing: boolean;
}

const TeamModal: React.FC<Props> = ({ open, onClose, editingMember, onSave, syncing }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  React.useEffect(() => {
    if (open && editingMember) {
      form.setFieldsValue({
        name: editingMember.name,
        designation: editingMember.designation,
        bio: editingMember.bio,
        linkedin: editingMember.linkedin,
      });
      setFileList(editingMember.photo ? [{
        uid: '-1', name: 'photo.jpg', status: 'done', url: getPhotoUrl(editingMember.photo)
      }] : []);
    } else if (!open) {
      form.resetFields();
      setFileList([]);
    }
  }, [open, editingMember, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const file = fileList[0]?.originFileObj;
      await onSave(values, file);
    } catch (err) {
      // Form validation error
    }
  };

  return (
    <Modal 
      open={open} 
      onCancel={onClose} 
      footer={null} 
      width={640} 
      centered 
      closeIcon={null} 
      forceRender
      styles={{ body: { padding: 0 } }}
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">{editingMember ? 'Edit Member' : 'Add New Member'}</h2>
            <p className="text-slate-400 text-sm mt-0.5">{editingMember ? 'Update registry information' : 'Fill in details to add to team'}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/80 hover:text-white"><X size={20} /></button>
        </div>

        <Form form={form} layout="vertical" className="p-6 md:p-8 space-y-5" autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Form.Item label={<label className="text-xs font-semibold text-slate-600 uppercase">Full Name *</label>} name="name" rules={[{ required: true }]}>
              <Input placeholder="e.g., Sarah Johnson" className="!h-11 !rounded-xl" size="large" />
            </Form.Item>
            <Form.Item label={<label className="text-xs font-semibold text-slate-600 uppercase">Role / Title</label>} name="designation">
              <Input placeholder="e.g., Senior Product Designer" className="!h-11 !rounded-xl" size="large" />
            </Form.Item>
          </div>
          <Form.Item label={<label className="text-xs font-semibold text-slate-600 uppercase">LinkedIn</label>} name="linkedin" rules={[{ type: 'url' }]}>
            <Input prefix={<Linkedin size={15} className="text-blue-500 mr-2" />} placeholder="https://linkedin.com/in/username" className="!h-11 !rounded-xl" size="large" />
          </Form.Item>
          <Form.Item label={<label className="text-xs font-semibold text-slate-600 uppercase">Professional Bio</label>} name="bio">
            <Input.TextArea rows={4} placeholder="Brief professional background..." className="!rounded-xl resize-none" showCount maxLength={500} />
          </Form.Item>
          <Form.Item label={<label className="text-xs font-semibold text-slate-600 uppercase">Profile Photo</label>} extra={<span className="text-[11px] text-slate-400">JPG/PNG under 5MB</span>}>
            <Upload 
              listType="picture-card" 
              fileList={fileList} 
              onChange={({ fileList: newFileList }) => setFileList(newFileList)} 
              beforeUpload={(file) => {
                const isValid = file.type === 'image/jpeg' || file.type === 'image/png';
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isValid) message.error('Only JPG/PNG files allowed!');
                if (!isLt5M) message.error('Image must be under 5MB!');
                return false; // Prevent auto upload
              }} 
              maxCount={1} 
              accept="image/png, image/jpeg"
            >
              {fileList.length === 0 && (
                <div className="flex flex-col items-center gap-1.5 py-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <ImageIcon size={20} className="text-slate-400" />
                  </div>
                  <span className="text-xs font-medium text-slate-600">Upload Photo</span>
                </div>
              )}
            </Upload>
          </Form.Item>
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-slate-100 mt-6">
            <Button onClick={onClose} className="flex-1 !h-12 !rounded-xl !font-semibold !text-sm" size="large" disabled={syncing}>Cancel</Button>
            <Button 
              type="primary" 
              onClick={handleSubmit} 
              loading={syncing} 
              className="flex-1 !h-12 !rounded-xl !font-semibold !text-sm !bg-slate-900 !border-none hover:!bg-slate-800 transition-all shadow-sm" 
              size="large" 
              icon={syncing ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            >
              {editingMember ? 'Update Member' : 'Add to Registry'}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default TeamModal;
