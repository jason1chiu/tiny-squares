import ProductivityPlanner from "../img/productivityplanner.webp"
import WellnessJournal from "../img/wellness-journal.jpg"

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