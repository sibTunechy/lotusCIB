"use client"

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material"
import {
  Dashboard,
  PersonAdd,
  People,
  Settings,
  Description,
  Logout,
} from "@mui/icons-material"
import UserSettingsIcon from "@/components/icons/UserSettingsIcon";
import DocumentChatIcon from "@/components/icons/DocumentChatIcon";
import BagSecureIcon from "@/components/icons/BagSecureIcon";
import YourIconName from "@/components/icons/YourIconName";
import ManagementIcon from "@/components/icons/ManagementIcon";
import UserIcon from "@/components/icons/UserIcon";
import MessageIcon from "@/components/icons/MessageIcon";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import BookIcon from "@/components/icons/BookIcon";
import GridIcon from "@/components/icons/GridIcon";
import { useNavigate, useLocation } from "react-router-dom"

const drawerWidth = 330

const sidebarItems = [

  { text: "Dashboard", icon: GridIcon, route: "/dashboard" },
  { text: "Customer Onboarding", icon: UserIcon, route: "/onboarding" },
  { text: "Customer Management", icon: UserSettingsIcon, route: "/management" },
  { text: "Transaction", icon: DocumentChatIcon, route: "/transaction" },
  { text: "Requisition", icon: BagSecureIcon, route: "/requisition" },
  { text: "Approval", icon: YourIconName, route: "/approval" },
  { text: "User Management", icon: ManagementIcon, route: "/user-management" },
  { text: "Audit Report", icon: MessageIcon, route: "/audit" },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#1C219F",
          color: "white",
          overflow: "hidden",
        },
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <Box mb={3}>
            <img src="/assets/lotuspngwhite.png" alt="Lotus Bank" height={40} />
          </Box>
        </Box>

        {/* Navigation Items */}
        <List sx={{ p: 0 }}>
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.route;

            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1, fontFamily: "Manrope", }}>
                <ListItemButton
                  onClick={() => navigate(item.route)}
                  sx={{
                    borderRadius: 3,
                    fontFamily: "Manrope",
                    bgcolor:
                      item.text === "Dashboard"
                        ? "white"
                        : isActive
                        ? "#4169E1"
                        : "transparent",
                    color:
                      item.text === "Dashboard"
                        ? "#1C219F"
                        : isActive
                        ? "white"
                        : "white",
                    "&:hover": {
                      bgcolor: "#4169E1",
                      color: "white",
                    },
                    display: "flex",
                    justifyContent:
                      item.text === "Dashboard" ? "space-between" : "flex-start",
                  }}
                >
                  {item.text === "Dashboard" ? (
                    <>
                      <ListItemText primary={<Typography sx={{fontFamily: "Manrope", fontWeight: 600}}>{item.text}</Typography>}  />
                      <ListItemIcon
                        sx={{
                          color: "#1C219F",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "Manrope",
                        }}
                      >
                        <GridIcon width={20} height={20} fill="#1C219F" />
                      </ListItemIcon>
                    </>
                  ) : (
                    <>
                      <ListItemIcon
                        sx={{
                          color: isActive ? "white" : "white",
                          minWidth: 40,
                        }}
                      >
                        <item.icon />
                      </ListItemIcon>
                      <ListItemText primary={<Typography sx={{fontFamily: "Manrope", fontSize: "16px", fontWeight: 500}}>{item.text}</Typography>}  />
                    </>
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Sign Out Button */}
      <Box sx={{ mt: 4, p: 3 }}>
        <ListItemButton
          sx={{
            borderRadius: 1,
            "&:hover": { bgcolor: "#4169E1" },
            color: "white",
          }}
          onClick={() => navigate("/")}
        >
          <ArrowLeftIcon sx={{ color: "red", minWidth: 40 }}>
            <Logout />
          </ArrowLeftIcon>
          <ListItemText
            primary={
              <Typography sx={{ ml: 1.5, fontWeight: 600, fontFamily: "Manrope", }}>Sign Out</Typography>
            }
          />
        </ListItemButton>
      </Box>
    </Drawer>
  )
}

export { drawerWidth }
