import axios from "axios";

const ServerUrl = "http://192.168.8.198:9000/api/v2";

// Create separate Axios instances with different base URLs
const authApi = axios.create({
  baseURL: ServerUrl,
  withCredentials: true,
});

const globalApi = axios.create({
  baseURL: ServerUrl,
  withCredentials: true,
});

const eventsApi = axios.create({
  baseURL: ServerUrl,
  withCredentials: true,
});

const usersApi = axios.create({
  baseURL: ServerUrl,
  withCredentials: true,
});

const eventtypesApi = axios.create({
  baseURL: ServerUrl,
  withCredentials: true,
});

const categoriesApi = axios.create({
  baseURL: ServerUrl,
  withCredentials: true,
});
// Define your API routes
const authRoutes = {
  login: "/admin/login-admin",
  createAdmin: "/admin/create-admin",
  // Add more authentication routes as needed
};

const eventsRoutes = {
  getEvents: "/events",
  addEvent: "/events/add-event",
  deleteEvent: "/events:id",
  updateEvent: "/events:id",
  // Add more product routes as needed
};

const usersApiRoutes = {
  getUsers: "/user",
  createUser: "/user/create-user",
  createSeller: "/user/create-seller",
  deleteUser: "/user:email",
  getUsersCount: "/user/count",
};

const eventtypesRoutes = {
  getEventTypes: "/eventTypes",
  addEventType: "/eventTypes",
  deleteEventType: "/eventTypes:id",
  // Add more category routes as needed
};

const categoryRoutes = {
  getcategories: "/categories",
  addCategory: "/categories",
  deleteCategory: "/categories:id",
  // Add more subcategory routes as needed
};

const bannerRoutes = {
  getBanners: "/banners",
  addBanner: "/banners",
  deleteBanner: "/banners:id",
  updateBanner: "/banners:id",
  // Add more category routes as needed
};

const pickupStationRoutes = {
  getPickupStations: "/pickup-stations",
  addPickupStation: "/pickup-stations",
  deletePickupStation: "/pickup-stations:id",
  updatePickupStation: "/pickup-stations:id",
  // Add more category routes as needed
};

const orderRoutes = {
  getOrders: "/orders/get-orders",
  placeOrder: "/orders/place-order",
  cancelOrder: "/orders/cancel-order:id",
  updateOrderStatus: "/orders/update-order:id",
  // Add more category routes as needed
};

// Functions to make API requests for authentication
const authApiRequests = {
  loginAdmin: async (email, password) => {
    return await authApi.post(authRoutes.login, { email, password });
  },
  createAdmin: async (data) => {
    return await authApi.post(authRoutes.createAdmin, data);
  },
  // Add more functions for other authentication routes
};

// Functions to make API requests for events
const eventsApiRequests = {
  getEvents: async () => {
    return await eventsApi.get(eventsRoutes.getEvents);
  },
  addEvent: async (eventData) => {
    return await eventsApi.post(eventsRoutes.addEvent, eventData);
  },
  deleteEvent: async (id) => {
    return await eventsApi.delete(`/events/${id}`);
  },
  updateEvent: async (id, updatedInfo) => {
    return await eventsApi.put(`/events/${id}`, updatedInfo);
  },
};

const bannerApiRequests = {
  getBanners: async () => {
    return await globalApi.get(bannerRoutes.getBanners);
  },
  addBanner: async (bannerData) => {
    return await globalApi.post(bannerRoutes.addBanner, bannerData);
  },
  deleteBanner: async (id) => {
    return await globalApi.delete(`/banners/${id}`);
  },
  updateBanner: async (id, updatedInfo) => {
    return await globalApi.put(`/banners/${id}`, updatedInfo);
  },
};

// Functions to make API requests for categories
const eventTypeApiRequests = {
  getEventTypes: async () => {
    return await eventtypesApi.get(eventtypesRoutes.getEventTypes);
  },
  addEventType: async (categoryData) => {
    console.log(categoryData);
    return await eventtypesApi.post(
      eventtypesRoutes.addEventType,
      categoryData
    );
  },
  deleteEventType: async (id) => {
    return await eventtypesApi.delete(`/eventTypes/${id}`);
  },
};

// Functions to make API requests for categories
const categoryApiRequests = {
  getCategories: async () => {
    return await categoriesApi.get(categoryRoutes.getcategories);
  },
  addCategory: async (categoryData) => {
    return await categoriesApi.post(categoryRoutes.addCategory, categoryData);
  },
  deleteCategory: async (id) => {
    return await categoriesApi.delete(`/categories/${id}`);
  },
};

// Functions to make API requests for users
const usersApiRequests = {
  getUsers: async () => {
    return await usersApi.get(usersApiRoutes.getUsers);
  },
  createUser: async (user) => {
    return await usersApi.post(usersApiRoutes.createUser, user);
  },
  createSeller: async (seller) => {
    return await usersApi.post(usersApiRoutes.createSeller, seller);
  },
  deleteUser: async (email) => {
    return await usersApi.delete(`/user/${email}`);
  },
  getUsersCount: async () => {
    return await usersApi.get(usersApiRoutes.getUsersCount);
  },
};
//Functions to make API requests for orders
const ordersApiRequests = {
  placeOrder: async (orderDetails) => {
    return await globalApi.post(orderRoutes.placeOrder, orderDetails);
  },
  getOrders: async (orderDetails) => {
    return await globalApi.get(orderRoutes.getOrders, orderDetails);
  },
  cancelOrder: async (id) => {
    return await globalApi.delete(orderRoutes.cancelOrder, id);
  },
  updateOrderStatus: async (orderId, newStatus) => {
    // Corrected function definition
    return await globalApi.put(`/orders/update-order/${orderId}`, {
      status: newStatus,
    }); // Pass order ID and new status
  },
};

//Functions to make API requests for pickupStations
const pickupStationApiRequests = {
  getPickupStations: async () => {
    return await globalApi.get(pickupStationRoutes.getPickupStations);
  },
  addPickupStation: async (pickupStationData) => {
    return await globalApi.post(
      pickupStationRoutes.addPickupStation,
      pickupStationData
    );
  },
  deletePickupStation: async (id) => {
    return await globalApi.delete(pickupStationRoutes.deletePickupStation, id);
  },
  updatePickupStation: async (id, updatedInfo) => {
    return await globalApi.put(`/pickup-stations/${id}`, updatedInfo);
  },
};
//Functions to make API requests for earnings
const earningsApiRequests = {};
//Functions to make API requests for balance
const balanceApiRequests = {};
export {
  authApiRequests,
  eventsApiRequests,
  usersApiRequests,
  eventTypeApiRequests,
  categoryApiRequests,
  bannerApiRequests,
  ordersApiRequests,
  balanceApiRequests,
  earningsApiRequests,
  pickupStationApiRequests,
};
