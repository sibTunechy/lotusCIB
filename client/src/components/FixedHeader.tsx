// components/FixedHeader.tsx
"use client"

import { Box, Typography, IconButton } from "@mui/material"
import ChatNotificationIcon from "@/components/icons/ChatNotificationIcon"
import UserDIcon from "@/components/icons/UserDIcon.tsx";
import { FiberManualRecord, Chat, Description, People } from "@mui/icons-material"

interface FixedHeaderProps {
    userName?: string
    userRole?: string
    lastLogin?: string
    showIcons?: boolean
}

export default function FixedHeader({
                                        userName = "Olalekan Babatunde",
                                        userRole = "Super Admin",
                                        lastLogin = "July 30, 2025 | 12:00PM",
                                        showIcons = true
                                    }: FixedHeaderProps) {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                right: 0,
                left: 330, // Sidebar width - adjust to match your sidebar
                height: 80,
                bgcolor: "white",
                borderBottom: "1px solid",
                borderColor: "grey.200",
                zIndex: 1200,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
               
            }}
        >
            {/* Left side - Last login */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "30px",
                    gap: 1,
                    bgcolor: "#F8FAFC",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                        bgcolor: "grey.200",
                        "& .status-dot": {
                            fontSize: 12
                        }
                    }
                }}
            >
                <FiberManualRecord
                    className="status-dot"
                    sx={{
                        fontSize: 12,
                        color: "#1C219F",
                        transition: "font-size 0.2s ease"
                    }}
                />
                <Typography variant="body2" color="#A0AEC0" sx={{fontSize: "13px"}}>
                    Your last login was recorded on: {lastLogin}
                </Typography>
            </Box>

            {/* Right side - Icons and user info */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {showIcons && (
                    <>
                        {/* <IconButton size="small" sx={{ color: "grey.600" }}>
                            <ChatNotificationIcon />
                        </IconButton> */}
                        <IconButton size="small" sx={{ color: "grey.600" }}>
                            <UserDIcon />
                        </IconButton>
                    </>
                )}
                <Typography variant="body2">
                    
                    <Box component="span" sx={{color: "#A0AEC0", fontWeight: "small",}}>
                        {userName} | {" "}
                    </Box>
                    
                    <Box component="span" sx={{ fontWeight: "small", color: "black" }}>
                         {userRole}
                    </Box>
                </Typography>
            </Box>
        </Box>
    )
}