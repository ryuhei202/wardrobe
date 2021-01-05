import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { ExpandMore, PhotoLibrary } from "@material-ui/icons";
import React from "react";
import BasicResponse from "../../../model/api/response/styling/karte/BasicResponse";
import { useKarteStyle } from "./style/UseKarteStyle";
import { useBasicPresenter } from "./presenter/UseBasicPresenter";
import MemberImageCollectionDialog from "./MemberImageCollectionDialog";
import { useBasicHandler } from "./handler/UseBasicHandler";

interface BasicProps {
  data: BasicResponse;
}

const Basic = (props: BasicProps) => {
  const classes = useKarteStyle();
  const handler = useBasicHandler(props.data);
  const presenter = useBasicPresenter(props.data);

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>基本情報</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <img
          src={presenter.memberImageUrl()}
          height="100px"
          width="auto"
          alt=""
        />
        <IconButton color="primary" onClick={handler.setMemberImageDialogOpen}>
          <PhotoLibrary />
        </IconButton>
        <MemberImageCollectionDialog
          data={handler.memberImageDialogData()}
          callback={handler.memberImageDialogCallback()}
        />
        <List className={classes.drawerList}>
          {presenter.resultList().map((text: string) => (
            <ListItem>
              <ListItemText>{text}</ListItemText>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default Basic;
