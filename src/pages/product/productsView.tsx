import { Container, Grid, IconButton } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { tableIcons } from "../../utils/materialTableIcons";
import DetailsIcon from "@material-ui/icons/Details";
import AddIcon from "@material-ui/icons/Add";
import { getProductsReq } from "../../api/productApi";
import { useHistory } from "react-router-dom";
import { IProduct } from "../../interfaces/IProduct";

export default function ProductsView() {
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const history = useHistory();

  useEffect(() => {
    async function getProductsData() {
      const response = await getProductsReq();
      if (response && response.data) {
        setProductsData(response.data.products);
      }
    }

    getProductsData();
  }, [setProductsData]);

  async function handleViewDetails(rowData: IProduct) {}

  async function handleSearchChange(searchValue: string) {
    if (!searchValue) {
      const response = await getProductsReq();
      if (response && response.data) {
        setProductsData(response.data.products);
      }
    }
    console.log(searchValue);
    try {
      const response = await getProductsReq(searchValue);
      if (response && response.data) {
        setProductsData(response.data.products);
      }
    } catch {
      console.log("Invalid query param");
    }
  }

  async function handleCreateProduct() {
    history.push("/products/create");
  }

  return (
    <Container maxWidth="lg">
      <Grid item xs>
        <Grid item xs={12} style={{ paddingTop: 15, paddingBottom: 15 }}>
          <MaterialTable
            icons={tableIcons}
            title="Products"
            options={{
              debounceInterval: 500,
              actionsColumnIndex: -1,
            }}
            columns={[
              { title: "Name", field: "productName" },
              { title: "Price", field: "price" },
              {
                title: "Substance Percentage",
                field: "substancePercentage" /**type: "numeric" **/,
              },
              {
                title: "Color",
                field: "color",
              },
              {
                title: "Base Type",
                field: "type.baseType",
              },
              {
                title: "Sub-Type",
                field: "type.subType",
              },
              {
                title: "Producer",
                field: "producer",
              },
            ]}
            data={productsData as IProduct[]}
            actions={[
              {
                icon: "edit",
                tooltip: "Save User",
                onClick: (event, rowData) =>
                  handleViewDetails(rowData as IProduct),
              },
              {
                icon: "add",
                tooltip: "Add User",
                onClick: (event) => handleCreateProduct(),
              },
            ]}
            onSearchChange={handleSearchChange}
            components={{
              Action: (props) =>
                props.action.icon === "edit" ? (
                  <IconButton
                    onClick={(event) => props.action.onClick(event, props.data)}
                    color="primary"
                    style={{ textTransform: "none" }}
                    size="small"
                  >
                    <DetailsIcon fontSize="inherit" />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={(event) => props.action.onClick(event, props.data)}
                    color="primary"
                    style={{ textTransform: "none" }}
                    size="small"
                  >
                    <AddIcon fontSize="inherit" />
                  </IconButton>
                ),
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
