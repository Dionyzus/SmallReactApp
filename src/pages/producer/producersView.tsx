import { Container, Grid, IconButton } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { tableIcons } from "../../utils/materialTableIcons";
import DetailsIcon from "@material-ui/icons/Details";
import { getProducersReq } from "../../api/producerApi";
import { IProducer } from "../../interfaces/IProducer";

export default function ProducersView() {
  const [producersData, setProducersData] = useState<IProducer[]>([]);

  useEffect(() => {
    async function getProducersData() {
      const response = await getProducersReq();
      if (response && response.data) {
        setProducersData(response.data.producers);
      }
    }

    getProducersData();
  }, [setProducersData]);

  async function handleViewDetails(rowData: IProducer) {}

  async function handleSearchChange(searchValue: string) {
    if (!searchValue) {
      const response = await getProducersReq(searchValue);
      if (response && response.data) {
        setProducersData(response.data.producers);
      }
    }
    console.log(searchValue);
    try {
      const response = await getProducersReq(searchValue);
      if (response && response.data) {
        setProducersData(response.data.producers);
      }
    } catch {
      console.log("Invalid query param");
    }
  }

  return (
    <Container maxWidth="lg">
      <Grid item xs>
        <Grid item xs={12} style={{ paddingTop: 15, paddingBottom: 15 }}>
          <MaterialTable
            icons={tableIcons}
            title="Producers"
            options={{
              actionsColumnIndex: -1,
            }}
            columns={[
              { title: "Name", field: "name" },
              { title: "Establishment Date", field: "establishmentDate" },
              {
                title: "Country",
                field: "country" /**type: "numeric" **/,
              },
              {
                title: "Description",
                field: "description",
              },
              {
                title: "Logo URL",
                field: "logoUrl",
              },
            ]}
            data={producersData as IProducer[]}
            actions={[
              {
                icon: "save",
                tooltip: "Save User",
                onClick: (event, rowData) => handleViewDetails(rowData as IProducer),
              },
            ]}
            onSearchChange={handleSearchChange}
            components={{
              Action: (props) => (
                <IconButton
                  aria-label='details'
                  onClick={(event) => props.action.onClick(event, props.data)}
                  color="primary"
                  size="small"
                >
                  <DetailsIcon fontSize="inherit" />
                </IconButton>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
