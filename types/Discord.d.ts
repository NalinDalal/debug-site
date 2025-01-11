interface User {
    id: string | null;
    username: string | null;
    email: string | null;
    isRequestSent: boolean;
    isAccepted: boolean;
    isDeclined: boolean;
    isMember: boolean;

}

type Roles = "admin" | "moderator" | "member" | "guest";

export {User, Roles}