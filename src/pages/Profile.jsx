
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router';

const Profile = () => {
  const { authUser: user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      {/* Header */}
      <div className="mx-auto mb-8 flex max-w-2xl items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your personal information
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl bg-white shadow-lg">

        {/* Profile Image */}
        <div className="flex justify-center pt-8">
          <img
            src={
              user.img_url ||
              user.avatar ||
              'https://placehold.co/150x150?text=User'
            }
            alt="Profile"
            className="h-28 w-28 rounded-full border-4 border-indigo-100 object-cover shadow-md"
          />
        </div>

        {/* User Information */}
        <div className="px-6 pb-8 pt-5">

          <div className="mb-7 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {user.firstname} {user.lastname}
            </h2>

            <p className="mt-1 text-gray-500">
              @{user.username}
            </p>
          </div>

          <div className="space-y-4">

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="mt-1 font-medium text-gray-800">
                {user.email || 'Not provided'}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="mt-1 font-medium text-gray-800">
                {user.phone_number || 'Not provided'}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Account Status</p>

              <span className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${user.is_active
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
                }`}>
                {user.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <button
              onClick={() => navigate('/edit_profile')}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
            >
              Edit Profile
            </button>

          </div>

        </div>
      </div>
    </div>
  );

};

export default Profile;