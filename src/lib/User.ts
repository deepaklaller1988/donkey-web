import API from "./Api";

export default class User {
  static accessToken = "";
  static currentRole: any = null;
  static isAdmin: boolean = false;
  static email: string | "";
  static username: string | "";
  static id: Number | null;

  static async signOut(redirect = 1) {
    await API.get(["auth", "signout"]);
    this.accessToken = "";
    localStorage.clear();
    sessionStorage.removeItem("User");
    this.currentRole = null;
    if (redirect) window.location.href = "/auth/login";
  }

  static async role() {
    let res = await API.get(["user", "my-details"]);

    if (res.success) {
      this.currentRole = res.data?.user?.role;
      this.id = res.data?.user?.id;
      this.email = res.data?.user?.email;
      this.username = res.data?.user?.username;
      return res.data;
    }
  }
}
