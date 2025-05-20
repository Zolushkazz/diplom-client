import HR from "../../components/hr/hr";
import Navbar from "../../components/navbar";
import { Sidebar } from "../../components/sidebar";

export default function Home() {
    return (
        <div className="w-[100vw] h-[100vh]">
            <Navbar/>
             <Sidebar>
             <HR />
             </Sidebar>
        </div>
    );
}
