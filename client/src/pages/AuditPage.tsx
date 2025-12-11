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
    IconButton,
    Paper,
    TextField,
    InputAdornment,
    MenuItem,
    Select,
    Button,
    Menu,
    Pagination,
    Card,
    Popover,
} from "@mui/material"
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import { MoreHoriz, Search, ChevronLeft, ChevronRight  } from "@mui/icons-material"
import Sidebar, {drawerWidth} from "@/components/Sidebar"
import { DateRange } from "@mui/icons-material"
import CalendarOutlinedIcon from "@/components/icons/CalendarOutlinedIcon";
import DoubleArrowIcon from "@/components/icons/DoubleArrowIcon";
import SearchOutlineIcon from "@/components/icons/SearchOutlineIcon";
import ExportIcon from "@/components/icons/ExportIcon";
import FixedHeader from "@/components/FixedHeader"; // for the date filter button

interface AuditRecord {
    timestamp: string
    action: string
    performedBy: string
    targetCustomer: string
    branch: string
    status: "Success" | "Failed"
    ipAddress: string
}

const mockAuditTrail: AuditRecord[] = [
    {
        timestamp: "7th of Aug, 2025 02:35 PM",
        action: "Profile Created",
        performedBy: "Olalekan Aminu",
        targetCustomer: "Adeola Ogunleye",
        branch: "Lekki Admiralty",
        status: "Success",
        ipAddress: "192.168.1.45",
    },
    {
        timestamp: "7th of Aug, 2025 02:35 PM",
        action: "Profile Approved",
        performedBy: "Olalekan Aminu",
        targetCustomer: "Chiamaka Eze",
        branch: "Head Office",
        status: "Success",
        ipAddress: "192.168.1.45",
    },
    {
        timestamp: "7th of Aug, 2025 02:35 PM",
        action: "Profile Rejected",
        performedBy: "Olalekan Aminu",
        targetCustomer: "Folake Balogun",
        branch: "Ahmed Onibo",
        status: "Success",
        ipAddress: "192.168.1.45",
    },
    {
        timestamp: "7th of Aug, 2025 02:35 PM",
        action: "Profile Activated",
        performedBy: "Olalekan Aminu",
        targetCustomer: "Kabiru Lawal",
        branch: "Obalende",
        status: "Failed",
        ipAddress: "192.168.1.45",
    },
    {
        timestamp: "7th of Aug, 2025 02:35 PM",
        action: "Profile Created",
        performedBy: "Olalekan Aminu",
        targetCustomer: "Obinna Nwosu",
        branch: "Obalende",
        status: "Success",
        ipAddress: "192.168.1.45",
    },
    {
        timestamp: "7th of Aug, 2025 02:35 PM",
        action: "Profile Created",
        performedBy: "Olalekan Aminu",
        targetCustomer: "Jacob David",
        branch: "Head Office",
        status: "Success",
        ipAddress: "192.168.1.45",
    },
    {
        timestamp: "7th of Aug, 2025 02:35 PM",
        action: "Profile Created",
        performedBy: "Olalekan Aminu",
        targetCustomer: "Olusayo Johnson",
        branch: "Obalende",
        status: "Success",
        ipAddress: "192.168.1.45",
    },
    {
        timestamp: "7th of Aug, 2025 02:35 PM",
        action: "Profile Created",
        performedBy: "Olalekan Aminu",
        targetCustomer: "Alobam Emmanuel",
        branch: "Lekki Admiralty",
        status: "Success",
        ipAddress: "192.168.1.45",
    },
    {
        timestamp: "7th of Aug, 2025 02:35 PM",
        action: "Profile Created",
        performedBy: "Olalekan Aminu",
        targetCustomer: "John Paul",
        branch: "Head Office",
        status: "Success",
        ipAddress: "192.168.1.45",
    },
];
type PaginationProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
};

