import API from "./Api";

export default class User {
  static token = "";
  static isAdmin: boolean = false;
  static email: string = "";
  static username: string = "";
  static id: number | null = null;
  static userDetailsFetched = false;

  static async role() {
    if (this.userDetailsFetched) {
      return {
        id: this.id,
        email: this.email,
        username: this.username,
      };
    }

    try {
      const token = localStorage.getItem("token");
      if (token) {
        API.setToken(token);
        
      }

      const res = await API.get(["my-details"]);
      console.log(res.data?.user?.email, "response");

      if (res.success) {
        this.id = res.data?.user?.id || null;
        this.email = res.data?.user?.email || "";
        this.username = res.data?.user?.username || "";
        this.userDetailsFetched = true;
        return res.data;
      } else {
        throw new Error(res.error || "Failed to fetch user details");
      }
    } catch (error) {
      console.error("Fetch user details error:", error);
      throw error;
    }
  }

  static clearUserDetails() {
    this.userDetailsFetched = false;
    this.id = null;
    this.email = "";
    this.username = "";
  }
}
