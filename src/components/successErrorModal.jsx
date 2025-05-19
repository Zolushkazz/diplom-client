'use client';

import React, { useState } from 'react';
import { Box, Typography, Popover } from '@mui/material';
import { FontIconComp } from './FontIconComp';
import ButtonComp from './buttonComp';

const SuccessErrorModal = ({
  open,
  message,
  handleClose,
  type = 'error', // 'success' or 'error'
  bgColor = 'White',
  textColor = 'Black',
  className = '',
  classNameText = '',
  fontSize = 13,
  fontWeight = '400',
  borderRadius = '10px',
  modalPadding = '16px',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState({
    top: window.innerHeight / 2,
    left: window.innerWidth / 2,
  });

  const isError = type === 'error';

  const indicatorColor = isError ? '#EC4E4B' : '#4CAF50';
  const title = isError ? 'Анхааруулга!' : 'Амжилттай!';

  const handleCloseModal = () => {
    handleClose();
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartPos({
      x: e.clientX - anchorPosition.left,
      y: e.clientY - anchorPosition.top,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
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

  return (
    <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} style={{ cursor: 'move' }}>
      <Popover
        id="draggable-popover"
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
        open={open}
        onClose={handleCloseModal}
        onMouseDown={handleMouseDown}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          cursor: isHover ? 'move' : '',
        }}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
      >
        <Box
          sx={{
            backgroundColor: bgColor,
            color: textColor,
            padding: modalPadding,
            borderRadius,
            boxShadow: 24,
            maxWidth: '355px',
            width: '100%',
            margin: 'auto',
            paddingLeft: '32px',
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 10,
              left: 16,
              bottom: 10,
              width: '5px',
              height: '75%',
              backgroundColor: indicatorColor,
              borderRadius,
            },
          }}
        >
          <div className="flex flex-col justify-between h-fit gap-4">
            <p className={`font-bold ${isError ? 'text-[#EC4E4B]' : 'text-[#4CAF50]'}`}>{title}</p>
            <Typography
              variant="body1"
              sx={{ fontSize, fontWeight }}
              className={classNameText}
            >
              <span className="flex gap-2">{message}</span>
            </Typography>
          </div>
          <ButtonComp
            className="flex justify-start"
            handleChange={handleClose}
            icon={
              <FontIconComp
                icon="x_1_Icon"
                width={16}
                height={16}
                color="black"
              />
            }
          />
        </Box>
      </Popover>
    </div>
  );
};

export default SuccessErrorModal;
