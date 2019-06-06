export class User {
    username: string;
    points: number;
    admin?: boolean

    constructor(username: string, points: number, admin?: boolean) {
        this.username = username;
        this.points = points;
        if (admin) {
            this.admin = admin;
        }
    }
}