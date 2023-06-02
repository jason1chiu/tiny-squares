const productsArray = [
  {
      id: "price_1NEFh8CS0MFKcelVyFPWVLV9",
      title: "Productivity Journal",
      price: 40.99,
  },
  {
      id: "price_1NEFhgCS0MFKcelVl2CF3wRX",
      title: "Templates",
      price: 50.99,
  },
  {
      id: "price_1NEFi4CS0MFKcelVmTJbQNca",
      title: "Wellness Journal",
      price: 50.99,
  },
]

function getProductData(id) {
  let productData = productsArray.find(product => product.id === id)

  if (productData == undefined) {
      console.log("Product data does not exist for ID: ", id);
      return undefined;
  }

  return productData;
}

export { productsArray, getProductData };