import { IconButton, List, ListItem, ListItemText } from "@material-ui/core";
import { PhotoLibrary } from "@material-ui/icons";
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
    <List className={classes.drawerList}>
      <ListItem>
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
      </ListItem>
      {presenter.resultList().map((text: string, index: number) => (
        <ListItem key={index}>
          <ListItemText>{text}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default Basic;
