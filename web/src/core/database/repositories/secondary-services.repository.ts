import { dataSourceClient } from "../client";
import type { SecondaryServicesData } from "../../models";

export class SecondaryServicesRepository {
  public static getData(): SecondaryServicesData {
    return dataSourceClient.getSecondaryServicesRaw();
  }

  public static getItems() {
    return this.getData().items;
  }
}
