import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full p-3 flex justify-center items-center gap-10 font-mono font-extrabold text-2xl text-slate-950 bg-slate-500">
      <Link to={"/"}>Quran</Link>
      <Link to={"/time"}>Prayer Times</Link>
      <a href="../../public/app-debug.apk">Download APP</a>
    </nav>
  );
};

export default Navbar;
