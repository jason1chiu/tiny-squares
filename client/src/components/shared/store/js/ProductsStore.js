import ProductivityPlanner from "assets/img/store/1.png"
import WellnessJournal from "assets/img/store/2.png"
import purpleJournal from "assets/img/store/3.png"

const productsArray = [
  {
    id: "price_1NGkoaCS0MFKcelVsPHlR5r4",
    title: "$1 Donation",
    price: 1.00,
    img: ProductivityPlanner,
    benefits: ["Buy us a gum ball"]
  },
  {
    id: "price_1NGkqFCS0MFKcelVSTB7pj7U",
    title: "$3 Donation",
    price: 3.00,
    img: WellnessJournal,
    benefits: ["Buy us a small plain Starbucks coffee"]
  },
  {
    id: "price_1NGkqsCS0MFKcelVqyoaYwou",
    title: "$15 Donation",
    price: 15.00,
    img: purpleJournal,
    benefits: ["Buy us a large Starbucks coffee"]
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