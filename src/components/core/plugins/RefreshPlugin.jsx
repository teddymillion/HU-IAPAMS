import { Refresh } from "@mui/icons-material";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

export const RefreshPlugin= (props) => {
    const { onClick } = props;

    return (
        <Tooltip title="Refresh Data">
            <Button variant="text" sx={{ minWidth: "fit-content" }} onClick={onClick}>
                <Refresh sx={{
                    color:'green'
                }} />
            </Button>
        </Tooltip>
    );
};