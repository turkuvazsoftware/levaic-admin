import CryptoJS from "crypto-js";

const SECRET_KEY = "levaic-admin-2025";

export const setItem = (key, value) => {
  try {
    const stringValue = JSON.stringify(value);
    const encrypted = CryptoJS.AES.encrypt(stringValue, SECRET_KEY).toString();
    localStorage.setItem(key, encrypted);
  } catch (error) {
    console.error("setSecureItem error:", error);
  }
};

export const getItem = (key) => {
  try {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;

    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedString) return null;

    return JSON.parse(decryptedString);
  } catch (error) {
    console.error("getSecureItem error:", error);
    return null;
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("removeSecureItem error:", error);
  }
};
