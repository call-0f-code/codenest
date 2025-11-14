import { PersonalInfo } from "@/components/ProfilePage/PersonalInfo";
import { ProfileHeader } from "@/components/ProfilePage/ProfileHeader";
import { SocialLinks } from "@/components/ProfilePage/SocialLink";
import { useTheme } from "@/context/ThemeContext";
import { useMembers } from "@/hooks/useMember";
import { globalToast } from "@/utils/toast";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { theme } = useTheme();
  const { members, update, isLoading } = useMembers();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState(null); 
  const [profileImageFile, setProfileImageFile] = useState(null);

  useEffect(() => {
    if (members && JSON.stringify(members) !== JSON.stringify(userData)) {
      setUserData(members);
    }
  }, [members]);

  const handleEdit = () => {
    setFormData(userData);
    setProfileImageFile(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(null);
    setProfileImageFile(null);
    setIsEditing(false);
  };

  const handleImageChange = (file, previewUrl) => {
    setProfileImageFile(file);
    setFormData((prev) => ({ ...prev, profilePhoto: previewUrl }));
  };

  const handleSave = async () => {
    try {
      const changedData = {};
      for (const key in formData) {
        if (formData[key] !== userData[key] && key !== 'profilePhoto') {
          changedData[key] = formData[key];
        }
      }

      if (Object.keys(changedData).length === 0 && !profileImageFile) {
        globalToast.warning("No changes to save");
        setIsEditing(false);
        return;
      }

      const payload = new FormData();
      if (profileImageFile) payload.append("file", profileImageFile);

      if (changedData.birth_date) {
        changedData.birth_date = new Date(changedData.birth_date).toISOString();
      }
      
      if (changedData.passoutYear) {
         changedData.passoutYear = new Date(changedData.passoutYear).toISOString();
      }

      payload.append("memberData", JSON.stringify(changedData));

      update.mutate(payload, {
        onSuccess: (data) => {
          const newUserData = { ...userData, ...formData, ...(data || {}) };
          setUserData(newUserData);
          setFormData(null);
          setProfileImageFile(null);
          setIsEditing(false);
        },
      });
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoading || !userData) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F5E6D3] dark:bg-[#2C1810]">
        <div className="text-[#2C1810] dark:text-[#F5E6D3] text-2xl font-bold">
          Loading profile...
        </div>
      </main>
    );
  }

  const displayData = isEditing ? formData : userData;

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "dark bg-[#2C1810]" : "bg-[#F5E6D3]"
      }`}
    >
      <header className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="bg-[#C1502E] border-4 border-black dark:border-[#F5E6D3] px-6 py-3 font-black text-[#F5E6D3] text-xl shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_rgba(245,230,211,0.3)] rotate-1">
          CALL OF CODE
        </div>
        <div className="flex items-center gap-4">
          <button className="border-4 border-black dark:border-[#F5E6D3] bg-[#C1502E] text-[#F5E6D3] px-6 py-3 font-black shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_rgba(245,230,211,0.3)] hover:-rotate-1 transition-transform">
            HOME
          </button>
        </div>
      </header>

      {/* Poster Wall Layout */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid gap-16">
        {/* Poster Card - ProfileHeader */}
        <div className={`relative group transition-transform duration-300 ${!isEditing ? 'hover:rotate-1' : ''}`}>
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 bg-[#2C1810] dark:bg-[#F5E6D3] border-4 border-black"
          />
          <div className="relative bg-[#F5E6D3] dark:bg-[#2C1810] border-4 border-black dark:border-[#F5E6D3] p-6 shadow-[8px_8px_0_0_#C1502E]">
            <ProfileHeader
              user={displayData}
              isEditing={isEditing}
              onEdit={handleEdit}
              onCancel={handleCancel}
              onSave={handleSave}
              onImageChange={handleImageChange}
              previewImg={formData?.profilePhoto} 
            />
          </div>
        </div>

        {/* Poster Card - PersonalInfo */}
        <div className={`relative group transition-transform duration-300 ${!isEditing ? 'hover:rotate-1' : ''}`}>
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 bg-[#C1502E] border-4 border-black"
          />
          <div className="relative bg-[#F5E6D3] dark:bg-[#2C1810] border-4 border-black dark:border-[#F5E6D3] p-8 shadow-[8px_8px_0_0_#000]">
            <PersonalInfo
              user={displayData}
              isEditing={isEditing}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Poster Card - SocialLinks */}
        <div className={`relative group transition-transform duration-300 ${!isEditing ? 'hover:rotate-1' : ''}`}>
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 bg-[#2C1810] dark:bg-[#F5E6D3] border-4 border-black"
          />
          <div className="relative bg-[#F5E6D3] dark:bg-[#2C1810] border-4 border-black dark:border-[#F5E6D3] p-8 shadow-[8px_8px_0_0_#C1502E]">
            <SocialLinks
              user={displayData}
              isEditing={isEditing}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>

      {/* Loading Overlay */}
      {update.isPending && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="border-4 border-black dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#C1502E] px-8 py-6 shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_rgba(245,230,211,0.3)] text-xl font-bold text-[#2C1810] dark:text-[#F5E6D3]">
            Updating profile...
          </div>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;