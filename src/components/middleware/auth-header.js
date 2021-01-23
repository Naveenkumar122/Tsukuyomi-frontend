import { userService } from "../users/user-service";
export function authHeader() {
    // return authorization header with jwt token
    const currentUser = userService.currentUserValue;

    if (currentUser && currentUser) {
        return { 'Authorization': 'Bearer ' + currentUser.token };
    } else {
        return {};
    }
}