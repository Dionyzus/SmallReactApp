import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  // Button,
  CssBaseline,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { getProducersReq } from "../../api/producerApi";
// import InputIcon from "@material-ui/icons/Input";
import { useStyles } from "./style";
import { useHistory } from "react-router-dom";
import { getProductsReq, getProductTypesReq } from "../../api/productApi";
import ResultComponent from "../../components/resultComponent";
import { IProductType } from "../../interfaces/IProductType";
import { IProducer } from "../../interfaces/IProducer";
import { IProduct } from "../../interfaces/IProduct";

export default function AdvancedSearch() {
  const history = useHistory();
  const advancedSearchStyles = useStyles();
  const [searchTerm, setSearchTerm] = useState({
    producer: "All",
    baseType: "All",
    subType: "All",
  });
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [producer, setProducer] = useState('');
  const [producersData, setProducersData] = useState<IProducer[]>([]);
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [options, setOptions] = useState<IProductType[]>([]);
  const [choosenOption, setChoosenOption] = useState({
    baseType: "",
    subtypes: [""],
  });

  useEffect(() => {
    async function getOptionsData() {
      const response = await getProductTypesReq();
      if (response && response.data) {
        setOptions(response.data.options);
      }
    }
    getOptionsData();
  }, [setOptions]);

  useEffect(() => {
    async function getProductsData() {
      const response = await getProductsReq();
      if (response && response.data) {
        setProductsData(response.data.products);
      }
    }
    getProductsData();
  }, [setProductsData]);

  useEffect(() => {
    async function getProducersData() {
      const response = await getProducersReq();
      if (response && response.data) {
        setProducersData(response.data.producers);
      }
    }

    getProducersData();
  }, [setProducersData]);

  useEffect(() => {
    function getQueryResult() {
      if (searchTerm.producer) {
        setProducer(searchTerm.producer);
      }
      if (
        searchTerm.producer === "All" &&
        searchTerm.baseType === "All" &&
        searchTerm.subType === "All"
      ) {
        setSearchResults(productsData);
        return;
      }
      const result = productsData.filter(function (p: any) {
        if (
          searchTerm.producer !== "All" &&
          searchTerm.baseType === "All" &&
          searchTerm.subType === "All"
        ) {
          return p.producer === searchTerm.producer;
        }
        if (
          searchTerm.baseType !== "All" &&
          searchTerm.producer === "All" &&
          searchTerm.subType === "All"
        ) {
          return p.type.baseType === searchTerm.baseType;
        }
        if (
          searchTerm.subType !== "All" &&
          searchTerm.producer === "All" &&
          searchTerm.baseType === "All"
        ) {
          return p.type.subType === searchTerm.subType;
        }
        if (
          searchTerm.subType !== "All" &&
          searchTerm.producer !== "All" &&
          searchTerm.baseType === "All"
        ) {
          return (
            p.type.subType === searchTerm.subType &&
            p.producer === searchTerm.producer
          );
        }
        if (
          searchTerm.subType !== "All" &&
          searchTerm.producer === "All" &&
          searchTerm.baseType !== "All"
        ) {
          return (
            p.type.subType === searchTerm.subType &&
            p.type.baseType === searchTerm.baseType
          );
        }
        if (
          searchTerm.subType === "All" &&
          searchTerm.producer !== "All" &&
          searchTerm.baseType !== "All"
        ) {
          return (
            p.producer === searchTerm.producer &&
            p.type.baseType === searchTerm.baseType
          );
        }
        return (
          p.producer === searchTerm.producer &&
          p.type.baseType === searchTerm.baseType &&
          p.type.subType === searchTerm.subType
        );
      });
      
      setSearchResults(result);
    }
    getQueryResult();
  }, [producersData, searchTerm, productsData]);

  function handleChange(event: any) {
    if (event.target.name === "producer") {
      const searchTermVal = { ...searchTerm };
      searchTermVal.producer = event.target.value;
      setSearchTerm(searchTermVal);
    }

    if (event.target.name === "baseType") {
      const searchTermVal = { ...searchTerm };
      searchTermVal.baseType = event.target.value;
      setSearchTerm(searchTermVal);
    }
    if (event.target.name === "subType") {
      const searchTermVal = { ...searchTerm };
      searchTermVal.subType = event.target.value;
      setSearchTerm(searchTermVal);
    }
  }

  async function handleViewProductDetails(event: any, productId: string) {
    history.push(`/products/view/${productId}`);
  }

  async function handleExpandOptions(event: any) {
    const res = options?.find((e) => e.baseType === event.target.value);
    if (res) {
      setSearchTerm({
        producer: producer,
        baseType: res.baseType,
        subType: "All",
      });
      setChoosenOption(res);
    }
  }

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Grid item xs={12}>
        <Typography variant="h3">Advanced Product Search</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">
          Here you can perform product search, including producer, base or
          sub-type filtering.
        </Typography>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <FormControl
            variant="outlined"
            className={advancedSearchStyles.formControl}
          >
            <InputLabel htmlFor="outlined-age-native-simple">
              Producer
            </InputLabel>
            <Select
              value={searchTerm.producer || ""}
              onChange={(e) => handleChange(e)}
              label="Producer"
              inputProps={{
                name: "producer",
                id: "producer",
              }}
            >
              <MenuItem key={0} value="All">
                All
              </MenuItem>
              {producersData?.map((option, index) => (
                <MenuItem key={index + 1} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Grid item xs={6}>
              <FormControl
                variant="outlined"
                className={advancedSearchStyles.formControl}
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Type
                </InputLabel>
                <Select
                  label="Base Type"
                  value={searchTerm.baseType || ""}
                  onChange={(e) => {
                    handleChange(e);
                    handleExpandOptions(e);
                  }}
                  inputProps={{
                    name: "baseType",
                    id: "baseType",
                  }}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  {options?.map((option, index) => (
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
                className={advancedSearchStyles.formControl}
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Sub-Type
                </InputLabel>
                <Select
                  value={
                    choosenOption &&
                    choosenOption.subtypes.find((e) => e === searchTerm.subType)
                      ? searchTerm.subType
                      : "All"
                  }
                  onChange={(e) => handleChange(e)}
                  label="Sub-Type"
                  inputProps={{
                    name: "subType",
                    id: "subType",
                  }}
                >
                  <MenuItem value="All">All</MenuItem>
                  {choosenOption && choosenOption.subtypes
                    ? choosenOption.subtypes.map((option, index) => (
                        <MenuItem key={index} value={option ? option : ""}>
                          {option}
                        </MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ResultComponent
              searchResults={searchResults}
              producersData={producersData}
              handleViewProductDetails={handleViewProductDetails}
            ></ResultComponent>
          </Grid>
          {/* Could be needed in future */}
          {/* <Grid item xs>
            <Button
              style={{ marginTop: 15 }}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<InputIcon />}
            >
              Search
            </Button>
          </Grid> */}
        </Grid>
      </Grid>
    </Container>
  );
}
