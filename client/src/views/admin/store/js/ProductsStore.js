import ProductivityPlanner from "assets/img/store/productivityplanner.webp"
import WellnessJournal from "assets/img/store/wellness-journal.jpg"
import purpleJournal from "assets/img/store/purple.jpg"

const productsArray = [
  {
    id: "price_1NEFh8CS0MFKcelVyFPWVLV9",
    title: "Productivity Planner",
    price: 40.99,
    img: ProductivityPlanner
  },
  {
    id: "price_1NEFi4CS0MFKcelVmTJbQNca",
    title: "Wellness Journal",
    price: 50.99,
    img: WellnessJournal
  },
  {
    id: "price_1NEFhgCS0MFKcelVl2CF3wRX",
    title: "Additional Templates",
    price: 50.99,
    img: purpleJournal
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