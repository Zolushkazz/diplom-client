import { Popover } from "@mui/material"
import { useRouter } from "next/router";

const LogoutModal = ({open, setOpen}) => {
    const router = useRouter();

    const handleClose = () => {
        setOpen(false)
    }

    const handleLogout = () => {
        setOpen(false);
        localStorage.removeItem('token')
        setTimeout(() => {
          router.push('/login');
        }, 300); 
      };

    return(
        <Popover
        open={open}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          style={{ backgroundColor: "#4444" }}
            slotProps={{ paper: { style: { transform: 'translateX(-25px) translateY(0%)', }, }, }}
        >
         <div className="flex flex-col justify-center gap-4 w-[280px] h-[160px] p-4 rounded-md bg-white ">
             <div className="flex flex-col gap-2 ">
               <h1 className="text-[16px]">Баталгаажуулах асуулт</h1>
               <p className="text-[13px]">Та системээс гарах гэж байна. Үнэхээр гарах уу?</p>
             </div>
             <div className="cursor-pointer flex items-center justify-end pr-2 gap-4 text-[#015197] font-semibold text-[13px]">
                <button onClick={handleLogout}>Тийм</button>
                <button onClick={handleClose}>Үгүй</button>
             </div>
          </div>
        </Popover>
    )
}

export default LogoutModal