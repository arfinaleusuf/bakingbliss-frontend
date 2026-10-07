import { useEffect, useState } from "react";
import { baseurl } from "../services/BaseUrl";

const Feature = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch(`${baseurl}/feature`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err))
    }, [])
    console.log(products)

    return (
        <div className="flex flex-wrap justify-center gap-6 p-6">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="group border border-gray-200 rounded-2xl w-64 p-3 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                    {/* Image Container with Zoom Effect */}
                    <div className="w-full h-60 overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
                        <img
                            src={
                                product.image ||
                                product.image_url ||
                                "https://img.daisyui.com/images/stock/card-1.webp?x"
                            }
                            alt={product.title || product.name}
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                    </div>

                    {/* Info Section */}
                    <div className="pt-3 px-1 space-y-1">
                        <h3 className="font-semibold text-base text-gray-800 line-clamp-1 group-hover:text-amber-600 transition-colors">
                            {product.title || product.name}
                        </h3>
                        <p className="text-emerald-600 font-bold text-lg">
                            ৳{product.price}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Feature;