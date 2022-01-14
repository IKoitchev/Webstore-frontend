import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";

import Chat from "../Chat/Chat";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../../Navbar/Navbar";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  content: {
    width: "100%",
    maxWidth: "750px",
    margin: "1rem",
  },
}));

function ChatPage(props) {
  const classes = useStyles();
  const [userName, setUserName] = useState();

  useEffect(() => {
    //console.log(props.user.userName);
    setUserName(props.user.userName);
  }, [props]);

  return (
    <>
      <NavBar />
      <div className={classes.root}>
        {
          // <>{console.log("userName")}</>
          <Paper elevation={3} className={classes.content}>
            <Chat userName={userName} />
          </Paper>
        }
      </div>
    </>
  );
}

export default ChatPage;
