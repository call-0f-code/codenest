import { PersonalInfo } from "@/components/ProfilePage/PersonalInfo";
import { ProfileHeader } from "@/components/ProfilePage/ProfileHeader";
import { SocialLinks } from "@/components/ProfilePage/SocialLink";
import { useTheme } from "@/context/ThemeContext";
import { useMembers } from "@/hooks/useMember";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { theme, toggleTheme } = useTheme();
  const { members, update,isLoading } = useMembers();
  
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState({});
  const [profileImageFile, setProfileImageFile] = useState(null);

  // Initialize userData when members data loads
  useEffect(() => {
    if (members) {
      setUserData(members);
    }
  }, [isLoading]);


  const handleEdit = () => {
    setEditData({});
    setProfileImageFile(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditData({});
    setProfileImageFile(null);
    setIsEditing(false);
  };

  const handleImageChange = (file, previewUrl) => {
    setProfileImageFile(file);
    
    setEditData(prev => ({ ...prev, profilePhoto: previewUrl }));
  };

  const handleSave = async () => {
    try {
      // Check if there are any changes
      if (Object.keys(editData).length === 0 && !profileImageFile) {
        alert("No changes to save");
        setIsEditing(false);
        return;
      }

      const formData = new FormData();
      if (profileImageFile) {
        formData.append("file", profileImageFile);
      }
      
      if(editData.birth_date){
        editData.birth_date = new Date(editData.birth_date).toISOString()
      }
      
      if(!editData.bio){
        editData.bio = members.bio
      }
      formData.append("memberData", JSON.stringify(editData));
    
      
      update.mutate(formData, {
        onSuccess: (data) => {
          
          setUserData(prev => ({ ...prev, ...editData, ...(data || {}) }));
          setEditData({});
          setProfileImageFile(null);
          setIsEditing(false);
        }
      });
    } catch (error) {
      console.error("Failed to save profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

const handleChange = (field, value) => {
  if (value === "" || value === null || value === undefined) {
    setEditData(prev => {
      const newData = { ...prev };
      delete newData[field];
      return newData;
    });
    return;
  }

  if (userData[field] !== value) {
    setEditData(prev => ({ ...prev, [field]: value }));
  } else {
    setEditData(prev => {
      const newData = { ...prev };
      delete newData[field];
      return newData;
    });
  }
};

  
  if (isLoading) {
    return (
      <main className={`min-h-screen bg-[#e8eaed] dark:bg-[#1a1f2e] flex items-center justify-center ${theme === "dark" ? "dark" : ""}`}>
        <div className="text-[#2a2d35] dark:text-[#c5d1de]">Loading profile...</div>
      </main>
    );
  }

 
  const displayData = isEditing ? { ...userData, ...editData } : userData;

  return (
    <main className={`min-h-screen bg-[#e8eaed] dark:bg-[#1a1f2e] transition-colors duration-300 ${theme === "dark" ? "dark" : ""}`}>
      <header className="mx-auto max-w-7xl px-4 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-[#3dd68c] px-4 py-2 font-orbitron text-sm font-bold text-[#1a1f2e]">
              CALL OF CODE
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] p-2 text-[#2a2d35] dark:text-[#c5d1de] hover:bg-[#f5f5f5] dark:hover:bg-[#2d3848] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button className="border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] px-6 py-2 font-orbitron text-sm text-[#2a2d35] dark:text-[#c5d1de] hover:bg-[#f5f5f5] dark:hover:bg-[#2d3848] transition-colors">
              Home
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="space-y-6">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 bg-[#2a2d35] dark:bg-[#0f1419]"
            />
            <ProfileHeader
              user={displayData}
              isEditing={isEditing}
              onEdit={handleEdit}
              onCancel={handleCancel}
              onSave={handleSave}
              onImageChange={handleImageChange}
              previewImg={editData.profilePhoto}
            />
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 bg-[#2a2d35] dark:bg-[#0f1419]"
            />
            <PersonalInfo
              user={displayData}
              isEditing={isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 bg-[#2a2d35] dark:bg-[#0f1419]"
            />
            <SocialLinks
              user={displayData}
              isEditing={isEditing}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Loading overlay when mutation is in progress */}
      {update.isPending && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] p-6">
            <p className="font-orbitron text-[#1a1f2e] dark:text-white">Updating profile...</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;