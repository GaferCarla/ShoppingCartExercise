import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Box, Typography, Tab, Tabs, useMediaQuery} from "@mui/material";
import Item from "../../components/Item";
import { setItems } from '../../state';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery("(min-width:600px)");


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //GET THE INFORMATION IN STRAPI
  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image",
      { method: "GET" }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItems();
  }, []); 
//    eslint-disable-line react-hooks/exhaustive-deps

  const newItems = items.filter(
    (item) => item.attributes.category === "Nuevos"
  );
  const importadoItems = items.filter(
    (item) => item.attributes.category === "Importados"
  );
  const ofertasItems = items.filter(
    (item) => item.attributes.category === "Ofertas"
  );

  return (
    <Box width="85%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Nuestros productos
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="Todos" value="all" />
        <Tab label="NEWS" value="Nuevos" />
        <Tab label="Ofertas" value="Ofertas" />
        <Tab label="Importados" value="Importados" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 200px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Importados" &&
          importadoItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Ofertas" &&
          ofertasItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Nuevos" &&
          newItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;