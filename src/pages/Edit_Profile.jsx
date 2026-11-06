
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router';
import { baseurl } from '../services/BaseUrl';

const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY;

const Edit_Profile = () => {

    // Get user data from AuthContext
    const { authUser, setAuthUser, accessToken } = useContext(AuthContext);

    const navigate = useNavigate();

    // Extract user ID separately
    const userId = authUser?.id;

    const [form, setForm] = useState({
        email: '',
        username: '',
        firstname: '',
        lastname: '',
        phone_number: '',
        img_url: '',
    });

    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        type: '',
        text: '',
    });

    // Set AuthUser data as form values
    useEffect(() => {
        if (authUser) {
            setForm({
                email: authUser.email || '',
                username: authUser.username || '',
                firstname: authUser.firstname || '',
                lastname: authUser.lastname || '',
                phone_number: authUser.phone_number || '',
                img_url: authUser.img_url || '',
            });

            setPreview(authUser.img_url || '');
        }
    }, [authUser]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle image selection
    const handleImage = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setMessage({
                type: 'error',
                text: 'Please select an image file.',
            });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setMessage({
                type: 'error',
                text: 'Image must be under 5MB.',
            });
            return;
        }

        setMessage({ type: '', text: '' });

        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };

    // Upload image to ImgBB
    const uploadToImgbb = async (file) => {

        if (!IMGBB_KEY) {
            throw new Error('ImgBB API key is missing.');
        }

        const data = new FormData();
        data.append('image', file);

        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
            {
                method: 'POST',
                body: data,
            }
        );

        const json = await res.json();

        if (!res.ok || !json.success) {
            throw new Error(
                json.error?.message || 'Image upload failed.'
            );
        }

        return json.data.display_url;
    };

    // Submit updated profile
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            setMessage({
                type: 'error',
                text: 'User ID not found.',
            });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            let img_url = form.img_url;

            // Upload new image if selected
            if (imageFile) {
                img_url = await uploadToImgbb(imageFile);
            }

            const payload = {
                firstname: form.firstname,
                lastname: form.lastname,
                username: form.username,
                phone_number: form.phone_number,
                img_url: img_url,
            };

            // API call using user ID
            const res = await fetch(
                `${baseurl}/update_user/${userId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            const result = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(
                    result.detail || 'Failed to update profile.'
                );
            }

            // Update AuthContext
            setAuthUser?.((prev) => ({
                ...prev,
                ...payload,
            }));

            setForm((prev) => ({
                ...prev,
                ...payload,
            }));

            setImageFile(null);

            setMessage({
                type: 'success',
                text: 'Profile updated successfully!',
            });

            // Redirect to profile page
            setTimeout(() => {
                navigate('/profile');
            }, 1000);

        } catch (error) {
            console.error(error);

            setMessage({
                type: 'error',
                text: error.message || 'Something went wrong.',
            });

        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200';

    const labelClass =
        'mb-1 block text-sm font-medium text-gray-700';

    if (!authUser) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg"
            >

                <h2 className="mb-6 text-2xl font-bold text-gray-800">
                    Edit Profile
                </h2>

                {/* Avatar */}
                <div className="mb-8 flex flex-col items-center gap-3">

                    <img
                        src={
                            preview ||
                            'https://placehold.co/120x120?text=User'
                        }
                        alt="Profile"
                        className="h-28 w-28 rounded-full border-4 border-indigo-100 object-cover"
                    />

                    <label className="cursor-pointer rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-100">

                        Change photo

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="hidden"
                        />

                    </label>

                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    <div>
                        <label className={labelClass}>
                            First name
                        </label>

                        <input
                            type="text"
                            name="firstname"
                            value={form.firstname}
                            onChange={handleChange}
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Last name
                        </label>

                        <input
                            type="text"
                            name="lastname"
                            value={form.lastname}
                            onChange={handleChange}
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Phone number
                        </label>

                        <input
                            type="tel"
                            name="phone_number"
                            value={form.phone_number}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelClass}>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            readOnly
                            className={`${inputClass} cursor-not-allowed bg-gray-100`}
                        />
                    </div>

                </div>

                {/* Message */}
                {message.text && (
                    <p className={`mt-6 rounded-lg px-4 py-2 text-sm ${
                        message.type === 'success'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-700'
                    }`}>
                        {message.text}
                    </p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
                >
                    {loading ? 'Saving...' : 'Save changes'}
                </button>

            </form>
        </div>
    );
};

export default Edit_Profile;
