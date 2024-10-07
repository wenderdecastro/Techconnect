import { useRouter } from "next/router";

export function IsAuthenticated() {
    var user = localStorage.getItem('user');
    return !user;
}

export function ExecuteIfIsAuthenticated(action) {
    var route = useRouter();
    var user = localStorage.getItem('user');
    if (user) action();
    else route.push("/login")
}