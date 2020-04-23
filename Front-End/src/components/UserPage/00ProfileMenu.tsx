import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText } from "../style";

// 사용자 프로필 버튼
import { Avatar, ListItem } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";

// 프로필 메뉴 스타일
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

type Anchor = "right";

const ProfileMenu: FunctionComponent<any> = ({}) => {
  // 프로필 메뉴
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list1 = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {})}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>회원정보</ListItem>
        <ListItem button>히스토리</ListItem>
      </List>
    </div>
  );

  const list2 = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {})}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>회원가입</ListItem>
        <ListItem button>로그인</ListItem>
      </List>
    </div>
  );
  return (
    <>
      <div>
        {(["right"] as Anchor[]).map((anchor) => (
          <React.Fragment key={anchor}>
            {/* <Box display="flex" justifyContent="flex-end" m={1} p={1}> */}
            <Button onClick={toggleDrawer(anchor, true)}>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {window.sessionStorage.getItem('id') 
                ? list1(anchor)
                : list2(anchor)
              }
            </Drawer>
            {/* </Box> */}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default ProfileMenu;
