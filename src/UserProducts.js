import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import UserItem from "./UserItem";

const UserProducts = ({ history, user, deleteUserItem }) => {
  return (
    <Box>
      <Typography
        variant="h2"
        sx={{ textAlign: "center", marginBottom: "2rem" }}
      >
        Your Listings
      </Typography>
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
        }}
      >
        {user ? (
          user.listedItems.map((item) => (
            <UserItem key={item.title} product={item} user={user} deleteUserItem={deleteUserItem} />
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </Container>
    </Box>
  );
};

export default UserProducts;
