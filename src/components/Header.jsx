import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/logo.png";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/userSlice";

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#ffffff", // White background
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow effect\
  borderBottomRightRadius: "1rem",
  borderBottomLeftRadius: "1rem",
  position: "sticky",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const Logo = styled("img")({
  height: "40px",
  cursor: "pointer",
});

const DesktopMenu = styled("div")({
  display: "flex",
  gap: "16px",
  "@media (max-width: 600px)": {
    display: "none",
  },
});

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  "@media (max-width: 600px)": {
    display: "block",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  color: "#000000", // Black text color
  borderColor: "#000000", // Black border
  "&:hover": {
    borderColor: theme.palette.primary.main, // Hover border color
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Slightly transparent background on hover
    color: theme.palette.primary.main, // Change text color on hover
  },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(to right, #FF6F61, #FFCC70)", // Gradient colors
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
}));

const Header = () => {
  const dispatch = useDispatch();
  const { data: user, status } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
    console.log(user);
  }, []);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [anchorE2, setAnchorE2] = useState(null);
  const open2 = Boolean(anchorE2);
  const [anchorElDiscover, setAnchorElDiscover] = useState(null);
  // const [anchorElProfile, setAnchorElProfile] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDiscoverClick = (event) => {
    setAnchorElDiscover(event.currentTarget);
  };

  const handleDiscoverClose = () => {
    setAnchorElDiscover(null);
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   const fetchUser = async () => {
  //     try {
  //       const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user/user`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const data = await response.json();
  //       console.log(data);
  //       if (data?._id) {
  //         localStorage.setItem("user", data?._id);
  //       } else {
  //         console.error("User ID is undefined:", data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  const handleClick = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorE2(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    handleClose();
  };

  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };

  const handleCreatePost = () => {
    navigate("/createPost");
    handleClose();
  };

  return (
    <StyledAppBar>
      <StyledToolbar>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          spacing={2}
          gap={"0.5rem"}
          onClick={() => navigate("/")}
        >
          <Logo src={logo} alt="Logo" width={"40px"} height={"40px"} />
          <GradientText variant="h6" style={{ cursor: "pointer" }}>
            Insight Romer
          </GradientText>
        </Box>
        {isMobile ? (
          <>
            {/* <MobileMenuButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
            >
              <MenuIcon sx={{ color: "black" }} />
            </MobileMenuButton> */}
            <IconButton onClick={handleMenuClick}>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  border: "2px solid",
                  borderColor: "secondary.main",
                }}
                alt="User Name"
                src={user?.profilePicture}
              />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              {localStorage.getItem("token") && (
                <>
                  <MenuItem
                    onClick={() => {
                      navigate("/profile");
                      handleMenuClose();
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/createPost");
                      handleMenuClose();
                    }}
                  >
                    Create a Post
                  </MenuItem>
                </>
              )}
              <MenuItem
                // margin={0}
                // padding={0}
                // variant="text"
                onMouseOver={handleDiscoverClick}
                onMouseLeave={handleDiscoverClose}
              >
                {"Discover" + "  >"}
                <Menu
                  anchorEl={anchorElDiscover}
                  open={Boolean(anchorElDiscover)}
                  onClose={handleDiscoverClose}
                >
                  <MenuItem onClick={() => navigate("/news")}>News</MenuItem>
                  <MenuItem onClick={() => navigate("/food")}>Food</MenuItem>
                </Menu>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/aboutus");
                }}
              >
                About
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/services");
                }}
              >
                Services
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>Contact</MenuItem>
              {localStorage.getItem("token") ? (
                <>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </>
              ) : (
                <StyledButton variant="text" onClick={() => navigate("/login")}>
                  Login
                </StyledButton>
              )}
            </Menu>
          </>
        ) : (
          <DesktopMenu>
            <StyledButton variant="text" onClick={() => navigate("/")}>
              Home
            </StyledButton>
            <StyledButton
              variant="text"
              onMouseEnter={handleDiscoverClick}
              onMouseLeave={handleDiscoverClose}
            >
              {"Discover" + "  >"}
              <Menu
                anchorEl={anchorElDiscover}
                open={Boolean(anchorElDiscover)}
                onClose={handleDiscoverClose}
              >
                <MenuItem onClick={() => navigate("/news")}>News</MenuItem>
                <MenuItem onClick={() => navigate("/food")}>Food</MenuItem>
              </Menu>
            </StyledButton>
            <StyledButton variant="text" onClick={() => navigate("/aboutus")}>
              About
            </StyledButton>
            <StyledButton variant="text" onClick={() => navigate("/services")}>
              Services
            </StyledButton>
            <StyledButton variant="text">Contact</StyledButton>
            {localStorage.getItem("token") ? (
              <>
                <IconButton onClick={handleClick}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      border: "2px solid",
                      borderColor: "secondary.main",
                    }}
                    alt="User Name"
                    src={user?.profilePicture}
                  />
                </IconButton>
                <Menu anchorEl={anchorE2} open={open2} onClose={handleClose}>
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleCreatePost}>Create a Post</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <StyledButton variant="text" onClick={() => navigate("/login")}>
                Login
              </StyledButton>
            )}
          </DesktopMenu>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
