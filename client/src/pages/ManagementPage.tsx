"use client"

import { useState } from "react"
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Avatar,
    Pagination,
    InputAdornment,
} from "@mui/material"
// import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import {
    Visibility,
    Edit,
    Delete,
    Add,
    Search,
    KeyboardArrowDown,
    Person,
    CheckCircle,
    VpnKey,
    Cancel,
    MoreHoriz,
} from "@mui/icons-material"
import KeyIcon from '@mui/icons-material/Key'
import SearchOutlineIcon from "@/components/icons/SearchOutlineIcon";
import Sidebar, { drawerWidth } from "@/components/Sidebar"
import FixedHeader from "@/components/FixedHeader"
import DoubleArrowIcon from "@/components/icons/DoubleArrowIcon"
import ChatSupportIcon from "@/components/icons/ChatSupportIcon"
import EyeOutlineIcon from "@/components/icons/EyeOutlineIcon"
import EyeGreenIcon from "@/components/icons/EyeGreenIcon"
import EyeRedIcon from "@/components/icons/EyeRedIcon"
import PlusIcon from "@/components/icons/PlusIcon"
import UserIcon from "@/components/icons/UserIcon"
import ToolIcon from "@/components/icons/ToolIcon"
import DeleteIcon from "@/components/icons/DeleteIcon"
import EditToolIcon from "@/components/icons/EditToolIcon"

interface Customer {
    accountNumber: string
    fullName: string
    email: string
    phoneNumber: string
    sector: string
    status: "Active" | "Inactive"
}

interface AuthorizedUser {
    id: string
    name: string
    email: string
    phoneNumber: string
    role: string
    approvalTier: string
    status: "Active" | "Inactive"
    stage?: string
}

const customers: Customer[] = [
    {
        accountNumber: "1012456789",
        fullName: "Olalekan Aminu",
        email: "Olalekan.Aminu@gmail.com",
        phoneNumber: "08123456789",
        sector: "Healthcare",
        status: "Active",
    },
    {
        accountNumber: "1012456789",
        fullName: "Precious Nwoko",
        email: "Olalekan.Aminu@gmail.com",
        phoneNumber: "08123456789",
        sector: "Education",
        status: "Active",
    },
    {
        accountNumber: "1012567890",
        fullName: "Victor David",
        email: "Victor.David@gmail.com",
        phoneNumber: "08123456789",
        sector: "Technology / IT",
        status: "Active",
    },
    {
        accountNumber: "1012567890",
        fullName: "Precious Matthew",
        email: "Precious.Matthew@gmail.com",
        phoneNumber: "08123456789",
        sector: "Energy & Utilities",
        status: "Inactive",
    },
    {
        accountNumber: "1012567890",
        fullName: "Olalekan Victor",
        email: "Olalekan.Victor@gmail.com",
        phoneNumber: "08123456789",
        sector: "Manufacturing",
        status: "Active",
    },
    {
        accountNumber: "1012567890",
        fullName: "Joshua Nwoko",
        email: "Joshua.Nwoko@gmail.com",
        phoneNumber: "08123456789",
        sector: "Media",
        status: "Active",
    },
    {
        accountNumber: "1012567890",
        fullName: "Victor Matthew",
        email: "VictorMatthew@gmail.com",
        phoneNumber: "08123456789",
        sector: "Nonprofit",
        status: "Active",
    },
    {
        accountNumber: "1012567890",
        fullName: "Diamond Eze",
        email: "DiamondEze@gmail.com",
        phoneNumber: "08123456789",
        sector: "Commercial",
        status: "Active",
    },
    {
        accountNumber: "1012567890",
        fullName: "Ahmed Shafiu",
        email: "AhmedShafiu@gmail.com",
        phoneNumber: "08123456789",
        sector: "Advertising",
        status: "Active",
    },
    {
        accountNumber: "1012567890",
        fullName: "Emmanuel Smith",
        email: "EmmanuelSmith@gmail.com",
        phoneNumber: "08123456789",
        sector: "Media",
        status: "Inactive",
    },
    {
        accountNumber: "1012567890",
        fullName: "David Olaleye",
        email: "DavidOlaleye@gmail.com",
        phoneNumber: "08123456789",
        sector: "Manufacturing",
        status: "Active",
    },
    {
        accountNumber: "1012567890",
        fullName: "James Uchenna",
        email: "JamesUchenna@gmail.com",
        phoneNumber: "08123456789",
        sector: "Nonprofit",
        status: "Inactive",
    },
]

const authorizedUsers: AuthorizedUser[] = [
    {
        id: "1",
        name: "Olalekan Aminu",
        email: "Olalekan@gmail.com",
        phoneNumber: "08123456789",
        role: "Initiator",
        approvalTier: "Daily/Transaction (N100M - N500M)",
        status: "Active",
    },
    {
        id: "2",
        name: "Victor David",
        email: "Victor@gmail.com",
        phoneNumber: "08123456789",
        role: "Reviewer",
        approvalTier: "Daily/Transaction (N100M - N500M)",
        status: "Active",
        stage: "Level 1"
    },
    {
        id: "3",
        name: "Precious Nwoko",
        email: "Precious@gmail.com",
        phoneNumber: "08123456789",
        role: "Authorizer",
        approvalTier: "Daily/Transaction (N100M - N500M)",
        status: "Active",
        stage: "Level 1"
    },
]

