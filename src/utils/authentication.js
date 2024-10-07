import { useRouter } from "next/router";

export function IsAuthenticated() {
    var user = localStorage.getItem('user');
    return !user;
}

export function RedirectIfNotAuthenticated() {
    var route = useRouter();
    if (IsAuthenticated()) return null;
    else route.push("/login")
}

export function ExecuteIfIsAuthenticated(action) {
    var route = useRouter();
    if (IsAuthenticated()) action();
    else route.push("/login")
}