import { useState } from "react";

/* ---------- Small inline icons (no extra library needed) ---------- */
const Icon = ({ children, className = "size-6" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {children}
    </svg>
);

const IconRevenue = () => (
    <Icon>
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </Icon>
);
const IconOrders = () => (
    <Icon>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </Icon>
);
const IconUsers = () => (
    <Icon>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Icon>
);
const IconProducts = () => (
    <Icon>
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
    </Icon>
);
const IconSearch = () => (
    <Icon className="size-4">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
    </Icon>
);
const IconPlus = () => (
    <Icon className="size-4">
        <path d="M12 5v14M5 12h14" />
    </Icon>
);
const IconArrowUp = () => (
    <Icon className="size-4">
        <path d="m5 12 7-7 7 7M12 19V5" />
    </Icon>
);
const IconArrowDown = () => (
    <Icon className="size-4">
        <path d="m19 12-7 7-7-7M12 5v14" />
    </Icon>
);

/* ---------- Dummy data (replace with your API data) ---------- */
const stats = [
    {
        title: "Total Revenue",
        value: "$24,580",
        change: "+12.5%",
        up: true,
        icon: <IconRevenue />,
        color: "bg-primary/10 text-primary",
    },
    {
        title: "Total Orders",
        value: "1,284",
        change: "+8.2%",
        up: true,
        icon: <IconOrders />,
        color: "bg-secondary/10 text-secondary",
    },
    {
        title: "Customers",
        value: "842",
        change: "+3.1%",
        up: true,
        icon: <IconUsers />,
        color: "bg-accent/10 text-accent",
    },
    {
        title: "Products",
        value: "96",
        change: "-1.4%",
        up: false,
        icon: <IconProducts />,
        color: "bg-warning/10 text-warning",
    },
];

const salesData = {
    week: [
        { label: "Mon", value: 45 },
        { label: "Tue", value: 62 },
        { label: "Wed", value: 38 },
        { label: "Thu", value: 80 },
        { label: "Fri", value: 95 },
        { label: "Sat", value: 70 },
        { label: "Sun", value: 55 },
    ],
    month: [
        { label: "W1", value: 60 },
        { label: "W2", value: 75 },
        { label: "W3", value: 50 },
        { label: "W4", value: 90 },
    ],
    year: [
        { label: "Jan", value: 40 },
        { label: "Feb", value: 55 },
        { label: "Mar", value: 48 },
        { label: "Apr", value: 70 },
        { label: "May", value: 65 },
        { label: "Jun", value: 85 },
        { label: "Jul", value: 78 },
        { label: "Aug", value: 92 },
        { label: "Sep", value: 60 },
        { label: "Oct", value: 74 },
        { label: "Nov", value: 88 },
        { label: "Dec", value: 96 },
    ],
};

const recentOrders = [
    { id: "#BB-1042", customer: "Nusrat Jahan", item: "Chocolate Truffle Cake", amount: "$32.00", status: "Delivered" },
    { id: "#BB-1041", customer: "Rafiq Ahmed", item: "Butter Croissant x6", amount: "$18.50", status: "Pending" },
    { id: "#BB-1040", customer: "Tania Akter", item: "Red Velvet Cupcakes", amount: "$24.00", status: "Processing" },
    { id: "#BB-1039", customer: "Sabbir Hossain", item: "Sourdough Loaf", amount: "$9.00", status: "Delivered" },
    { id: "#BB-1038", customer: "Mim Chowdhury", item: "Custom Birthday Cake", amount: "$65.00", status: "Cancelled" },
];

const topProducts = [
    { name: "Chocolate Truffle Cake", sold: 214, percent: 92 },
    { name: "Red Velvet Cupcakes", sold: 180, percent: 78 },
    { name: "Butter Croissant", sold: 150, percent: 64 },
    { name: "Sourdough Loaf", sold: 96, percent: 41 },
];

const activities = [
    { text: "New order #BB-1042 received", time: "2 min ago", dot: "bg-primary" },
    { text: "Stock low: Butter Croissant", time: "25 min ago", dot: "bg-warning" },
    { text: "New customer registered", time: "1 hr ago", dot: "bg-success" },
    { text: "Order #BB-1038 cancelled", time: "3 hrs ago", dot: "bg-error" },
];

const statusStyle = {
    Delivered: "badge-success",
    Pending: "badge-warning",
    Processing: "badge-info",
    Cancelled: "badge-error",
};

/* ---------- Components ---------- */
const StatCard = ({ title, value, change, up, icon, color }) => (
    <div className="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow">
        <div className="card-body p-5">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-base-content/60">{title}</p>
                    <h3 className="text-2xl sm:text-3xl font-bold mt-1">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-sm">
                <span
                    className={`flex items-center gap-1 font-medium ${up ? "text-success" : "text-error"
                        }`}
                >
                    {up ? <IconArrowUp /> : <IconArrowDown />}
                    {change}
                </span>
                <span className="text-base-content/50">vs last month</span>
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const [range, setRange] = useState("week");
    const [search, setSearch] = useState("");

    const chart = salesData[range];
    const filteredOrders = recentOrders.filter(
        (o) =>
            o.customer.toLowerCase().includes(search.toLowerCase()) ||
            o.id.toLowerCase().includes(search.toLowerCase()) ||
            o.item.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-base-200/50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
                    <p className="text-base-content/60 text-sm mt-1">
                        Welcome back! Here's what's happening at Baking Bliss today.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <label className="input input-bordered input-sm sm:input-md flex items-center gap-2 w-full sm:w-64">
                        <IconSearch />
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search orders..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </label>
                    <button className="btn btn-primary btn-sm sm:btn-md gap-2">
                        <IconPlus />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((s) => (
                    <StatCard key={s.title} {...s} />
                ))}
            </div>

            {/* Chart + Top products */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Sales chart */}
                <div className="card bg-base-100 shadow-sm border border-base-300 lg:col-span-2">
                    <div className="card-body">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h2 className="card-title">Sales Overview</h2>
                                <p className="text-sm text-base-content/60">
                                    Revenue performance
                                </p>
                            </div>
                            <div className="join">
                                {["week", "month", "year"].map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => setRange(r)}
                                        className={`join-item btn btn-xs sm:btn-sm capitalize ${range === r ? "btn-primary" : "btn-ghost border-base-300"
                                            }`}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-end gap-2 sm:gap-3 h-56 mt-6">
                            {chart.map((bar) => (
                                <div
                                    key={bar.label}
                                    className="flex-1 flex flex-col items-center justify-end h-full group"
                                >
                                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity mb-1 font-medium">
                                        {bar.value}%
                                    </span>
                                    <div
                                        className="w-full rounded-t-lg bg-primary/70 group-hover:bg-primary transition-all"
                                        style={{ height: `${bar.value}%` }}
                                    />
                                    <span className="text-[10px] sm:text-xs text-base-content/60 mt-2">
                                        {bar.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top products */}
                <div className="card bg-base-100 shadow-sm border border-base-300">
                    <div className="card-body">
                        <h2 className="card-title">Top Products</h2>
                        <p className="text-sm text-base-content/60 -mt-1">
                            Best sellers this month
                        </p>
                        <div className="space-y-4 mt-3">
                            {topProducts.map((p) => (
                                <div key={p.name}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium truncate pr-2">{p.name}</span>
                                        <span className="text-base-content/60 shrink-0">
                                            {p.sold} sold
                                        </span>
                                    </div>
                                    <progress
                                        className="progress progress-primary w-full"
                                        value={p.percent}
                                        max="100"
                                    ></progress>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Recent orders */}
                <div className="card bg-base-100 shadow-sm border border-base-300 lg:col-span-2">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <h2 className="card-title">Recent Orders</h2>
                            <button className="btn btn-ghost btn-sm text-primary">
                                View all
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Order</th>
                                        <th>Customer</th>
                                        <th className="hidden md:table-cell">Item</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.length > 0 ? (
                                        filteredOrders.map((o) => (
                                            <tr key={o.id} className="hover">
                                                <td className="font-medium">{o.id}</td>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar placeholder hidden sm:flex">
                                                            <div className="bg-primary/10 text-primary rounded-full w-8">
                                                                <span className="text-xs">
                                                                    {o.customer.charAt(0)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <span className="whitespace-nowrap">
                                                            {o.customer}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="hidden md:table-cell text-base-content/70">
                                                    {o.item}
                                                </td>
                                                <td className="font-medium">{o.amount}</td>
                                                <td>
                                                    <span
                                                        className={`badge badge-sm ${statusStyle[o.status]}`}
                                                    >
                                                        {o.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center py-8 text-base-content/50"
                                            >
                                                No orders found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Activity */}
                <div className="card bg-base-100 shadow-sm border border-base-300">
                    <div className="card-body">
                        <h2 className="card-title">Recent Activity</h2>
                        <ul className="mt-3 space-y-4">
                            {activities.map((a, i) => (
                                <li key={i} className="flex gap-3">
                                    <span
                                        className={`mt-1.5 size-2.5 rounded-full shrink-0 ${a.dot}`}
                                    />
                                    <div>
                                        <p className="text-sm">{a.text}</p>
                                        <p className="text-xs text-base-content/50">{a.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;