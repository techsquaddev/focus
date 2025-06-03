## University Timetable Management System: Project Overview

![UTMS2](https://github.com/HasithaPeiris/utms-server/assets/138846351/67fd2738-7d0c-461c-9a63-8f7f41bc8019)

### User Types

1. **Admins**
   - Admins have the highest level of access and control over the system. They can approve or reject timetables and notices, ensuring only verified information is published.
2. **Normal Users**
   - Normal users have limited access compared to admins. They can interact with timetables and notices based on their login status and the permissions granted.

### Features

#### Viewing and Saving Timetables

- **Any User (Logged-in or Guest):**
  - Can view all timetables that are in the "Updated" or "Approved" status.
  - Can save timetables to local storage for offline access.

#### Viewing Notices

- **Any User (Logged-in or Guest):**
  - Can view all notices that are in the "Updated" or "Approved" status.

#### Timetable Management (Logged-in Users)

- **Add Timetables:**
  - Logged-in users can add new timetables. These timetables will have a status of "Pending" until approved by an admin.
- **View Timetables:**
  - Logged-in users can view all timetables, including those in the "Pending" status that they have added.
- **Update Timetables:**
  - Logged-in users can update any timetable. The updated timetable will revert to a "Updated" status until approved.
- **Delete Timetables:**
  - Logged-in users can delete the timetables they have added.
  - Admins can delete any timetable.

#### Notice Management (Logged-in Users)

- **Add Notices:**
  - Logged-in users can add new notices. These notices will have a status of "Pending" until approved by an admin.
- **View Notices:**
  - Logged-in users can view all notices, including those in the "Pending" status that they have added.
- **Update Notices:**
  - Logged-in users can update the notices they have added. The updated notice will revert to a "Updated" status until approved.
  - Admins can update any notice.
- **Delete Notices:**
  - Logged-in users can delete the notices they have added.
  - Admins can delete any notice.

### Access Control

1. **Timetables:**

   - **Add:** Any logged-in user.
   - **View:** Any user (Logged-in or Guest) can view timetables in the "Updated" or "Approved" status.
   - **Update:** Any logged-in user.
   - **Delete:** Only the user who added the timetable or an admin can delete it.

2. **Notices:**
   - **Add:** Any logged-in user.
   - **View:** Any user (Logged-in or Guest) can view notices in the "Updated" or "Approved" status.
   - **Update:** Only the user who added the notice or an admin can update it.
   - **Delete:** Only the user who added the notice or an admin can delete it.

![UTMS](https://github.com/HasithaPeiris/utms-server/assets/138846351/f24a32e3-86c7-4341-866e-8cb628c1672c)

### Status Definitions

1. **Pending:**

   - Newly added timetables and notices.
   - Visible only to admins and the user who added them.
   - Not visible to normal users until approved by an admin.

2. **Updated:**

   - Timetables and notices that have been updated.
   - Visible to all users.

3. **Approved:**
   - Timetables and notices that have been reviewed and approved by an admin.
   - Visible to all users.

### Summary

The University Timetable Management System provides a structured and secure environment for managing academic schedules and announcements. It distinguishes between admins and normal users, granting different levels of access and control to ensure only verified and approved information is available to the broader user base. The system’s core functionalities include viewing, adding, updating, and deleting timetables and notices, all governed by a status-based approval process to maintain information integrity and accuracy.
