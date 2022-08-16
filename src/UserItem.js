import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function UserItem({ product, deleteUserItem }) {
  // console.log(product)
  const handleRemove = () => {
    deleteUserItem(product._id)
  };
  return (
    <Card sx={{ maxWidth: 345, position: "relative" }}>
      <CardMedia
        component="img"
        height="194"
        image={product.img}
        alt={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: "2.2rem" }}
        >
          {product.desc}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          position: "absolute",
          bottom: "0",
        }}
      >
        <Button size="small" color="error" onClick={handleRemove}>
          Remove Item
        </Button>
      </CardActions>
    </Card>
  );
}
