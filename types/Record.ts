// Author: Emily Yang (eyang4@bu.edu)
// Description: The Record type containing the student's information and total attendance.

import { IntegerType } from "mongodb";

export type Record = {
  firstName: string;
  lastName: string;
  buid: string;
  emailAddress: string;
  totalAttendance: IntegerType;
};
