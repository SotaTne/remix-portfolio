export type DeleteDataResponse = {
  success: boolean;
  message?: string;
};
export type SearchMailDataResponse = {
  success: boolean;
  data: MainDataType;
  message?: string;
};

export type MainDataType = {
  name: string;
  email: string;
  contents: string;
};
export type SearchDataResponse = {
  success: boolean;
  clientIp: string | null;
  message?: string;
};

export type SetDataResponse = { success: boolean; message?: string };
