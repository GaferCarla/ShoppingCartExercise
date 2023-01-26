import React from "react";
import useAlert from "react-alert";

const ClassAlert = () => {
    const alert = useAlert();

    return alert.error("Este elemento ya se encuentra dentro de tu carrito de compras. Si quieres cambiar la cantidad o eliminar el item, hágalo dentro del panel del carro de compras.")
};

export default ClassAlert;