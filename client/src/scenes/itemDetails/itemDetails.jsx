import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "../../components/Item";
import { useParams } from "react-router-dom";
import { addToCart } from "../../state";

// Elements style
import {
  IconButton,
  Box,
  Typography,
  useTheme,
  Button,
  Chip,
  Tab,
  Tabs,
  Icon,
} from "@mui/material";

// icons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckIcon from "@mui/icons-material/Check";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

// Style
import { shades } from "../../theme";

// Bootstrap
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const ItemDetails = () => {
  const dispatch = useDispatch();

  //We're going to grab the item id in the url
  const { itemId } = useParams();

  const [value, setValue] = useState("description");

  //HOW MANY WE WANT TO ADD TO THE CART
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);

  //>>>>>>>For future... items related
  const [items, setItems] = useState([]);

  //For the tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //sync single item in the same endpoint
  async function getItem() {
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`,
      {
        method: "GET",
      }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  }

  //Related items. Grab the first four items
  //Firts import the items in the shopping list
  async function getItems() {
    const items = await fetch(
      `http://localhost:1337/api/items?populate=image`,
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }
  //Second.
  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  const stock = parseFloat(item?.attributes?.instock);
  const offert = item?.attributes?.descuento > 0;
  const descuento = item?.attributes?.descuento;
  const price = item?.attributes?.price;
  const precio_final = price - price * descuento;

  const Discount = () => {
    return (
      <>
        <Col className="px-0">
          <Typography fontWeight="bold" sx={{ textDecoration: "line-through" }}>
            <small>{"$" + item?.attributes?.price}</small>
          </Typography>
        </Col>
      </>
    );
  };

  // --BULLETS FIN--

  return (
    <>
      {/* <Container className="d-flex justify-content-center">
      <Row className="mb-3">
        
        
        <Col className="col-md-5 col-12">
          <img
            alt={item?.name}
            style={{ objectFit: "contain" }}
            className="w-100 h-100"
src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url}`}          />
        </Col>
        
        
        <Col className="col-md-7 col-12">
          <Card>
            <Card.Header>
              <Row className="d-flex justify-content-between">
                <Col>Home/Item</Col>
                <Col>
                  <Button className="mx-2">Prev</Button>
                  <Button className="mx-2">Next</Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Card.Title variant="h3">{item?.attributes?.name}</Card.Title>
              <Card.Title variant="h5">${item?.attributes?.price}</Card.Title>
              <Card.Title variant="h5">${item?.attributes?.country}</Card.Title>

              <Card.Text variant="h5">
                ${item?.attributes?.longDescription}
              </Card.Text>
            </Card.Body>
           
           
            <Card.Footer minHeight="50px">
              <Box
                display="flex"
                alignItems="center"
                backgroundColor={shades.neutral[100]}
                borderRadius="3px"
              >
                <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{p:"0 5px"}} color={shades.primary[300]}>{count}</Typography>
                <IconButton onClick={() => setCount(count + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
3000              <Button onClick={() => dispatch(addToCart({item: {...item,count}}))} color={shades.neutral[100]} backgroundColor= {shades.primary[200]}>Añadir al carro</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container> */}
      <Box width="80%" m="80px auto">
        <Box display="flex" flexWrap="wrap" columnGap="40px">
          {/* IMAGES */}
          <Box flex="1 1 40%" mb="40px">
            <img
              alt={item?.name}
              width="100%"
              height="100%"
              src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url}`}
              style={{ objectFit: "contain" }}
            />
          </Box>

          {/* ACTIONS */}
          <Box flex="1 1 50%" mb="40px">
            <Box display="flex" justifyContent="space-between">
              <Box>Home/Item</Box>
              <Box>Prev Next</Box>
            </Box>

            <Box m="65px 0 25px 0">
              <Typography variant="h2">{item?.attributes?.name}</Typography>
              <Typography variant="h4">{item?.attributes?.country}</Typography>
              <Row className="d-flex justify-content-start">
                <Col className=" col-sm-2 col-4 me-md-1 me-0">
                  <Typography variant="h3" fontWeight="bold">
                    {"$" + parseFloat(precio_final).toFixed(2)}
                  </Typography>
                </Col>
                {offert && <Discount />}
              </Row>
              <Typography sx={{ mt: "20px" }}>
                {item?.attributes?.longDescription}
              </Typography>

            </Box>

            <Box display="flex" alignItems="center" minHeight="50px">

              <Box
                display="flex"
                alignItems="center"
                border={`1.5px solid ${shades.neutral[300]}`}
                mr="20px"
                p="2px 5px"
              >
                <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ p: "0 5px" }}>{count}</Typography>
                <IconButton onClick={() => setCount(Math.min(count + 1, stock ))}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Button
                className="button button-7"
                onClick={() => {
                  dispatch(addToCart({ item: { ...item, count } }));
                }}
              >
                <Box
                  className="dub-arrow"
                  backgroundColor={shades.neutral[300]}
                  color={shades.primary[500]}
                >
                  <ShoppingCartCheckoutIcon />
                </Box>
                <Box
                  className="addedCart"
                  backgroundColor={shades.tonos[800]}
                  color={shades.neutral[100]}
                >
                  <CheckIcon />
                  Agregado
                </Box>
                <Box
                  backgroundColor={shades.primary[500]}
                  color={shades.neutral[100]}
                  className="preliminar"
                >
                  Añadir al carrito
                </Box>
              </Button>
            </Box>
            <Box>
              <Typography color={shades.secondary[700]} sx={{ mt: "10px" }}>
                {item?.attributes?.instock} {item?.attributes?.unit} restantes en almacén
              </Typography>
            </Box>
            <Box>
              <Box m="20px 0 5px 0" display="flex">
                <FavoriteBorderIcon />
                <Typography sx={{ ml: "5px" }}>
                  Añadir a la lista de deseos
                </Typography>
              </Box>
              <Typography>CATEGORÍAS: {item?.attributes?.category}</Typography>
            </Box>
          </Box>
        </Box>

        {/* INFORMATION */}
        <Box m="20px 0">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="DESCRIPTION" value="description" />
            <Tab label="REVIEWS" value="reviews" />
          </Tabs>
        </Box>
        <Box display="flex" flexWrap="wrap" gap="15px">
          {value === "description" && (
            <div>{item?.attributes?.longDescription}</div>
          )}
          {value === "reviews" && <div>reviews</div>}
        </Box>

        {/* RELATED ITEMS */}
        <Box mt="50px" width="100%">
          <Typography variant="h3" fontWeight="bold">
            Related Products
          </Typography>
          <Box className="wrapper py-3 px2">
            {items.slice(0, 5).map((item, i) => (
              <Item key={`${item.name}-${i}`} item={item} />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ItemDetails;
