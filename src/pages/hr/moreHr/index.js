import { MoreHr } from "../../../components/hr/more/moreHr";
import Navbar from "../../../components/navbar";
import { Sidebar } from "../../../components/sidebar";

export default function Home() {
    return (
        <div className="w-[100vw] h-[100vh]">
              <Navbar/>
             <Sidebar>
            <MoreHr />
            </Sidebar>
        </div>
    );
}
