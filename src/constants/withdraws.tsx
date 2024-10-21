 
import { CurrencyType } from "./currencies";
 

export enum WithdrawState {
  Prepared = "prepared",
  Submitted = "submitted",
  Processing = "processing",
  Canceled = "canceled",
  Failed = "failed",
  Accepted = "accepted",
  Succeed = "succeed",
  Confirming = "confirming",
  Errored = "errored",
  Rejected = "rejected",
  Skipped = "skipped",
}

export enum WithdrawType {
  Coin = "coin",
  Fiat = "fiat",
}

export const CompletedWithdrawStates = [
  WithdrawState.Succeed,
  WithdrawState.Rejected,
  WithdrawState.Canceled,
  WithdrawState.Failed,
];

export enum WithdrawAction {
  Submit = "submit",
  Cancel = "cancel",
  Accept = "accept",
  Reject = "reject",
  Process = "process",
  Load = "load",
  Dispatch = "dispatch",
  Success = "success",
  Skip = "skip",
  Fail = "fail",
  Err = "err",
}

 