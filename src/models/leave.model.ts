export class Leave {
  leaveId?: string;
  leaveTypes?: string;
  MaxLeaveEntitlement?: number;

  constructor({ leaveId, leaveTypes, MaxLeaveEntitlement }) {
    if (leaveId !== null) this.leaveId = leaveId;
    if (leaveTypes !== null) this.leaveTypes = leaveTypes;
    if (MaxLeaveEntitlement !== null)
      this.MaxLeaveEntitlement = MaxLeaveEntitlement;
  }
}
