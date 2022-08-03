import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";

const SaveButton = styled(Button)(({ theme }) => ({
  width: "25%",
  color: theme.palette.getContrastText(purple[500]),
  // backgroundColor: "#5c7271",
  backgroundColor: "#5d725c",
  "&:hover": {
    // backgroundColor: "#3d4d4c",
    backgroundColor: "#435242",
  },
}));
export default SaveButton;
