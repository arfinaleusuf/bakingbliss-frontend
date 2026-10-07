
const Feature = () => {
    return (
        <div>
            <div className="border-2 rounded-2xl w-70">
                <div className="hover-3d p-4">
                    {/* content */}
                    <figure className="w-60">
                        <img src="https://img.daisyui.com/images/stock/card-1.webp?x" alt="Tailwind CSS 3D card" />
                    </figure>
                    {/* 8 empty divs needed for the 3D effect */}
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <p>Title</p>
                    <p>Price</p>
                </div>
            </div>
        </div>
    );
};

export default Feature;