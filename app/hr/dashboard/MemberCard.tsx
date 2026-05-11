import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit3, Trash2, Linkedin } from 'lucide-react';
import { Tooltip } from 'antd';
import { Member } from '@/types';
import { getPhotoUrl } from '@/lib/api';

interface Props {
  member: Member;
  dragMode: boolean;
  onEdit: () => void;
  onDelete: () => void;
  isOverlay?: boolean;
}

const MemberCard: React.FC<Props> = ({ member, dragMode, onEdit, onDelete, isOverlay }) => {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition, 
    isDragging 
  } = useSortable({ 
    id: member.id, 
    disabled: !dragMode 
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 100 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 relative group ${isOverlay ? 'shadow-2xl ring-2 ring-indigo-500 z-[1000] scale-105 rotate-1 cursor-grabbing' : ''}`}
    >
      {/* Photo Layer */}
      <div className="relative h-full w-full">
        <img
          src={getPhotoUrl(member.photo)}
          alt={member.name}
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-team.png";
          }}
        />

        {/* Order Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg z-10 pointer-events-none">
          <span className="text-[10px] font-bold text-white">#{member.order + 1}</span>
        </div>

        {/* FUNCTIONAL DRAG HANDLE */}
        {dragMode && (
          <div
            {...attributes}
            {...listeners}
            className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md cursor-grab active:cursor-grabbing z-[50] hover:bg-slate-900 transition-colors border border-white/10"
          >
            <GripVertical size={18} className="text-white" />
          </div>
        )}
      </div>

      {/* Info Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none">
        <h3 className="text-white font-bold text-sm leading-tight line-clamp-1">{member.name}</h3>
        <p className="text-indigo-200 text-[10px] font-bold mt-1 uppercase tracking-wider line-clamp-1">{member.designation}</p>
      </div>

      {/* Action Buttons - Hover State */}
      {!isDragging && !isOverlay && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[1px] z-30">
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-2xl shadow-2xl border border-slate-100">
            <Tooltip title="Edit">
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(); }}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600 hover:text-indigo-600"
              >
                <Edit3 size={16} />
              </button>
            </Tooltip>
            <Tooltip title="Remove">
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(); }}
                className="p-2 hover:bg-red-50 rounded-xl transition-colors text-slate-600 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </Tooltip>
            {member.linkedin && (
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={(e) => e.stopPropagation()}
                className="p-2 hover:bg-blue-50 rounded-xl transition-colors text-blue-600"
              >
                <Linkedin size={16} />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberCard;
