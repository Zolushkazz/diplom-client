"use client";

import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { Avatar, Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DeleteOutline } from "@mui/icons-material";
import { TransitionModal } from "../modal/transitionModal";

export const MoreRequests = () => {
    const [openMoreModal, setOpenMoreModal] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    console.log(id);

    const [openTransition, setOpenTransition] = useState(false);

    const handleBackClick = () => {
        router.push("/requests");
    };

    const handleEdit = () => {
        console.log("Clicked!");
    };

    return (
        <div className="p-4 px-8 bg-white rounded-lg text-[13px] h-[90vh] overflow-y-auto">
            <KeyboardBackspaceOutlinedIcon
                onClick={handleBackClick} // Буцах товчийг дархад энэ функц ажиллана
                style={{ cursor: "pointer", fontSize: "30px" }}
            />
            <p className="border-b py-1"></p>
            <div className="flex flex-col justify-between h-full">
                <div className="">
                    <div className="flex w-full items-center justify-between">
                        <h2 className="text-[15px] p-4 font-semibold ">
                            Дэлгэрэнгүй мэдээлэл
                        </h2>
                        <div className="border rounded-md border-gray-300">
                            <EditOutlinedIcon
                                sx={{
                                    color: "gray",
                                    cursor: "pointer",
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(id);
                                }}
                            />
                        </div>
                    </div>
                    <TextField
                        placeholder="Тайлбар"
                        variant="outlined"
                        //   onChange={(e) => setSearch(e.target.value)}
                        //   value={search}
                        className="h-[30px] text-[13px]"
                        rows={3}
                        fullWidth
                        disabled
                    />
                </div>
                <div className="">
                    {/* <div className="flex w-full items-center justify-between">
              <h2 className="text-[15px] p-4 font-semibold ">
                  Хавсралт файлууд
                </h2>
               <div className="border rounded-md border-gray-300">
                 <EditOutlinedIcon
                    sx={{
                        color: "gray",
                        cursor: "pointer",
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(request.id);
                    }}
                    />
                </div>
            </div>
            <div className="">
                <div className="flex items-center text-[#6a6c71] text-[13px] font-medium py-2 pl-[10%]">
                    <p className="w-[15%] px-2">№</p>
                    <p className="w-[15%] px-2">Файлын нэр</p>
                    <p className="w-[15%] px-2 flex justify-end">Нэмэгдсэн огноо</p>
                 </div>
            </div> */}
                    {/* <div className="flex">
            <p></p>
            <p></p>
            <p></p>
            <DeleteOutline
                onClick={(e) => {
                    e.stopPropagation();
                    setRowIdToDelete(
                        request.id
                    );
                    setDeleteRow(true);
                }}
                sx={{
                    color: "gray",
                    cursor: "pointer",
                }}
            />
           </div>*/}
                </div>
                <div className="">
                    <div className="flex w-full items-center justify-between">
                        <h2 className="text-[15px] p-4 font-semibold ">
                            Шилжүүлгүүд
                        </h2>
                        <div className="text-[#015197] flex gap-3 justify-end w-full">
                            <button onClick={() => setOpenTransition(true)}>
                                Шилжүүлэх
                            </button>
                            <span>|</span>
                            <p>Хүсэлт хаах</p>
                        </div>
                    </div>
                    <div className="flex items-center text-[#6a6c71] text-[13px] font-medium py-2 pl-[10%]">
                        <p className="w-[15%] px-2">Ажилтан</p>
                        <p className="w-[15%] px-2">Шилжүүлсэн</p>
                        <p className="w-[15%] px-2">Хүлээн авсан</p>
                        <p className="w-[30%] flex justify-end px-2">
                            Хэнд шилжүүлсэн
                        </p>
                    </div>
                </div>
                <div className="flex items-center text-[13px] text-[#000] py-2 border-b border-[#d9d9d9]">
                    <div className="whitespace-normal w-[15%] flex items-center px-2">
                        <Avatar
                            src={""}
                            className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                            {/* <p>{item?.authorName}</p> */}
                            {/* <p className="text-[#6a6c71]">{data.appName}</p> //asuuh */}
                        </div>
                    </div>
                    <div className=" whitespace-normal w-[15%] px-2">
                        {/* <p>{receivedDate}</p> */}
                        {/* <p className="text-[#6a6c71]">{item.receivedDate}</p> */}
                    </div>
                    <div className=" whitespace-normal w-[15%] px-2">
                        {/* <p>{createdAt}</p> */}
                        {/* <p className="text-[#6a6c71]">{data.transferredTime}</p> */}
                    </div>
                    <div className="flex justify-between w-[50%]">
                        <div className="whitespace-normal flex flex-col items-center w-[20%] px-2">
                            {/* <p>{item.receiverName}</p> */}
                            {/* <p>{data.app}</p> */}
                        </div>
                    </div>
                </div>
            </div>
            {openTransition && (
                <TransitionModal
                    open={openTransition}
                    setOpen={setOpenTransition}
                    id={id}
                />
            )}
        </div>
    );
};
