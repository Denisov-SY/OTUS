import axios from "axios";

export /**
 * Загрузка данных с сервера
 * @param {Object} {url, params} url - адрес на сервере, по которому запрашиваются данные. params - Параметры запроса (передаются на сервер)
 * @returns Object
 */
async function loadData({ url, params, responseType }) {
  const PROC_NAME = "loadData> ";
  // console.log(`${PROC_NAME}(url="${url}", params=`, params);
  try {
    return (
      await axios.get(url, {
        params: params,
        withCredentials: true,
        // ...(responseType && { responseType: responseType }),
      })
    ).data;
  } catch (ex) {
    console.error(PROC_NAME, ex);
    return { error: ex?.response?.data?.error ? ex.response.data.error : ex };
  }
}

export /**
 * передача данных на сервер
 * @param {Object} {url, params} url - адрес на сервере, по которому запрашиваются данные. params - Параметры запроса (передаются на сервер)
 * @returns Object
 */
async function sendData({ url, params }) {
  const PROC_NAME = "sendData> ";
  // console.log(`${PROC_NAME}(url="${url}", params=`, params);
  try {
    return (await axios.post(url, params, { withCredentials: true }))?.data;
  } catch (ex) {
    console.error(PROC_NAME, ex);
    // return { error: ex };
    return { error: ex?.response?.data?.error ? ex.response.data.error : ex };
  }
}

export /**
 * Приём файла с сервера
 * @param {Object} {url, params} url - адрес на сервере, по которому запрашиваются данные. params - Параметры запроса (передаются на сервер)
 * @returns Object
 */
async function loadBlob({ url, params }) {
  const PROC_NAME = "loadBlob> ";
  // console.log(`${PROC_NAME}(url="${url}", params=`, params);
  try {
    return (
      await axios.get(url, {
        params: params,
        withCredentials: true,
        responseType: "blob",
      })
    );
  } catch (ex) {
    console.error(PROC_NAME, ex);
    return { error: ex?.response?.data?.error ? ex.response.data.error : ex };
  }
}
