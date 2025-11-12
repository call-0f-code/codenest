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
  
  // --- CHANGED ---
  // No more `editData`. We now have `formData` which holds the *entire*
  // state of the form being edited.
  const [formData, setFormData] = useState(null); 
  // --- END CHANGED ---

  const [profileImageFile, setProfileImageFile] = useState(null);

  useEffect(() => {
    if (members && JSON.stringify(members) !== JSON.stringify(userData)) {
      setUserData(members);
    }
  }, [members]);

  const handleEdit = () => {
    // --- CHANGED ---
    // When editing starts, copy userData into formData.
    // This is now the single source of truth for all form inputs.
    setFormData(userData);
    // --- END CHANGED ---
    setProfileImageFile(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    // --- CHANGED ---
    // Clear the formData when canceling.
    setFormData(null);
    // --- END CHANGED ---
    setProfileImageFile(null);
    setIsEditing(false);
  };

  const handleImageChange = (file, previewUrl) => {
    setProfileImageFile(file);
    // --- CHANGED ---
    // Update formData directly.
    setFormData((prev) => ({ ...prev, profilePhoto: previewUrl }));
    // --- END CHANGED ---
  };

  const handleSave = async () => {
    try {
      // --- CHANGED ---
      // 1. Build the "diff" object (the old `editData`) *at save time*.
      // This is much more reliable than building it on every keystroke.
      const changedData = {};
      for (const key in formData) {
        // We only add data that is different from the original userData
        // We also explicitly exclude the 'profilePhoto' key, since that's a
        // client-side preview URL. The `profileImageFile` is what matters.
        if (formData[key] !== userData[key] && key !== 'profilePhoto') {
          changedData[key] = formData[key];
        }
      }
      // --- END CHANGED ---

      // 2. Check if anything actually changed
      if (Object.keys(changedData).length === 0 && !profileImageFile) {
        globalToast.warning("No changes to save");
        setIsEditing(false);
        return;
      }

      // 3. Build the payload
      const payload = new FormData();
      if (profileImageFile) payload.append("file", profileImageFile);

      // Format date *if it was changed*
      if (changedData.birth_date) {
        changedData.birth_date = new Date(changedData.birth_date).toISOString();
      }
      
      // Passout year is already handled in PersonalInfo.jsx, but good to ensure
      if (changedData.passoutYear) {
         changedData.passoutYear = new Date(changedData.passoutYear).toISOString();
      }

      // The weird 'bio' logic is no longer needed, as our diff logic is correct.
      payload.append("memberData", JSON.stringify(changedData));

      // 4. Mutate
      update.mutate(payload, {
        onSuccess: (data) => {
          // --- CHANGED ---
          // The new source of truth is a merge of the existing form data
          // (for optimism) and the server response (for new URLs, etc.)
          const newUserData = { ...userData, ...formData, ...(data || {}) };
          setUserData(newUserData);
          
          setFormData(null); // Clear the form state
          // --- END CHANGED ---
          setProfileImageFile(null);
          setIsEditing(false);
        },
      });
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  // --- CHANGED ---
  // This is the biggest simplification. The handler just updates
  // the `formData` state. No complex logic, no deleting keys.
  // This is the standard, correct pattern for controlled components.
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  // --- END CHANGED ---


  if (isLoading || !userData) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F5E6D3] dark:bg-[#2C1810]">
        <div className="text-[#2C1810] dark:text-[#F5E6D3] text-2xl font-bold">
          Loading profile...
        </div>
      </main>
    );
  }

  // --- CHANGED ---
  // The data to display is simply `formData` if editing, or `userData` if not.
  // No more complex merging `{...userData, ...editData}`.
  const displayData = isEditing ? formData : userData;
  // --- END CHANGED ---


  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "dark bg-[#2C1810]" : "bg-[#F5E6D3]"
      }`}
    >
      {/* ... (rest of your header is unchanged) ... */}
      <header className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="bg-[#C1502E] border-4 border-black px-6 py-3 font-black text-[#F5E6D3] text-xl shadow-[6px_6px_0_0_#000] rotate-1">
          CALL OF CODE
        </div>
        <div className="flex items-center gap-4">
          <button className="border-4 border-black bg-[#C1502E] text-[#F5E6D3] px-6 py-3 font-black shadow-[6px_6px_0_0_#000] hover:-rotate-1 transition-transform">
            HOME
          </button>
        </div>
      </header>


      {/* Poster Wall Layout */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid gap-16">
        {/* Poster Card - ProfileHeader */}
        <div className="relative group hover:-rotate-1 transition-transform duration-300">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 bg-[#2C1810] dark:bg-[#F5E6D3] border-4 border-black"
          />
          <div className="relative bg-[#F5E6D3] dark:bg-[#2C1810] border-4 border-black p-6 shadow-[8px_8px_0_0_#C1502E]">
            <ProfileHeader
              user={displayData}
              isEditing={isEditing}
              onEdit={handleEdit}
              onCancel={handleCancel}
              onSave={handleSave}
              onImageChange={handleImageChange}
              // --- CHANGED ---
              // Use optional chaining just in case formData is null
              previewImg={formData?.profilePhoto} 
              // --- END CHANGED ---
            />
          </div>
        </div>

        {/* ... (rest of your component is unchanged) ... */}
        {/* Poster Card - PersonalInfo */}
        <div className="relative group hover:rotate-1 transition-transform duration-300">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 bg-[#C1502E] border-4 border-black"
          />
          <div className="relative bg-[#F5E6D3] dark:bg-[#2C1810] border-4 border-black p-8 shadow-[8px_8px_0_0_#000]">
            <PersonalInfo
              user={displayData}
              isEditing={isEditing}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Poster Card - SocialLinks */}
        <div className="relative group hover:-rotate-1 transition-transform duration-300">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 bg-[#2C1810] dark:bg-[#F5E6D3] border-4 border-black"
          />
          <div className="relative bg-[#F5E6D3] dark:bg-[#2C1810] border-4 border-black p-8 shadow-[8px_8px_0_0_#C1502E]">
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
          <div className="border-4 border-black bg-[#F5E6D3] dark:bg-[#C1502E] px-8 py-6 shadow-[8px_8px_0_0_#000] text-xl font-bold text-[#2C1810] dark:text-[#F5E6D3]">
            Updating profile...
          </div>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;