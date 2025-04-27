import Image from "next/image";

const Navbar = () => {
return (
     <div className="w-full h-[54px] flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
            <Image src='/homeIcon.png' alt="" width={25} height={25}/>
            <h2 className="text-md font-bold">Үйл ажиллагаа бүртгэх систем</h2>
        </div>
        <div className="flex items-center gap-3 text-sm">
            <p>Admin</p>
            <Image src='/userIcon.png' alt="" width={25} height={25}/>
        </div>
     </div>
)
}

export default Navbar;