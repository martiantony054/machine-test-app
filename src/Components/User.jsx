import React, { useState } from "react";
import { Button, ListItem, Typography, Dialog, DialogBody, DialogFooter, Input } from "@material-tailwind/react";

function User({ user, users, saveUsers }) {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(user.username);
  const [updatedPassword, setUpdatedPassword] = useState("");

  const toggleModal = () => setIsOpen(!isOpen);

  const handleAction = (action) => {
    const updatedUsers = [...users];
    const userIndex = updatedUsers.findIndex((u) => u.username === user.username);

    if (action === "block") {
      updatedUsers[userIndex].blocked = true;
    } else if (action === "unblock") {
      updatedUsers[userIndex].blocked = false;
    } else if (action === "remove") {
      updatedUsers.splice(userIndex, 1);
    } else if (action === "update") {
      updatedUsers[userIndex].username = updatedName;
      if (updatedPassword) {
        updatedUsers[userIndex].password = updatedPassword; // Only update password if provided
      }
      saveUsers(updatedUsers);
      toggleModal();
    }

    if (action !== "update") {
      saveUsers(updatedUsers);
    }
  };

  return (
    <>
      <ListItem className="flex justify-between items-center py-3 px-4 bg-white shadow-md rounded-lg mb-3 hover:shadow-xl transition-all duration-300">
        <Typography className="text-gray-800 font-semibold">{user.username}</Typography>
        <div className="flex gap-2">
          <Button
            color={user.blocked ? "red" : "green"}
            size="sm"
            onClick={() => handleAction(user.blocked ? "unblock" : "block")}
            className="hover:bg-opacity-80 transition-colors duration-200"
          >
            {user.blocked ? "Unblock" : "Block"}
          </Button>
          <Button
            color="blue"
            size="sm"
            onClick={toggleModal}
            className="hover:bg-opacity-80 transition-colors duration-200"
          >
            Update
          </Button>
          <Button
            color="red"
            size="sm"
            onClick={() => handleAction("remove")}
            className="hover:bg-opacity-80 transition-colors duration-200"
          >
            Remove
          </Button>
        </div>
      </ListItem>

      {/* Update Modal */}
      <Dialog open={isOpen} handler={toggleModal}>
        <DialogBody>
          <div className="space-y-4">
            <Input
              type="text"
              label="Update Username"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
            <Input
              type="password"
              label="Update Password"
              value={updatedPassword}
              onChange={(e) => setUpdatedPassword(e.target.value)}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={toggleModal}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            color="blue"
            onClick={() => handleAction("update")}
          >
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default User;
