import { User, Camera, Edit2, Save, X } from 'lucide-react'
import { useRef } from 'react'

export const ProfileHeader = ({ user, isEditing, onEdit, onCancel, onSave, onImageChange,previewImg }) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(file, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] p-6 md:p-8">
      <div className="pointer-events-none absolute right-0 top-0 h-0 w-0 border-b-[80px] border-l-[80px] border-b-[#3dd68c]/20 border-l-transparent" />
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative">
          <div className="h-32 w-32 border-4 border-[#3dd68c] bg-[#2a2d35] dark:bg-[#1a1f2e] flex items-center justify-center overflow-hidden">
            {user.profilePhoto ? (
              <img src= {previewImg?`${previewImg}`:`${user.profilePhoto}?t=${new Date(user.updatedAt)}`} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <User className="h-16 w-16 text-[#3dd68c]" />
            )}
          </div>
          {isEditing && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={handleImageClick}
                className="absolute -bottom-2 -right-2 h-10 w-10 border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-[#3dd68c] flex items-center justify-center hover:bg-[#35c17d] transition-colors"
              >
                <Camera className="h-5 w-5 text-[#1a1f2e]" />
              </button>
            </>
          )}
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="font-orbitron text-3xl font-bold text-[#1a1f2e] dark:text-white mb-2">
            {user.name}
          </h1>
          <p className="text-[#5f6b72] dark:text-[#8b96a5] mb-4">{user.email}</p>
          
          {user.isManager && (
            <div className="inline-block border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-[#3dd68c] px-4 py-1 font-orbitron text-xs font-bold text-[#1a1f2e]">
              MANAGER
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {!isEditing ? (
            <button
              onClick={onEdit}
              className="border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-[#3dd68c] px-6 py-2 font-orbitron text-sm font-bold text-[#1a1f2e] hover:bg-[#35c17d] transition-colors flex items-center gap-2"
            >
              <Edit2 className="h-4 w-4" />
              EDIT
            </button>
          ) : (
            <>
              <button
                onClick={onSave}
                className="border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-[#3dd68c] px-6 py-2 font-orbitron text-sm font-bold text-[#1a1f2e] hover:bg-[#35c17d] transition-colors flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                SAVE
              </button>
              <button
                onClick={onCancel}
                className="border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] px-6 py-2 font-orbitron text-sm text-[#2a2d35] dark:text-[#c5d1de] hover:bg-[#f5f5f5] dark:hover:bg-[#2d3848] transition-colors flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                CANCEL
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};