export default function CustomerManagement() {
    const [currentView, setCurrentView] = useState<"list" | "detail">("list")
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("All Status")
    const [currentPage, setCurrentPage] = useState(1)

    // Modal states
    const [addUserOpen, setAddUserOpen] = useState(false)
    const [editUserOpen, setEditUserOpen] = useState(false)
    const [deactivateOpen, setDeactivateOpen] = useState(false)
    const [resetPasswordOpen, setResetPasswordOpen] = useState(false)
    const [deleteUserOpen, setDeleteUserOpen] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [confirmDialog, setConfirmDialog] = useState<{
        open: boolean
        type: "activate" | "deactivate"
        customer: Customer | null
    }>({
        open: false,
        type: "activate",
        customer: null,
    })

    // Form states
    const [selectedUser, setSelectedUser] = useState<AuthorizedUser | null>(null)
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        role: "",
        approvalTier: "",
    })

    const handleViewCustomer = (customer: Customer) => {
        setSelectedCustomer(customer)
        setCurrentView("detail")
    }

    const handleBackToList = () => {
        setCurrentView("list")
        setSelectedCustomer(null)
    }

    const handleNavigate = (route: string) => {
        // Handle navigation
        console.log("Navigate to:", route)
    }

    const handleAddUser = () => {
        setSuccessMessage("You have successfully added new user")
        setSuccessOpen(true)
        setAddUserOpen(false)
        setNewUser({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            role: "",
            approvalTier: "",
        })
    }

    const handleEditUser = () => {
        setSuccessMessage("Operation Successful - User successfully edited")
        setSuccessOpen(true)
        setEditUserOpen(false)
        setSelectedUser(null)
    }

    const handleDeactivateCustomer = () => {
        setSuccessMessage("Operation Successful - Customer deactivated")
        setSuccessOpen(true)
        setDeactivateOpen(false)
    }

    const handleResetPassword = () => {
        setSuccessMessage("Customer password has been reset. New password sent via email address")
        setSuccessOpen(true)
        setResetPasswordOpen(false)
    }

    const handleDeleteUser = () => {
        setSuccessMessage("Operation Successful - User deleted")
        setSuccessOpen(true)
        setDeleteUserOpen(false)
        setSelectedUser(null)
    }

    // const resetUserPassword = (user: AuthorizedUser) => {
    //     // Logic to reset user password
    //     console.log("Reset password for user:", user)
    // }

    const openEditUser = (user: AuthorizedUser) => {
        setSelectedUser(user)
        setEditUserOpen(true)
    }

    const openDeleteUser = (user: AuthorizedUser) => {
        setSelectedUser(user)
        setDeleteUserOpen(true)
    }

    const handleToggleCustomerStatus = (customer: Customer) => {
        setConfirmDialog({
            open: true,
            type: customer.status === "Active" ? "deactivate" : "activate",
            customer: customer,
        })
    }

    const handleConfirmAction = () => {
        if (confirmDialog.customer) {
            setSuccessMessage(
                confirmDialog.type === "activate" 
                    ? "Customer has been successfully activated"
                    : "Customer has been successfully deactivated"
            )
            setSuccessOpen(true)
        }
        setConfirmDialog({ open: false, type: "activate", customer: null })
    }

    const filteredCustomers = customers.filter((customer) => {
        const matchesSearch =
            customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.accountNumber.includes(searchTerm)
        const matchesStatus = statusFilter === "All Status" || customer.status === statusFilter
        return matchesSearch && matchesStatus
    })
    

    if (currentView === "detail" && selectedCustomer) {
        return (
            <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
                <Sidebar />
                <FixedHeader
                    userName="Olalekan Babatunde"
                    userRole="Initiator"
                    showIcons={true}
                />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        pt: 8,
                        px: 6,
                        pb: 3,
                        pl: 3,
                        pr: 3,
                        overflowX: "auto",
                        overflowY: "auto",
                        width: `calc(100vw - ${drawerWidth}px)`, // Proper width calculation
                    }}
                >

                    {/* Page Title */}
                    <Box sx={{ mb: 4, bgcolor: "white", ml: -1.5, mt: 3, borderRadius: 3, boxShadow: "none", width: "100%", height: "90px", }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, mt: 1.5, ml: 2, pt: 1,  fontFamily: "Manrope",
                    fontWeight: 700, fontSize: "23px",
                    lineHeight: "130%",
                    color: "#111827",}}>
                        Customer Management
                    </Typography>
                    <Typography variant="body1" color="#A0AEC0" sx={{ fontFamily: "Manrope", fontWeight: "500",  fontSize: "15px", ml: 2 }}>
                        View, edit, and manage all existing customers
                    </Typography>
                </Box>

                    {/* Account Information Section */}
                        <Box sx={{bgcolor: "white", p: 3, borderRadius: 3, boxShadow: "none", ml: -1.5,}}>
                            <Card sx={{ mb: 3, border: "1px solid #F1F2F4", boxShadow: "none", borderRadius: 3, }}>
                                <CardContent sx={{ p: 3, }}>

                                    {/* TOP ROW (Already left & right aligned) */}
                                    <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mb: 3,
                                        mt: -1.5,
                                        
                                    }}
                                    >
                                    <Typography variant="h6" sx={{fontFamily: "Manrope", fontSize: "18px", fontWeight: "600", lineHeight: "150%", color: "#111827",}}>
                                        Account Information
                                    </Typography>

                                    <Button
                                        variant="outlined"
                                        startIcon={<ChatSupportIcon />}
                                        onClick={() => setResetPasswordOpen(true)}
                                        sx={{ textTransform: "none", bgcolor: "#F8F8F8", borderRadius: 2, 
                                borderColor: "#E0E0E0", fontFamily: "Manrope", fontSize: "14px", fontWeight: "600", color: "#111827", height: "43px"}}
                                    >
                                        Reset Password
                                    </Button>
                                    </Box>
                                    <Divider sx={{ mb: 3 }} />

                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                        {/* Account Details */}
                                        <Box sx={{ display: "flex", gap:9.4, alignItems: "center" }}>
                                            <Typography variant="body2" color="#687588" sx={{fontFamily: "Manrope", fontSize: "15px", fontWeight: "400"}} >
                                                Account Details
                                            </Typography>

                                            <Typography variant="body1" color="#111827" sx={{fontFamily: "Manrope", fontSize: "15px", fontWeight: "500"}}>
                                                {selectedCustomer.fullName} | {selectedCustomer.accountNumber} | Savings Account
                                            </Typography>
                                        </Box>

                                        {/* Email */}
                                        <Box sx={{ display: "flex",gap: 18.7, alignItems: "center" }}>
                                            <Typography variant="body2" color="#687588" sx={{fontFamily: "Manrope", fontSize: "15px", fontWeight: "400"}} >
                                                Email
                                            </Typography>

                                            <Typography variant="body1" color="#111827" sx={{fontFamily: "Manrope", fontSize: "15px", fontWeight: "500"}}>{selectedCustomer.email}</Typography>
                                        </Box>

                                        {/* Phone Number */}
                                        <Box sx={{ display: "flex", gap: 10.5, alignItems: "center", }}>
                                            <Typography variant="body2" color="#687588" sx={{fontFamily: "Manrope", fontSize: "15px", fontWeight: "400"}} >
                                                Phone Number
                                            </Typography>

                                            <Typography variant="body1" color="#111827" sx={{fontFamily: "Manrope", fontSize: "15px", fontWeight: "500"}}>{selectedCustomer.phoneNumber}</Typography>
                                        </Box>

                                        {/* Sector */}
                                        <Box sx={{ display: "flex", gap: 17.8, alignItems: "center" }}>
                                            <Typography variant="body2" color="#687588" sx={{fontFamily: "Manrope", fontSize: "15px", fontWeight: "400"}} >
                                                Sector
                                            </Typography>

                                            <Typography variant="body1" color="#111827" sx={{fontFamily: "Manrope", fontSize: "15px", fontWeight: "500"}}>{selectedCustomer.sector}</Typography>
                                        </Box>

                                        {/* Number of Signatories */}
                                        <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
                                            <Typography variant="body2" color="#687588" sx={{fontFamily: "Manrope", fontSize: "15px", fontWeight: "400"}} >
                                                Number of Signatories
                                            </Typography>

                                            <Typography variant="body1" color="#111827" sx={{fontFamily: "Manrope", fontSize: "15px", fontWeight: "500"}}>2</Typography>
                                        </Box>
                                    </Box>

                                </CardContent>
                            </Card>


                            {/* Authorized Users Section */}
                            <Card sx={{ mb: 3, border: "1px solid #F1F2F4", boxShadow: "none", borderRadius: 3, }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                                        <Typography variant="h6" sx={{fontFamily: "Manrope", fontSize: "18px", fontWeight: "600", lineHeight: "150%", color: "#111827",}}>
                                            Authorized Users
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            startIcon={<PlusIcon />}
                                            onClick={() => setAddUserOpen(true)}
                                            sx={{
                                                bgcolor: "#00CECE",
                                                fontSize: 16,
                                                textTransform: "none",
                                                fontWeight: "500",
                                                borderRadius: "12px",
                                                fontFamily: "Manrope", 
                                                letterSpacing: "0.8px",
                                                boxShadow: "none",
                                                height: "43px",
                                                width: "185px",
                                                "&:hover": { bgcolor: "#00BFBF" },  
                                            }}
                                        > Add New User

                                        </Button>
                                    </Box>

                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, ml: -3 }}>
                                        {authorizedUsers.map((user) => (
                                            <Paper key={user.id} sx={{ 
                                                p: 3, 
                                                borderColor: "grey.200", 
                                                boxShadow: "none", 
                                                pb: 2,
                                                mb: 2,
                                                borderBottom: "1px dashed #D9D9D9",
                                                }}>
                                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                                    <Box sx={{ display: "flex", gap: 2 }}>
                                                        <Avatar sx={{ bgcolor: "grey.300" }}>
                                                            <UserIcon />
                                                        </Avatar>
                                                        <Box>
                                                                <Chip
                                                                    label={user.role}
                                                                    size="small"
                                                                    sx={{
                                                                        fontFamily: "Manrope",
                                                                        width:"95px",
                                                                        bgcolor:
                                                                            user.role === "Initiator"
                                                                                ? "#E7F7EF"
                                                                                : user.role === "Reviewer"
                                                                                    ? "#FFF6D3"
                                                                                    : "#f3e5f5",
                                                                        color:
                                                                            user.role === "Initiator"
                                                                                ? "green"
                                                                                : user.role === "Reviewer"
                                                                                    ? "#f57c00"
                                                                                    : "#7b1fa2",
                                                                    }}
                                                                />
                                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                                                <Typography variant="subtitle1" fontWeight="500" fontFamily="Manrope">
                                                                    {user.name} |
                                                                </Typography>
                                                            <Typography variant="subtitle1" color="black" fontWeight="600" fontFamily="Manrope">
                                                                {user.approvalTier}
                                                            </Typography>
                                                            </Box>
                                                            <Box sx={{display: "flex", alignItems: "center", gap: 0.5, mb: 0.5, }} >
                                                            <Typography variant="body2" color="text.secondary"  fontFamily="Manrope">
                                                                {user.phoneNumber} | 
                                                            </Typography>
                                                            <Typography variant="body1" color="black"  fontFamily="Manrope" fontWeight="700">
                                                                {user.email}
                                                            </Typography>
                                                            </Box>
                                                            <Typography variant="body1" color="#00BFBF" fontWeight={600}>
                                                                {user.stage}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ display: "flex", gap: 1 }}>
                                                        <IconButton size="small" sx={{ color: "grey.400", }} onClick={() => handleResetPassword(user)}>
                                                            <ToolIcon sx={{ width: 20, height: 20 }} />
                                                        </IconButton>
                                                        <IconButton size="small" sx={{ color: "grey.400" }} onClick={() => openEditUser(user)}>
                                                            <EditToolIcon sx={{ width: 20, height: 20 }} />
                                                        </IconButton>
                                                        <IconButton size="small" sx={{ color: "error.main" }} onClick={() => openDeleteUser(user)}>
                                                            <DeleteIcon sx={{ width: 20, height: 20 }} />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                            </Paper>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>

                </Box>

                {/* Modals */}
                {/* Add New User Modal */}
                <Dialog
                    open={addUserOpen}
                    onClose={() => setAddUserOpen(false)}
                    maxWidth="sm"
                    maxHeight="600px"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 8,
                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                            mt: 3,
                            bgcolor: "white",
                            // overflow: "hidden",
                            // overscrollBehavior: "none",
                        }
                    }}
                >
                    <DialogTitle
                        sx={{
                            textAlign: "center",
                            fontWeight: 700,
                            fontSize: "20px",
                            pb: 1,
                            fontFamily: "Manrope",
                            mb: 2,
                            mt: 2,
                            // overflow: "hidden",
                            // overscrollBehavior: "none",
                        }}
                    >
                        Add New User
                    </DialogTitle>
                    <Box sx={{
                        mb: 4
                     }}>
                        <Divider />
                    </Box>

                    <DialogContent sx={{ px: 4, pb: 2, pt: 1,  }}>
                        <Grid container spacing={3} sx={{ display: "flex", flexDirection: "column", }}>

                            <Box sx={{ display: "flex", justifyContent: "space-between",  }}>
                                {/* First Name */}
                                <Grid item xs={12} sm={6} sx={{width: "250px"}} >
                                    <Typography
                                        sx={{
                                            fontFamily: "Manrope, sans-serif",
                                            fontWeight: 500,
                                            fontSize: "15px",
                                            color: "#687588",
                                            mb: 1,
                                        }}
                                    >
                                        First Name <Box component="span" sx={{ color: "red" }}>*</Box>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        // label="First Name"
                                        required
                                        placeholder="Enter First Name"
                                        value={newUser.firstName}
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, firstName: e.target.value })
                                        }
                                    />
                                </Grid>
                            
                                {/* Last Name */}
                                <Grid item xs={12} sm={6} sx={{width: "250px"}} >
                                    <Typography
                                        sx={{
                                            fontFamily: "Manrope, sans-serif",
                                            fontWeight: 500,
                                            fontSize: "15px",
                                            color: "#687588",
                                            mb: 1,
                                        }}
                                    >
                                        Last Name <Box component="span" sx={{ color: "red" }}>*</Box>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        // label="Last Name"
                                        required
                                        placeholder="Enter Last Name"
                                        value={newUser.lastName}
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, lastName: e.target.value })
                                        }
                                    />
                                </Grid>
                        </Box>


                        <Box  sx={{ display: "flex", justifyContent: "space-between"  }}>
                            {/* Email */}
                            <Grid item xs={12} sm={6}  sx={{width: "250px"}}>
                                <Typography
                                    sx={{
                                        fontFamily: "Manrope, sans-serif",
                                        fontWeight: 500,
                                        fontSize: "15px",
                                        color: "#687588",
                                        mb: 1,
                                    }}
                                >
                                    Email <Box component="span" sx={{ color: "red" }}>*</Box>
                                </Typography>
                                <TextField
                                    fullWidth
                                    // label="Email"
                                    required
                                    placeholder="Enter Email"
                                    value={newUser.email}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, email: e.target.value })
                                    }
                                />
                            </Grid>


                            {/* Phone Number */}
                            <Grid item xs={12} sm={6}  sx={{ width: "250px"}}>
                                <Typography
                                    sx={{
                                        fontFamily: "Manrope, sans-serif",
                                        fontWeight: 500,
                                        fontSize: "15px",
                                        color: "#687588",
                                        mb: 1,
                                    }}
                                >
                                    Phone Number <Box component="span" sx={{ color: "red" }}>*</Box>
                                </Typography>
                                <TextField
                                    fullWidth
                                    // label="Phone Number"
                                    required
                                    placeholder="Enter Phone Number"
                                    value={newUser.phoneNumber}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, phoneNumber: e.target.value })
                                    }
                                />
                            </Grid>

                        </Box>                
                            
                        <Box  sx={{ display: "flex", justifyContent: "space-between"  }}>
                            {/* Daily Limit */}
                            <Grid item xs={12} sm={6}  sx={{ width: "250px"}}>
                                <Typography
                                    sx={{
                                        fontFamily: "Manrope, sans-serif",
                                        fontWeight: 500,
                                        fontSize: "15px",
                                        color: "#687588",
                                        mb: 1,
                                    }}
                                >
                                    Daily Limit <Box component="span" sx={{ color: "red" }}>*</Box>
                                </Typography>
                                <TextField
                                    fullWidth
                                    // label="Daily Limit"
                                    required
                                    placeholder="Enter Daily Limit"
                                    value={newUser.dailyLimit}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, dailyLimit: e.target.value })
                                    }
                                />
                            </Grid>

                            {/* Transaction Limit */}
                            <Grid item xs={12} sm={6} sx={{ width: "250px", }} >
                                <Typography
                                    sx={{
                                        fontFamily: "Manrope, sans-serif",
                                        fontWeight: 500,
                                        fontSize: "15px",
                                        color: "#687588",
                                        mb: 1,
                                    }}
                                >
                                    Transaction Limit <Box component="span" sx={{ color: "red" }}>*</Box>
                                </Typography>
                                <TextField
                                    fullWidth
                                    // label="Transaction Limit"
                                    required
                                    placeholder="Enter Transaction Limit"
                                    value={newUser.transactionLimit}
                                    onChange={(e) =>
                                        setNewUser({
                                            ...newUser,
                                            transactionLimit: e.target.value,
                                        })
                                    }
                                    
                                />
                            </Grid>
                        </Box>
                            {/* Role */}
                            <Grid item xs={12} sm={6}>
                                    <Typography
                                        sx={{
                                            fontFamily: "Manrope, sans-serif",
                                            fontWeight: 500,
                                            fontSize: "15px",
                                            color: "#687588",
                                            mb: 1,
                                        }}
                                    >
                                        Role <Box component="span" sx={{ color: "red" }}>*</Box>
                                    </Typography>
                                <FormControl fullWidth required>
                                    <InputLabel>Select Role</InputLabel>
                                    <Select
                                        value={newUser.role}
                                        label="Role"
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, role: e.target.value })
                                        }
                                    >
                                        <MenuItem value="Initiator">Initiator</MenuItem>
                                        <MenuItem value="Reviewer">Reviewer</MenuItem>
                                        <MenuItem value="Authorizer">Authorizer</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Level / Approval Tier */}
                            <Grid item xs={12} sm={6}>
                                <Typography
                                        sx={{
                                            fontFamily: "Manrope, sans-serif",
                                            fontWeight: 500,
                                            fontSize: "15px",
                                            color: "#687588",
                                            mb: 1,
                                        }}
                                    >
                                        Level <Box component="span" sx={{ color: "red" }}>*</Box>
                                    </Typography>
                                <FormControl fullWidth required>
                                    <InputLabel>Select Level</InputLabel>
                                    <Select
                                        value={newUser.approvalTier}
                                        label="Select Level"
                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                approvalTier: e.target.value,
                                            })
                                        }
                                    >
                                        <MenuItem value="Tier 1">Tier 1</MenuItem>
                                        <MenuItem value="Tier 2">Tier 2</MenuItem>
                                        <MenuItem value="Tier 3">Tier 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>

                    <DialogActions
                        sx={{
                            px: 4,
                            pb: 3,
                            pt: 1,
                            // justifyContent: "space-between",
                        }}
                    >
                        <Button
                            onClick={() => setAddUserOpen(false)}
                            sx={{
                                textTransform: "none",
                                fontWeight: 500,
                                fontFamily: "Manrope",
                                bgcolor: "#E9EAEC",
                                color: "#111827",
                                width: "100px",
                                "&:hover": { bgcolor: "#d3d4d6" },
                                // mr: 5,
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            onClick={handleAddUser}
                            sx={{
                                textTransform: "none",
                                bgcolor: "#00CECE",
                                fontWeight: 600,
                                px: 4,
                                "&:hover": { bgcolor: "#00b8b8" },
                                fontFamily: "Manrope",
                                boxShadow: "none",
                            }}
                        >
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>


                {/* Edit User Modal */}
                <Dialog 
                open={editUserOpen} 
                onClose={() => setEditUserOpen(false)} maxWidth="sm" 
                fullWidth 
                PaperProps={{
                    sx: {
                        borderRadius: 8,
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                        mt: 3,
                        bgcolor: "white",
                        fontFamily: "Manrope",
                    }
                }}
                >
                    <DialogTitle 
                    sx={{ 
                        textAlign: "center", 
                         fontWeight: 700,
                            fontSize: "20px",
                            
                            fontFamily: "Manrope",
                            
                            
                     }}
                        >Edit User
                    </DialogTitle>
                    <Box sx={{
                        mb: 1
                     }}>
                        <Divider />
                    </Box>

                    <DialogContent sx={{ p: 3, pb: 2, pt: 1, }}>
                        {selectedUser && (
                            <Grid container spacing={3} sx={{ display: "flex", flexDirection: "column", }} >
                                <Box sx={{ display: "flex", justifyContent: "space-between",  }}>   
                                    <Grid item xs={12} sm={6} sx={{width: "250px"}}>
                                        <Typography
                                        sx={{
                                            fontFamily: "Manrope, sans-serif",
                                            fontWeight: 500,
                                            fontSize: "15px",
                                            color: "#687588",
                                            mb: 1,
                                        }}
                                    >
                                        First Name <Box component="span" sx={{ color: "red" }}>*</Box>
                                    </Typography>
                                    <TextField 
                                    fullWidth 
                                    placeholder="First Name" 
                                    required defaultValue={selectedUser.name.split(" ")[0]} />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{width: "250px"}} >
                                    <Typography
                                        sx={{
                                            fontFamily: "Manrope, sans-serif",
                                            fontWeight: 500,
                                            fontSize: "15px",
                                            color: "#687588",
                                            mb: 1,
                                        }}
                                    >
                                        Last Name <Box component="span" sx={{ color: "red" }}>*</Box>
                                    </Typography>
                                    <TextField 
                                    fullWidth 
                                    placeholder="Last Name" 
                                    required defaultValue={selectedUser.name.split(" ")[1]} />
                                </Grid>
                                </Box>
                                
                                <Box sx={{ display: "flex", justifyContent: "space-between",  }}>   
                                    <Grid item xs={12} sm={6} sx={{width: "250px"}} >
                                        <Typography
                                    sx={{
                                        fontFamily: "Manrope, sans-serif",
                                        fontWeight: 500,
                                        fontSize: "15px",
                                        color: "#687588",
                                        mb: 1,
                                    }}
                                >
                                    Email <Box component="span" sx={{ color: "red" }}>*</Box>
                                </Typography>
                                    <TextField 
                                    fullWidth 
                                    placeholder="Olalekan@gmail.com" 
                                    required defaultValue={selectedUser.email} />
                                </Grid>
                               <Grid item xs={12} sm={6} sx={{width: "250px"}} >
                                                                                                    <Typography
                                    sx={{
                                        fontFamily: "Manrope, sans-serif",
                                        fontWeight: 500,
                                        fontSize: "15px",
                                        color: "#687588",
                                        mb: 1,
                                    }}
                                >
                                    Phone Number <Box component="span" sx={{ color: "red" }}>*</Box>
                                </Typography>
                                    <TextField fullWidth placeholder="Phone Number" required defaultValue={selectedUser.phoneNumber} />
                                </Grid>
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "space-between",  }}>   
                                    <Grid item xs={12} sm={6} sx={{width: "250px"}} >
                                                                                                    <Typography
                                    sx={{
                                        fontFamily: "Manrope, sans-serif",
                                        fontWeight: 500,
                                        fontSize: "15px",
                                        color: "#687588",
                                        mb: 1,
                                    }}
                                >
                                    Daily Limit <Box component="span" sx={{ color: "red" }}>*</Box>
                                </Typography>
                                    <TextField 
                                    fullWidth placeholder=" &#8358; 20,000.00" required defaultValue={selectedUser.dailyLimit} />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{width: "250px"}} >
                                                                                                <Typography
                                    sx={{
                                        fontFamily: "Manrope, sans-serif",
                                        fontWeight: 500,
                                        fontSize: "15px",
                                        color: "#687588",
                                        mb: 1,
                                    }}
                                >
                                    Transaction Limit <Box component="span" sx={{ color: "red" }}>*</Box>
                                </Typography>
                                    <TextField 
                                    fullWidth placeholder=" &#8358; 20,000.00" 
                                    required defaultValue={selectedUser.transactionLimit} />
                                </Grid>
                                </Box>
                                
                                
                                    <Grid item xs={12} sm={6} >
                                         <Typography
                                        sx={{
                                            fontFamily: "Manrope, sans-serif",
                                            fontWeight: 500,
                                            fontSize: "15px",
                                            color: "#687588",
                                            mb: 1,
                                        }}
                                    >
                                        Role <Box component="span" sx={{ color: "red" }}>*</Box>
                                    </Typography>
                                    <FormControl fullWidth required>
                                        {/* <InputLabel>Role</InputLabel> */}
                                        <Select 
                                        value={selectedUser.role} 
                                        placeholder="Role">
                                            <MenuItem value="Initiator">Initiator</MenuItem>
                                            <MenuItem value="Reviewer">Reviewer</MenuItem>
                                            <MenuItem value="Authorizer">Authorizer</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography
                                    sx={{
                                        fontFamily: "Manrope, sans-serif",
                                        fontWeight: 500,
                                        fontSize: "15px",
                                        color: "#687588",
                                        mb: 1,
                                    }}
                                >
                                    Level <Box component="span" sx={{ color: "red" }}>*</Box>
                                </Typography>
                                    <FormControl fullWidth required>
                                        {/* <InputLabel>Level</InputLabel> */}
                                        <Select defaultValue="Tier 1" placeholder="Level">
                                            <MenuItem value="Tier 1">Level 1</MenuItem>
                                            <MenuItem value="Tier 2">Level 2</MenuItem>
                                            <MenuItem value="Tier 3">Level 3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                
                                
                            </Grid>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ p: 3, gap: 2}}>
                        <Button onClick={() => setEditUserOpen(false)} sx={{ 
                                textTransform: "none",
                                fontWeight: 500,
                                fontFamily: "Manrope",
                                bgcolor: "#E9EAEC",
                                color: "#111827",
                                width: "100px",
                                "&:hover": { bgcolor: "#d3d4d6" },
                            }}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleEditUser}
                            sx={{
                                 textTransform: "none",
                                bgcolor: "#00CECE",
                                fontWeight: 600,
                                px: 4,
                                "&:hover": { bgcolor: "#00b8b8" },
                                fontFamily: "Manrope",
                                boxShadow: "none",
                            }}
                        >
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Deactivate Customer Modal */}
                <Dialog open={deactivateOpen} onClose={() => setDeactivateOpen(false)} maxWidth="sm">
                    <DialogTitle sx={{ textAlign: "center", fontWeight: "600" }}>Deactivate Customer</DialogTitle>
                    <DialogContent sx={{ textAlign: "center", p: 3 }}>
                        <Typography color="text.secondary">
                            Are you sure you want to proceed? This action cannot be undone once confirmed.
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, justifyContent: "space-between" }}>
                        <Button onClick={() => setDeactivateOpen(false)} sx={{ textTransform: "none" }}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleDeactivateCustomer}
                            sx={{
                                textTransform: "none",
                                bgcolor: "#4db6ac",
                                "&:hover": { bgcolor: "#00CECE" },
                            }}
                        >
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Reset Password Modal */}
                <Dialog open={resetPasswordOpen} onClose={() => setResetPasswordOpen(false)} maxWidth="xs"  
                    PaperProps={{
                        sx: {
                            boxShadow: "none",
                            borderRadius: 6,
                            bgcolor: "white",

                        }
                    }}
                    >
                    <DialogTitle sx={{ textAlign: "center", fontWeight: "600", fontFamily: "Manrope" }}>Reset Password</DialogTitle>
                    <Divider/>
                    <DialogContent sx={{ textAlign: "center", p: 3 }}>
                        <Typography color="text.secondary" sx={{ fontFamily: "Manrope", fontSize: "14px" }}>
                            Are you sure you want to reset this customer's main account password? A new temporary password will be
                            sent to their registered email address.
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, gap: 1 }}>
                        <Button onClick={() => setResetPasswordOpen(false)} sx={{ 
                                textTransform: "none",
                                bgcolor: "white",
                                fontWeight: 600,
                                px: 4,
                                "&:hover": { bgcolor: "#F1F2F4" },
                                fontFamily: "Manrope",
                                boxShadow: "none", 
                            }}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleResetPassword}
                            sx={{
                                textTransform: "none",
                                bgcolor: "#00CECE",
                                fontWeight: 600,
                                px: 4,
                                "&:hover": { bgcolor: "#00b8b8" },
                                fontFamily: "Manrope",
                                boxShadow: "none",
                            }}
                        >
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Delete User Modal */}
                <Dialog open={deleteUserOpen} onClose={() => setDeleteUserOpen(false)} maxWidth="xs" 
                     PaperProps={{
                        sx: {
                            boxShadow: "none",
                            borderRadius: 6,
                            bgcolor: "white",

                        }
                    }}>
                    <DialogTitle sx={{ textAlign: "center", fontWeight: "600", fontFamily: "Manrope" }}>Delete User</DialogTitle>
                    <Divider/>
                    <DialogContent sx={{ textAlign: "center", p: 3 }}>
                        <Typography color="text.secondary" sx={{ fontFamily: "Manrope", fontSize: "14px" }}>
                            Are you sure you want to delete this user? This action cannot be undone.
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, gap: 1,}}>
                        <Button onClick={() => setDeleteUserOpen(false)} sx={{ 
                            textTransform: "none",
                                bgcolor: "white",
                                fontWeight: 600,
                                px: 4,
                                "&:hover": { bgcolor: "#F1F2F4" },
                                fontFamily: "Manrope",
                                boxShadow: "none" }}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleDeleteUser} sx={{  
                                textTransform: "none",
                                bgcolor: "#00CECE",
                                fontWeight: 600,
                                px: 4,
                                "&:hover": { bgcolor: "#00b8b8" },
                                fontFamily: "Manrope",
                                boxShadow: "none", }}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Confirmation Dialog */}
                <Dialog
                    open={confirmDialog.open}
                    onClose={() => setConfirmDialog({ open: false, type: "activate", customer: null })}
                    maxWidth="xs"
                    fullWidth
                >
                    <DialogTitle>
                        {confirmDialog.type === "activate" ? "Activate Customer" : "Deactivate Customer"}
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="body2" color="text.secondary">
                            Are you sure you want to proceed? This action cannot be undone once confirmed.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={() => setConfirmDialog({ open: false, type: "activate", customer: null })} 
                            color="inherit"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirmAction}
                            variant="contained"
                            sx={{ bgcolor: "#4db6ac", "&:hover": { bgcolor: "#00CECE" } }}
                        >
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Success Modal */}
                <Dialog open={successOpen} onClose={() => setSuccessOpen(false)} maxWidth="sm" 
                   PaperProps={{
                        sx: {
                            borderRadius: 6,
                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                            bgcolor: "white",
                        }
                    }}>
                    <DialogContent sx={{ textAlign: "center", p: 4 , boxShadow: "none", bgcolor: "white", borderRadius: 12,}}>
                        <Box sx={{ mb: 3 }}>
                            <Avatar sx={{ bgcolor: "#4caf50", width: 64, height: 64, mx: "auto", mb: 2 }}>
                                <CheckCircle sx={{ fontSize: 32 }} />
                            </Avatar>
                            <Typography variant="h6" fontWeight="600"  sx={{ mb: 1, fontFamily: "Manrope", }}>
                                Operation Successful
                            </Typography>
                            <Typography fontSize="14px" color="text.secondary" sx={{fontFamily: "Manrope"}} >{successMessage}</Typography>
                        </Box>
                        <Button
                            variant="contained"
                            onClick={() => setSuccessOpen(false)}
                            sx={{
                                width: "100px",
                                textTransform: "none",
                                bgcolor: "#00CECE",
                                "&:hover": { bgcolor: "#00CECE" },
                            }}
                        >
                            Done
                        </Button>
                    </DialogContent>
                </Dialog>
            </Box>
        )
    }

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
            <Sidebar  />
            <FixedHeader
                userName="Olalekan Babatunde"
                userRole="Super Admin"
                showIcons={true}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '44px', width: `calc(100vw - ${drawerWidth}px)`, overflowX: "auto",
                overflowY: "auto",
            }}>


                {/* Page Title */}
                <Box sx={{ mb: 4, bgcolor: "white", ml: -1.5, mt: 3, borderRadius: 3, boxShadow: "none", width: "100%", height: "90px", }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, mt: 1.5, ml: 2, pt: 1,  fontFamily: "Manrope",
                    fontWeight: 700, fontSize: "23px",
                    lineHeight: "130%",
                    color: "#111827",}}>
                        Customer Management
                    </Typography>
                    <Typography variant="body1" color="#A0AEC0" sx={{ fontFamily: "Manrope", fontWeight: "500",  fontSize: "15px", ml: 2 }}>
                        View, edit, and manage all existing customers
                    </Typography>
                </Box>

                {/* Customers Section */}
                <Card sx={{ boxShadow: "none", borderRadius: 3, bgcolor: "white", ml: -1, }}>
                    <CardContent sx={{ minWidth: "100vh", mr: 2 }}>
                        {/* Search and Filter */}
                        <Box sx={{ display: "flex", mb: 3, justifyContent: "space-between" }}>
                            <TextField
                                placeholder="Search Customer"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                 sx={{ width: 350, "& .MuiOutlinedInput-root": { borderRadius: "13px" } }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchOutlineIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FormControl sx={{ minWidth: 220 }}>
                                <Select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    displayEmpty
                                    IconComponent={KeyboardArrowDown}
                                    sx={{ bgcolor: "white", borderRadius: "8px", px: 2, height: "55px", p : 1, mr: 1}}
                                    size="medium"
                                >
                                    <MenuItem value="All Status">All Status</MenuItem>
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Customer Table */}
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: "#1C219F",}}>
                                        <TableCell 
                                        sx={{ 
                                            color: "white", fontWeight: "600",
                                            fontFamily: "Manrope", }}>
                                            <Box sx={{ 
                                                 display: "flex", alignItems: "center", gap:  1, whiteSpace: "nowrap" }}>
                                                 Account Number
                                                <DoubleArrowIcon fontSize="small" />
                                            </Box> 
                                            </TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "600", fontFamily: "Manrope" }}><Box sx={{ 
                                                 display: "flex", alignItems: "center", gap:  1 }}>
                                                 Full Name
                                                <DoubleArrowIcon fontSize="small" />
                                            </Box></TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "600", fontFamily: "Manrope" }}><Box sx={{ 
                                                 display: "flex", alignItems: "center", gap:  1 }}>
                                                 Email
                                                <DoubleArrowIcon fontSize="small" />
                                            </Box></TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "600", fontFamily: "Manrope" }}><Box sx={{ 
                                                 display: "flex", alignItems: "center", gap:  1, whiteSpace: "nowrap" }}>
                                                 Phone Number
                                                <DoubleArrowIcon fontSize="small" />
                                            </Box></TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "600", fontFamily: "Manrope" }}><Box sx={{ 
                                                 display: "flex", alignItems: "center", gap:  1 }}>
                                                 Sector
                                                <DoubleArrowIcon fontSize="small" />
                                            </Box></TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "600", fontFamily: "Manrope" }}><Box sx={{ 
                                                 display: "flex", alignItems: "center", gap:  1 }}>
                                                 Status
                                                <DoubleArrowIcon fontSize="small" />
                                            </Box></TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "600", fontFamily: "Manrope" }}><Box sx={{ 
                                                 display: "flex", alignItems: "center", gap:  1 }}>
                                                 Action
                                                <DoubleArrowIcon fontSize="small" />
                                            </Box></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredCustomers.slice((currentPage - 1) * 7, currentPage * 7).map((customer, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                "&:hover": { bgcolor: "grey.50", cursor: "pointer" },
                                                cursor: "pointer",
                                                fontFamily: "Manrope",
                                            }}
                                            onClick={() => handleViewCustomer(customer)}
                                        >
                                            <TableCell sx={{ fontFamily: "Manrope",}} >{customer.accountNumber}</TableCell>
                                            <TableCell sx={{ fontFamily: "Manrope",}} >{customer.fullName}</TableCell>
                                            <TableCell sx={{ fontFamily: "Manrope",}} >{customer.email}</TableCell>
                                            <TableCell sx={{ fontFamily: "Manrope",}} >{customer.phoneNumber}</TableCell>
                                            <TableCell sx={{ fontFamily: "Manrope",}} >{customer.sector}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={customer.status}
                                                    size="small"
                                                    sx={{width: "100px",
                                                        bgcolor: customer.status === "Active" ? "#E7F7EF" : "#ffebee",
                                                        color: customer.status === "Active" ? "#2e7d32" : "#d32f2f",
                                                        fontFamily: "Manrope",
                                                        p: 2,
                                                        fontWeight: "600",
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: "flex", gap: 1 }}>
                                                    <IconButton 
                                                        size="small" 
                                                        sx={{ color: "grey.600" }}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleViewCustomer(customer)
                                                        }}
                                                    >
                                                        <EyeOutlineIcon width={30} height={30} />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        sx={{
                                                            color: customer.status === "Active" ? "error.main" : "success.main",
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleToggleCustomerStatus(customer)
                                                        }}
                                                    >
                                                        {customer.status === "Active" ? <EyeRedIcon width={30} height={30} /> : <EyeGreenIcon width={30} height={30}/>}
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Pagination */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
                            <Typography variant="body2" color="text.secondary">
                                Showing 1 to 7 of 20 entries
                            </Typography>
                            <Pagination
                                count={Math.ceil(filteredCustomers.length / 7)}
                                page={currentPage}
                                onChange={(e, page) => setCurrentPage(page)}
                                color="#F8F8F8"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}