// Custom pagination actions with ellipsis and styled buttons
function CustomPaginationActions({ count, page, rowsPerPage, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(count / rowsPerPage);
  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => onPageChange(event, page - 1);
  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => onPageChange(event, page + 1);

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      if (page <= 2) {
        pages.push(0, 1, 2, "...", totalPages - 1);
      } else if (page >= totalPages - 3) {
        pages.push(0, "...", totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        pages.push(0, "...", page - 1, page, page + 1, "...", totalPages - 1);
      }
    }

    return pages.map((p, idx) => { 
      if (p === "...") {
        return (
          <IconButton
            key={`ellipsis-${idx}`}
            disabled
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              color: "#9CA3AF",
              border: "1px solid transparent",
            }}
          >
            <MoreHoriz fontSize="small" />
          </IconButton>
        );
      }

      const pageIndex = p as number;
      return (
        <IconButton
          key={pageIndex}
          onClick={(e) => onPageChange(e, pageIndex)}
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            fontSize: "0.875rem",
            bgcolor: page === pageIndex ? "#F3F4F6" : "#fff",
            color: page === pageIndex ? "#000" : "#4B5563",
            border: "1px solid #E5E7EB",
            "&:hover": { bgcolor: "#F9FAFB" },
          }}
        >
          {pageIndex + 1}
        </IconButton>
      );
    });
  };
return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        sx={{
          bgcolor: "#fff",
          border: "1px solid #E5E7EB",
          width: 36,
          height: 36,
          borderRadius: "10px",
          "&:hover": { bgcolor: "#F9FAFB" },
        }}
      >
        <ChevronLeft fontSize="small" />
      </IconButton>

      {renderPageNumbers()}

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= totalPages - 1}
        sx={{
          bgcolor: "#fff",
          border: "1px solid #E5E7EB",
          width: 36,
          height: 36,
          borderRadius: "10px",
          "&:hover": { bgcolor: "#F9FAFB" },
        }}
      >
        <ChevronRight fontSize="small" />
      </IconButton>
    </Box>
  );
}


