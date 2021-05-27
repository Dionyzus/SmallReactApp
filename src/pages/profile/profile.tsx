import React, { useEffect, useState } from "react";
import { Grid, Button, CssBaseline, TextField } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { Formik, Form } from "formik";
import { useStyles } from "./style";
import { getProfileReq } from "../../api/userApi";
import { IUserData } from "../../interfaces/IUserData";

export default function Profile() {
  const [profile, setProfile] = useState<IUserData>();
  const profileStyles = useStyles();
  useEffect(() => {
    async function getProfileData() {
      const response = await getProfileReq();
      console.log(response);
      if (response && response.data) {
        setProfile(response.data.profile);
      }
    }
    getProfileData();
  }, [setProfile]);

  async function handleProfileUpdate(values: IUserData) {
    console.log(values);
  }
  return (
    <Grid container direction="row" className={profileStyles.rootBox}>
      <CssBaseline />
      <Formik
        initialValues={profile as IUserData}
        enableReinitialize={true}
        onSubmit={handleProfileUpdate}
      >
        {({ handleChange, values }) => (
          <Form>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoComplete="fullName"
              autoFocus
              onChange={handleChange("fullName")}
              value={profile?.fullName || ''}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="emailAddress"
              label="Email Address"
              id="emailAddress"
              onChange={handleChange("emailAddress")}
              value={profile?.emailAddress || ''}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className={profileStyles.button}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Grid>
  );
}
