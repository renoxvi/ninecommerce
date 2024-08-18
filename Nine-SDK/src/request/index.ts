import { Base } from "../base";
import { CreateRequestParams } from "./types";
const resourceName = "request";
export class Request extends Base {
  createRequest(args: CreateRequestParams): Promise<string> {
    return this.invoke(`/${resourceName}/create`, {
      method: "POST",
      body: JSON.stringify(args),
    });
  }
}
