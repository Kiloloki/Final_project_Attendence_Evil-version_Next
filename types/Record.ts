import { IntegerType } from "mongodb";

export type Record = {
  firstName: string;
  lastName: string;
  buid: string;
  emailAddress: string;
  totalAttendance: IntegerType;
};
