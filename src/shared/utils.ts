export const delay = (time: number) => new Promise(ok => setTimeout(ok, time));

export const generateEventId = () => (Date.now() + '.' + Math.random()).toString();

export const makePasswordValidator =
  (error: string = 'wrong password') =>
  (password: string) =>
    (password || '').length !== 0 ? undefined : error;
