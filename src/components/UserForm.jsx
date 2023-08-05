import { useState, useContext, useEffect } from "react";
import {
  addDoc,
  collection,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useForm, Controller, set } from "react-hook-form";
import Select from "react-select";
import {
  CContainer,
  CForm,
  CFormInput,
  CButton,
  CRow,
  CCol,
} from "@coreui/react";

import { FBCtx } from "../Firebase/FBProvider";
import { validateDOB, validateCity } from "../helpers/validation";

const UserForm = ({ onClose, initialData }) => {
  const { db } = useContext(FBCtx);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();

  const countryOptions = [
    { value: "Canada", label: "Canada" },
    { value: "USA", label: "USA" },
  ];

  const cityOptions = {
    Canada: [
      { value: "Ottawa", label: "Ottawa" },
      { value: "Toronto", label: "Toronto" },
    ],
    USA: [
      { value: "Las Vegas", label: "Las Vegas" },
      { value: "Chicago", label: "Chicago" },
    ],
  };

  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("dob", initialData.dob.toDate().toISOString().split("T")[0]);
      setValue("city", { value: initialData.city, label: initialData.city });
      setSelectedCountry({
        value: initialData.country,
        label: initialData.country,
      });
      setValue("country", initialData.country);
    }
  }, [initialData, setValue]);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setValue("country", selectedOption.value);
    clearErrors("country");
  };

  const handleFormSubmit = async (data) => {
    setError(null);
    data.country = selectedCountry ? selectedCountry.value : data.country;
    data.city = data.city.value;
    data.dob = Timestamp.fromDate(new Date(data.dob));

    if (validateDOB(data.dob)) {
      setError("DoB cannot be in the future");
      return;
    }

    if (validateCity(cityOptions, data.country, data.city)) {
      setError("Invalid city");
      return;
    }

    try {
      initialData
        ? await updateDoc(doc(db, "Users", initialData.id), data)
        : await addDoc(collection(db, "Users"), data);
      onClose();
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  return (
    <CContainer>
      <CForm onSubmit={handleSubmit(handleFormSubmit)}>
        <CRow>
          <CCol md="2">
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CFormInput {...field} type="text" placeholder="Enter name" />
              )}
              rules={{ required: true }}
            />
            {errors.name && (
              <span className="text-danger">Name is required</span>
            )}
          </CCol>
          <CCol md="2">
            <Controller
              name="dob"
              control={control}
              defaultValue=""
              render={({ field }) => <CFormInput {...field} type="date" />}
              rules={{ required: true }}
            />
            {errors.dob && <span className="text-danger">DoB is required</span>}
          </CCol>
          <CCol md="2">
            <Controller
              name="country"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  value={selectedCountry || field.value}
                  options={countryOptions}
                  onChange={handleCountryChange}
                  placeholder="Country"
                />
              )}
              rules={{ required: true }}
            />
            {errors.country && (
              <span className="text-danger">Country is required</span>
            )}
          </CCol>
          <CCol md="2">
            <Controller
              name="city"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  options={cityOptions[selectedCountry?.value] || []}
                  placeholder="City"
                  isDisabled={!selectedCountry}
                />
              )}
              rules={{ required: true }}
            />
            {errors.city && (
              <span className="text-danger">City is required</span>
            )}
          </CCol>
          <CCol>
            <CButton
              type="button"
              onClick={() => {
                onClose();
                setSelectedCountry(null);
              }}
              className="bg-secondary border-secondary me-2"
            >
              Cancel
            </CButton>
            <CButton type="submit" className="bg-primary">
              Submit
            </CButton>
          </CCol>
        </CRow>
      </CForm>
      {error && (
        <p className="text-danger text-center text-uppercase">{error}</p>
      )}
    </CContainer>
  );
};

export default UserForm;
