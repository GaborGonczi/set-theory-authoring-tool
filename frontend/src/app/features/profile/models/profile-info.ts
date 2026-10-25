export class ProfileInfo {
  private id: number;
  private username: string;

  constructor(profile: {
    id: number;
    username: string;
  }) {
    this.id = profile.id;
    this.username = profile.username;
  }
  
  public getId(): number {
    return this.id;
  }

  public getUsername(): string {
    return this.username;
  }
}