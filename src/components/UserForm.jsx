import { useState, useContext } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import {
  CContainer,
  CForm,
  CFormLabel,
  CButton,
  CFormInput,
} from "@coreui/react";

import { FBCtx } from "../Firebase/FBProvider";

const UserForm = () => {
  const { db } = useContext(FBCtx);
  const {
    handleSubmit,
    control,
    formState: { errors },
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

  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const handleFormSubmit = async (data) => {
    data.country = selectedCountry.value;
    data.city = data.city.value;
    console.log("data.dob", data.dob);
    data.dob = Timestamp.fromDate(new Date(data.dob));

    const date = new Date(data.dob.seconds * 1000);

    const result = date.toLocaleDateString();

    console.log("result", result);

    try {
      await addDoc(collection(db, "Users"), data);
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  return (
    <CContainer>
      <CForm onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <CFormLabel htmlFor="name" col="md-2">
            Name
          </CFormLabel>
          <div>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CFormInput
                  {...field}
                  type="text"
                  id="name"
                  placeholder="Enter name"
                />
              )}
              rules={{ required: true }}
            />
            {errors.name && <span>Name is required</span>}
          </div>
        </div>
        <div>
          <CFormLabel htmlFor="dob" col="md-2">
            Date of Birth
          </CFormLabel>
          <div>
            <Controller
              name="dob"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CFormInput {...field} type="date" id="dob" />
              )}
              rules={{ required: true }}
            />
            {errors.dob && <span>Date of Birth is required</span>}
          </div>
        </div>
        <div>
          <CFormLabel htmlFor="country" col="md-2">
            Country
          </CFormLabel>
          <div>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  value={selectedCountry}
                  options={countryOptions}
                  onChange={handleCountryChange}
                  placeholder="Select a country"
                />
              )}
            />
            {errors.country && <span>Country is required</span>}
          </div>
        </div>
        <div>
          <CFormLabel htmlFor="city" col="md-2">
            City
          </CFormLabel>
          <div>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  options={cityOptions[selectedCountry?.value] || []}
                  placeholder="Select a city"
                  isDisabled={!selectedCountry}
                />
              )}
              rules={{ required: true }}
            />
            {errors.city && <span>City is required</span>}
          </div>
        </div>
        <div>
          <div>
            <CButton type="submit">Submit</CButton>
          </div>
        </div>
      </CForm>
    </CContainer>
  );
};

export default UserForm;
