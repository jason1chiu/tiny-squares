import ProductivityPlanner from "assets/img/store/1.png"
import WellnessJournal from "assets/img/store/2.png"
import purpleJournal from "assets/img/store/3.png"

const productsArray = [
  {
    id: "price_1NEFh8CS0MFKcelVyFPWVLV9",
    title: "Basic Package",
    price: 5.99,
    img: ProductivityPlanner,
    benefits: ["1 Journal"]
  },
  {
    id: "price_1NEFi4CS0MFKcelVmTJbQNca",
    title: "Standard Package",
    price: 10.99,
    img: WellnessJournal,
    benefits: ["3 Journals"]
  },
  {
    id: "price_1NEFhgCS0MFKcelVl2CF3wRX",
    title: "Premium Package",
    price: 20.99,
    img: purpleJournal,
    benefits: ["7 Journals"]
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