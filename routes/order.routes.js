const express = require("express");
const router = express.Router();

const OrderModel = require("../models/Order.model");
const CoffeeModel = require("../models/Coffee.model");

router.post("/create-order", async (req, res) => {
  try {
    const coffee = await CoffeeModel.findOne({ _id: req.body.coffee });
    if (coffee.stok - req.body.quantityPurchased < 0) {
      return res.status(400).json({ msg: `Só temos ${coffee.stok} unidades.` });
    }

    const createdOrder = await OrderModel.create({
      ...req.body,
      // Front-end, gentileza enviar
      totalAmount: coffee.price * req.body.quantityPurchased,
    });

    await CoffeeModel.updateOne(
      { _id: req.body.coffee },
      {
        $push: { orderList: createdOrder._id },
        stok: coffee.stok - createdOrder.quantityPurchased,
      },
      { new: true, runValidators: true }
    );

    return res.status(201).json({ createdOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

router.get("/order-details/:orderId", async (req, res) => {
  try {
    if (!req.params.orderId) {
      return res
        .status(400)
        .json({ msg: "Requisição sem ID da ordem na rota." });
    }

    const foundedOrder = await OrderModel.findOne({
      _id: req.params.orderId,
    }).populate("coffee");

    return res.status(200).json(foundedOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

//softDelete
router.delete("/delete-order/:orderId", async (req, res) => {
  try {
    const order = await OrderModel.findOne({ _id: req.params.orderId });
    console.log(order);

    //NAO ESTA CAINDO NO IF SOCORROOOOOOOO

    if (!order) {
      return res.status(400).json({ msg: "Ordem não encontrada!" });
    }

    await OrderModel.findOneAndUpdate(
      { _id: req.params.orderId },
      { isDeleted: true, deletedDate: Date.now() },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ msg: "Ok" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
