import { Container, Grid, IconButton } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { tableIcons } from "../../utils/materialTableIcons";
import DetailsIcon from '@material-ui/icons/Details';
import { getUsersReq } from "../../api/userApi";
import { IUser } from "../../interfaces/IUser";

export default function UsersView() {
  const [usersData, setUsersData] = useState<IUser[]>([]);
  useEffect(() => {
    async function getUsersData() {
      const response = await getUsersReq();
      if (response && response.data) {
        setUsersData(response.data.users);
      }
    }

    getUsersData();
  }, [setUsersData]);
  return (
    <Container maxWidth="lg">
      <Grid item xs>
        <Grid item xs={12} style={{paddingTop: 15, paddingBottom: 15,}}>
          <MaterialTable
            icons={tableIcons}
            title="Users"
            options={{
                actionsColumnIndex: -1,
              }}
            columns={[
              { title: "Full Name", field: "fullName" },
              { title: "Email Address", field: "emailAddress" },
              { title: "Roles", field: "roles" },
              {
                title: "Super Admin?",
                field: "isSuperAdmin" /**type: "numeric" **/,
              },
            ]}
            data={usersData as IUser[]}
            actions={[
              {
                icon: "save",
                tooltip: "Save User",
                onClick: (event, rowData) => alert("You saved " + rowData),
              },
            ]}
            components={{
              Action: (props) => (
                <IconButton
                  onClick={(event) => props.action.onClick(event, props.data)}
                  color="primary"
                  size="medium"
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
