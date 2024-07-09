
let headers = new Headers();
headers.append("Accept", "application/json");
// headers.append("Content-Type", "text/plain");
headers.append("Authorization", `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTg0OGNjZTg1NDEwZDViNGRhZTk0MjliODI1MmI2OSIsIm5iZiI6MTcyMDAxMjkzMC4xMDYwNjUsInN1YiI6IjY2NzJiZjFiYzAyMjM0MjI0Y2ViMDhiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rdU44cW2GOk4lzYWJhY5THlQscYEiOOdEm5b5JPvvHM`);
// headers.append("Access-Control-Allow-Origin", `*`);

export default {
  get: async (path: string) => {
    let options: any = {
      headers: headers,
      method: "GET",
      // credentials: "include",
      // mode: "cors",
    };
    let res = await fetch(path, options);
    return res;
  },
  post: async (path: string, body: any) => {
    let options: any = {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    try {
      let res: any = await fetch(path, options);
      if (!res.ok) {
        let errorData = await res.json();
        //  throw Error(handleError(errorData.error.code))
      }
      let data: any = await res.json();
      return data;
    } catch (error: any) {
      throw error
    }
  }
};
