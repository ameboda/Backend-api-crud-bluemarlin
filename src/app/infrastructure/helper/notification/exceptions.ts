import { InotificationResponseModel } from "../../../domain/models/code-response/code-response.model";
import * as messages from "./exceptions.constants";

export class NotificationEnvelope {
  static build(
    noun: string,
    code$: number,
    data?: any
  ): InotificationResponseModel {
    const code: any = messages[`NOTIFICATION_STATUS_${code$}`];
    const message: any = messages[`NOTIFICATION_STATUS_${code$}_MESSAGE`];
    const obj = {
      code: {
        code: code,
        message: message.replace("###", noun),
      },
      data: data,
    };
    return obj;
  }
}
