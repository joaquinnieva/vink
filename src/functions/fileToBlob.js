export const toBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (blob) {
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (err) => {
        reject(err);
      };
    }
  });
