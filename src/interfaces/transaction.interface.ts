import { Auth } from "./auth.interface";

export interface Transaction extends Auth {
  action: string;
  endpoint: string;
}
