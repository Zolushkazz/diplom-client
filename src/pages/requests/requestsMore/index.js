import Navbar from "../../../components/navbar";
import { MoreRequests } from "../../../components/requests/more/moreRequests";
import { Sidebar } from "../../../components/sidebar";


export default function Home() {
  return (
    <div className="w-[100vw] h-[100vh]">
      <Navbar />
      <Sidebar>
      <MoreRequests/>
      </Sidebar>
    </div>
  );
}
