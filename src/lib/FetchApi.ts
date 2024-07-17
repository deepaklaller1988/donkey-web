
let headers = new Headers();
headers.append("Accept", "application/json");
headers.append("Content-Type", "application/json;charset=utf-8");
headers.append("Authorization", `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzYyMDI0YjFlNzcwYWI1NzRhYmRiN2Y2MGJmNjA4YyIsIm5iZiI6MTcyMTE5ODU5Ny4wMjcwNCwic3ViIjoiNjY4NTU4Nzk2MWY3NTA0YWIxODE4NzcyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.18M2uo7jrhSCwssE0Pw-VDBADvPcRefiRWpqM9XlU2I`);

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
      headers: headers,

      body: JSON.stringify(body)
    };
    try {
      let res: any = await fetch(path, options);
      if (!res.ok) {
        let errorData = await res.json();

         throw Error(errorData.error.code)
      }
      let data: any = await res.json();
      return data;
    } catch (error: any) {
      throw error
    }
  }
};
