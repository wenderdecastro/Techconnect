import { useRouter } from "next/router";

export function IsAuthenticated() {
    if (typeof window !== "undefined") {
        const user = localStorage.getItem('user');
        return !!user;
    }
    return false;
}
export function getUser() {
    if (IsAuthenticated()) {
        return localStorage.getItem('user');
    }
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