import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

const Profile = () => {
  const { authUser, loading, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  // Form state for editing
  const [formData, setFormData] = useState({
    name: authUser?.name || "",
    email: authUser?.email || "",
    bio: authUser?.bio || "Hey there! I am using this app.",
    role: authUser?.role || "Member",
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex items-center space-x-3 text-slate-600">
          <div className="w-6 h-6 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="font-medium">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
          !
        </div>
        <h2 className="text-2xl font-semibold text-slate-800">Not Logged In</h2>
        <p className="text-slate-500 mt-2 mb-6 max-w-sm">
          Please log in to your account to view and manage your profile details.
        </p>
        <a
          href="/login"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition"
        >
          Go to Login
        </a>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Connect to your update API here
    setIsEditing(false);
  };

  const initials = (authUser.name || authUser.username || "U")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Cover Banner */}
          <div className="h-36 sm:h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          {/* Profile Basic Info Bar */}
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 sm:-mt-20 gap-4">
              <div className="flex items-end space-x-5">
                {authUser.avatar ? (
                  <img
                    src={authUser.avatar}
                    alt={authUser.name || "User"}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
                  />
                ) : (
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-indigo-600 text-white text-3xl font-bold flex items-center justify-center border-4 border-white shadow-md">
                    {initials}
                  </div>
                )}
                <div className="mb-2">
                  <h1 className="text-2xl font-bold text-slate-800">
                    {authUser.name || authUser.username || "User"}
                  </h1>
                  <p className="text-sm text-slate-500 font-medium">
                    {authUser.email}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-sm rounded-lg transition"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium text-sm rounded-lg transition"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section: Form or Information Cards */}
        {isEditing ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">
              Edit Account Information
            </h2>
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                    className="w-full px-3.5 py-2 border border-slate-200 bg-slate-50 text-slate-400 rounded-lg cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Bio
                </label>
                <textarea
                  rows="3"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column: Quick Stats / Meta */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Account Details
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-slate-500">Role</span>
                  <p className="font-medium text-slate-800 capitalize">
                    {authUser.role || "Standard User"}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">Status</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="font-medium text-slate-800">Active</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-500">Member Since</span>
                  <p className="font-medium text-slate-800">
                    {authUser.createdAt
                      ? new Date(authUser.createdAt).toLocaleDateString()
                      : "October 2026"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Bio & Recent Details */}
            <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-2">
                  About
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {authUser.bio ||
                    "This user hasn't added a bio yet. Click 'Edit Profile' to customize your account summary."}
                </p>
              </div>

              <hr className="border-slate-100" />

              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-3">
                  Account Security
                </h3>
                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                  <div>
                    <p className="font-medium text-slate-800">Password</p>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Last changed recently
                    </p>
                  </div>
                  <button className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 font-medium text-xs text-slate-700 rounded-lg transition">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;