import { ADMIN, DOCTOR, PHARMACY, RECEPTION, UPCOMING } from "../utils/roles";
import { adminRoutes, doctorRoutes, pharmacyRoutes, receptionRoutes, upcomingRoutes } from "./allRoutesData";

const map = new Map();

map.set(ADMIN, adminRoutes);
map.set(DOCTOR, doctorRoutes);
map.set(PHARMACY, pharmacyRoutes);
map.set(RECEPTION, receptionRoutes);
map.set(UPCOMING, upcomingRoutes);

export var getRoutes = function (roleList) {
    const routes = {};
    roleList.forEach(role => {
        routes[role] = map.get(role);
    });
    return routes;
}