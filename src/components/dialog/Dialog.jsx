import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, DialogActions, DialogContent, DialogTitle, Divider, Dialog as MuiDialog, Slide, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

export const Dialog = ({
    open,
    title,
    subtitle,
    size,
    fullScreen = false,
    hideCloseIcon = false,
    contentWrappedWithForm,
    contentSx,
    actions,
    onClose,
    rightHeading,
    sx,
    children,
}) => {
    const generateActions = () => {
        if (actions) {
            return (
                <DialogActions sx={{ marginTop: 0.5 }}>
                    {actions.map((action, index) => (
                        <Button
                            key={index}
                            variant={action.variant}
                            color="primary"
                            type={action.type}
                            disabled={action.disabled}
                            onClick={action.onClick}
                            size="large"
                            sx={{ marginRight: "5px" }}
                        >
                            {action.label}
                        </Button>
                    ))}
                </DialogActions>
            );
        }
    };

    const renderForm = () => {
        const actionsButtons = generateActions();
        if (contentWrappedWithForm) {
            return (
                <form onSubmit={contentWrappedWithForm.onSubmit}>
                    <DialogContent sx={{ overflowY: "auto", maxHeight: "70vh" }}>
                        {children}
                    </DialogContent>
                    <Divider />
                    {actionsButtons}
                </form>
            );
        }
        return (
            <>
                <DialogContent sx={contentSx}>{children}</DialogContent>
                <Divider />
                {actionsButtons}
            </>
        );
    };

    return (
        <MuiDialog
            open={open}
            fullScreen={fullScreen}
            onClose={onClose}
            maxWidth={size}
            fullWidth
            TransitionComponent={fullScreen ? Transition : undefined}
            sx={sx}
        >
            <DialogTitle
            // sx={(theme) => ({
            //     background: theme.palette.primary.main,
            //     color: "#fff",
            // })}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight="medium">
                        {title}
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" gap={2} alignItems="center">
                        {rightHeading && rightHeading}
                        {!hideCloseIcon && (
                            <Box sx={{ cursor: "pointer" }} onClick={onClose}>
                                <CloseIcon />
                            </Box>
                        )}
                    </Box>
                </Box>
                <Typography variant="body1" color="rgb(38, 38, 38)">
                    {subtitle}
                </Typography>
            </DialogTitle>
            <Divider />
            {renderForm()}
        </MuiDialog>
    );
};

Dialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
    contentSx: PropTypes.object,
    fullScreen: PropTypes.bool,
    hideCloseIcon: PropTypes.bool,
    contentWrappedWithForm: PropTypes.shape({
        onSubmit: PropTypes.func.isRequired,
    }),
    onClose: PropTypes.func,
    children: PropTypes.node,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(["button", "submit"]).isRequired,
            variant: PropTypes.oneOf(["text", "outlined", "contained"]),
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
            disabled: PropTypes.bool,
            loading: PropTypes.bool,
            onClick: PropTypes.func,
        })
    ),
    sx: PropTypes.object,
    rightHeading: PropTypes.node,
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});