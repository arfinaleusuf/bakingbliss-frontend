import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

const DEFAULT_BIO = "Hey there! I am using this app.";

const Profile = () => {
  const { authUser, loading, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  const buildForm = (user) => ({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || DEFAULT_BIO,
  });

  const [formData, setFormData] = useState(buildForm(authUser));

  // Keep the form in sync once the user finishes loading
  useEffect(() => {
    setFormData(buildForm(authUser));
  }, [authUser]);

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50">
        <div className="flex items-center gap-3 text-slate-500">
          <span className="h-5 w-5 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
          <span className="text-sm font-medium">Loading profile…</span>
        </div>
      </div>
    );
  }

  /* ---------- Logged out ---------- */
  if (!authUser) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50 px-4">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            You're not signed in
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Log in to view and manage your profile.
          </p>
          <a
            href="/login"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Go to login
          </a>
        </div>
      </div>
    );
  }

  /* ---------- Handlers ---------- */
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    // Connect to your update API here
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(buildForm(authUser));
    setIsEditing(false);
  };

  /* ---------- Derived values ---------- */
  const displayName = authUser.name || authUser.username || "User";
  const initials = displayName.slice(0, 2).toUpperCase();
  const memberSince = authUser.createdAt
    ? new Date(authUser.createdAt).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    })
    : "—";

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100";

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:py-14">
      <div className="mx-auto max-w-2xl space-y-4">
        {/* ===== Header ===== */}
        <section className="rounded-2xl bg-white p-5 sm:p-7 ring-1 ring-slate-200">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-left">
            {authUser.avatar ? (
              <img
                src={authUser.avatar}
                alt={displayName}
                className="h-24 w-24 rounded-full object-cover ring-1 ring-slate-200"
              />
            ) : (
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-2xl font-semibold text-white">
                {initials}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-2xl font-bold tracking-tight text-slate-900">
                {displayName}
              </h1>
              <p className="truncate text-sm text-slate-500">{authUser.email}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium capitalize text-indigo-700">
                  {authUser.role || "Member"}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2 border-t border-slate-100 pt-5">
            <button
              onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
              className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              {isEditing ? "Cancel" : "Edit profile"}
            </button>
            <button
              onClick={logout}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Log out
            </button>
          </div>
        </section>

        {/* ===== Edit form / Details ===== */}
        {isEditing ? (
          <section className="rounded-2xl bg-white p-5 sm:p-7 ring-1 ring-slate-200">
            <h2 className="text-base font-semibold text-slate-900">
              Edit profile
            </h2>

            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    Full name
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className={`${inputClass} cursor-not-allowed bg-slate-50 text-slate-400`}
                  />
                </label>
              </div>

              <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  Save changes
                </button>
              </div>
            </form>
          </section>
        ) : (
          <section className="divide-y divide-slate-100 rounded-2xl bg-white ring-1 ring-slate-200">
            <div className="grid grid-cols-2 gap-4 p-5 sm:p-7">
              <div>
                <p className="text-xs text-slate-400">Role</p>
                <p className="mt-1 text-sm font-medium capitalize text-slate-800">
                  {authUser.role || "Member"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Member since</p>
                <p className="mt-1 text-sm font-medium text-slate-800">
                  {memberSince}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 p-5 sm:p-7">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800">Password</p>
                <p className="text-xs text-slate-400">Keep your account safe</p>
              </div>
              <button className="shrink-0 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50">
                Change
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Profile;