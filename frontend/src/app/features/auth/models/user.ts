export class User {
    private id: number;
    private username:string;
    
    constructor(user:{id:number,username:string}) {
        this.id=user.id;
        this.username=user.username;
    }

    public getId():number {
        return this.id;
    }

    public getUsername():string {
        return this.username;
    }
}
