import { useEffect, useState } from "react";
import { Link } from "react-router";
import { baseurl } from "../services/BaseUrl";

const Feature = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${baseurl}/feature`);

        if (!response.ok) {
          throw new Error("Failed to fetch featured products");
        }
        const data = await response.json();

        // Handle API response
        const productList = Array.isArray(data)
          ? data
          : data.products || data.data || [];

        setProducts(productList);

      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-8 space-y-8 mx-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-base-300 pb-5">
        <div>
          <span className="badge badge-primary badge-outline text-xs font-bold uppercase tracking-wider mb-2">
            Fresh From The Oven
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">
            Featured Creations
          </h2>
          <p className="mt-1 text-sm text-base-content/70">
            Handmade in limited batches every morning using stone-ground grains.
          </p>
        </div>
        <Link to="/menu" className="btn btn-outline btn-primary btn-sm self-start sm:self-auto">
          Explore All Menu →
        </Link>
      </div>

      {/* Loading Skeleton State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="card bg-base-200/50 border border-base-300 animate-pulse">
              <div className="h-48 bg-base-300 rounded-t-2xl"></div>
              <div className="card-body p-5 space-y-3">
                <div className="h-4 bg-base-300 rounded w-1/3"></div>
                <div className="h-6 bg-base-300 rounded w-3/4"></div>
                <div className="h-3 bg-base-300 rounded w-full"></div>
                <div className="h-3 bg-base-300 rounded w-2/3"></div>
                <div className="pt-3 flex justify-between items-center">
                  <div className="h-6 bg-base-300 rounded w-16"></div>
                  <div className="h-8 bg-base-300 rounded w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between overflow-hidden"
            >
              {/* Product Image & Badge */}
              <figure className="relative h-48 w-full overflow-hidden bg-base-200">
                <img
                  src={item.img_url}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {item.badge && (
                  <span className="badge badge-primary absolute top-3 left-3 shadow-md text-xs font-semibold">
                    {item.badge}
                  </span>
                )}
              </figure>

              {/* Card Body */}
              <div className="card-body p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-base-content/60 mb-1">
                    <span className="font-semibold uppercase tracking-wider">{item.category}</span>
                    {/* Rating */}
                    <div className="flex items-center gap-1 text-amber-500 font-medium">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{item.rating}</span>
                      <span className="text-base-content/40">({item.reviews})</span>
                    </div>
                  </div>

                  <h3 className="card-title text-lg font-bold text-base-content group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-base-content/70 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Price & Action */}
                <div className="card-actions items-center justify-between pt-4 mt-3 border-t border-base-200">
                  <div>
                    <span className="text-xs text-base-content/50 block">Price</span>
                    <span className="text-xl font-extrabold text-base-content">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    className="btn btn-sm btn-primary gap-1 shadow-sm hover:shadow"
                    onClick={() => console.log("Added to cart:", item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="size-4"
                    >
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-2Z" />
                      <path d="M3 6h18" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Feature;