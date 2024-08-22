// Singleton User to Manage
import authStatus from './AuthStatusEnum';
import { useState } from 'react';

class CurrentUser {
  static instance;

  constructor(name, email, userStatuses, currentStatus, uid, isSignedIn) {
    if (!CurrentUser.instance) {
      this.name = name;
      this.email = email;
      this.userStatuses = userStatuses;
      this.currentStatus = currentStatus;
      this.uid = uid;
      this.isSignedIn = isSignedIn;
      CurrentUser.instance = this;
    } else {
      return CurrentUser.instance;
    }
  }

  setCurrentStatus(newStatus) {
    this.currentStatus = newStatus;
    localStorage.setItem("currentStatus", newStatus);
    // Optionally, emit an event to notify other components
  }
 
  // Add your User object methods here (e.g., logout, updateStatus) 
}

const user = new CurrentUser(
  "John Doe", // Replace with actual name retrieval logic
  "jdoe@example.com", // Replace with actual email retrieval logic
  [authStatus.ADMIN, authStatus.SUPERUSER, authStatus.STUDENT], // Replace with actual statuses retrieval logic
  authStatus.SUPERUSER, // Replace with actual current status retrieval logic
  "djbf63kjFHFjud53kjJ3djh4", // Replace with actual uid retrieval logic (or generation logic)
  true
);

export default user;

