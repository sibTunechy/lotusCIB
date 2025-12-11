import { useState } from "react"
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogContent,
    IconButton,
    Paper,
    Divider,
} from "@mui/material"
import FixedHeader from "@/components/FixedHeader"
import { FiberManualRecord, Chat, PersonAdd, Add, Delete, CheckCircle } from "@mui/icons-material"
import Sidebar, { drawerWidth } from "@/components/Sidebar"
// import { CheckCircle, UserPlus, Plus, Trash2 } from "lucide-react"

interface CustomerData {
    accountNumber: string
    accountDetails: string
    email: string
    phoneNumber: string
    sector: string
    numberOfSignatories: number
}

interface SubAccount {
    id: string
    name: string
    selected: boolean
}

interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    role: string
    approvalTier: string
}

const steps = ["Account Lookup", "Add Users", "Review & Submit"]

const roles = ["Initiator", "Authorizer", "Viewer"]
const approvalTiers = ["Tier 1 (N100M - N500M)", "Tier 2 (N100M - N500M)", "Tier 3 (N100M - N1B)"]

export default function CustomerOnboarding() {
    const [activeStep, setActiveStep] = useState(0)
    const [showSuccess, setShowSuccess] = useState(false)
    const [accountInfoVisible, setAccountInfoVisible] = useState(false)

    // Customer data state
    const [customerData, setCustomerData] = useState<CustomerData>({
        accountNumber: "",
        email: "",
        phoneNumber: "",
        sector: "",
        accountDetails: "",
        numberOfSignatories: 2,
    })

    // Sub-accounts state
    const [subAccounts, setSubAccounts] = useState<SubAccount[]>([
        { id: "15008123451", name: "Olalekan Aminu", selected: true },
        { id: "15008123452", name: "Olalekan Aminu", selected: false },
    ])

    // Users state
    const [users, setUsers] = useState<User[]>([
        {
            id: "1",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            role: "",
            approvalTier: "",
        },
    ])

    const handleAccountNumberSubmit = () => {
        // Fetch account details (simulated)
        setCustomerData({
            ...customerData,
            accountDetails: "Olalekan Aminu | 10123456789 | Savings Account",
            email: "olalekan1650@gmail.com",
            phoneNumber: "08123456789",
            sector: "Financial Institution",
        })
        setAccountInfoVisible(true)
    }

    const handleNext = () => {
        if (activeStep === 0 && !accountInfoVisible) {
            handleAccountNumberSubmit()
        } else if (activeStep === steps.length - 1) {
            setShowSuccess(true)
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }

    const handleBack = () => {
        if (activeStep === 0 && accountInfoVisible) {
            setAccountInfoVisible(false)
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep - 1)
        }
    }

    const addUser = () => {
        const newUser: User = {
            id: Date.now().toString(),
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            role: "",
            approvalTier: "",
        }
        setUsers([...users, newUser])
    }

    const removeUser = (id: string) => {
        setUsers(users.filter((user) => user.id !== id))
    }

    const updateUser = (id: string, field: keyof User, value: string) => {
        setUsers(users.map((user) => (user.id === id ? { ...user, [field]: value } : user)))
    }

    const toggleSubAccount = (id: string) => {
        setSubAccounts(
            subAccounts.map((account) => (account.id === id ? { ...account, selected: !account.selected } : account)),
        )
    }

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Grid  >
                        {!accountInfoVisible ? (   
                            <Paper elevation={0} sx={{boxShadow: "none"}} >

                            <Grid item xs={12} md={6} 
                                >
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Customer Account Number <span style={{color: "red"}}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Enter Customer Account Number"
                                    value={customerData.accountNumber}
                                    onChange={(e) => setCustomerData({ ...customerData, accountNumber: e.target.value })}
                                    sx={{ mb: 4 }}
                                />
                            </Grid>
                            </Paper>                     
                        ) : (
                            <Grid container spacing={4} >
                                <Grid item xs={12} md={6}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" sx={{ mb: 3 }}>
                                                Account Information
                                            </Typography>
                                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                                <Box>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Account Details
                                                    </Typography>
                                                    <Typography variant="body1">{customerData.accountDetails}</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Email
                                                    </Typography>
                                                    <Typography variant="body1">{customerData.email}</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Phone Number
                                                    </Typography>
                                                    <Typography variant="body1">{customerData.phoneNumber}</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Sector
                                                    </Typography>
                                                    <Typography variant="body1">{customerData.sector}</Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" sx={{ mb: 3 }}>
                                                Sub-Accounts Information
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                Select sub-account(s) to onboard
                                            </Typography>
                                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                                {subAccounts.map((account) => (
                                                    <FormControlLabel
                                                        key={account.id}
                                                        control={<Checkbox checked={account.selected} onChange={() => toggleSubAccount(account.id)} />}
                                                        label={
                                                            <Box>
                                                                <Typography variant="body1">{account.id}</Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {account.name}
                                                                </Typography>
                                                            </Box>
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                )

            case 1:
                return (
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            {users.map((user, index) => (
                                <Card key={user.id} sx={{ mb: 3 }}>
                                    <CardContent>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                            <Typography variant="h6">User {index + 1}</Typography>
                                            {users.length > 1 && (
                                                <IconButton onClick={() => removeUser(user.id)} color="error">
                                                    <Delete />
                                                </IconButton>
                                            )}
                                        </Box>
                                        <Grid container spacing={2}>
                                            {/* First row - basic info */}
                                            <Grid item xs={12} md={3}>
                                                <TextField
                                                    fullWidth
                                                    label="First Name *"
                                                    placeholder="Enter First Name"
                                                    value={user.firstName}
                                                    onChange={(e) => updateUser(user.id, "firstName", e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <TextField
                                                    fullWidth
                                                    label="Last Name *"
                                                    placeholder="Enter Last Name"
                                                    value={user.lastName}
                                                    onChange={(e) => updateUser(user.id, "lastName", e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <TextField
                                                    fullWidth
                                                    label="Email *"
                                                    placeholder="Enter Email"
                                                    value={user.email}
                                                    onChange={(e) => updateUser(user.id, "email", e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <TextField
                                                    fullWidth
                                                    label="Phone Number *"
                                                    placeholder="Enter Phone Number"
                                                    value={user.phoneNumber}
                                                    onChange={(e) => updateUser(user.id, "phoneNumber", e.target.value)}
                                                />
                                            </Grid>

                                            {/* Second row - role and approval tier with better spacing */}
                                            <Grid item xs={12} md={6}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Role *</InputLabel>
                                                    <Select
                                                        value={user.role}
                                                        label="Role *"
                                                        onChange={(e) => updateUser(user.id, "role", e.target.value)}
                                                    >
                                                        {roles.map((role) => (
                                                            <MenuItem key={role} value={role}>
                                                                {role}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Approval Tier *</InputLabel>
                                                    <Select
                                                        value={user.approvalTier}
                                                        label="Approval Tier *"
                                                        onChange={(e) => updateUser(user.id, "approvalTier", e.target.value)}
                                                    >
                                                        {approvalTiers.map((tier) => (
                                                            <MenuItem key={tier} value={tier}>
                                                                {tier}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            ))}
                            <Button variant="outlined" startIcon={<Add />} onClick={addUser} sx={{ mt: 2 }} fullWidth>
                                Add Another User
                            </Button>
                        </Grid>
                    </Grid>
                )

            case 2:
                return (
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 3 }}>
                                        Account Information
                                    </Typography>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Account Details
                                            </Typography>
                                            <Typography variant="body1">{customerData.accountDetails}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Email
                                            </Typography>
                                            <Typography variant="body1">{customerData.email}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Phone Number
                                            </Typography>
                                            <Typography variant="body1">{customerData.phoneNumber}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Sector
                                            </Typography>
                                            <Typography variant="body1">{customerData.sector}</Typography>
                                        </Box>
                                    </Box>

                                    <Divider sx={{ my: 3 }} />

                                    <Typography variant="h6" sx={{ mb: 2 }}>
                                        Sub-Accounts
                                    </Typography>
                                    {subAccounts
                                        .filter((account) => account.selected)
                                        .map((account) => (
                                            <Box key={account.id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                                <Checkbox checked disabled />
                                                <Box>
                                                    <Typography variant="body1">{account.id}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {account.name}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ))
                                    }
                                </CardContent>
                            </Card>

                        </Grid>

                        <Grid  item xs={12} md={6} >
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 3 }}>
                                        Authorized Users
                                    </Typography>
                                    {users
                                        .filter((user) => user.firstName && user.lastName && user.email)
                                        .map((user, index) => (
                                            <Box key={user.id} sx={{ mb: 3, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                                    <PersonAdd sx={{ color: "primary.main" }} />
                                                    <Typography variant="subtitle1" fontWeight="medium">
                                                        {user.firstName} {user.lastName} - Tier {index + 1} ({user.approvalTier || "N100M - N500M"})
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ ml: 4 }}>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                        Account: {customerData.accountNumber} | Role: {user.role || "Initiator"}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                        Email: {user.email}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Phone: {user.phoneNumber}
                                                    </Typography>
                                                </Box>
                                                {index < users.filter((u) => u.firstName && u.lastName && u.email).length - 1 && (
                                                    <Divider sx={{ mt: 2 }} />
                                                )}
                                            </Box>
                                        ))
                                    }


                                    {users.filter((user) => user.firstName && user.lastName && user.email).length === 0 && (
                                        <Box sx={{ textAlign: "center", py: 4 }}>
                                            <PersonAdd sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                                            <Typography variant="body2" color="text.secondary">
                                                No authorized users added yet. Complete the user information in the previous step.
                                            </Typography>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                            
                    </Grid>
                )

            default:
                return null
        }
    }
    // Custom Step Icon (this replaces the default icon)
        function CustomStepIcon(props) {
        const { active, completed, icon } = props;

        const isBlue = active || completed;

        return (
            <div
            style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isBlue ? "#0D1E70" : "#E5E7EB", // blue or light gray
                color: isBlue ? "white" : "#6B7280",
                fontWeight: 600,
                fontSize: 16,
            }}
            >
            {icon} {/* Always show step number */}
            </div>
        );
        }

    return (
        <Box  
            sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
                    {/* Sidebar */}
                    <Sidebar />
                    <FixedHeader
                        userName="Olalekan Babatunde"
                        userRole="Super Admin"
                        showIcons={true}
                    />
            <Box  
                component="main"
                sx={{
                    flexGrow: 1,
                    mt: '44px',
                    p: 3,
                    width: `calc(100vw - ${drawerWidth}px - 50px)`,
                    overflowX: "auto",
                    overflowY: "auto",
                }} >
                {/* Page Title */}
                <Box sx={{ display: "flex", flexDirection: "column", mb: 3, mt: 2, bgcolor: "white", borderRadius: 6, height: "90px"}}>
                    <Typography variant="h5" sx={{ fontFamily: "Manrope",
                        fontWeight: 700,  mb: 0.5, mt: 2, fontSize: "23px",
                        lineHeight: "130%",
                        color: "#111827", ml:1.5 }}>
                            Customer Onboarding
                        </Typography>
                    <Typography variant="body1" color="#A0AEC0" sx={{ fontWeight: "500", fontFamily: "Manrope", fontSize: "15px", ml: 1.5,}}>
                        Set up new customer access to LOTUS-Edge Banking
                    </Typography>
                </Box>

                {/* Progress Stepper */}
                <Box sx={{ mb: 4, bgcolor: "white", p: 2, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontFamily: "Manrope", fontWeight: 400 }}>
                            Onboarding Progress
                        </Typography>
                        <Divider sx={{mb: 5}} />
                        <Stepper
                            activeStep={activeStep}
                            alternativeLabel={false}
                            sx={{
                                "& .MuiStepConnector-line": {
                                borderColor: "#ECECEC",
                                borderTopWidth: 1.5,
                                },
                            }}
                            >
                            {steps.map((label, index) => (
                                <Step key={label} completed={index < activeStep}>
                                <StepLabel
                                    StepIconComponent={CustomStepIcon} // <-- use custom icon
                                    sx={{
                                    "& .MuiStepLabel-label": {
                                        fontFamily: "Manrope",
                                        fontSize: 16,
                                        color: "#9CA3AF",
                                        marginLeft: 1.5,
                                    },
                                    "& .MuiStepLabel-label.Mui-active": {
                                        color: "black",
                                        fontWeight: 500,
                                    },
                                    }}
                                >
                                    {label}
                                </StepLabel>
                                </Step>
                            ))}
                            </Stepper>


                </Box>
                
                {/* Step Content */}
                <Card sx={{ p: 3, mb: 4 }}>{renderStepContent(activeStep)}</Card>

                {/* Navigation Buttons */}
                <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                    <Button onClick={handleBack} disabled={activeStep === 0 && !accountInfoVisible} variant="outlined" sx={{ minWidth: 120 }}>
                        Go Back
                    </Button>
                    <Button
                        onClick={handleNext}
                        variant="contained"
                        sx={{
                            minWidth: 120,
                            bgcolor: "#4db6ac",
                            "&:hover": { bgcolor: "#26a69a" },
                        }}
                        disabled={activeStep === 0 && !customerData.accountNumber}
                    >
                        {activeStep === 0 ? "Continue" : activeStep === steps.length - 1 ? "Submit" : "Continue"}
                    </Button>
                </Box>                                
            </Box>

            {/* Success Dialog */}
                <Dialog
                    open={showSuccess}
                    onClose={() => setShowSuccess(false)}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 3,
                            p: 2,
                            textAlign: "center",
                        },
                    }}
                >
                    <DialogContent>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                            <Box
                                sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: "50%",
                                    bgcolor: "#4caf50",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <CheckCircle sx={{ fontSize: 40, color: "white" }} />
                            </Box>
                            <Typography variant="h5" fontWeight="bold">
                                Onboarding Successful
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
                                Customer will receive login credentials and onboarding instructions via email and SMS.
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setShowSuccess(false)
                                    setActiveStep(0)
                                    // Reset form data
                                    setCustomerData({
                                        accountNumber: "",
                                        email: "",
                                        phoneNumber: "",
                                        sector: "",
                                        accountDetails: "",
                                        numberOfSignatories: 2,
                                    })
                                    setUsers([
                                        {
                                            id: "1",
                                            firstName: "",
                                            lastName: "",
                                            email: "",
                                            phoneNumber: "",
                                            role: "",
                                            approvalTier: "",
                                        },
                                    ])
                                }}
                                sx={{
                                    minWidth: 120,
                                    bgcolor: "#4db6ac",
                                    "&:hover": { bgcolor: "#26a69a" },
                                }}
                            >
                                Done
                            </Button>
                        </Box>
                    </DialogContent>
                </Dialog>
        </Box>
    )
}