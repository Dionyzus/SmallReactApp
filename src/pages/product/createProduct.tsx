import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { Formik, Form } from "formik";
import { useStyles } from "./style";
import { useHistory } from "react-router-dom";
import { createProductReq } from "../../api/productApi";
import { getProducersReq } from "../../api/producerApi";
import { IProduct } from "../../interfaces/IProduct";
import { IProducer } from "../../interfaces/IProducer";

const options = [
  {
    baseType: "Milk Chocolate",
    subtypes: ["With Strawberries", "With Nuts", "Without Sugar"],
  },
  {
    baseType: "Dark Chocolate",
    subtypes: ["With Coffee", "With Rice"],
  },
];

export default function CreateProduct() {
  const createProductStyles = useStyles();
  const [producersData, setProducersData] = useState<IProducer[]>([]);
  const history = useHistory();

  const [choosenOption, setChoosenOption] = useState({
    baseType: "Dark Chocolate",
    subtypes: ["With Coffe", "With Rice"],
  });

  useEffect(() => {
    async function getProducersData() {
      const response = await getProducersReq();
      if (response && response.data) {
        setProducersData(response.data.producers);
      }
    }

    getProducersData();
  }, [setProducersData]);
  async function handleCreateProduct(values: IProduct) {
    console.log(values);
    try {
      await createProductReq(values);
      history.push("/products/list");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleExpandOptions(event: any) {
    const res = options.find((e) => e.baseType === event.target.value);
    if (res) {
      setChoosenOption(res);
    }
  }

  return (
    <Grid container direction="row">
      <CssBaseline />
      <Formik
        initialValues={{
          productName: "",
          price: "",
          substancePercentage: "",
          color: "",
          type: { baseType: "", subType: "" },
          producer: "",
        }}
        enableReinitialize={true}
        onSubmit={handleCreateProduct}
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
                  <FormControl
                    variant="outlined"
                    className={createProductStyles.formControl}
                  >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Type
                      </InputLabel>
                      <Select
                        value={values.type.baseType || ""}
                        onChange={(e) => {
                          handleChange(e);
                          handleExpandOptions(e);
                        }}
                        label="Base Type"
                        inputProps={{
                          name: "type.baseType",
                          id: "type.baseType",
                        }}
                      >
                        {options.map((option, index) => (
                          <MenuItem key={index} value={option.baseType}>
                            {option.baseType}
                          </MenuItem>
                        ))}
                      </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    variant="outlined"
                    className={createProductStyles.formControl}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Sub-Type
                    </InputLabel>
                    <Select
                      value={choosenOption && choosenOption.subtypes.find((e) => e === values.type.subType) ? values.type.subType : ''}
                      onChange={handleChange("type.subType")}
                      label="Sub-Type"
                      inputProps={{
                        name: "type.subType",
                        id: "type.subType",
                      }}
                    >
                      {choosenOption && choosenOption.subtypes
                        ? choosenOption.subtypes.map((option, index) => (
                            <MenuItem key={index} value={option ? option : ''}>
                              {option}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  className={createProductStyles.formControl}
                >
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Producer
                  </InputLabel>
                  <Select
                    value={values.producer || ""}
                    onChange={handleChange("producer")}
                    label="Producer"
                    inputProps={{
                      name: "producer",
                      id: "producer",
                    }}
                  >
                    {producersData?.map((option, index) => (
                      <MenuItem key={index} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs>
                <Button
                  style={{ marginTop: 15 }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<SaveIcon />}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
}
