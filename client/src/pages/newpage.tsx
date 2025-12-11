"use client"

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
    Divider,
} from "@mui/material"
import FixedHeader from "@/components/FixedHeader"
import { FiberManualRecord, Chat, PersonAdd, Add, Delete, CheckCircle } from "@mui/icons-material"
import Sidebar, { drawerWidth } from "@/components/Sidebar"

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

const steps = ["Account Lookup", "Account Confirmation", "Signatory Type", "Add Users", "Review & Submit"]

const roles = ["Initiator", "Authorizer", "Viewer"]
const approvalTiers = ["Tier 1 (N100M - N500M)", "Tier 2 (N100M - N500M)", "Tier 3 (N100M - N1B)"]

export default function CustomerOnboarding() {
    const [activeStep, setActiveStep] = useState(0)
    const [showSuccess, setShowSuccess] = useState(false)

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
        setCustomerData({
            ...customerData,
            accountDetails: "Olalekan Aminu | 10123456789 | Savings Account",
            email: "olalekan1650@gmail.com",
            phoneNumber: "08123456789",
            sector: "Financial Institution",
        })
        setActiveStep(1)
    }

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            setShowSuccess(true)
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
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
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Customer Account Number *
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="10123456789"
                                value={customerData.accountNumber}
                                onChange={(e) => setCustomerData({ ...customerData, accountNumber: e.target.value })}
                                sx={{ mb: 4 }}
                            />
                        </Grid>
                    </Grid>
                )

            case 1:
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
                )

            case 2:
                return (
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Number of Signatories *
                            </Typography>
                            <FormControl fullWidth>
                                <Select
                                    value={customerData.numberOfSignatories}
                                    onChange={(e) =>
                                        setCustomerData({
                                            ...customerData,
                                            numberOfSignatories: Number(e.target.value),
                                        })
                                    }
                                >
                                    <MenuItem value={1}>1 Signatory</MenuItem>
                                    <MenuItem value={2}>2 Signatories</MenuItem>
                                    <MenuItem value={3}>3 Signatories</MenuItem>
                                    <MenuItem value={4}>4 Signatories</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                )

            case 3:
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

            case 4:
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
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Number of Signatories
                                            </Typography>
                                            <Typography variant="body1">{customerData.numberOfSignatories}</Typography>
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
                                        ))}
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
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
                                        ))}

                                    {/* Show message if no complete users */}
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
            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    mt: '44px',
                    p: 3,
                    width: `calc(100vw - ${drawerWidth}px - 50px)`,
                    overflowX: "auto",
                    overflowY: "auto",
                }}
            >

                {/* Page Title */}
                <Box sx={{ mb: 5 }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, color: "black" }}>
                        Customer Onboarding
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Set up new customer access to LOTUS-Edge Banking
                    </Typography>
                </Box>

                {/* Progress Stepper */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Onboarding Progress
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Search and filter staff profiles with management options
                    </Typography>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel
                                    StepIconProps={{
                                        sx: {
                                            "&.Mui-active": {
                                                color: "#1976d2",
                                            },
                                            "&.Mui-completed": {
                                                color: "#1976d2",
                                            },
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
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button onClick={handleBack} disabled={activeStep === 0} variant="outlined" sx={{ minWidth: 120 }}>
                        Go Back
                    </Button>
                    <Button
                        onClick={activeStep === 0 ? handleAccountNumberSubmit : handleNext}
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



//Show message if no complete users
/*                            
 {users.filter((user) => user.firstName && user.lastName && user.email).length === 0 && (
                                <div className="text-center py-8">
                                    <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-sm text-gray-500">
                                        No authorized users added yet. Complete the user information in the previous step.
                                    </p>
                                </div>
                            )}
*/

//Page Title
/*                
 <div className="mb-8">
                    <h1 className="text-3xl font-bold text-black mb-2">Customer Onboarding</h1>
                    <p className="text-gray-600">Set up new customer access to LOTUS-Edge Banking</p>
    </div>
*/

// Progress Stepper
/* <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Onboarding Progress</h2>
                    <p className="text-sm text-gray-600 mb-6">Follow the steps to complete customer onboarding</p>
                    
                    <div className="flex items-center justify-between mb-8">
                        {steps.map((label, index) => (
                            <div key={label} className="flex items-center flex-1">
                                <div className="flex flex-col items-center flex-1">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                                        index <= activeStep 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-gray-300 text-gray-600'
                                    }`}>
                                        {index < activeStep ? '✓' : index + 1}
                                    </div>
                                    <p className={`mt-2 text-sm font-medium ${
                                        index <= activeStep ? 'text-blue-600' : 'text-gray-500'
                                    }`}>
                                        {label}
                                    </p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`h-1 flex-1 mx-4 ${
                                        index < activeStep ? 'bg-blue-600' : 'bg-gray-300'
                                    }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                */

// 
/* <div className="bg-white rounded-lg shadow p-6 mb-6">
                    {renderStepContent(activeStep)}
                </div>
*/

//success dialog
/* {showSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Onboarding Successful</h2>
                        <p className="text-gray-600 mb-6">
                            Customer will receive login credentials and onboarding instructions via email and SMS.
                        </p>
                        <button
                            onClick={() => {
                                setShowSuccess(false)
                                setActiveStep(0)
                                setAccountInfoVisible(false)
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
                            className="px-8 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 min-w-32"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )} */

//Navigation Buttons
/*                 <div className="flex justify-between">
                    <button
                        onClick={handleBack}
                        disabled={activeStep === 0 && !accountInfoVisible}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed min-w-32"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={activeStep === 0 && !accountInfoVisible && !customerData.accountNumber}
                        className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed min-w-32"
                    >
                        {activeStep === steps.length - 1 ? "Submit" : "Continue"}
                    </button>
                </div>*/
