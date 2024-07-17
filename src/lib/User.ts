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
      const token = localStorage.getItem("token");
      if (token) {
        API.setToken(token);
        
      }

      const res = await API.get(["user","my-details"]);
      console.log(res.data?.user?.email, "response");

      if (res.success) {
        this.id = res.data?.user?.id || null;
        this.email = res.data?.user?.email || "";
        this.username = res.data?.user?.username || "";
        this.userDetailsFetched = true;
        this.isUserLoggedIn = true;
        return res.data.user;
      } else {
        this.isUserLoggedIn = false;
        // throw new Error(res.error || "Failed to fetch user details");
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
