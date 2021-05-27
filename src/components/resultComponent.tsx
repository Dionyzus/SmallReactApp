import React from "react";
import {
  Grid,
  Typography,
  // Button,
  List,
  ListItemSecondaryAction,
  Avatar,
  ListItem,
  ListItemText,
  IconButton,
  ListItemAvatar,
  Link,
} from "@material-ui/core";
import { useStyles } from "./style";
import PageviewIcon from "@material-ui/icons/Pageview";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import { IProduct } from "../interfaces/IProduct";
import { IProducer } from "../interfaces/IProducer";

interface IProps {
  searchResults: Array<IProduct>;
  producersData: Array<IProducer>;
  handleViewProductDetails: (event: any,productId: string) => void;
}

export default function ResultComponent(props: IProps) {
  const resultStyles = useStyles();

  return (
    <>
      <Typography variant="h6" className={resultStyles.title}>
        Query Result
      </Typography>
      <div className={resultStyles.demo}>
        <List>
          {props.searchResults.map((item, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  <LabelImportantIcon />
                </Avatar>
              </ListItemAvatar>
              <Grid item xs={6}>
                <Link href={`/products/view/${item.id}`}>
                  <ListItemText primary={item.productName} />
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link
                  href={`/producers/view/${
                    props.producersData.find((p) => p.name === item.producer)
                      ?.id
                  }`}
                >
                  <ListItemText primary={item.producer} />
                </Link>
              </Grid>
              <ListItemSecondaryAction>
                <IconButton
                  size="small"
                  edge="end"
                  aria-label="view"
                  onClick={(e) => props.handleViewProductDetails(e, item.id as string)}
                >
                  View Product
                  <PageviewIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
}
