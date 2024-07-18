import API from "./Api";

export default class User {
  static token = "";
  static isAdmin: boolean = false;
  static email: string = "";
  static username: string = "";
  static id: number | null = null;
  static userDetailsFetched = false;
  static isUserLoggedIn = false;

  static async role() {
    const token = localStorage.getItem("token");

    if (!token) {
      this.clearUserDetails();
      return null;
    }

    if (this.userDetailsFetched) {
      return {
        id: this.id,
        email: this.email,
        username: this.username,
        userDetailsFetched: this.userDetailsFetched,
        isUserLoggedIn: this.isUserLoggedIn,
      };
    }

    try {
      API.setToken(token);
      const res = await API.get(["user", "my-details"]);
      if (res.success) {
        this.id = res.data?.user?.id || null;
        this.email = res.data?.user?.email || "";
        this.username = res.data?.user?.username || "";
        this.userDetailsFetched = true;
        this.isUserLoggedIn = true;
        return res.data.user;
      } else {
        this.isUserLoggedIn = false;
      }
    } catch (error) {
      this.isUserLoggedIn = false;
      console.error("Fetch user details error:", error);
      throw error;
    }
  }

  static clearUserDetails() {
    this.isUserLoggedIn = false;
    this.userDetailsFetched = false;
    this.id = null;
    this.email = "";
    this.username = "";
  }
}
