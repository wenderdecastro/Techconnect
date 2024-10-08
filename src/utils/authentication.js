import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
    const router = useRouter();

    useEffect(() => {
        if (!IsAuthenticated()) {
            router.push("/login");
        }
    }, [router]);
}


export function ExecuteIfIsAuthenticated(action) {
    var route = useRouter();
    if (IsAuthenticated()) action();
    else route.push("/login")
}