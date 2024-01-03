async function get<T extends any>(key: string): Promise<T> {
  const res = await chrome.storage.session.get(key);
  return res[key];
}
async function set(key: string, value: any) {
  await chrome.storage.session.set({
    [key]: value,
  });
}

async function setPassword(password: string) {
  await set('__pw', password);
}

async function getPassword() {
  const res = await get('__pw');
  return res as string;
}
export const memoryStore = {
  get,
  set,
  getPassword,
  setPassword,
};
