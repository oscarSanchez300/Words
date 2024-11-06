
// export const  getEnvVariables = () => {

//     import.meta.env;

//     return {
//         ...import.meta.env
//     }

// }


export const getEnvVariables = () => {
    // console.log("process", import.meta.env);
    if (typeof process !== "undefined") {
      return { ...process.env}
    } else {
      return { ...import.meta.env}
    }
  }