export default function AuditReportPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [actionFilter, setActionFilter] = useState("All Actions")
    const [currentPage, setCurrentPage] = useState(1)
    const [page, setPage] = useState(0);
     const [rowsPerPage, setRowsPerPage] = useState<number>(6);
    // const itemsPerPage = 6;
      // Date range state
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

      // Sort state for icon rotation only
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({ key: "", direction: "asc" });

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const filteredRecords = mockAuditTrail.filter(
        (record) =>
            record.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.performedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.targetCustomer.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const paginatedRecords = filteredRecords.slice(
        page  * rowsPerPage,
        (page + 1) * rowsPerPage,
    )
        const handleExportClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleExportClose = () => {
        setAnchorEl(null);
    };

     // Calendar popover handlers
        // const handleCalendarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        //     setAnchorEl(event.currentTarget);
        // };

        // const handleCalendarClose = () => {
        //     setAnchorEl(null);
        // };

        // const handleApplyDateFilter = () => {
        //     setPage(0); // Reset to first page when filtering
        //     handleCalendarClose();
        // };

        // const handleClearDateFilter = () => {
        //     setStartDate("");
        //     setEndDate("");
        //     setPage(0);
        //     handleCalendarClose();
        // };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
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
                    mt: "44px",
                    p: 3,
                    pt: 4,
                    pb: 4,
                    width: { xs: "100%", md: `calc(100vw - ${drawerWidth}px)` },
                    overflowX: "auto",
                    overflowY: "auto",
                }}
            >


            {/* Page Title */}
                {/* Section Title + Button */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, mt: 2, bgcolor: "white", borderRadius: 6, height: "90px" }}>
                    <Box>
                        <Typography variant="h5" sx={{ fontFamily: "Manrope",
                        fontWeight: 700,  mb: 0.5, fontSize: "23px",
                        lineHeight: "130%",
                        color: "#111827", ml:1.5 }}>
                            Audit Trail
                        </Typography>
                       <Typography variant="body1" color="#A0AEC0" sx={{ fontWeight: "500", fontFamily: "Manrope", fontSize: "15px", ml: 1.5}}>
                        Monitor system activities and generate compliance reports
                    </Typography>
                    </Box>
                     <Button
                        variant="contained"
                        startIcon={<ExportIcon />}
                        onClick={handleExportClick}
                        sx={{
                            bgcolor: "#00CECE",
                            "&:hover": { bgcolor: "#00B8B8" },
                            textTransform: "none",
                            borderRadius: "12px",
                            boxShadow: "none",
                            px: 3,
                            py: 1,
                            fontSize: 16,
                            fontWeight: "500",
                            mr: 1.8,
                            height: "48px",
                            width: "228px",
                        }}
                    >
                        Generate Report
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleExportClose}
                    >
                        <MenuItem onClick={handleExportClose}>Excel</MenuItem>
                        <MenuItem onClick={handleExportClose}>CSV</MenuItem>
                    </Menu>
                </Box>

                {/* Search + Filters */}
                <Card sx={{  boxShadow: "none", border: "none", borderRadius: "12px"}} >
                    <Box 
                        sx={{ display: "flex", justifyContent: "space-between", mb: 3, mt: 3, flexWrap: "wrap", gap: 2, mr: 1.5, ml: 1.5, }}
                        >
                        <TextField
                            placeholder="Search by user, action"
                            variant="outlined"
                            size="small"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ width: 350, 
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
                        <Box sx={{  display: "flex", gap: 3}}>
                            <Select
                                size="small"
                                value={actionFilter}
                                onChange={(e) => setActionFilter(e.target.value)}
                                sx={{ minWidth: 150, borderRadius: "8px", height: 54, fontFamily: "Manrope",
                                 }}
                            >
                                <MenuItem value="All Actions">All Actions</MenuItem>
                                <MenuItem value="Profile Created">Profile Created</MenuItem>
                                <MenuItem value="Profile Approved">Profile Approved</MenuItem>
                                <MenuItem value="Profile Rejected">Profile Rejected</MenuItem>
                            </Select>

                            <Button
                                variant="outlined"
                                endIcon={<CalendarOutlinedIcon />}
                                // onClick={handleCalendarClick}
                                sx={{
                                borderColor: "#E5E7EB",
                                display: "flex",
                                color: "text.primary",
                                flexDirection: "space-between",
                                textTransform: "none",
                                width: "320px",
                                borderRadius: "8px",
                                fontFamily: "Manrope",
                                height: "55px",
                                fontSize: "15px",
                                px: 3,
                                bgcolor: "white",
                                "&:hover": { borderColor: "#D1D5DB", bgcolor: "#F9FAFB" },
                                "& .MuiButton-endIcon": {
                                    ml: 5.5,
                                },
                                }}
                            >
                                01 Jan 2023 - 10 Mar 2023
                            </Button>

                            {/* <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleCalendarClose}
                                anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                                }}
                                transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                                }}
                                sx={{ mt: 1 }}
                            >
                                <Box sx={{ p: 3, width: 350 }}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Select Date Range
                                </Typography>
                                
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="body2" sx={{ mb: 1, color: "#687588", fontWeight: 500 }}>
                                    Start Date
                                    </Typography>
                                    <TextField
                                    type="date"
                                    fullWidth
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                    />
                                </Box>

                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="body2" sx={{ mb: 1, color: "#687588", fontWeight: 500 }}>
                                    End Date
                                    </Typography>
                                    <TextField
                                    type="date"
                                    fullWidth
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                    />
                                </Box>

                                <Box sx={{ display: "flex", gap: 2 }}>
                                    <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={handleClearDateFilter}
                                    sx={{ textTransform: "none", borderRadius: "8px" }}
                                    >
                                    Clear
                                    </Button>
                                    <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleApplyDateFilter}
                                    sx={{
                                        textTransform: "none",
                                        bgcolor: "#00CECE",
                                        "&:hover": { bgcolor: "#00b8b8" },
                                        borderRadius: "8px",
                                    }}
                                    >
                                    Apply
                                    </Button>
                                </Box>
                                </Box>
                            </Popover>     */}

                        </Box>
                    </Box>

                    {/* Audit Table */}
                    <Box sx={{ mt: 3, px: 0.5, mr: 2, ml: 0.5, }}>   
                    <TableContainer component={Paper} sx={{ mb: 3, width: "72vw", mr: 2, boxShadow:"none", border: "none" }}>
                    <Table>
                           <TableHead >
                                <TableRow
                                    sx={{  
                                    bgcolor: "#1C219F",
                                    borderRadius: "8px 8px 0 0",
                                    "& th": { borderBottom: "none" },
                                    }}
                                >
                                    <TableCell sx={{ color: "white", fontWeight: "bold", fontFamily: "Manrope" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        Timestamp
                                        <DoubleArrowIcon fontSize="small" />
                                    </Box>
                                    </TableCell>

                                    <TableCell sx={{ color: "white", fontWeight: "bold", fontFamily: "Manrope" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        Action
                                        <DoubleArrowIcon fontSize="small" />
                                    </Box>
                                    </TableCell>

                                    <TableCell sx={{ color: "white", fontWeight: "bold", fontFamily: "Manrope" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        Performed By
                                        <DoubleArrowIcon fontSize="small" />
                                    </Box>
                                    </TableCell>

                                    <TableCell sx={{ color: "white", fontWeight: "bold", fontFamily: "Manrope" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        Target Customer
                                        <DoubleArrowIcon fontSize="small" />
                                    </Box>
                                    </TableCell>

                                    <TableCell sx={{ color: "white", fontWeight: "bold", fontFamily: "Manrope" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        Branch
                                        <DoubleArrowIcon fontSize="small" />
                                    </Box>
                                    </TableCell>

                                    <TableCell sx={{ color: "white", fontWeight: "bold", fontFamily: "Manrope" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        Status
                                        <DoubleArrowIcon fontSize="small" />
                                    </Box>
                                    </TableCell>

                                    <TableCell sx={{ color: "white", fontWeight: "bold", fontFamily: "Manrope" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        IP Address
                                        <DoubleArrowIcon fontSize="small" />
                                    </Box>
                                    </TableCell>
                                </TableRow>
                                </TableHead>

                            <TableBody>
                                {paginatedRecords.map((record, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{fontFamily: "Manrope"}} >{record.timestamp}</TableCell>
                                        <TableCell sx={{fontFamily: "Manrope"}} >{record.action}</TableCell>
                                        <TableCell sx={{fontFamily: "Manrope"}} >{record.performedBy}</TableCell>
                                        <TableCell sx={{fontFamily: "Manrope"}} >{record.targetCustomer}</TableCell>
                                        <TableCell sx={{fontFamily: "Manrope"}} >{record.branch}</TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    display: "inline-block",
                                                    width: "100px",
                                                    bgcolor: record.status === "Success" ? "#E8F5E9" : "#FFEBEE",
                                                    color: record.status === "Success" ? "green" : "red",
                                                    px: 1.5,
                                                    py: 0.5,
                                                    mr: 3,
                                                    textAlign: "center",
                                                    borderRadius: "6px",
                                                    fontSize: "0.8rem",
                                                    fontWeight: "bold",
                                                    fontFamily: "Manrope",
                                                }}
                                            >
                                                {record.status}
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{fontFamily: "Manrope"}}>{record.ipAddress}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Box>

                    {/* Pagination */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, ml: 2, }}>
                        <Typography
                            variant="body2"
                            sx={{
                            color: "#6B7280",
                            fontSize: "0.875rem",
                            ml: 0.5,
                            }}
                        >
                            Showing {page * rowsPerPage + 1} to{" "}
                            {Math.min((page + 1) * rowsPerPage, filteredRecords.length)} of{" "}
                            {filteredRecords.length} entries
                        </Typography>

                        {/* Right side: Pagination buttons */}
                        <CustomPaginationActions
                            count={filteredRecords.length}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onPageChange={handleChangePage}
                        />
                    </Box>                    
                </Card>
            </Box>
        </Box>
    )
}
