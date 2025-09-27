import { Link } from "react-router-dom";


export function Navbar() {
return (
<header className="w-full bg-[#464646] shadow-md px-15 py-5 flex justify-between items-center">
<h1 className="text-xl font-bold text-blue-600">Sentinels</h1>
<nav className="flex gap-6 text-white">
<Link to="/" className="hover:text-blue-600">Dashboard</Link>
<Link to="/absensi" className="hover:text-blue-600">Absensi</Link>
<Link to="/monitoring" className="hover:text-blue-600">Monitoring</Link>
<Link to="/monitoring" className="hover:text-blue-600">Pengaturan</Link>
</nav>
</header>
);
}


export default Navbar;