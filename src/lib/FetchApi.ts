
let headers = new Headers();
headers.append("Accept", "application/json");
headers.append("Content-Type", "application/json;charset=utf-8");
headers.append("Authorization", `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmQ4MDdmNzM1OGRjZWE4NTAyOTFkNzM3YWM0Mjg1MiIsIm5iZiI6MTcyMzIwNDQ0Ni4zODQ5NzksInN1YiI6IjY2ODI2ZDA5OWU1MThkYjA1YjFiNzVmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GuVTSK_Z-CWJOFalwiKu8-FzilqPIBROlQ71-eMBZz0`);

export default {
  get: async (path:any) => {
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
