import { Alert, Snackbar } from "@mui/material";
import React from "react";

function NotificationBar({ open, onClose, notificationMsg }) {
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="info" onClose={onClose}>
          {notificationMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default NotificationBar;
