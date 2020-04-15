import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity()
export class Parking extends BaseEntity {
  @PrimaryColumn({ type: "int", array: true })
  county_no: number[];

  @Column()
  deleted: boolean;

  @Column("text")
  description: string;

  @Column("text")
  distance_to_nearest_city: string;

  @Column({ type: "text", array: true })
  equip_accessibility: string[];

  @Column({ type: "text", array: true })
  equip_type: string[];

  @Column({ type: "text", array: true })
  facility_accessibility: string[];

  @Column({ type: "text", array: true })
  facility_type: string[];

  // This might have to change as WKT and String might not be the best storage solution for "offline distance queries"
  // String conversion is known to be expensive => Might not fare well in optimized search algorithm (Graph?)
  // @RESEARCH: Postgres Geometry
  @Column("text")
  sweref: string;

  // This might have to change as WKT and String might not be the best storage solution for "offline distance queries"
  // String conversion is known to be expensive => Might not fare well in optimized search algorithm (Graph?)
  // @RESEARCH: Postgres Geometry
  @Column("text")
  wgs84: string;

  @Column("text")
  icon_id: string;

  @Column("text")
  parking_id: string;

  @Column("text")
  location_description: string;

  @Column("date")
  modified_time: Date;

  @Column("text")
  name: string;

  @Column("text")
  open_status: string;

  @Column("text")
  operation_status: string;

  @Column("text")
  operator_contact: string;

  @Column("text")
  operator_contact_email: string;

  @Column("text")
  operator_contact_phone: string;

  @Column("text")
  operator_name: string;

  // @TODO: relate a field to an adjacent table as parking_access_sweref and wgs are related such that:
  // parking_access_sweref[0] and parking_access_wgs84[0] will always co-exist and reference the same parking
  @Column({ type: "text", array: true })
  parking_access_sweref: string[];

  // @TODO: relate a field to an adjacent table as parking_access_sweref and wgs are related such that:
  // parking_access_sweref[0] and parking_access_wgs84[0] will always co-exist and reference the same parking
  @Column({ type: "text", array: true })
  parking_access_wgs84: string[];

  // @TODO: relate a field to an adjacent table as photo_title and photo_url will always co-exist
  @Column({ type: "text", array: true })
  photo_title: string[];

  // @TODO: relate a field to an adjacent table as photo_title and photo_url will always co-exist
  @Column({ type: "text", array: true })
  photo_url: string[];

  @Column("boolean")
  tariff_payment_fee: boolean;

  @Column("text")
  tarif_payment_cost: string;

  @Column({ type: "text", array: true })
  usage_scenario: string[];

  // @TODO relate a field to an adjacent table as vehicle_load_type, vehicle_spaces and vehicle_type will always co-exist
  @Column({ type: "text", array: true })
  vehicle_load_type: string[];
  // @TODO relate a field to an adjacent table as vehicle_load_type, vehicle_spaces and vehicle_type will always co-exist
  @Column({ type: "int", array: true })
  vehicle_spaces: number[];
  // @TODO relate a field to an adjacent table as vehicle_load_type, vehicle_spaces and vehicle_type will always co-exist
  @Column({ type: "text", array: true })
  vehicle_type: string[];
}
