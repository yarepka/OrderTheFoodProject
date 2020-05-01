const Product = require("../models/product");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/restaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var products = [
  // Burgers
  new Product({
    title: "Bacon Cheeseburger",
    description: "A cheeseburger is a hamburger topped with cheese. Traditionally, the slice of cheese is placed on top of the meat patty, but the burger can include variations in structure, ingredients and composition. The cheese is usually added to the cooking hamburger patty shortly before serving, which allows the cheese to melt. As with other hamburgers, a cheeseburger may include toppings, such as lettuce, tomato, onion, pickles, bacon, mayonnaise, ketchup, mustard or other toppings.",
    price: 12.55,
    type: ["Burgers", "American"],
    imagePath: "./img/burgers/baconCheeseburger.jpg",
  }),
  new Product({
    title: "Black Label Burger",
    description: "Kind of cool",
    price: 10.35,
    type: ["Burgers", "American"],
    imagePath: "./img/burgers/blackLabelBurger.jpg",
  }),
  new Product({
    title: "Char Grilled Burger With Roquefort Cheese",
    description: "Kind of cool",
    price: 8.65,
    type: ["Burgers", "American"],
    imagePath: "./img/burgers/chargrilledBurgerWithRoquefortCheese.jpg",
  }),
  new Product({
    title: "Cheeseburger",
    description: "A cheeseburger is a hamburger topped with cheese. Traditionally, the slice of cheese is placed on top of the meat patty, but the burger can include variations in structure, ingredients and composition. The cheese is usually added to the cooking hamburger patty shortly before serving, which allows the cheese to melt. As with other hamburgers, a cheeseburger may include toppings, such as lettuce, tomato, onion, pickles, bacon, mayonnaise, ketchup, mustard or other toppings.",
    price: 9.75,
    type: ["Burgers", "American"],
    imagePath: "./img/burgers/cheeseburger.jpg",
  }),
  new Product({
    title: "Double Animal Style",
    description: "A Double-Double in In-N-Out vernacular means double meat, double cheese. There's nothing 'secret' about that. The secret part is 'animal style'. An Animal Style Burger includes hand leafed lettuce, tomato, a mustard cooked beef patty, pickles, extra sauce, and grilled onions. Oh... the grilled onions! The best part of this burger! ",
    price: 12.15,
    type: ["Burgers", "American"],
    imagePath: "./img/burgers/doubleAnimalStyle.jpg",
  }),
  new Product({
    title: "Dyers Deep Fried Burger",
    description: "Kind of cool",
    price: 6.55,
    type: ["Burgers", "American"],
    imagePath: "./img/burgers/dyersDeepFriedBurger.jpg",
  }),
  // Sushi
  // https://www.japan-talk.com/jt/new/sushi-list
  new Product({
    title: "Maguro Nigiri",
    description: "A lean cut of tuna.This is the inexpensive variety of tuna. When it comes to tuna, fatty cuts are more expensive",
    price: 13.45,
    type: ["Sushi", "Japanese", "Asian"],
    imagePath: "./img/sushi/maguroNigiri.jpg",
  }),
  new Product({
    title: "Ikura Gunkan",
    description: "Salmon Roe",
    price: 12.35,
    type: ["Sushi", "Japanese", "Asian"],
    imagePath: "./img/sushi/ikuraGunkan.jpg",
  }),
  new Product({
    title: "Sake Nigiri",
    description: "Salmon",
    price: 10.25,
    type: ["Sushi", "Japanese", "Asian"],
    imagePath: "./img/sushi/sakeNigiri.jpg",
  }),
  new Product({
    title: "Ebi Nigiri",
    description: "Cooked shrimp",
    price: 13.45,
    type: ["Sushi", "Japanese", "Asian"],
    imagePath: "./img/sushi/ebiNigiri.jpg",
  }),
  new Product({
    title: "Saba",
    description: "Mackerel",
    price: 15.99,
    type: ["Sushi", "Japanese", "Asian"],
    imagePath: "./img/sushi/saba.jpg",
  }),
  new Product({
    title: "California Roll",
    description: "A roll made of cucumber, imitation crab, and avocado",
    price: 9.45,
    type: ["Sushi", "Japanese", "Asian"],
    imagePath: "./img/sushi/californiaRoll.jpg",
  }),
  // Pizza
  // https://www.webstaurantstore.com/article/101/types-of-pizza.html
  new Product({
    title: "Neapolitan Pizza",
    description: "Neapolitan is the original pizza. This delicious pie dates all the way back to 18th century in Naples, Italy. During this time, the poorer citizens of this seaside city frequently purchased food that was cheap and could be eaten quickly. Luckily for them, Neapolitan pizza was affordable and readily available through numerous street vendors.",
    price: 17.55,
    type: ["Pizza", "Italian"],
    imagePath: "./img/pizza/neapolitanPizza.jpg",
  }),
  new Product({
    title: "Chicago Pizza",
    description: "Chicago pizza, also commonly referred to as deep-dish pizza, gets its name from the city it was invented in. During the early 1900’s, Italian immigrants in the windy city were searching for something similar to the Neapolitan pizza that they knew and loved. Instead of imitating the notoriously thin pie, Ike Sewell had something else in mind. He created a pizza with a thick crust that had raised edges, similar to a pie, and ingredients in reverse, with slices of mozzarella lining the dough followed by meat, vegetables, and then topped with a can of crushed tomatoes. This original creation led Sewell to create the now famous chain restaurant, Pizzeria Uno.",
    price: 19.75,
    type: ["Pizza", "Italian"],
    imagePath: "./img/pizza/chicagoPizza.jpg",
  }),
  new Product({
    title: "New York-Style Pizza",
    description: "With its characteristic large, foldable slices and crispy outer crust, New York-style pizza is one of America’s most famous regional pizza types. Originally a variation of Neapolitan-style pizza, the New York slice has taken on a fame all its own, with some saying its unique flavor has to do with the minerals present in New York’s tap water supply.",
    price: 22.99,
    type: ["Pizza", "Italian"],
    imagePath: "./img/pizza/newYorkStylePizza.jpg",
  }),
  new Product({
    title: "Sicilian Pizza",
    description: "Sicilian pizza, also known as sfincione, provides a thick cut of pizza with pillowy dough, a crunchy crust, and robust tomato sauce. This square-cut pizza is served with or without cheese, and often with the cheese underneath the sauce to prevent the pie from becoming soggy. Sicilian pizza was brought to America in the 19th century by Sicilian immigrants and became popular in the United States after the Second World War.",
    price: 14.30,
    type: ["Pizza", "Italian"],
    imagePath: "./img/pizza/sicilianPizza.jpg",
  }),
  new Product({
    title: "Greek Pizza",
    description: "Greek pizza was created by Greek immigrants who came to America and were introduced to Italian pizza. Greek-style pizza, especially popular in the New England states, features a thick and chewy crust cooked in shallow, oiled pans, resulting in a nearly deep-fried bottom. While this style has a crust that is puffier and chewier than thin crust pizzas, it’s not quite as thick as a deep-dish or Sicilian crust.",
    price: 17.75,
    type: ["Pizza", "Greek"],
    imagePath: "./img/pizza/greekPizza.jpg",
  }),
  new Product({
    title: "California Pizza",
    description: "California pizza, or gourmet pizza, is known for its unusual ingredients. This pizza got its start back in the late 1970’s when Chef Ed LaDou began experimenting with pizza recipes in the classic Italian restaurant, Prego. He created a pizza with mustard, ricotta, pate, and red pepper, and by chance, served it to Wolfgang Puck. Impressed with LaDou’s innovative pie, Puck invited him to be a head pizza chef at his restaurant. It was here that LaDou came up with over 250 unique pizza recipes that eventually formed the menu of the chain restaurant California Pizza Kitchen.",
    price: 22.35,
    type: ["Pizza", "Italian"],
    imagePath: "./img/pizza/californiaPizza.jpg",
  }),
  // Vegetarian
  // https://www.huffpost.com/entry/best-vegetarian-foods_n_4373466
  new Product({
    title: "Tofu",
    description: "Yes, tofu is probably the most stereotypical of vegetarian foods. But there may be a reason for that. Tofu is pretty tasty, and it can be used in so many different ways. It's like a sponge, capable of soaking up a myriad of different flavors. Throw it in a stir fry, have it with peanut sauce or have it in a noodle dish. It provides great substance and texture and it doesn't hurt that a lot of Asian restaurants happily substitute meat with it.",
    price: 35.25,
    type: ["Vegetarian"],
    imagePath: "./img/vegetarian/tofu.jpg",
  }),
  new Product({
    title: "Eggplant Parmesan",
    description: "This is a wonderful thing that exists because it allows vegetarians to understand the pleasure of chicken or veal parmesan without having to break their eating choices. Plus, eggplant has such a similar consistency to meat, it's really hard to tell the difference (in our opinion). Side note: We are aware that parmesan cheese is not technically vegetarian; it contains rennet (an ingredient sourced from the stomach of calves). Therefore, very strict vegetarians should not consider this one of their favorite foods.",
    price: 29.55,
    type: ["Vegetarian"],
    imagePath: "./img/vegetarian/eggplantParmesan.jpg",
  }),
  new Product({
    title: "Pasta",
    description: "Pasta will never let you down when it comes to options: Stuffed shells, ravioli, stir-fry, and lo mein are just a few of our favorites. And, of course, the ultimate lazy vegetarian pasta meal: penne with tomato sauce. Pasta and sauce is a vegetarian's saving grace and it does the job for many easy and wonderful dinners.",
    price: 25.75,
    type: ["Vegetarian"],
    imagePath: "./img/vegetarian/pasta.jpg",
  }),
  new Product({
    title: "Guacamole",
    description: "Sometimes it feels like guac was made just for vegetarians. Its the one thing that makes Mexican food very special for us. How many times have you asked, Can I substitute guacamole for the meat? And it's always a better choice.",
    price: 27.35,
    type: ["Vegetarian"],
    imagePath: "./img/vegetarian/guacamole.jpg",
  }),
  new Product({
    title: "Falafel",
    description: "This is the vegetarian's ultimate street food. It's so good that we know some meat eaters who choose this over shawarma many times.",
    price: 13.45,
    type: ["Vegetarian"],
    imagePath: "./img/vegetarian/falafel.jpg",
  }),
  new Product({
    title: "Peanut Butter and Jelly",
    description: "This is the one snack that meat eaters and vegetarians all enjoy as a child, therefore, it belongs in the top ten. Yes, you may eat a bunch of these when you are still figuring out how to be a proper vegetarian... but that doesn't mean that every single PB&J didn't taste absolutely scrumptious.",
    price: 17.95,
    type: ["Vegetarian"],
    imagePath: "./img/vegetarian/peanutButterAndJelly.jpg",
  }),
  // Healthy
  // https://www.realsimple.com/health/nutrition-diet/healthy-eating/the-30-healthiest-foods?slide=462a42ab-6195-4d27-9c27-7451585b3773#462a42ab-6195-4d27-9c27-7451585b3773
  new Product({
    title: "Just Salad",
    description: "It may be called Just Salad, but we'd argue the fast-casual chain is more than a place to build your own salads and wraps. Thanks to their nutrition and fitness ambassador program, the chain is able to serve up a menu that's been designed by a registered dietician and offer loyal salad noshers discounts on local fitness classes. Any restaurant that makes it easier for its customers to commit to a healthy lifestyle is a winner in our eyes!",
    price: 11.99,
    type: ["Healthy", "Vegetarian"],
    imagePath: "./img/healthy/justSalad.jpg",
  }),
  new Product({
    title: "Juice Generation",
    description: "You may think of Juice Generation as just another smoothie and cold- pressed juice shop, but we'd argue that it's much more than that. The company, which has been around since 1999, has stayed trendy and knowledgeable about their customers' needs by opening in and locations where fit, health-conscious people gather. (A number of their shops are actually inside Equinox gyms.) After noticing a demand for clean, packaged on the go meals and bites, CEO Eric Helms launched a brand new menu called Vegan4Lunch. It which offers a variety of chef-made offerings like Jackfruit Tacos, Kale Quinoa Burgers, Green Papaya Pad Thai, and Mushroom Avocado Rolls.",
    price: 15.45,
    type: ["Healthy", "Vegetarian"],
    imagePath: "./img/healthy/juiceGeneration.jpg",
  }),
  new Product({
    title: "Protein Bar",
    description: "Offering Eat This, Not That! favorites like matcha green tea, oatmeal (topped with quinoa, flaxseed, millet and more!), egg scrambles, and savory bowls (many of which can be customized to be vegan), Protein Bar is a safe-haven for busy health-conscious consumers.",
    price: 22.45,
    type: ["Healthy", "Vegetarian"],
    imagePath: "./img/healthy/proteinBar.jpg",
  }),
  new Product({
    title: "Panera Bread",
    description: "It's not that Panera Bread is the absolute healthiest eatery on the block, but we give it tons of bonus points for being so widespread and accessible, even in the tiniest of towns. With more than 1,800 locations nationwide, the soup, salad and sandwich baron makes it easy to grab a meal for under 600 calories. Some of our go-tos include their lentil quinoa bowl with chicken broth bowl 390 calories), the tomato mozzarella flatbread, and the Fuji apple chicken salad (550 calories). One caveat: A number of their dishes carry up to half of the daily recommended amount of sodium and a day's worth of fat (Avocado Chicken Cobb with Ranch, we're looking at you!).",
    price: 14.59,
    type: ["Healthy", "Vegetarian"],
    imagePath: "./img/healthy/paneraBread.jpg",
  }),
  new Product({
    title: "Jason's Deli",
    description: "Not only is this deli's menu packed with dishes wholesome enough to be something you made in your own kitchen, but Jason's also uses organic ingredients whenever possible and offers vegetarian and gluten-sensitive menus to guests with special dietary needs. But those aren't the only things that have earned this chain its bragging rights; they also serve a quinoa shrimp and mango salad that was developed with the help of the medical experts at University of Texas MD Anderson Cancer Center. Most restaurants—including sit-downs—can't claim anything like that.",
    price: 18.96,
    type: ["Healthy", "Vegetarian"],
    imagePath: "./img/healthy/jasonDeli.jpg",
  }),
  new Product({
    title: "Chipotle",
    description: "We know what you're thinking: How did Chipotle make this list of healthy restaurants? But bear with us! Despite the multiple e.coli outbreaks (if you can look past that, that is…) and their massive 1,000 calorie burritos, this Tex-Mex fast-casual eatery is still among the most nutritious in the nation. Their build-it-yourself-style service model gives every customer complete control how many calories wind up in their salad, bowl, and taco, and better yet, the meats are all hormone- and antibiotic-free meats and many of their other ingredients are organic and sourced from local suppliers.",
    price: 22.55,
    type: ["Healthy", "Vegetarian"],
    imagePath: "./img/healthy/chipotle.jpg",
  }),
  // Russian food
  // https://bridgetomoscow.com/russian-cuisine
  new Product({
    title: "Sirniki",
    description: "Sirniki are small blinis made of cottage cheese. This is a typical food for breakfast or branch.",
    price: 8.99,
    type: ["Russian"],
    imagePath: "./img/russian/sirniki.jpg",
  }),
  new Product({
    title: "Kasha",
    description: "Kasha is the most common meal in Russia. It is easy to cook, healthy to eat and everybody can afford it.",
    price: 5.45,
    type: ["Russian"],
    imagePath: "./img/russian/kasha.jpg",
  }),
  new Product({
    title: "Pelmeni",
    description: "Pelmeni are meat or fish dumplings originally coming from the region of Siberia. They are usually kept frozen and cooked in boiled water right before eating",
    price: 7.75,
    type: ["Russian"],
    imagePath: "./img/russian/pelmeni.jpg",
  }),
  new Product({
    title: "Varenniki",
    description: "Varenniki are dumpling similar to pelmeni but they're usually stuffed with cheese, mashed potatoes, cabbage, meat, hard-boiled eggs or different fruits (cherry or plump).",
    price: 6.55,
    type: ["Russian"],
    imagePath: "./img/russian/varenniki.jpg",
  }),
  new Product({
    title: "Borscht",
    description: "Borscht is a soup originally coming from the Ukrainian cuisine but now equally popular in Russia. It has a distinctive reddish-purple color because it’s cooked with beetroot and tomatoes. In Russia borsch is always served hot.",
    price: 7.45,
    type: ["Russian", "Soup"],
    imagePath: "./img/russian/borscht.jpg",
  }),
  new Product({
    title: "Shchi",
    description: "Shchi is one of the staples of Russian cuisine known since the 9th century.",
    price: 9.99,
    type: ["Russian", "Soup"],
    imagePath: "./img/russian/shchi.jpg",
  }),
  // Asian
  // https://www.live-less-ordinary.com/top-50-foods-of-asia-asian-food/
  new Product({
    title: "Chilli Crab",
    description: "Stir-fried crab in a tomato based, sweet, savoury and slightly hot chilli sauce. Break into its claws with crab crackers and suck at the flesh. The popular crab choice in Singapore is the mud crab but expect all sorts of shapes and sizes. While having lost its lustre of late the chilli Crab will always be a must-eat when in Singapore.",
    price: 13.45,
    type: ["Asian"],
    imagePath: "./img/asian/chilliCrab.jpg",
  }),
  new Product({
    title: "Khantoke Dinner",
    description: "A traditional Northern Thai feast showcasing many of the region’s Lanna food favourites. Bites include chilli dips, spicy sausage, Northern style curries and the staple rice. “Khantoke” refers to the haunch height, round tables in which diners feast around and dinners generally come with traditional dance, performances and local liquor.",
    price: 11.65,
    type: ["Asian"],
    imagePath: "./img/asian/khantokeDinner.jpg",
  }),
  new Product({
    title: "Curry Fesat",
    description: "Laced with chunks of cinnamon, curry leaves and other local spices, a curry feast on the Island of Spice is not to be missed. In Sri Lanka curries rarely come served alone and are often matched with sides (condiments) of bean curry, cabbage curry, dhal curry… all sorts of curry. Eat with rice, spicy sambals and popadoms.",
    price: 15.99,
    type: ["Asian"],
    imagePath: "./img/asian/curryFesat.jpg",
  }),
  new Product({
    title: "Momos",
    description: "With obvious Chinese influences these Himalayan meat and/or veg dumplings make a great fast food snack to-go. While best known for Nepali origins momos are now common on all sides of Himalayan borders through Tibet, Bhutan and India. Momos are served with an optional hot chilli sauce, dark soy and a side of soup.",
    price: 12.25,
    type: ["Asian"],
    imagePath: "./img/asian/momos.jpg",
  }),
  new Product({
    title: "Kimchi",
    description: "Accompanying almost every Korean meal these spicy, fermented vegetables are like the ketchup of Korea. While the most common Kimchi is of pickled napa cabbage (baechu kimchi) there is in fact seemingly endless variations of vegetables and seasonings. To make a meal of it try Kimchi fried rice (Kimchi Bokumbap).",
    price: 18.95,
    type: ["Asian"],
    imagePath: "./img/asian/kimchi.jpg",
  }),
  new Product({
    title: "Shan Noodles",
    description: "This popular street food and tea house snack is served as thin rice noodles, topped with spiced meat and, more than not, with the soup broth on the side. Mix together and slurp it up. Popular sides include bean sprouts, deep-fried pork skins and triangles of tofu fritters (napyan gyaw). Perfected with chilli and lime.",
    price: 11.25,
    type: ["Asian"],
    imagePath: "./img/asian/shanNoodles.jpg",
  }),
];

let done = 0;
products.forEach(product => {
  product.save((err, result) => {
    done++;
    if (done === products.length) {
      exit();
    }
  });
});

function exit() {
  mongoose.disconnect();
}