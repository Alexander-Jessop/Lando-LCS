import { useContext, useEffect, useState } from "react";
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

import UserForm from "./UserForm";
import { formatDate } from "../helpers/formatDate";

const UserTable = () => {
  const { db } = useContext(FBCtx);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, "Users", userId));
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  const toggleFormHandler = () => {
    setSelectedUser(null);
    setShowForm((prevState) => !prevState);
  };

  return (
    <CContainer className="mt-5">
      <h2>User Table</h2>
      <CTable responsive>
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
          {loading ? (
            <CTableRow>
              <CTableDataCell colSpan="5" className="text-center">
                Loading...
              </CTableDataCell>
            </CTableRow>
          ) : users.length > 0 ? (
            <>
              {users.map((user) => (
                <CTableRow key={user.id}>
                  <CTableDataCell>{user.name}</CTableDataCell>
                  <CTableDataCell>{formatDate(user.dob)}</CTableDataCell>
                  <CTableDataCell>{user.country}</CTableDataCell>
                  <CTableDataCell>{user.city}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      className="bg-primary me-2"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowForm(true);
                      }}
                    >
                      Update
                    </CButton>
                    <CButton
                      className="bg-danger border-danger mt-md-0 mt-2"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </>
          ) : (
            <CTableRow>
              <CTableDataCell colSpan="5" className="text-center">
                <p>No data to display.</p>
                <p> Please add a user to see their information.</p>
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
      <div className="d-flex justify-content-end">
        <CButton
          type="button"
          onClick={toggleFormHandler}
          className={showForm ? "d-none" : ""}
        >
          Add User
        </CButton>
      </div>
      {showForm && (
        <UserForm onClose={toggleFormHandler} initialData={selectedUser} />
      )}
    </CContainer>
  );
};

export default UserTable;
