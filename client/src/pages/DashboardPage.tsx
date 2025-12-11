"use client"

import { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
// import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import FixedHeader from "@/components/FixedHeader";
import RotateIcon from "@/components/icons/RotateIcon";
import {
    TrendingUp,
    TrendingDown,
    People,
    CreditCard,
    AccountCircle,
    PersonOff,
    Info,
    ShowChart,
    InfoOutline,
    ArrowDropDown,
} from "@mui/icons-material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import Sidebar, { drawerWidth } from "@/components/Sidebar";
import { info } from "console";
import { Button } from "@mui/material";

// Dummy data
const transactionData = [
    { month: "Jan", amount: 150000000, max: 100000000 },
    { month: "Feb", amount: 380000000, max: 100000000 },
    { month: "Mar", amount: 200000000, max: 100000000 },
    { month: "Apr", amount: 520000000, max: 100000000 },
    { month: "May", amount: 420000000, max: 100000000 },
    { month: "Jun", amount: 650000000, max: 100000000 },
    { month: "Jul", amount: 850000000, max: 100000000 },
    { month: "Aug", amount: 580000000, max: 100000000 },
    { month: "Sep", amount: 380000000, max: 100000000 },
    { month: "Oct", amount: 150000000, max: 100000000 },
    { month: "Nov", amount: 450000000, max: 100000000 },
    { month: "Dec", amount: 180000000, max: 100000000 },
]


export default function CorporateBankingDashboard() {
    const [setSelectedMetric] = useState<string | null>(null)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedFilter, setSelectedFilter] = useState("Today");
    const [activeIndex, setActiveIndex] = useState(-1);


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSelect = (option: string) => {
        setSelectedFilter(option);
        handleClose();
    };
    const CustomBar = (props: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const { x, y, width, height, fill, value } = props;
  
    return (
      <g
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* The bar itself */}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          rx={20}
          ry={20}
          style={{ cursor: "pointer" }}
        />
        
        {/* The label that appears on hover */}
        {isHovered && (
          <text
            x={x + width / 2}
            y={y - 10}
            fill="#1C219F"
            textAnchor="middle"
            fontSize={15}
            fontWeight={600}
            fontFamily="Manrope, sans-serif"
          >
            {`${(value / 1_000_000).toFixed(1)}M`}
          </text>
        )}
      </g>
        );
    };

    const metrics = [
        {
            id: "corporate-accounts",
            title: "Total Corporate Accounts",
            value: "2,847",
            change: "+5.1%",
            changeType: "positive",
            info: "green",
            subtitle: "+112 from yesterday",
            icon: People,
        },
        {
            id: "daily-transactions",
            title: "Daily Transaction Count",
            value: "45.2K",
            change: "+5.1%",
            changeType: "positive",
            info: "blue",
            subtitle: "+112 from yesterday",
            icon: CreditCard,
        },
        {
            id: "active-accounts",
            title: "Total Active Accounts",
            value: "1647",
            change: "+5.1%",
            changeType: "positive",
            info: "green",
            subtitle: "+112 from yesterday",
            icon: AccountCircle,
        },
        {
            id: "inactive-accounts",
            title: "Total Inactive Accounts",
            value: "1200",
            change: "-25.5%",
            changeType: "negative",
            info: "orange",
            subtitle: "-12 from yesterday",
            icon: PersonOff,
        },
    ];

    return (
        
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
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
                    mt: "44px",
                    p: 4,
                    width: { xs: "100%", md: `calc(100vw - ${drawerWidth}px - 60px)` },
                    // overflowX: "auto",
                    // overflowY: "auto",
                    ml: -2,
                    // overflowX: "hidden",
                    // border: "5px solid red",
                    height: "100vh",
                    
                }}
            >

            <Box
                    sx={{
                        transform: { xs: "scale(1)", md: "scale(0.8)" },
                        transformOrigin: "top left",
                        width: { xs: "100%", md: "calc(100% / 0.8)" },
                    }}
                >

                    {/* Page Title */}
                    <Box 
                        sx={{
                             display: "flex",
                             justifyContent: "space-between", bgcolor: "white",
                             mb: 2,
                             mt: 2,
                             height: "100px",
                             width: "100%",
                             borderRadius: "12px",
                         }}>
                        <Box sx={{ mb: 4 }}>
                            <Typography fontWeight="bold" sx={{ color: "#111827", 
                            fontFamily: "Manrope", mb: 0.5,
                            fontSize: 32, ml: 1,

                            }}>
                                Corporate Banking Overview
                            </Typography>
                            <Typography variant="h6" color="#A0AEC0" sx={{ fontFamily: "Manrope" , ml: 1, }}>
                                Real-time monitoring and management of corporate internet banking operations
                            </Typography>
                        </Box>

                        <Box sx={{ pt: 3}}>
                            <Button
                                variant="contained"
                                endIcon={<ChevronDownIcon />}
                                sx={{
                                    bgcolor: "#00CECE",
                                    fontSize: 18,
                                    textTransform: "none",
                                    fontWeight: "500",
                                    borderRadius: "12px",
                                    fontFamily: "Manrope", 
                                    mr: 4,
                                    letterSpacing: "0.8px",
                                    boxShadow: "none",
                                    // px: 3,
                                    // py: 1.5,
                                    height: "55px",
                                    width: "220px",
                                    "&:hover": { bgcolor: "#00BFBF" },  
                                }}
                                onClick={(e) => setAnchorEl(e.currentTarget)}
                            >
                                Filter Dashboard
                            </Button>
                            <Menu anchorEl={anchorEl} 
                                    open={Boolean(anchorEl)} 
                                    onClose={handleClose}
                                    PaperProps={{ elevation: 3, 
                                    sx: { 
                                        mt: 1,
                                        minWidth: 160,
                                        borderRadius: "12px",
                                        },
                                         }}
                                         > {["Today", "Last Week", "Last Month"].map((option) => (
                                            <MenuItem 
                                                key={option}
                                                onClick={() => handleSelect(option)}
                                                sx={{
                                                    fontFamily: "Manrope sans-serif",
                                                    fontWeight: selectedFilter === option ? "600" : "500",
                                                    color: selectedFilter === option ? "#000000" : "text.primary",
                                                    "&:hover": { bgcolor: "#f0f0f0" },
                                                }}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                        </Box>
                    </Box>

                    {/* Metrics Cards */}
                    <Grid container 
                        spacing={1} 
                    sx={{ 
                        mb: 4, 
                        width: "94vw",
                        justifyContent: "flex-start",
                        boxShadow: "none",
                        overflowX: "hidden",
                         }}>
                        {metrics.map((metric) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={metric.id} sx={{ display: "flex",}}>
                                <Card
                                    sx={{ 
                                        cursor: "pointer",
                                        width: 350.5,
                                        height: 180,
                                        flexGrow: 1,
                                        border: "1px transparent solid",
                                        transition: "all 0.2s", 
                                         "&:hover": 
                                        { boxShadow: "none" },
                                        boxShadow: "none",
                                        display: "flex",  
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        borderRadius: "20px",
                                     }}
                                    onClick={() => setSelectedMetric(metric.id)}
                                >
                                    <CardContent sx={{ 
                                        p: 3, 
                                        flexGrow: 1,
                                        }}>
                                        <Box sx={{ 
                                            display: "flex", justifyContent: "space-between", 
                                            mb: 2 }}>
                                            <Typography variant="h6"
                                             fontWeight="bold">
                                                {metric.title}
                                            </Typography>
                                            <InfoOutlineIcon sx={{ 
                                                fontSize: 26, 
                                                color: 
                                                metric.info === "green" 
                                                ? "success.main" 
                                                : metric.info === "blue" 
                                                ? "info.main" 
                                                : metric.info === "orange"
                                                ? "warning.main"
                                                : "text.secondary",
                                                pt: 0.3, 
                                                pr: 2.5 }} />
                                        </Box>
                                        <Box sx={{ 
                                            display: "flex", 
                                            alignItems: "center", 
                                            gap: 2, 
                                            mb: 1 }}>
                                            <Typography variant="h4" fontWeight="bold">
                                                {metric.value}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    bgcolor: metric.changeType === "positive" ? "rgba(209, 250, 229, 0.9)" : "rgba(254, 226, 226, 0.9)",
                                                    borderRadius: "20px",
                                                    px: 1.5,
                                                    py: 0.2,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 0.5,
                                                    color: metric.changeType === "positive" ? "success.main" : "error.main",
                                                }}
                                            >
                                                {metric.changeType === "positive" ? (
                                                    <TrendingUp sx={{ fontSize: 16 }} />
                                                ) : (
                                                    <TrendingDown sx={{ fontSize: 16 }} />
                                                )}
                                                <Typography variant="body2" fontWeight="bold" 
                                                    sx={{color: "inherit", fontSize: "0.9rem"}}>
                                                    {metric.change}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Typography variant="body2" color="#A0AEC0" sx={{ pt: 1.5 }}>
                                            {metric.subtitle}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Transaction Trend Chart */}
                    <Card
                        sx={{
                            borderRadius: 3,
                            bgcolor: "#F9FAFB",
                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                            ml: 1,
                        }}
                        >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, fontFamily: "Manrope", ml: 2,}}>
                            <RotateIcon sx={{ color: "#1E3A8A" }} />
                            <Typography variant="h6" fontWeight="700" color="#111827">
                            Transaction Trend
                            </Typography>
                        </Box>

                       <ResponsiveContainer width="100%" height={600}>
                            <BarChart
                                data={transactionData}
                                margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                                // onMouseMove={(state) => {
                                // if (state && state.activeTooltipIndex !== undefined) {
                                //     setActiveIndex(state.activeTooltipIndex);
                                // }
                                // }}
                                // onMouseLeave={() => setActiveIndex(-1)}
                            >
                                <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#6B7280", fontSize: 17 }}
                                />

                                <YAxis
                                    domain={[0, (dataMax) => dataMax * 1.1]}
                                    ticks={[0, 100_000_000, 200_000_000, 400_000_000, 600_000_000, 800_000_000, 1_000_000_000]} // custom ticks
                                    tickFormatter={(value) => {
                                        if (value === 1_000_000_000) return "1B"; // top value as 1B
                                        return `${value / 1_000_000}M`; // all others in M
                                    }}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#64748B", fontSize: 17 }}
                                />  


                                {/* <YAxis
                                domain={[0, (dataMax) => dataMax * 1.1]} // FIX: removes bottom space
                                tickFormatter={(value) => `${value / 1000000}M`}
                                tick={{ fill: "#64748B", fontSize: 13 }}
                                /> */}

                                <Tooltip
                                cursor={{ fill: "rgba(30,58,138,0.05)", radius: 30 }}
                                formatter={(value) => [`${Math.round(value / 1_000_000)}`, "Value (M)"]}
                                contentStyle={{
                                    backgroundColor: "rgba(255, 255, 255, 0.98)",
                                    border: "1px solid #00CECE",
                                    borderRadius: 12,
                                    boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
                                    padding: "10px 14px",
                                }}
                                labelStyle={{ fontWeight: "600", color: "#00CECE" }}
                                itemStyle={{ color: "#00CECE", fontWeight: 500 }}
                                />

                                <Bar
                                dataKey="amount"
                                fill="#1C219F"
                                radius={[20, 20, 35, 35]}
                                barSize={80}
                                shape={<CustomBar/>}
                                />
                            </BarChart>
                        </ResponsiveContainer>

                    </Card>
                </Box>
            </Box>
        </Box>
    )
}