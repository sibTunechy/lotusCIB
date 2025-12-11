import React, { useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";

export default function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showToken, setShowToken] = useState(false);
    const [form, setForm] = useState({ email: "admin@lotus.com", password: "password123", token: "000000" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: hook up real login logic
        navigate("/dashboard");
    };

    return (
        <Box
            sx={{
                // height: "700px",
                // width: "100vw",
                display: "flex",
                flexDirection: "row",
                mb: -3,
                // marginTop: 1,
                // overflow: "hidden",
            }}
        >
            {/* Left Form Section */}
            <Box
                sx={{
                    flex: 1,
                    // pt: 2,
                    height: "100%",
                    display: "flex",
                     width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    bgcolor: "white",
                    // overflow: "hidden",
                    // overflow: "auto",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {/* Logo */}
                <Box mb={3}
                    display="flex"
                    justifyContent="space-between"
                    color="text.secondary"
                    fontSize={12}>
                    <img src="/assets/lotuslogo.png" alt="Lotus Bank" height={40} />
                    <Typography sx={{ cursor: "pointer",
                        fontFamily: "Manrope, sans-serif",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontSize: "14px",
                        lineHeight: "155%",
                        marginRight: 2,
                        letterSpacing: "0%", }}
                    >Corporate Internet Banking</Typography>
                </Box>

                <Box
                    sx={{
                        width: 480,
                        height: 624,
                        opacity: 1,
                        transform: "rotate(0deg)",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        // justifyContent: "center",
                        alignSelf: "center",
                        flexDirection: "column",
                        gap: "50px",
                        backgroundColor: "#fff",
                        // scrollbarWidth: "none",
                        //     "&::-webkit-scrollbar": {
                        //         display: "none",
                        //     }, 
                        p: 4, 
                        // overflow: "auto",
                        // boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                            }}>
                    <Typography 
                            sx={{
                            fontFamily: "Manrope, sans-serif",
                            fontWeight: 700,
                            fontStyle: "normal",
                            fontSize: "30px",
                            lineHeight: "100%",
                            textAlign: "center",
                            color: "#111827",
                        }}
                    >
                        Welcome to LOTUS-EDGE Control Center
                    </Typography>
                    <Typography 
                        variant="body2"
                        color="text.secondary"
                        mb={3}
                        sx={{
                            fontFamily: "Manrope, sans-serif",
                            fontWeight: 500,
                            fontStyle: "normal",
                            fontSize: "16px",
                            lineHeight: "150%",
                            letterSpacing: "0.2px",
                            textAlign: "center",
                            color: "#A0AEC0",
                        }}
                    >
                        Enter your Active Directory credentials to access the admin console
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Box sx={{ width: "100%" }}>
                            <Typography
                                sx={{
                                fontFamily: "Manrope, sans-serif",
                                fontWeight: 500,
                                fontSize: "14px",
                                color: "#687588",
                                display: "flex",
                                overflow: "auto",
                                gap: "2px",
                                }}
                            >
                                Email Address
                                <Box component="span" sx={{ color: "red" }}>
                                *
                                </Box>
                            </Typography>

                            <TextField
                                fullWidth
                                name="email"
                                type="email"
                                placeholder="Enter Email Address"
                                value={form.email}
                                onChange={handleChange}
                                margin="normal"
                                required
                                variant="outlined"
                            />
                        </Box>
                        <Box sx={{ width: "100%" }}>
                            <Typography
                            sx={{
                            fontFamily: "Manrope, sans-serif",
                            fontWeight: 500,
                            fontSize: "14px",
                            color: "#687588",
                            display: "flex",
                            gap: "2px",
                            mt: 2,
                            }}
                            >
                                Password <Box component="span" sx={{ color: "red" }}>*</Box>
                            </Typography>
                            <TextField
                                fullWidth
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                value={form.password}
                                onChange={handleChange}
                                margin="normal"
                                required
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                        <Typography
                            sx={{
                                    fontFamily: "Manrope, sans-serif",
                                    fontWeight: 500,
                                    fontSize: "14px",
                                    color: "#687588",
                                    mt: 2,
                                }}
                            >
                            Token <Box component="span" sx={{ color: "red" }}>*</Box>
                        </Typography>

                        <TextField
                            fullWidth
                            name="token"
                            placeholder="Enter Token"
                            type={showToken ? "text" : "password"}
                            value={form.token}
                            onChange={handleChange}
                            margin="normal"
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowToken(!showToken)}
                                            edge="end"
                                        >
                                            {showToken ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox 
                                disableRipple
                                sx={{
                                    marginLeft: 1,
                                    width: 20,
                                    height: 20,
                                    opacity: 0.6,
                                    transition: "all 0.3s ease",
                                    color: "#B0BEC5",
                                    "&.Mui-checked": {
                                    color: "#00CECE",
                                    }
                                }}
                                />}
                            label={
                                <Typography sx={{ color: "#687588",
                                    fontFamily: "Manrope, sans-serif",
                                    fontWeight: 500,
                                    fontStyle: "normal", 
                                    fontSize: "14px",
                                    lineHeight: "160%",
                                }}>
                                    Remember Me
                                </Typography>
                            }
                            sx={{ gap: 1, }}
                        />

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 3,
                                backgroundColor: "#00CECE",
                                "&:hover": { backgroundColor: "#00b8b8"},
                                py: 1.5,
                                borderRadius: 2,
                                textTransform: "none",
                                fontFamily: "Manrope sans-serif",
                                fontWeight: 700,
                                // fontStyle: "normal",
                                fontSize: "16px",
                                lineHeight: "150%",
                                letterSpacing: "0.3px",
                                textAlign: "center",
                                boxShadow: "none",
                            }}
                        >
                            Login
                        </Button>
                    </form>

                </Box>


                {/* Footer */}
                <Box
                    mt={13}
                    display="flex"
                    justifyContent="space-between"
                    color="text.secondary"
                    fontSize={12}
                >
                    <Typography
                        sx={{
                            fontFamily: "Manrope, sans-serif",
                            fontWeight: 400,
                            fontStyle: "normal",
                            fontSize: "14px",
                            lineHeight: "155%",
                            letterSpacing: "0%",
                        }}
                    >© 2025 LOTUS Bank</Typography>

                    <Box display="flex" gap={1.5}>
                        <Typography sx={{ cursor: "pointer",
                            fontFamily: "Manrope, sans-serif",
                            fontWeight: 400,
                            fontStyle: "normal",
                            fontSize: "14px",
                            lineHeight: "155%",
                            letterSpacing: "0%", }}>All rights reserved</Typography>
                        <Typography sx={{ cursor: "pointer",
                            fontFamily: "Manrope, sans-serif",
                            fontWeight: 400,
                            fontStyle: "normal",
                            fontSize: "14px",
                            lineHeight: "155%",
                            marginRight: 2,
                            letterSpacing: "0%", }}>Privacy Policy</Typography>
                    </Box>
                </Box>
            </Box>

            {/* Right Illustration Section */}
            <Box
                sx={{
                    flex: 1,
                    mt: -1,
                    // border: "5px solid red",
                    backgroundImage: "url(/assets/bluebackground.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "900px",
                    // overflow: "auto",
                    color: "white",
                    // p: 5,
                    display: "flex",
                    // width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box maxWidth={300} textAlign="center">
                    <img
                        src="/assets/loginimages.png"
                        alt="Illustration"
                        style={{marginBottom: 0}}
                    />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        One Platform to Manage All Payments
                    </Typography>
                    <Typography variant="body2" color="white" mb={3}>
                        Managing all your payments and workflows on one unified platform —
                        fully aligned with your enterprise goals.
                    </Typography>
                    <img
                        src="/assets/peopledem.png"
                        alt="Illustration"
                        style={{marginBottom: 24}}
                    />
                    <Typography variant="h5" fontWeight="bold">
                        <CountUp start={0} end={500000} duration={3} separator=","/>+
                    </Typography>
                    <Typography variant="body2">Happy Businesses</Typography>
                </Box>
            </Box>
        </Box>
    );
}
