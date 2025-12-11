"use client"

import { useState } from "react"
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TextField,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Pagination,
    Divider,
} from "@mui/material"
import { Search, CheckCircle, Cancel, Person } from "@mui/icons-material"
import Sidebar from "@/components/Sidebar"
import SearchOutlineIcon from "@/components/icons/SearchOutlineIcon";
import DoubleArrowIcon from "@/components/icons/DoubleArrowIcon";
import SuccessCheckIcon from "@/components/icons/SuccessCheckIcon";
import ErrorCloseIcon from "@/components/icons/ErrorCloseIcon";
import UserIcon from "@/components/icons/UserIcon";

import FixedHeader from "@/components/FixedHeader"

interface PendingApproval {
    accountNumber: string
    fullName: string
    email: string
    phoneNumber: string
    sector: string
    signatories: number
    authorizedUsers: AuthorizedUser[]
}

interface AuthorizedUser {
    name: string
    tier: string
    role: string
    accountNumber: string
    email: string
    level: string
}

const mockApprovals: PendingApproval[] = [
    {
        accountNumber: "1012456789",
        fullName: "Olalekan Aminu",
        email: "Olalekan.Aminu@gmail.com",
        phoneNumber: "08123456789",
        sector: "Healthcare",
        signatories: 3,
        authorizedUsers: [
            {
                name: "Olalekan Aminu",
                tier: "Tier 1 (N100M - N500M)",
                role: "Initiator",
                level: "",
                accountNumber: "08123456789",
                email: "Olalekan@gmail.com",
            },
            {
                name: "Victor David",
                tier: "Tier 2 (N100M - N500M)",
                role: "Authorizer",
                level: "Level 1",
                accountNumber: "08123456789",
                email: "Olalekan@gmail.com",
            },
            {
                name: "Precious Nwoko",
                tier: "Tier 3 (N100M - N1B)",
                role: "Authorizer",
                level: "Level 2",
                accountNumber: "08123456789",
                email: "Olalekan@gmail.com",
            },
        ],
    },
    {
        accountNumber: "1012456789",
        fullName: "Precious Nwoko",
        email: "Olalekan.Aminu@gmail.com",
        phoneNumber: "08123456789",
        sector: "Education",
        signatories: 4,
        authorizedUsers: [
            {
                name: "Precious Nwoko",
                tier: "Tier 1 (N100M - N500M)",
                role: "Initiator",
                level: "",
                accountNumber: "08123456789",
                email: "Precious@gmail.com",
            },
        ],
    },
    {
        accountNumber: "1012456789",
        fullName: "Victor David",
        email: "Victor.David@gmail.com",
        phoneNumber: "08123456789",
        sector: "Technology / IT",
        signatories: 4,
        authorizedUsers: [
            {
                name: "Victor David",
                tier: "Tier 2 (N100M - N500M)",
                role: "Initiator",
                level: "",
                accountNumber: "08123456789",
                email: "Victor@gmail.com",
            },
        ],
    },
    {
        accountNumber: "1012456789",
        fullName: "Precious Matthew",
        email: "Precious.Matthew@gmail.com",
        phoneNumber: "08123456789",
        sector: "Energy & Utilities",
        signatories: 1,
        authorizedUsers: [
            {
                name: "Precious Matthew",
                tier: "Tier 1 (N100M - N500M)",
                role: "Initiator",
                level: "",
                accountNumber: "08123456789",
                email: "Matthew@gmail.com",
            },
        ],
    },
    {
        accountNumber: "1012456789",
        fullName: "Olalekan Victor",
        email: "Olalekan.Victor@gmail.com",
        phoneNumber: "08123456789",
        sector: "Manufacturing",
        signatories: 3,
        authorizedUsers: [
            {
                name: "Olalekan Victor",
                tier: "Tier 1 (N100M - N500M)",
                role: "Initiator",
                level: "",
                accountNumber: "08123456789",
                email: "Victor@gmail.com",
            },
        ],
    },
    {
        accountNumber: "1012456789",
        fullName: "Joshua Nwoko",
        email: "Joshua.Nwoko@gmail.com",
        phoneNumber: "08123456789",
        sector: "Media",
        signatories: 1,
        authorizedUsers: [
            {
                name: "Joshua Nwoko",
                tier: "Tier 1 (N100M - N500M)",
                role: "Initiator",
                level: "",
                accountNumber: "08123456789",
                email: "Joshua@gmail.com",
            },
        ],
    },
    {
        accountNumber: "1012456789",
        fullName: "Victor Matthew",
        email: "VictorMatthew@gmail.com",
        phoneNumber: "08123456789",
        sector: "Nonprofit",
        signatories: 5,
        authorizedUsers: [
            {
                name: "Victor Matthew",
                tier: "Tier 1 (N100M - N500M)",
                role: "Initiator",
                level: "",
                accountNumber: "08123456789",
                email: "Matthew@gmail.com",
            },
        ],
    },
    {
        accountNumber: "1012456789",
        fullName: "Olalekan Aminu",
        email: "Olalekan.Aminu@gmail.com",
        phoneNumber: "08123456789",
        sector: "Healthcare",
        signatories: 3,
        authorizedUsers: [
            {
                name: "Olalekan Aminu",
                tier: "Tier 1 (N100M - N500M)",
                role: "Initiator",
                level: "",
                accountNumber: "08123456789",
                email: "Olalekan@gmail.com",
            },
            {
                name: "Victor David",
                tier: "Tier 2 (N100M - N500M)",
                role: "Authorizer",
                level: "Level 1",
                accountNumber: "08123456789",
                email: "Olalekan@gmail.com",
            },
            {
                name: "Precious Nwoko",
                tier: "Tier 3 (N100M - N1B)",
                role: "Authorizer",
                level: "Level 2",
                accountNumber: "08123456789",
                email: "Olalekan@gmail.com",
            },
        ],
    },
    {
        accountNumber: "1012456789",
        fullName: "Precious Nwoko",
        email: "Olalekan.Aminu@gmail.com",
        phoneNumber: "08123456789",
        sector: "Education",
        signatories: 4,
        authorizedUsers: [
            {
                name: "Precious Nwoko",
                tier: "Tier 1 (N100M - N500M)",
                role: "Initiator",
                level: "",
                accountNumber: "08123456789",
                email: "Precious@gmail.com",
            },
        ],
    },
    {
        accountNumber: "1012456789",
        fullName: "Victor David",
        email: "Victor.David@gmail.com",
        phoneNumber: "08123456789",
        sector: "Technology / IT",
        signatories: 4,
        authorizedUsers: [
            {
                name: "Victor David",
                tier: "Tier 2 (N100M - N500M)",
                role: "Initiator",
                level: "",
                accountNumber: "08123456789",
                email: "Victor@gmail.com",
            },
        ],
    },
    {
        accountNumber: "1012456789",
        fullName: "Precious Matthew",
        email: "Precious.Matthew@gmail.com",
        phoneNumber: "08123456789",
        sector: "Energy & Utilities",
        signatories: 1,
        authorizedUsers: [
            {
                name: "Precious Matthew",
                tier: "Tier 1 (N100M - N500M)",
                role: "Initiator",
                level: "",
                accountNumber: "08123456789",
                email: "Matthew@gmail.com",
            },
        ],
    },
    {
        accountNumber: "1012456789",
        fullName: "Olalekan Victor",
        email: "Olalekan.Victor@gmail.com",
        phoneNumber: "08123456789",
        sector: "Manufacturing",
        signatories: 3,
        authorizedUsers: [
            {
                name: "Olalekan Victor",
                tier: "Tier 1 (N100M - N500M)",
                role: "Initiator",
                level: "",
                accountNumber: "08123456789",
                email: "Victor@gmail.com",
            },
        ],
    },
    {
        accountNumber: "1012456789",
        fullName: "Joshua Nwoko",
        email: "Joshua.Nwoko@gmail.com",
        phoneNumber: "08123456789",
        sector: "Media",
        signatories: 1,
        authorizedUsers: [
            {
                name: "Joshua Nwoko",
                tier: "Tier 1 (N100M - N500M)",
                role: "Initiator",
                level: "",
                accountNumber: "08123456789",
                email: "Joshua@gmail.com",
            },
        ],
    },
    {
        accountNumber: "1012456789",
        fullName: "Victor Matthew",
        email: "VictorMatthew@gmail.com",
        phoneNumber: "08123456789",
        sector: "Nonprofit",
        signatories: 5,
        authorizedUsers: [
            {
                name: "Victor Matthew",
                tier: "Tier 1 (N100M - N500M)",
                role: "Initiator",
                level: "",
                accountNumber: "08123456789",
                email: "Matthew@gmail.com",
            },
        ],
    },
]

