export const products = [
  {
    id: "123",
    createdAt: new Date("2023-08-10T10:00:00Z"),
    price: 499.99,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus velit similique itaque consectetur a corrupti nostrum placeat.",
    pictures: ["pic1.jpg", "pic2.jpg", "pic3.jpg"],
    modelId: "6789",
    ownerId: "54321",
    buyerId: null,
    updatedAt: new Date("2023-08-10T15:30:00Z"),
    model: {
      id: "6789",
      name: "Product Model XYZ",
      createdAt: new Date("2023-08-01T08:00:00Z"),
      updatedAt: new Date("2023-08-05T16:45:00Z"),
      brandId: "9876",
      categoryIds: ["cat1", "cat2"],
      brand: {
        id: "9876",
        name: "Brand ABC",
        picture: "brand_logo.jpg",
        createdAt: new Date("2023-07-15T12:00:00Z"),
        updatedAt: new Date("2023-07-20T10:30:00Z"),
      },
    },
    room: {
      id: "5678",
      // end date id 7 days from now at 5.30pm
      end: new Date("2023-08-17T17:30:00Z"),
      bidIds: ["bid1", "bid2"],
      highestBidId: "bid2",
      productId: "12345",
      createdAt: new Date("2023-08-10T10:30:00Z"),
    },
    owner: {
      id: "54321",
      name: "John Doe",
      email: "john@example.com",
      provider: "Google",
      favoriteIds: ["fav1", "fav2"],
      createdAt: new Date("2023-07-01T09:00:00Z"),
      updatedAt: new Date("2023-08-05T14:15:00Z"),
    },
    buyer: {
      id: "67890",
      name: "Jane Smith",
      email: "jane@example.com",
      provider: "Google",
      favoriteIds: ["fav3", "fav4"],
      createdAt: new Date("2023-08-01T11:00:00Z"),
      updatedAt: new Date("2023-08-08T09:30:00Z"),
    },
  },
  {
    id: "456",
    createdAt: new Date("2023-08-10T10:00:00Z"),
    price: 499.99,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus velit similique itaque consectetur a corrupti nostrum placeat.",
    pictures: ["pic1.jpg", "pic2.jpg", "pic3.jpg"],
    modelId: "6789",
    ownerId: "54321",
    buyerId: null,
    updatedAt: new Date("2023-08-10T15:30:00Z"),
    model: {
      id: "6789",
      name: "Product Model XYZ",
      createdAt: new Date("2023-08-01T08:00:00Z"),
      updatedAt: new Date("2023-08-05T16:45:00Z"),
      brandId: "9876",
      categoryIds: ["cat1", "cat2"],
      brand: {
        id: "9876",
        name: "Brand ABC",
        picture: "brand_logo.jpg",
        createdAt: new Date("2023-07-15T12:00:00Z"),
        updatedAt: new Date("2023-07-20T10:30:00Z"),
      },
    },
    room: {
      id: "5678",
      // end date id 3 days from now at 8.00am
      end: new Date("2023-08-13T08:00:00Z"),
      bidIds: ["bid1", "bid2"],
      highestBidId: "bid2",
      productId: "12345",
      createdAt: new Date("2023-08-10T10:30:00Z"),
    },
    owner: {
      id: "54321",
      name: "John Doe",
      email: "john@example.com",
      provider: "Google",
      favoriteIds: ["fav1", "fav2"],
      createdAt: new Date("2023-07-01T09:00:00Z"),
      updatedAt: new Date("2023-08-05T14:15:00Z"),
    },
    buyer: {
      id: "67890",
      name: "Jane Smith",
      email: "jane@example.com",
      provider: "Google",
      favoriteIds: ["fav3", "fav4"],
      createdAt: new Date("2023-08-01T11:00:00Z"),
      updatedAt: new Date("2023-08-08T09:30:00Z"),
    },
  },
];

export const categories = [
  "Mobiles",
  "Laptops",
  "Cameras",
  "Headphones",
  "Accessories",
  "Others",
];

export type Product = (typeof products)[0];

export default products;
