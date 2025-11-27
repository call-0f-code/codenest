import { Calendar, Mail, Phone, User } from "lucide-react";

export const PersonalInfo = ({ user, isEditing, onChange }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="relative bg-[#F5E6D3] dark:bg-[#2C1810] border-4 border-black dark:border-[#F5E6D3] shadow-[8px_8px_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_rgba(245,230,211,0.3)] p-8">
      {/* Brutalist Tag */}
      <div className="absolute -top-4 left-4 bg-[#C1502E] text-[#F5E6D3] text-xs font-black px-3 py-1 border-4 border-black dark:border-[#F5E6D3] rotate-[-2deg] shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(245,230,211,0.3)]">
        PERSONAL INFORMATION
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Name */}
        <div>
          <label className="text-xs font-black tracking-widest text-[#2C1810] dark:text-[#F5E6D3] flex items-center gap-2">
            <User className="h-4 w-4 text-[#C1502E]" /> NAME
          </label>
          {isEditing ? (
            <input
              type="text"
              value={user.name}
              onChange={(e) => onChange("name", e.target.value)}
              className="h-10 w-full border-4 border-black dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] px-3 font-semibold placeholder:text-[#C1502E]/60 shadow-[4px_4px_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_rgba(245,230,211,0.3)] focus:outline-none focus:ring-4 focus:ring-[#C1502E]"
            />
          ) : (
            <p className="text-[#2C1810]/80 dark:text-[#F5E6D3]/80 font-medium">
              {user.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-black tracking-widest text-[#2C1810] dark:text-[#F5E6D3] flex items-center gap-2">
            <Mail className="h-4 w-4 text-[#C1502E]" /> EMAIL
          </label>
          <p className="text-[#2C1810]/80 dark:text-[#F5E6D3]/80 flex items-center gap-2 font-medium">
            {user.email}
          </p>
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs font-black tracking-widest text-[#2C1810] dark:text-[#F5E6D3] flex items-center gap-2">
            <Phone className="h-4 w-4 text-[#C1502E]" /> PHONE
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={user.phone || ""}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="Enter phone number"
              className="h-10 w-full border-4 border-black dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] px-3 font-semibold placeholder:text-[#C1502E]/60 shadow-[4px_4px_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_rgba(245,230,211,0.3)] focus:outline-none focus:ring-4 focus:ring-[#C1502E]"
            />
          ) : (
            <p className="text-[#2C1810]/80 dark:text-[#F5E6D3]/80 flex items-center gap-2 font-medium">
              {user.phone || "Not set"}
            </p>
          )}
        </div>

        {/* Birth Date */}
        <div>
          <label className="text-xs font-black tracking-widest text-[#2C1810] dark:text-[#F5E6D3] flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#C1502E]" /> BIRTH DATE
          </label>
          {isEditing ? (
            <input
              type="date"
              value={user.birth_date || ""}
              onChange={(e) => onChange("birth_date", e.target.value)}
              className="h-10 w-full border-4 border-black dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] px-3 font-semibold shadow-[4px_4px_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_rgba(245,230,211,0.3)] focus:outline-none focus:ring-4 focus:ring-[#C1502E]"
            />
          ) : (
            <p className="text-[#2C1810]/80 dark:text-[#F5E6D3]/80 flex items-center gap-2 font-medium">
              <Calendar className="h-4 w-4" />
              {formatDate(user.birth_date)}
            </p>
          )}
        </div>

        {/* Passout Year */}
        <div className="md:col-span-2">
          <label className="text-xs font-black tracking-widest text-[#2C1810] dark:text-[#F5E6D3]">
            PASSOUT YEAR
          </label>
          {isEditing ? (
            <input
              type="number"
              value={new Date(user.passoutYear).getFullYear()}
              onChange={(e) => {
                const year = parseInt(e.target.value);
                const currentYear = new Date().getFullYear();
                if (year >= currentYear - 4 && year <= currentYear + 4) {
                  onChange("passoutYear", new Date(year, 0, 2));
                }
              }}
              min={new Date().getFullYear() - 4}
              max={new Date().getFullYear() + 4}
              className="h-10 w-full border-4 border-black dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] px-3 font-semibold placeholder:text-[#C1502E]/60 shadow-[4px_4px_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_rgba(245,230,211,0.3)] focus:outline-none focus:ring-4 focus:ring-[#C1502E]"
            />
          ) : (
            <p className="text-[#2C1810]/80 dark:text-[#F5E6D3]/80 font-medium">
              {new Date(user.passoutYear).getFullYear()}
            </p>
          )}
        </div>

        {/* Bio */}
        <div className="md:col-span-2">
          <label className="text-xs font-black tracking-widest text-[#2C1810] dark:text-[#F5E6D3]">
            BIO
          </label>
          {isEditing ? (
            <textarea
              value={user.bio || ""}
              onChange={(e) => onChange("bio", e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
              className="w-full border-4 border-black dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#2C1810] p-3 text-[#2C1810] dark:text-[#F5E6D3] font-semibold placeholder:text-[#C1502E]/60 shadow-[4px_4px_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_rgba(245,230,211,0.3)] focus:outline-none focus:ring-4 focus:ring-[#C1502E]"
            />
          ) : (
            <p className="text-[#2C1810]/80 dark:text-[#F5E6D3]/80 font-medium">
              {user.bio || "No bio added yet"}
            </p>
          )}
        </div>
      </div>
      
    </div>
  );
};