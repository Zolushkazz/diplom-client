import { useState } from "react";
import { authAPI } from "../api";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await authAPI.logIn(form);
            console.log("data", data);

            // 🟢 Backend-аас ирж буй `access_token` утгыг хадгална
            localStorage.setItem("token", data.access_token);

            router.push("/");
            alert("Амжилттай нэвтэрлээ!");
        } catch (err) {
            alert("Нэвтрэлт амжилтгүй");
        }
    };

    return (
        <div className="flex h-screen font-sans bg-gradient-to-tr from-indigo-400 via-blue-600 to-purple-700 overflow-hidden">
            <div className="w-1/2 flex flex-col justify-center items-center text-white px-10 relative z-10">
                <Image src={"/icon.png"} width={60} height={60} alt="" />
                <p className="text-center max-w-sm text-blue-100 pt-8">
                    Цахимаар бүтээлч ажиллах боломжийг хүн бүрт олгоно. Ажлын
                    байрны цахим соёлыг түгээг дотоод удирдлагын цогц шийдэл
                </p>
            </div>

            <div className="w-1/2 bg-white rounded-l-[3rem] shadow-2xl flex flex-col justify-center px-[5%] relative z-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    Нэвтрэх
                </h2>
                <form className="space-y-10" onSubmit={handleSubmit}>
                    <div className="group">
                        <input
                            type="text"
                            value={form.username}
                            onChange={(e) =>
                                setForm({ ...form, username: e.target.value })
                            }
                            placeholder="Хэрэглэгчийн нэр"
                            className="w-full border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none py-2 transition-all"
                        />
                    </div>
                    <div className="group">
                        <input
                            type="password"
                            placeholder="Нууц үг"
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            className="w-full border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none py-2 transition-all"
                        />
                    </div>
                    {/* <div className="flex items-center text-sm text-gray-500 mt-2">
          Бүртгэлгүй эсэх?
        </div> */}
                    <div className="flex gap-4 mt-6">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition transform"
                        >
                            Нэвтрэх
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
