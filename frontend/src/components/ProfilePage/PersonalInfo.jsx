import { Calendar, Mail, Phone, User } from "lucide-react";

export const PersonalInfo = ({ user, isEditing, onChange }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="relative border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#273142] p-6">
      <h2 className=" text-xl font-bold text-[#1a1f2e] dark:text-white mb-6 flex items-center gap-2">
        <User className="h-5 w-5 text-[#3dd68c]" />
        PERSONAL INFORMATION
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className=" text-xs font-bold tracking-wider text-black dark:text-white block mb-2">
              NAME
            </label>
            {isEditing ? (
              <input
                type="text"
                value={user.name}
                onChange={(e) => onChange("name", e.target.value)}
                className="h-10 w-full border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#1f2937] px-3  text-sm text-[#1a1f2e] dark:text-[#c5d1de] focus:outline-none focus:ring-2 focus:ring-[#3dd68c]"
              />
            ) : (
              <p className="text-[#5f6b72] dark:text-[#8b96a5]">{user.name}</p>
            )}
          </div>

          <div>
            <label className=" text-xs font-bold tracking-wider text-black dark:text-white block mb-2">
              EMAIL
            </label>
            <p className="text-[#5f6b72] dark:text-[#8b96a5] flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {user.email}
            </p>
          </div>

          <div>
            <label className=" text-xs font-bold tracking-wider text-black dark:text-white block mb-2">
              PHONE
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={user.phone || ""}
                onChange={(e) => onChange("phone", e.target.value)}
                placeholder="Enter phone number"
                className="h-10 w-full border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#1f2937] px-3  text-sm text-[#1a1f2e] dark:text-[#c5d1de] placeholder:text-[#8b96a5] focus:outline-none focus:ring-2 focus:ring-[#3dd68c]"
              />
            ) : (
              <p className="text-[#5f6b72] dark:text-[#8b96a5] flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {user.phone || "Not set"}
              </p>
            )}
          </div>

          <div>
            <label className=" text-xs font-bold tracking-wider text-black dark:text-white block mb-2">
              BIRTH DATE
            </label>
            {isEditing ? (
              <input
                type="date"
                value={user.birth_date || ""}
                onChange={(e) => onChange("birth_date", e.target.value)}
                className="h-10 w-full border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#1f2937] px-3  text-sm text-[#1a1f2e] dark:text-[#c5d1de] focus:outline-none focus:ring-2 focus:ring-[#3dd68c]"
              />
            ) : (
              <p className="text-[#5f6b72] dark:text-[#8b96a5] flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(user.birth_date)}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className=" text-xs font-bold tracking-wider text-black dark:text-white block mb-2">
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
                className="h-10 w-full border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#1f2937] px-3  text-sm text-[#1a1f2e] dark:text-[#c5d1de] focus:outline-none focus:ring-2 focus:ring-[#3dd68c]"
              />
            ) : (
              <p className="text-[#5f6b72] dark:text-[#8b96a5]">
                {new Date(user.passoutYear).getFullYear()}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className=" text-xs font-bold tracking-wider text-black dark:text-white block mb-2">
            BIO
          </label>
          {isEditing ? (
            <textarea
              value={user.bio || ""}
              onChange={(e) => onChange("bio", e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
              className="w-full border-2 border-[#2a2d35] dark:border-[#3a4a5f] bg-white dark:bg-[#1f2937] p-3  text-sm text-[#1a1f2e] dark:text-[#c5d1de] placeholder:text-[#8b96a5] focus:outline-none focus:ring-2 focus:ring-[#3dd68c]"
            />
          ) : (
            <p className="text-[#5f6b72] dark:text-[#8b96a5]">
              {user.bio || "No bio added yet"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
