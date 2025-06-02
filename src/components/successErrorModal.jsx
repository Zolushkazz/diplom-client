"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Popover, IconButton } from "@mui/material";
import { FaXmark } from "react-icons/fa6";

const SuccessErrorModal = ({
    open,
    message,
    handleClose,
    type = "error",
    bgColor = "White",
    textColor = "Black",
    classNameText = "",
    fontSize = 13,
    fontWeight = "400",
    borderRadius = "10px",
    modalPadding = "16px",
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPos, setDragStartPos] = useState(null);
    const [anchorPosition, setAnchorPosition] = useState({
        top: 200,
        left: 200,
    }); // default байрлал
    const [isHover, setIsHover] = useState(false);
    const isError = type === "error";

    const indicatorColor = isError ? "#EC4E4B" : "#4CAF50";
    const title = isError ? "Анхааруулга!" : "Амжилттай!";

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStartPos({
            x: e.clientX - anchorPosition.left,
            y: e.clientY - anchorPosition.top,
        });
    };

    const handleMouseMove = (e) => {
        if (isDragging && dragStartPos) {
            setAnchorPosition({
                top: e.clientY - dragStartPos.y,
                left: e.clientX - dragStartPos.x,
            });
            setIsHover(true);
        } else {
            setIsHover(false);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Энэ компонент зөвхөн клиент дээр ажиллах тул window рүү хандахгүйгээр default утга өгсөн.
    return (
        <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            <Popover
                id="draggable-popover"
                anchorReference="anchorPosition"
                anchorPosition={anchorPosition}
                open={open}
                onClose={handleClose}
                onMouseDown={handleMouseDown}
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    cursor: isHover ? "move" : "",
                }}
                anchorOrigin={{ vertical: "center", horizontal: "center" }}
                transformOrigin={{ vertical: "center", horizontal: "center" }}
            >
                <Box
                    sx={{
                        backgroundColor: bgColor,
                        color: textColor,
                        padding: modalPadding,
                        borderRadius,
                        boxShadow: 24,
                        maxWidth: "355px",
                        width: "100%",
                        margin: "auto",
                        paddingLeft: "32px",
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                        position: "relative",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 10,
                            left: 16,
                            bottom: 10,
                            width: "5px",
                            height: "75%",
                            backgroundColor: indicatorColor,
                            borderRadius,
                        },
                    }}
                >
                    <div className="flex flex-col justify-between h-fit gap-4">
                        <p
                            className={`font-bold ${
                                isError ? "text-[#EC4E4B]" : "text-[#4CAF50]"
                            }`}
                        >
                            {title}
                        </p>
                        <Typography
                            variant="body1"
                            sx={{ fontSize, fontWeight }}
                            className={classNameText}
                        >
                            <span className="flex gap-2">{message}</span>
                        </Typography>
                    </div>
                    <IconButton
                        size="small"
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            color: textColor,
                        }}
                    >
                        <FaXmark />
                    </IconButton>
                </Box>
            </Popover>
        </div>
    );
};

export default SuccessErrorModal;
