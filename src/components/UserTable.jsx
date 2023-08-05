import React, { useContext, useEffect, useState } from "react";
import { FBCtx } from "../Firebase/FBProvider";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import {
  CContainer,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CButton,
} from "@coreui/react";

const UserTable = () => {
  const { db } = useContext(FBCtx);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Users"), (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);

    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    };

    return date.toLocaleString("en-US", options);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, "Users", userId));
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  return (
    <CContainer>
      <h2>User Table</h2>
      {loading ? (
        <p>Loading...</p>
      ) : users.length > 0 ? (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Date of Birth</CTableHeaderCell>
              <CTableHeaderCell>Country</CTableHeaderCell>
              <CTableHeaderCell>City</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map((user) => (
              <CTableRow key={user.id}>
                <CTableDataCell>{user.name}</CTableDataCell>
                <CTableDataCell>{formatDate(user.dob)}</CTableDataCell>
                <CTableDataCell>{user.country}</CTableDataCell>
                <CTableDataCell>{user.city}</CTableDataCell>
                <CTableDataCell>
                  <CButton onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </CButton>
                  <CButton
                    color="info"
                    onClick={() => console.log("Update user:", user.id)}
                  >
                    Update
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      ) : (
        <p>
          No data to display. Please enter a user's information to continue.
        </p>
      )}
    </CContainer>
  );
};

export default UserTable;