export default function ApprovalWorkflow() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedApproval, setSelectedApproval] = useState<PendingApproval | null>(null)
    const [showUsersDialog, setShowUsersDialog] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState<{
        open: boolean
        type: "approve" | "reject"
        customer: PendingApproval | null
    }>({
        open: false,
        type: "approve",
        customer: null,
    })
    const [successDialog, setSuccessDialog] = useState<{
        open: boolean
        type: "approve" | "reject"
    }>({
        open: false,
        type: "approve",
    })
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 7

    const filteredApprovals = mockApprovals.filter(
        (approval) =>
            approval.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            approval.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            approval.sector.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const paginatedApprovals = filteredApprovals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const handleViewUsers = (approval: PendingApproval) => {
        setSelectedApproval(approval)
        setShowUsersDialog(true)
    }

    const handleApprove = (approval: PendingApproval) => {
        setConfirmDialog({
            open: true,
            type: "approve",
            customer: approval,
        })
    }

    const handleReject = (approval: PendingApproval) => {
        setConfirmDialog({
            open: true,
            type: "reject",
            customer: approval,
        })
    }

    const handleConfirmAction = () => {
        setConfirmDialog({ open: false, type: "approve", customer: null })
        setSuccessDialog({
            open: true,
            type: confirmDialog.type,
        })
    }

    const handleSuccessClose = () => {
        setSuccessDialog({ open: false, type: "approve" })
    }

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
            <Sidebar  />
            <FixedHeader
                userName="Olalekan Babatunde"
                userRole="Super Admin"
                showIcons={true}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    mt: "44px",
                    p: 3,
                    width: `calc(100vw - ${280}px)`,
                    overflowX: "auto",
                    overflowY: "auto",
                }}
            >


            {/* Page Title */}
                <Box sx={{ mt: 3, mb: 5, bgcolor: "white", height: "90px",  borderRadius: 6, }}>
                    <Typography variant="h5" sx={{ fontFamily: "Manrope",
                        fontWeight: 700,  mb: 1.5, fontSize: "23px",
                        lineHeight: "130%",
                        color: "#111827", ml:1.5, p: 1, }}>
                        Approval Workflow
                    </Typography>
                    <Typography variant="body1" color="#A0AEC0" sx={{ fontWeight: "500", fontFamily: "Manrope", fontSize: "15px", ml: 2, }}>
                        Review and confirm customer onboarding requests
                    </Typography>
                </Box>

                {/* Approvals Section */}
                <Box sx={{ mb: 3, bgcolor: "white",  boxShadow: "none", border: "none", borderRadius: "12px" }}>

                    {/* Search */}
                    <Box sx={{mb: 3, p: 2, ml: -2}} >
                            <TextField
                            placeholder="Search Beneficiary"
                            variant="outlined"
                            size="small"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ width: 350, 
                                ml: 2,
                                "& .MuiOutlinedInput-root": {   borderRadius: "8px",
                                    height: 48,
                                    fontFamily: "Manrope",
                                 },
                                "& .MuiInputBase-input": {
                                padding: "14px", 
                                },
                                }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchOutlineIcon />
                                    </InputAdornment>
                                ),
                            }}
                        /> 
                    </Box>

                    {/* Approvals Table */}
                    <Box sx={{ mt: 3, px: 0.5, mr: 2, ml: 0.5, }}>
                    <TableContainer component={Paper} sx={{ mb: 3, mr: 2, boxShadow:"none", border: "none", fontFamily: "Manrope",  }}>
                        <Box sx={{overflowX:"hidden"}}  >

                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: "#1C219F", }}>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }}><Box sx={{ display: "flex", alignItems: "center", gap: 1,}}>
                                            Account Number
                                            <DoubleArrowIcon width={25} height={25} />
                                        </Box></TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }}><Box sx={{ display: "flex", alignItems: "center", gap: 1, whiteSpace: "nowrap" }}>
                                            Full Name
                                            <DoubleArrowIcon width={15} height={15} />
                                        </Box></TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }}><Box sx={{ display: "flex", alignItems: "center", gap: 1, whiteSpace: "nowrap" }}>
                                            Email
                                            <DoubleArrowIcon width={15} height={15} />
                                        </Box></TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }}><Box sx={{ display: "flex", alignItems: "center", gap: 1,  }}>
                                            Phone Number
                                            <DoubleArrowIcon width={25} height={25} />
                                        </Box></TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }}><Box sx={{ display: "flex", alignItems: "center", gap: 1, whiteSpace: "nowrap" }}>
                                            Sector
                                            <DoubleArrowIcon width={15} height={15} />
                                        </Box></TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }}><Box sx={{ display: "flex", alignItems: "center", gap: 1, }}>
                                            No of Signatories
                                            <DoubleArrowIcon width={22} height={22} />
                                        </Box></TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }}><Box sx={{ display: "flex", alignItems: "center", gap: 1, }}>
                                            Authorized Users
                                            <DoubleArrowIcon width={22} height={22} />
                                        </Box></TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }}><Box sx={{ display: "flex", alignItems: "center", gap: 1, whiteSpace: "nowrap" }}>
                                            Action
                                            <DoubleArrowIcon width={15} height={15} />
                                        </Box></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedApprovals.map((approval, index) => (
                                        <TableRow key={index} sx={{ "&:hover": { bgcolor: "grey.50" }, }}>
                                            <TableCell sx={{fontFamily: "Manrope", fontSize: "13px"}}>{approval.accountNumber}</TableCell>
                                            <TableCell sx={{fontFamily: "Manrope", fontSize: "13px"}}>{approval.fullName}</TableCell>
                                            <TableCell sx={{fontFamily: "Manrope", fontSize: "13px"}}>{approval.email}</TableCell>
                                            <TableCell sx={{fontFamily: "Manrope", fontSize: "13px"}}>{approval.phoneNumber}</TableCell>
                                            <TableCell sx={{fontFamily: "Manrope", fontSize: "13px"}}>{approval.sector}</TableCell>
                                            <TableCell sx={{fontFamily: "Manrope", fontSize: "13px"}}>{approval.signatories.toString().padStart(2, "0")}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="text"
                                                    size="small"
                                                    onClick={() => handleViewUsers(approval)}
                                                    sx={{ color: "#1976d2", textTransform: "none", fontFamily: "Manrope", fontWeight: 500, fontSize: "14px", lineHeight: "20px",  }}
                                                >
                                                    View Users
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: "flex", gap: 1 }}>
                                                    <IconButton size="small" onClick={() => handleApprove(approval)} sx={{ color: "success.main" }}>
                                                        <SuccessCheckIcon />
                                                    </IconButton>
                                                    <IconButton size="small" onClick={() => handleReject(approval)} sx={{ color: "error.main" }}>
                                                        <ErrorCloseIcon />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </TableContainer>
                    </Box>

                    {/* Pagination */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", ml: 2, }}>
                        <Typography variant="body2" sx={{
                            color: "#6B7280",
                            fontSize: "0.875rem",
                            ml: 0.5,
                            
                        }}>
                            Showing 1 to {Math.min(itemsPerPage, filteredApprovals.length)} of {filteredApprovals.length} entries
                        </Typography>
                        <Pagination
                            count={Math.ceil(filteredApprovals.length / itemsPerPage)}
                            page={currentPage}
                            onChange={(_, page) => setCurrentPage(page)}
                            
                        />
                    </Box>
                </Box>
            </Box>

            {/* View Users Dialog */}
            <Dialog open={showUsersDialog} onClose={() => setShowUsersDialog(false)} maxWidth="xs" fullWidth  
                PaperProps={{
                    sx: { 
                       borderRadius: 8,
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                        mt: 3,
                        bgcolor: "white",
                        fontFamily: "Manrope",
                        // borderBottom: "1px dashed #D9D9D9",
                    }
                }}
                >
                <DialogTitle sx={{ fontFamily: "Manrope", fontWeight: 600 }} >Authorized Users</DialogTitle>
                <Divider sx={{m: 1}} />
                <DialogContent >
                    <List>
                        {selectedApproval?.authorizedUsers.map((user, index) => (
                            <ListItem key={index} sx={{ 
                                px: 0,
                                borderBottom:
                                    index !== selectedApproval.authorizedUsers.length - 1
                                    ? "1px dashed #D9D9D9"
                                    : "none",
                                pb: 2,
                                mb: 1,
                                }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <UserIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={ 
                                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1}} >
                                        <Typography sx={{ 
                                        fontWeight: 600,
                                        fontFamily: "Manrope", }} >
                                        {user.name} 
                                    </Typography>
                                    <Typography sx={{ fontFamily: "Manrope",}} >
                                        {user.tier}
                                    </Typography>
                                        </Box>}
                                    secondary={
                                        <Box>
                                            <Box sx={{display: "flex", flexDirection: "row", gap: 1}} >
                                                <Typography  color="text.secondary" sx={{fontFamily: "Manrope"}} >
                                                    {user.accountNumber} | {user.role} 
                                                </Typography>
                                                <Typography color="#00CECE" sx={{fontFamily: "Manrope", fontWeight: 600,}} >
                                                    {user.level}
                                                </Typography>
                                            </Box>
                                            
                                            <Typography color="black" sx={{fontFamily: "Manrope, fontWeight: 700, "}} >
                                                {user.email}
                                            </Typography>
                                        </Box>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>

            {/* Confirmation Dialog */}
            <Dialog
                open={confirmDialog.open}
                onClose={() => setConfirmDialog({ open: false, type: "approve", customer: null })}
                maxWidth="xs"
                fullWidth 
                sx={{justifyContent: "center"}}
            >
                <DialogTitle sx={{fontFamily: "Manrope", }} >{confirmDialog.type === "approve" ? "Approve Onboarding" : "Reject Onboarding"}</DialogTitle>
                <Divider />
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" sx={{fontFamily: "Manrope"}} >
                        Are you sure you want to proceed? This action cannot be undone once confirmed.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialog({ open: false, type: "approve", customer: null })} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmAction}
                        variant="contained"
                        sx={{ bgcolor: "#4db6ac", "&:hover": { bgcolor: "#26a69a" } }}
                    >
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Success Dialog */}
            <Dialog open={successDialog.open} onClose={handleSuccessClose} maxWidth="xs" fullWidth>
                <DialogContent sx={{ textAlign: "center", py: 4 }}>
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            bgcolor: "#4caf50",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 2,
                        }}
                    >
                        <CheckCircle sx={{ fontSize: 40, color: "white" }} />
                    </Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                        Operation Successful
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {successDialog.type === "approve"
                            ? "The customer profile has been successfully Onboarded"
                            : "you have successfully rejected this Onboarding"}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleSuccessClose}
                        sx={{ bgcolor: "#4db6ac", "&:hover": { bgcolor: "#26a69a" } }}
                    >
                        Done
                    </Button>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
