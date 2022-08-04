import Footer from "../../components/Footer";
import {
  Slide,
  Box,
  IconButton,
  DialogContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { Component, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { ProductAddToCart, Product, ProductImage } from "./Product";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Header from "components/Header";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT, GET_PRODUCTS } from "queries/productQueries";
import { useParams } from "react-router-dom";

/* 

function SlideTransition(props) {
  return <Slide direction="down" {...props} />;
} */

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",

}));

const ProductDetailInfoWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 500,
  lineHeight: 1.5,
}));

function ProductDetailPage({ open, onClose }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const { id } = useParams();
  console.log(id)
  const { loading, error, data } = useQuery(GET_PRODUCT, { variables: { id } });
  console.log(data)


  if (loading) return <p> Loading... </p>;
  if (error) return <p>Something Went Wrong</p>;
  
  return (
    <>
        <ProductDetailWrapper display={"flex"} flexDirection={matches ? "column" : "row"}>
          <Product sx={{ mr: 4 }}>
            <ProductImage src={data.product.image[0].imageLink} alt={data.product.image.name} />
          </Product>
          <ProductDetailInfoWrapper>
            <Typography sx={{ lineHeight: 2 }} variant="h4">
              {data.product.name}
            </Typography>
            <Typography variant="body">
              {data.product.description}
            </Typography>
            <Typography variant="subtitle">SKU: 12345</Typography>
            <Typography variant="subtitle">{`Availability: ${data.product.stock[data.product.stock.length - 1].total} in stock`}</Typography>
            <Box
              sx={{ mt: 4 }}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >

              <Button variant="contained" sx={ { borderRadius: 28, backgroundColor:'#ffb2cc' } }>Add to Cart</Button>
              
            </Box>
            <Box
              display="flex"
              alignItems="center"
            //sx={{ mt: 4, color: Colors.light }}
            >
              <FavoriteIcon sx={{ mr: 2 }} />
              Add to wishlist
            </Box>
            <Box
              sx={{
                mt: 4,
                //color: #e6f2ff,
              }}
            >
              <FacebookIcon />
              <TwitterIcon sx={{ pl: 2 }} />
              <InstagramIcon sx={{ pl: 2 }} />
            </Box>
          </ProductDetailInfoWrapper>
        </ProductDetailWrapper>
</>
  );
}

export default ProductDetailPage;