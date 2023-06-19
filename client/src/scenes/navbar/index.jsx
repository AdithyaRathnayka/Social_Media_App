import React from "react";
import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state/index.jsx";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween.jsx";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [isTermsDialogOpen, setIsTermsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  const handleMessagingClick = (friendId) => {
    setIsMessagingOpen(true);
    setSelectedFriend(friendId);
  };

  const handleMessageSend = () => {
    // Implement your logic for sending the message here
    console.log(`Sending message "${messageInput}" to ${selectedFriend}`);
    setMessageInput("");
  };

  const handleTermsDialogOpen = () => {
    setIsTermsDialogOpen(true);
  };

  const handleTermsDialogClose = () => {
    setIsTermsDialogOpen(false);
  };



  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Sociopedia
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton onClick={() => handleMessagingClick("friendId")}>
            <Message sx={{ fontSize: "25px" }} />
          </IconButton>

        
          <Notifications sx={{ fontSize: "25px" }} />
        

          <IconButton onClick={handleTermsDialogOpen}>
            <Help sx={{ fontSize: "25px" }} />
          </IconButton>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <IconButton onClick={handleTermsDialogOpen}>
              <Help sx={{ fontSize: "25px" }} />
            </IconButton>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}

      {/* TERMS DIALOG */}
      <Dialog open={isTermsDialogOpen} onClose={handleTermsDialogClose}>
        <DialogTitle><h2>Terms and Conditions</h2></DialogTitle>
        <DialogContent>
          <DialogContentText>
         <p> Welcome to Sociopedia! We're here to help you get started and make the most out of your social media experience. 
          Whether you're new to the app or need some assistance with its features, this help guide will
           provide you with the information you need. Let's dive in!</p>

<h3>Creating an Account:</h3>
To create an account, download Sociopedia from the App Store or Google Play Store.
Open the app and tap on the "Sign Up" button.
Enter your email address or phone number and create a strong password.
Follow the on-screen instructions to complete the account creation process.
<h3>Setting Up Your Profile:</h3>
Once you're logged in, tap on the profile icon in the bottom navigation bar.
Edit your profile picture, cover photo, and bio to personalize your profile.
Add your interests, hobbies, and a brief description about yourself to let others know more about you.
<h3>Navigating the App:</h3>
The bottom navigation bar consists of various tabs: Home, Search, Notifications, Messages, and Profile.
The "Home" tab shows a feed of posts from people you follow.
The "Search" tab allows you to discover new users, hashtags, and trending topics.
The "Notifications" tab displays activity related to your posts, such as likes, comments, and new followers.
The "Messages" tab lets you chat privately with other Sociopedia users.
The "Profile" tab shows your own profile and allows you to make changes to your settings.
<h3>Interacting with Posts:</h3>
To like a post, tap the heart icon below it.
Leave a comment by tapping on the speech bubble icon and typing your message.
Share a post by tapping on the arrow icon and selecting the desired sharing option.
To bookmark a post, tap on the bookmark icon, and it will be saved in your "Saved" section for later reference.
<h3>Discovering and Following Users:</h3>
Use the "Search" tab to find users by their usernames or search for specific hashtags.
Explore the "Trending" section to discover popular posts and trending topics.
Tap on a user's profile to view their posts and learn more about them.
To follow a user, tap on the "Follow" button on their profile page.
<h3>Privacy and Security:</h3>
Sociopedia takes your privacy and security seriously. We recommend reviewing and adjusting your privacy settings to suit your preferences.
You can control who can see your posts, who can follow you, and who can message you.
Report any inappropriate or abusive content by tapping on the three-dot menu icon on a post and selecting the "Report" option.
<h3>Additional Features:</h3>
Sociopedia offers additional features such as creating and joining groups, live streaming, and hosting events. Explore the app to find these options and make the most of your social media experience.
We hope this guide has helped you understand the basic functionalities of Sociopedia. If you have any further questions or encounter any issues, feel free to reach out to our support team through the app's settings menu.
 Enjoy connecting and sharing with the Sociopedia community!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTermsDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </FlexBetween>
  );
};

export default Navbar;
