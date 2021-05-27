import React, { useState, useEffect } from "react";
import { Grid, Button, CssBaseline, TextField } from "@material-ui/core";
import { Formik, Form } from "formik";
import { useParams, useHistory } from "react-router-dom";
import { getProducerByIdReq } from "../../api/producerApi";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IProducer } from "../../interfaces/IProducer";

export default function ProducerDetails() {
  const history = useHistory();
  const { producerId } = useParams();
  const [producerData, setProducerData] = useState<IProducer>();

  useEffect(() => {
    async function getProducerData() {
      const response = await getProducerByIdReq(producerId);
      if (response && response.data) {
        setProducerData(response.data.producers);
      }
    }

    getProducerData();
  }, [setProducerData, producerId]);

  async function handleUpdateProducer(values: IProducer) {
    console.log(values);
  }

  return (
    <Grid container direction="row">
      <CssBaseline />
      <Formik
        initialValues={producerData as IProducer}
        enableReinitialize={true}
        onSubmit={handleUpdateProducer}
      >
        {({ handleChange, values }) => (
          <Form>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Producer Name"
                  name="name"
                  autoFocus
                  onChange={handleChange("name")}
                  value={values.name || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="establishmentDate"
                  label="Establishment Date"
                  id="establishmentDate"
                  onChange={handleChange("establishmentDate")}
                  value={values.establishmentDate || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="country"
                  label="Country"
                  id="country"
                  onChange={handleChange("country")}
                  value={values.country || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  id="description"
                  onChange={handleChange("description")}
                  value={values.description || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="logoUrl"
                  label="Logo Url"
                  id="logoUrl"
                  onChange={handleChange("logoUrl")}
                  value={values.logoUrl || ""}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Grid item xs>
        <Button
          onClick={(e) => history.goBack()}
          style={{ marginTop: 15 }}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
