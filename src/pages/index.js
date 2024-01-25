import React from "react";
import { Paper, CardMedia, } from "@mui/material";

function Home() {
  return (
    <Paper>
      <CardMedia
        component="img"
        alt="Imagen"
        image='ceeciPropaganda.jpg'
        sx={{
          width: 1000,
          margin: "auto",
          display: "block",
          borderRadius: 10,
        }}
      />
    </Paper>
  );
}

export default Home;
