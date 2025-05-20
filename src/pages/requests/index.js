import Navbar from "../../components/navbar";
import Requests from "../../components/requests/requests";
import { Sidebar } from "../../components/sidebar";

export default function Home() {
    return (
        <div className="w-[100vw] h-[100vh]">
            <Navbar/>
             <Sidebar>
             <Requests />
             </Sidebar>
        </div>
    );
}
