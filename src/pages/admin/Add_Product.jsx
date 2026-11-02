import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { baseurl } from "../../services/BaseUrl";
import { AuthContext } from "../../context/AuthProvider";

const initialForm = {
    img_url: "",
    title: "",
    description: "",
    price: "",
    total_available: "",
};

const Add_Product = () => {
    const [form, setForm] = useState(initialForm);
    const [imgError, setImgError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const { accessToken: contextToken } = useContext(AuthContext);
    const accessToken =
        contextToken ||
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be smaller than 5MB");
            return;
        }

        const body = new FormData();
        body.append("image", file);

        setUploading(true);
        const toastId = toast.loading("Uploading image...");
        try {
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
                { method: "POST", body }
            );
            const data = await res.json();
            if (!data.success) throw new Error("Image upload failed");

            setImgError(false);
            setForm((prev) => ({ ...prev, img_url: data.data.url }));
            toast.success("Image uploaded!", { id: toastId });
        } catch (err) {
            toast.error(err.message || "Upload failed", { id: toastId });
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "img_url") setImgError(false);
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        if (!form.img_url.trim()) return "Image URL is required";
        if (!form.title.trim()) return "Title is required";
        if (!form.description.trim()) return "Description is required";
        if (form.price === "" || Number(form.price) <= 0)
            return "Price must be greater than 0";
        if (form.total_available === "" || Number(form.total_available) < 0)
            return "Total available must be 0 or more";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validate();
        if (error) {
            toast.error(error);
            return;
        }

        const product = {
            img_url: form.img_url.trim(),
            title: form.title.trim(),
            description: form.description.trim(),
            price: Number(form.price),
            total_available: Number(form.total_available),
        };

        if (!accessToken) {
            toast.error("Authentication required. Please log in first.");
            return;
        }

        setLoading(true);
        try {
            console.log("Access Token:", accessToken);
            console.log("Request URL:", `${baseurl}/admin/add_product`);

            const res = await fetch(`${baseurl}/admin/add_product`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(product),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => null);
                throw new Error(errorData?.detail || errorData?.message || "Failed to add product");
            }

            toast.success("Product added successfully!");
            setForm(initialForm);
            setImgError(false);
        } catch (err) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";
    const labelClass = "mb-1.5 block text-sm font-semibold text-gray-700";

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-10 sm:py-16">
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

            <div className="mx-auto max-w-5xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Add New Product
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Fill in the details below to add a product to your store.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-5">
                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 rounded-2xl bg-white p-6 shadow-xl shadow-indigo-100/50 sm:p-8 lg:col-span-3"
                    >
                        <div>
                            <label htmlFor="img_url" className={labelClass}>
                                Upload Your Product Image
                            </label>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <label
                                    className={`flex shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-indigo-300 px-5 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 ${uploading ? "pointer-events-none opacity-60" : ""
                                        }`}
                                >
                                    {uploading ? "Uploading..." : "Upload"}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="title" className={labelClass}>
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="e.g. Fresh Cake"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className={labelClass}>
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Write a short product description..."
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label htmlFor="price" className={labelClass}>
                                    Price (৳)
                                </label>
                                <input
                                    id="price"
                                    type="number"
                                    name="price"
                                    min="0"
                                    step="0.01"
                                    value={form.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="total_available"
                                    className={labelClass}
                                >
                                    Total Available
                                </label>
                                <input
                                    id="total_available"
                                    type="number"
                                    name="total_available"
                                    min="0"
                                    step="1"
                                    value={form.total_available}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                            <button
                                type="submit"
                                disabled={loading || uploading}
                                className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.02] hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Adding..." : "Add Product"}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setForm(initialForm);
                                    setImgError(false);
                                    toast("Form cleared", { icon: "🧹" });
                                }}
                                className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-600 transition hover:bg-gray-50"
                            >
                                Reset
                            </button>
                        </div>
                    </form>

                    {/* Live preview */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-6 overflow-hidden rounded-2xl bg-white shadow-xl shadow-indigo-100/50">
                            <div className="flex aspect-[4/3] items-center justify-center bg-gray-100">
                                {form.img_url && !imgError ? (
                                    <img
                                        src={form.img_url}
                                        alt="Product preview"
                                        onError={() => setImgError(true)}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="px-4 text-center text-sm text-gray-400">
                                        {imgError
                                            ? "Couldn't load image"
                                            : "Image preview"}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2 p-5">
                                <h2 className="truncate text-lg font-bold text-gray-900">
                                    {form.title || "Product title"}
                                </h2>
                                <p className="line-clamp-3 text-sm text-gray-500">
                                    {form.description ||
                                        "Your product description will appear here."}
                                </p>
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-xl font-extrabold text-indigo-600">
                                        ${form.price || "0.00"}
                                    </span>
                                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                                        {form.total_available || 0} in stock
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add_Product;