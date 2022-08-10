import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import ProductCard from "./Card";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField, Grid
} from "@mui/material";
import styled from "@emotion/styled";
import { Product, ProductImage } from "./Product";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT, GET_PRODUCTS } from "queries/productQueries";
import { useParams } from "react-router-dom";
import { addToMyCart, decreaseCartQty } from "pages/CheckoutPage/features/cartSlice";
import { useDispatch } from "react-redux";
import { Repeat } from "@mui/icons-material";
import Title from 'pages/AdminHomePage/components/Title';
//import ReactImageMagnify from 'react-image-magnify';
import Loading from '../../components/Loading';
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

function ProductDetailPage({ open, onClose, setLoading }) {
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  const handlerAddToCart = (product) => {
    dispatch(addToMyCart(data?.product))
    //  navigate("/cart")
  };


  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const { id } = useParams();
  console.log(id)

  const { loading, error, data } = useQuery(GET_PRODUCT, { variables: { id } });
  console.log(data)
 const {  data : productsDetail  } = useQuery(GET_PRODUCTS);

  
  const [quantity, setQuantity] = useState(0);

  const cartHandler = (e)=> {
    e.preventDefault();
    handlerAddToCart();
  }
  if (loading) return <Loading />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      <Container >
        {/* <DialogContent> */}
        <Box margin="30px">
        <ProductDetailWrapper flexDirection={matches ? "column" : "row"}>
          <Product sx={{ height:'80%'}}>
              {/* <ReactImageMagnify {...{
        smallImage: {
            alt: 'Wristwatch by Ted Baker London',
            isFluidWidth: true,
            src: `{data?.product.image[0].imageLink}`,
            srcSet: `{data?.product.image[0].imageLink} 481w`,
            sizes:
                  "(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw"
        },
        largeImage: {
            src: `{data?.product.image[0].imageLink}`,
            width: 1200,
            height: 1800
        }
    }} /> */}
            <ProductImage src={data?.product.image[0].imageLink} height="80%" alt={data?.product.image.name} />
          </Product>
          
        <ProductDetailInfoWrapper>    
            <Typography sx={{ lineHeight: 2 }} variant="h6" align="left">
              {data?.product.name}
            </Typography>
            <Typography variant="body" align="left">
              {data?.product.description}
            </Typography>
            <Typography variant="subtitle" align="left">Product Id:{data.product.id}</Typography>
            <Typography variant="subtitle" align="left">{`Availability: ${data?.product.stock[data?.product.stock.length - 1].total} in stock`}</Typography>
            <form onSubmit={cartHandler}>
            <TextField
            margin="20px"
          id="outlined-number"
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e)=>setQuantity(e.target.value)}
          InputProps={{
            inputProps: { 
              min: 0,
              max:{quantity}
            }
        }}
        />
            <Box
              sx={{ mt: 4 }}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box sx={{ margin: '0 auto' }}>
                <Button variant="contained" sx={{ borderRadius: 28, backgroundColor: '#ffb2cc' }} type='submit'>Add to Cart</Button>
              </Box>
            </Box>
            </form>
            {/* <Box
              display="flex"
              alignItems="center"
            //sx={{ mt: 4, color: Colors.light }}
            >
              <FavoriteIcon sx={{ mr: 2 }} />
              Add to wishlist
            </Box> */}
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
        </Box>
        <Container sx={{height:'35%'}}>
          <Box sx={{padding:'20px'}}>
          <Title>
            Related Products
          </Title>
          </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", height: "150px" }}>
            {!loading &&
              !error &&
              productsDetail?.products.slice(0, 3).map((product) => (
        <Grid container spacing={2} columns={12} key={product.id} >
        <ProductCard key={product.id} product={product} />
        </Grid>
        ))}
        </Box>
        </Container>
      </Container>
    </>

  );
}

export default ProductDetailPage;