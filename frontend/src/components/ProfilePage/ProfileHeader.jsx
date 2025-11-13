import { User, Camera, Edit2, Save, X } from "lucide-react";
import { useRef } from "react";

export const ProfileHeader = ({
  user,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onImageChange,
  previewImg,
}) => {
  const fileInputRef = useRef(null);

  const handleImageClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    if (isEditing && fileInputRef.current) fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      const reader = new FileReader();
      reader.onloadend = () => onImageChange(file, reader.result);
      reader.readAsDataURL(file);
    }
  };

  const userName = user?.name || "Guest User";
  const userEmail = user?.email || "No email provided";

  return (
    <section className="relative bg-[#F5E6D3] dark:bg-[#2C1810] border-4 border-black dark:border-[#F5E6D3] p-7 shadow-[8px_8px_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_rgba(245,230,211,0.3)] flex flex-col md:flex-row items-center justify-between gap-8 rounded-none overflow-hidden hover:rotate-[0.5deg] hover:scale-[1.01] transition-transform duration-300 ease-in-out">
      {/* --- Left: Info --- */}
      <div className="flex-1 text-center md:text-left space-y-2 z-20">
        <h1 className="text-[2.5rem] md:text-[4rem] font-black uppercase text-[#2C1810] dark:text-[#F5E6D3] tracking-tight leading-none">
          {userName}
        </h1>
        <p className="text-base md:text-lg font-semibold text-[#C1502E] dark:text-[#F5E6D3]/70">
          {userEmail}
        </p>

        {user?.isManager && (
          <span className="inline-block mt-2 bg-[#C1502E] text-[#F5E6D3] border-4 border-black dark:border-[#F5E6D3] font-black px-3 py-0.5 shadow-[4px_4px_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_rgba(245,230,211,0.3)] text-sm rotate-[-1deg]">
            MANAGER
          </span>
        )}

        {/* Poster label */}
        <div className="absolute -top-1 left-4 bg-[#2C1810] text-[#F5E6D3] text-xs font-black px-3 py-0.5 border-4 border-black dark:border-[#F5E6D3] rotate-[-3deg] shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(245,230,211,0.3)]">
          PROFILE
        </div>
      </div>

      {/* --- Right: Profile Image --- */}
      <div
        className={`relative w-44 h-44 md:w-56 md:h-56 border-4 border-black dark:border-[#F5E6D3] bg-[#C1502E] dark:bg-[#F5E6D3]/10 overflow-hidden shadow-[6px_6px_0_rgba(0,0,0,1)] dark:shadow-[6px_6px_0_rgba(245,230,211,0.3)] group z-20 ${
          isEditing ? "cursor-pointer hover:scale-105" : ""
        } transition-all duration-300`}
        onClick={isEditing ? handleImageClick : undefined}
      >
        {user.profilePhoto ? (
            <img src= {previewImg?`${previewImg}`:`${user.profilePhoto}?t=${new Date(user.updatedAt)}`}
            alt={userName}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-[#F5E6D3] dark:text-[#C1502E]">
            <User className="h-14 w-14" />
          </div>
        )}

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
              onClick={handleImageClick}
              type="button"
              className="absolute bottom-3 right-3 bg-[#F5E6D3] dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] border-4 border-black dark:border-[#F5E6D3] p-2 font-black shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(245,230,211,0.3)] hover:bg-[#C1502E] hover:text-[#F5E6D3] transition-all"
            >
              <Camera className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* --- Buttons --- */}
      <div className="absolute top-4 right-4 flex flex-wrap gap-3 z-30">
        {!isEditing ? (
          <button
            onClick={onEdit}
            className="bg-[#C1502E] text-[#F5E6D3] text-sm md:text-base font-black px-5 py-2 border-4 border-black dark:border-[#F5E6D3] shadow-[4px_4px_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_rgba(245,230,211,0.3)] hover:-translate-y-[2px] transition-all flex items-center gap-1"
          >
            <Edit2 className="h-4 w-4" /> EDIT
          </button>
        ) : (
          <>
            <button
              onClick={onSave}
              className="bg-[#C1502E] text-[#F5E6D3] text-sm md:text-base font-black px-5 py-2 border-4 border-black dark:border-[#F5E6D3] shadow-[4px_4px_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_rgba(245,230,211,0.3)] hover:-translate-y-[2px] transition-all flex items-center gap-1"
            >
              <Save className="h-4 w-4" /> SAVE
            </button>
            <button
              onClick={onCancel}
              className="bg-[#F5E6D3] dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] text-sm md:text-base font-black px-5 py-2 border-4 border-black dark:border-[#F5E6D3] shadow-[4px_4px_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_rgba(245,230,211,0.3)] hover:-translate-y-[2px] transition-all flex items-center gap-1"
            >
              <X className="h-4 w-4" /> CANCEL
            </button>
          </>
        )}
      </div>

      {/* --- Brutalist Accents --- */}
      <div className="absolute top-10 -right-4 w-16 h-16 bg-[#C1502E] border-4 border-black dark:border-[#F5E6D3] rotate-[10deg] opacity-30 shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(245,230,211,0.2)] z-0" />
      <div className="absolute bottom-8 -left-4 w-14 h-10 bg-[#2C1810] dark:bg-[#F5E6D3] border-4 border-black dark:border-[#F5E6D3] rotate-[-8deg] opacity-30 shadow-[2px_2px_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_rgba(245,230,211,0.2)] z-0" />
    </section>
  );
};