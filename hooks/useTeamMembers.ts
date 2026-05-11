import useSWR, { mutate } from 'swr';
import { api, API_URL, getAuthHeaders } from '@/lib/api';
import { Member } from '@/types';

const fetcher = async (url: string) => {
  const res = await api.get(`${url}?populate=image&sort=order:asc&pagination[pageSize]=100`, getAuthHeaders());
  return res.data.data
    .map((m: any, idx: number): Member => {
      const attr = m.attributes || m;
      return {
        id: m.documentId || m.id?.toString() || `member-${idx}`,
        name: attr.tittle || attr.name || '',
        designation: attr.designation || '',
        bio: attr.About || attr.bio || '',
        linkedin: attr.linkdin || attr.linkedin || '',
        photo: attr.image?.data?.attributes?.url || attr.image?.url || '',
        order: attr.order ?? idx,
        createdAt: attr.createdAt,
        updatedAt: attr.updatedAt,
      };
    })
    .sort((a: Member, b: Member) => a.order - b.order);
};

export const useTeamMembers = () => {
  const { data: members = [], error, isLoading, isValidating } = useSWR<Member[]>(API_URL, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 10000,
  });

  // Optimistic Helper
  const updateLocal = (newMembers: Member[]) => {
    mutate(API_URL, newMembers, false);
  };

  const saveMember = async ({ member, file, isEdit }: { member: Partial<Member>; file?: File; isEdit: boolean }) => {
    let imageId: number | null = null;
    if (file) {
      const formData = new FormData();
      formData.append('files', file);
      const uploadRes = await api.post('/strapi/api/upload', formData, getAuthHeaders());
      imageId = uploadRes.data[0]?.id;
    }

    const payload = {
      data: {
        tittle: member.name,
        designation: member.designation,
        About: member.bio,
        linkdin: member.linkedin,
        order: member.order,
        ...(imageId ? { image: imageId } : {}),
      },
    };

    if (isEdit && member.id) {
      await api.put(`${API_URL}/${member.id}`, payload, getAuthHeaders());
    } else {
      await api.post(API_URL, payload, getAuthHeaders());
    }
    mutate(API_URL);
  };

  const deleteMember = async (id: string) => {
    const updated = members.filter(m => m.id !== id);
    updateLocal(updated);
    try {
      await api.delete(`${API_URL}/${id}`, getAuthHeaders());
      mutate(API_URL);
    } catch (err) {
      mutate(API_URL); // Rollback
      throw err;
    }
  };

  const reorderMembers = async (newOrder: Member[]) => {
    updateLocal(newOrder);
    
    // Non-blocking background sync
    try {
      // Phase 1: Temporary offset to avoid unique constraints
      await Promise.all(newOrder.map((m, i) => 
        api.put(`${API_URL}/${m.id}`, { data: { order: i + 10000 } }, getAuthHeaders())
      ));
      // Phase 2: Final order
      await Promise.all(newOrder.map((m, i) => 
        api.put(`${API_URL}/${m.id}`, { data: { order: i + 1 } }, getAuthHeaders())
      ));
      mutate(API_URL);
    } catch (err) {
      console.error("Reorder failed:", err);
      mutate(API_URL); // Rollback
    }
  };

  return {
    members,
    isLoading: isLoading && members.length === 0,
    isSyncing: isValidating,
    saveMember,
    deleteMember,
    reorderMembers,
    refresh: () => mutate(API_URL),
  };
};
