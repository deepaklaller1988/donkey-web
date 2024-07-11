import API from "./Api";

export default class User {
  static token = "";
  static isAdmin: boolean = false;
  static email: string = "";
  static username: string = "";
  static id: number | null = null;
  
  static async role() {
    try {
      const res = await API.get(["my-details"]);
      console.log(res,"response");

      if (res.success) {
        this.id = res.data?.user?.id || null;
        this.email = res.data?.user?.email || "";
        this.username = res.data?.user?.username || "";
        return res.data;
      } else {
        throw new Error(res.error || "Failed to fetch user details");
      }
    } catch (error) {
      console.error("Fetch user details error:", error);
      throw error;
    }
  }
}
