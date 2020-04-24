import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import Fullpage from "./FullPage";


// import ReactDOM from 'react-dom';

// 그리드
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Profile from "./components/UserPage/00ProfileMenu";

const Main: FunctionComponent<any> = ({}) => {
  return (
    <>
      {/* <Grid spacing={3} direction="column" justify="center" alignItems="center">
          <Box alignItems="center" display="flex">
            <Fullpage />
            </Box>
        </Grid>
      </Grid> */}
      <Box display="flex" justifyContent="flex-end" m={1} p={1}>
        <Profile />
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center">
        <Fullpage />
      </Box>
    </>
  );
};

export default Main;
