import React, { useEffect, useState } from "react";
import { useSettings } from "../context/SettingContext";
import { Snackbar, Alert } from "@mui/material";

function NotificationSnackbar({ task }) {
  const { settings } = useSettings();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (settings.notifications && task.dueTime) {
      const taskDueTime = new Date(`${task.dueDate}T${task.dueTime}`).getTime();
      const currentTime = new Date().getTime();

      if (taskDueTime <= currentTime) {
        setVisible(true);
        setTimeout(() => setVisible(false), 5000);
      } else {
        const timer = setTimeout(() => {
          setVisible(true);
          setTimeout(() => setVisible(false), 5000);
        }, taskDueTime - currentTime);

        return () => clearTimeout(timer);
      }
    }
  }, [settings.notifications, task.dueDate, task.dueTime]);

  return (
    <Snackbar
      open={visible}
      autoHideDuration={5000}
      onClose={() => setVisible(false)}
    >
      <Alert onClose={() => setVisible(false)} severity="info">
        Task "{task.text}" is due now!
      </Alert>
    </Snackbar>
  );
}

export default NotificationSnackbar;
