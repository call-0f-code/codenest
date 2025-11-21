import { PersonalInfo } from "@/components/ProfilePage/PersonalInfo";
import { ProfileHeader } from "@/components/ProfilePage/ProfileHeader";
import { SocialLinks } from "@/components/ProfilePage/SocialLink";
import MyInterviewExperiences from "@/components/ProfilePage/MyInterviewExperiences";
import { useTheme } from "@/context/ThemeContext";
import { useMembers } from "@/hooks/useMember";
import { globalToast } from "@/utils/toast";
import { useEffect, useState } from "react";
import { User, Share2, FileText } from "lucide-react";

const ProfilePage = () => {
  const { theme } = useTheme();
  const { members, update, isLoading } = useMembers();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  
  // Tab State
  const [activeTab, setActiveTab] = useState("personal");

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
        if (formData[key] !== userData[key] && key !== "profilePhoto") {
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
        <div className="text-[#2C1810] dark:text-[#F5E6D3] text-2xl font-black border-4 border-black dark:border-[#F5E6D3] p-6 shadow-[8px_8px_0_0_#000]">
          LOADING PROFILE...
        </div>
      </main>
    );
  }

  const displayData = isEditing ? formData : userData;

  // Tab Configuration
  const tabs = [
    { id: "personal", label: "PERSONAL INFO", icon: User },
    { id: "social", label: "SOCIAL LINKS", icon: Share2 },
    { id: "experiences", label: "MY EXPERIENCES", icon: FileText },
  ];

  return (
    <main
      className={`min-h-screen transition-colors duration-300 pb-20 ${
        theme === "dark" ? "dark bg-[#2C1810]" : "bg-[#F5E6D3]"
      }`}
    >
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* 1. Header Section */}
        <div className="mb-12 relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 bg-[#C1502E] border-4 border-black"
          />
          <div className="relative">
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

        {/* 2. Tab Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative group flex items-center justify-center gap-3 px-6 py-4 
                  font-black text-lg uppercase border-4 border-black dark:border-[#F5E6D3]
                  transition-all duration-200 outline-none
                  ${isActive 
                    ? "bg-[#C1502E] text-[#F5E6D3] translate-x-[4px] translate-y-[4px] shadow-none" 
                    : "bg-[#F5E6D3] dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#F5E6D3] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0_0_#000] dark:hover:shadow-[6px_6px_0_0_#F5E6D3]"
                  }
                `}
              >
                <Icon className={`w-6 h-6 ${isActive ? "text-[#F5E6D3]" : "text-[#C1502E]"}`} />
                {tab.label}
                
                {/* Active Indicator Dot */}
                {isActive && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-[#F5E6D3] border-2 border-black rounded-none" />
                )}
              </button>
            );
          })}
        </div>

        {/* 3. Tab Content Area */}
        <div className="relative min-h-[400px]">
          {/* Decor elements behind the content */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#C1502E]/20 border-4 border-black dark:border-[#F5E6D3] -rotate-6 z-0"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#2C1810]/10 dark:bg-[#F5E6D3]/10 border-4 border-black dark:border-[#F5E6D3] rotate-3 z-0"></div>

          {/* Main Content Container */}
          <div className="relative z-10">
            {activeTab === "personal" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <PersonalInfo
                  user={displayData}
                  isEditing={isEditing}
                  onChange={handleChange}
                />
              </div>
            )}

            {activeTab === "social" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <SocialLinks
                  user={displayData}
                  isEditing={isEditing}
                  onChange={handleChange}
                />
              </div>
            )}

            {activeTab === "experiences" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Removing wrapper card from component since we are in a tab container context now, 
                    but MyInterviewExperiences has its own structure, so we wrap it to match style */}
                <div className="bg-[#F5E6D3] dark:bg-[#2C1810] border-4 border-black dark:border-[#F5E6D3] p-8 shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_rgba(245,230,211,0.3)]">
                  <MyInterviewExperiences userId={userData?.id} />
                </div>
              </div>
            )}
          </div>
        </div>

      </section>

      {/* Background Brutalist Accents (Fixed position) */}
      <div className="fixed bottom-10 left-10 w-12 h-12 bg-[#C1502E] border-4 border-black dark:border-[#F5E6D3] rotate-45 opacity-30 pointer-events-none z-0" />
      <div className="fixed top-1/2 right-4 w-8 h-24 bg-[#2C1810] dark:bg-[#F5E6D3] border-4 border-black dark:border-[#F5E6D3] -rotate-12 opacity-20 pointer-events-none z-0" />

      {/* Loading Overlay */}
      {update.isPending && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="border-4 border-black dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#C1502E] px-10 py-8 shadow-[12px_12px_0_0_#000] dark:shadow-[12px_12px_0_0_rgba(245,230,211,0.3)]">
            <div className="text-2xl font-black text-[#2C1810] dark:text-[#F5E6D3] flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-t-[#C1502E] border-black dark:border-[#F5E6D3] rounded-full animate-spin" />
              UPDATING PROFILE...
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;