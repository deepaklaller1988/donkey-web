import User from "./User";
import Error from "./Error";
import { handleError } from "util/errorHandler";

export interface Res {
  success: boolean;
  status: number;
  resent: boolean;
  resend: Function;
  [key: string]: any;
}

class API {
  static async get(
    path: string | string[],
    resent: boolean = false
  ): Promise<Res> {
    return new Promise(async (resolve) => {
      // Join path array
      if (Array.isArray(path)) path = path.join("/");

      let headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");

    if (localStorage.getItem("token")) {
        headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
      }

      let options: any = {
        headers: headers,
        method: "GET",
        credentials: "include",
      };

      await fetch(process.env.NEXT_PUBLIC_API_URL + path, options)
        .then(async (res: Response) => {
          let parsed = await this.parseRes(
            res,
            () => this.get(path, true),
            resent,
            path
          );

          // if (Process.isDev) console.log("GET", path, "\n", parsed);

          resolve(parsed);
        })
        .catch((err: any) => {
          if (err.status == undefined) {
            console.log(err);

            // Route.load("/maintenance");
          }
          console.error(err);
        });
    });
  }

  static async post(
    path: string | string[],
    body: any,
    resent: boolean = false
  ): Promise<Res> {
    return new Promise(async (resolve, reject) => {
      // Join path array
      if (Array.isArray(path)) path = path.join("/");
  
      let headers = new Headers();
  
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");
     if (localStorage.getItem("token")) {
        headers.append(
          "Authorization",
          `Bearer ${localStorage.getItem("token")}`
        );
      }
  
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + path, {
          method: "POST",
          credentials: "include",
          headers: headers,
          body: JSON.stringify(body),
        });
  
        const parsed = await this.parseRes(
          response,
          () => this.post(path, body, true),
          resent,
          path
        );
  
        if (!parsed.success) {
          return reject(parsed);
        }
        
        resolve(parsed);
      } catch (error:any) {
        reject(error);
        console.log(error,"err")
        throw handleError(error.code);      }
    });
  }
  

  static async postFile(
    path: string | string[],
    body: any,
    resent: boolean = false
  ): Promise<Res> {
    return new Promise(async (resolve) => {
      // Join path array
      if (Array.isArray(path)) path = path.join("/");

      let headers = new Headers();

     if (localStorage.getItem("token")) {
        headers.append(
          "Authorization",
          `Bearer ${localStorage.getItem("token")}`
        );
      }

      await fetch(process.env.NEXT_PUBLIC_API_URL + path, {
        method: "POST",
        credentials: "include",
        headers: headers,
        body: body,
      })
        .then(async (res: Response) => {
          let parsed = await this.parseRes(
            res,
            () => this.post(path, body, true),
            resent,
            path
          );

          // if (Process.isDev) console.log("POST", path, "\n", parsed);

          resolve(parsed);
        })
        .catch((err: any) => {
          if (err.status == undefined) {
            // Route.load("/maintenance");
          }
          console.error(err);
        });
    });
  }

  static async put(
    path: string | string[],
    body: any,
    resent: boolean = false
  ): Promise<Res> {
    return new Promise(async (resolve) => {
      if (Array.isArray(path)) path = path.join("/");

      let headers = new Headers();

      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");
    if (localStorage.getItem("token")) {
        headers.append(
          "Authorization",
          `Bearer ${localStorage.getItem("token")}`
        );
      }

      await fetch(process.env.NEXT_PUBLIC_API_URL + path, {
        method: "PUT",
        credentials: "include",
        headers: headers,
        body: JSON.stringify(body),
      })
        .then(async (res: Response) => {
          let parsed = await this.parseRes(
            res,
            () => this.post(path, body, true),
            resent,
            path
          );

          // if (Process.isDev) console.log("PUT", path, "\n", parsed);

          resolve(parsed);
        })
        .catch((err: any) => {
          if (err.status == undefined) {
            // Route.load("/maintenance");
          }
          console.error(err);
        });
    });
  }

  static async delete(
    path: string | string[],
    body: any,
    resent: boolean = false
  ): Promise<Res> {
    return new Promise(async (resolve) => {
      // Join path array
      if (Array.isArray(path)) path = path.join("/");

      let headers = new Headers();

      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");
     if (localStorage.getItem("token")) {
        headers.append(
          "Authorization",
          `Bearer ${localStorage.getItem("token")}`
        );
      }

      await fetch(process.env.NEXT_PUBLIC_API_URL + path, {
        method: "DELETE",
        credentials: "include",
        headers: headers,
        body: JSON.stringify(body),
      })
        .then(async (res: Response) => {
          let parsed = await this.parseRes(
            res,
            () => this.post(path, body, true),
            resent,
            path
          );

          // if (Process.isDev) console.log("DELETE", path, "\n", parsed);

          resolve(parsed);
        })
        .catch((err: any) => {
          if (err.status == undefined) {
            // Route.load("/maintenance");
          }
          console.error(err);
        });
    });
  }

  static async parseRes(
    raw: Response,
    resend: Function,
    resent: boolean,
    path: string | string[]
  ): Promise<Res> {
    try {
      let res: Res = await raw.json();
      res.success = raw.status >= 200 && raw.status < 300;
      res.status = raw.status;
      res.resend = resend;
      res.resent = resent;

      if (!res.success) {
        return await Error.handle(res, path);
      }

      return res;
    } catch (error) {
      console.error("Error parsing response:", error);
      throw handleError (error); // Rethrow the error to propagate it
      
    }
  }

}

export default API;
