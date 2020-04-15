import { json } from "body-parser";

/**
 * A class that holds all the information about a parking lot considering information about parkings at trafikverket: https://api.trafikinfo.trafikverket.se/API/Model => Parking model
 */
export class ParkingShaper {
  county_no: number[];
  deleted: boolean = false;

  description: string;
  distance_to_nearest_city: string;

  //   // Equipment info
  //   equipAccessibility: string;
  //   equipType: string;

  //   // Facility info
  //   facAccessibility: string;
  //   facType: string;

  // coordinates
  sweref: string;
  wgs84: string;

  // icon
  icon_id: string;

  // parkingMetaInfo
  parking_id: string;
  location_description: string;
  modified_time: Date;
  name: string;

  // Status
  open_status: string;
  operation_status: string;

  operator_contact: string = null;
  operator_contact_email: string = null;
  operator_contact_phone: string = null;
  operator_name: string = null;

  // Access coordinates
  // parking_access: Array<{}> = null;

  // Photo/Display
  //   photoTitle: string;
  //   photoURL: string;

  // Payment info
  tariff_payment_fee: boolean = false;
  tarif_payment_cost: string = null;

  usage_scenario: string[] = null;

  // Supported vehicles and related info
  //   vehicleLoadType: string;
  //   vehicleNumberOfSpaces: number;
  //   vehicleType: string;

  /**
   * Creates a Parking class-object from trafikverket api to help with bulk insertions to postgres
   * @param jsonParkingInfo A valid json object of a parking lot from the trafikverket API
   */
  constructor(jsonParkingInfo: {
    CountyNo: number[];
    Deleted?: boolean;
    Description: string;
    DistanceToNearestCity: string;
    Geometry: {
      SWEREF99TM: string;
      WGS84: string;
    };
    IconId: string;
    Id: string;
    LocationDescription: string;
    ModifiedTime: Date;
    Name: string;
    OpenStatus: string;
    OperationStatus: string;
    Operator?: {
      Contact: string;
      ContactEmail: string;
      ContactTelephoneNumber: string;
      Name: string;
    };
    ParkingAccess?: Array<{}>;
    TariffsAndPayment?: {
      FreeOfCharge: boolean;
      Tariff: string;
    };
    UsageScenario?: string[];
  }) {
    this.county_no = jsonParkingInfo.CountyNo;
    if ("Deleted" in jsonParkingInfo) this.deleted = jsonParkingInfo.Deleted;

    this.description = jsonParkingInfo.Description;
    this.distance_to_nearest_city = jsonParkingInfo.DistanceToNearestCity;
    this.sweref = jsonParkingInfo.Geometry.SWEREF99TM;
    this.wgs84 = jsonParkingInfo.Geometry.WGS84;
    this.icon_id = jsonParkingInfo.IconId;
    this.parking_id = jsonParkingInfo.Id;
    this.location_description;
    this.modified_time = jsonParkingInfo.ModifiedTime;
    this.name = jsonParkingInfo.Name;
    this.open_status = jsonParkingInfo.OpenStatus;
    this.operation_status = jsonParkingInfo.OperationStatus;

    if ("Operator" in jsonParkingInfo) {
      this.operator_contact = jsonParkingInfo.Operator.Contact;
      this.operator_contact_email = jsonParkingInfo.Operator.ContactEmail;
      this.operator_contact_phone = jsonParkingInfo.Operator.ContactTelephoneNumber;
      this.operator_name = jsonParkingInfo.Operator.Name;
    }

    // if ("ParkingAccess" in jsonParkingInfo) {
    //   this.parking_access = jsonParkingInfo.ParkingAccess;
    // }

    if ("TariffsAndPayment" in jsonParkingInfo) {
      this.tariff_payment_fee = jsonParkingInfo.TariffsAndPayment.FreeOfCharge;
      this.tarif_payment_cost = jsonParkingInfo.TariffsAndPayment.Tariff;
    }

    this.usage_scenario = jsonParkingInfo.UsageScenario;
  }
}
