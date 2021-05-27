import React, { useEffect, useState } from "react";
import { Grid, Button, CssBaseline, TextField } from "@material-ui/core";
import { Formik, Form } from "formik";
import { useHistory, useParams } from "react-router-dom";
import { getProductByIdReq } from "../../api/productApi";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IProduct } from "../../interfaces/IProduct";

export default function ProductDetails() {
  const history = useHistory();
  const { productId } = useParams();
  const [productData, setProductData] = useState<IProduct>();

  useEffect(() => {
    async function getProductData() {
      const response = await getProductByIdReq(productId);
      if (response && response.data) {
        setProductData(response.data.products);
      }
    }

    getProductData();
  }, [setProductData, productId]);

  async function handleUpdateProduct(values: IProduct) {
    console.log(values);
  }

  return (
    <Grid container direction="row">
      <CssBaseline />
      <Formik
        initialValues={productData as IProduct}
        enableReinitialize={true}
        onSubmit={handleUpdateProduct}
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
                  id="productName"
                  label="Product Name"
                  name="productName"
                  autoFocus
                  onChange={handleChange("productName")}
                  value={values.productName || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="price"
                  label="Price"
                  id="price"
                  onChange={handleChange("price")}
                  value={values.price || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="substancePercentage"
                  label="Substance Percentage"
                  id="substancePercentage"
                  onChange={handleChange("substancePercentage")}
                  value={values.substancePercentage || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="color"
                  label="Color"
                  id="color"
                  onChange={handleChange("color")}
                  value={values.color || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="baseType"
                    label="Base Type"
                    id="baseType"
                    onChange={handleChange("type.baseType")}
                    value={values.type.baseType || ""}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="subType"
                    label="Sub-Type"
                    id="subType"
                    onChange={handleChange("type.subType")}
                    value={values.type.subType || ""}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="producer"
                  label="Producer"
                  id="producer"
                  onChange={handleChange("producer")}
                  value={values.producer || ""}
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
