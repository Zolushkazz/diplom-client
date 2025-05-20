import { MoreActivity } from "../../../components/activities/more/moreActivity";
import Navbar from "../../../components/navbar";
import { Sidebar } from "../../../components/sidebar";

export default function Home() {
    return (
        <div className="w-[100vw] h-[100vh]">
            <Navbar/>
             <Sidebar>
             <MoreActivity />
             </Sidebar>
        </div>
    );
}
