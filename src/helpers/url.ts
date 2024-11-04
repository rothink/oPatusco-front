export default {
  getFilterURL(data) {
    let url = "";
    Object.keys(data).map((objectKey, index) => {
      var value = data[objectKey];
      if (value) {
        url += value ? `&${objectKey}=${encodeURI(value)}` : "";
      }
    });
    return url;
  }
};
