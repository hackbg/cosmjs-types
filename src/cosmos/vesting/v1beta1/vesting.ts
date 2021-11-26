/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { BaseAccount } from "../../../cosmos/auth/v1beta1/auth";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "cosmos.vesting.v1beta1";

/**
 * BaseVestingAccount implements the VestingAccount interface. It contains all
 * the necessary fields needed for any vesting account implementation.
 */
export interface BaseVestingAccount {
  baseAccount?: BaseAccount;
  originalVesting: Coin[];
  delegatedFree: Coin[];
  delegatedVesting: Coin[];
  endTime: Long;
}

/**
 * ContinuousVestingAccount implements the VestingAccount interface. It
 * continuously vests by unlocking coins linearly with respect to time.
 */
export interface ContinuousVestingAccount {
  baseVestingAccount?: BaseVestingAccount;
  startTime: Long;
}

/**
 * DelayedVestingAccount implements the VestingAccount interface. It vests all
 * coins after a specific time, but non prior. In other words, it keeps them
 * locked until a specified time.
 */
export interface DelayedVestingAccount {
  baseVestingAccount?: BaseVestingAccount;
}

/** Period defines a length of time and amount of coins that will vest. */
export interface Period {
  length: Long;
  amount: Coin[];
}

/**
 * PeriodicVestingAccount implements the VestingAccount interface. It
 * periodically vests by unlocking coins during each specified period.
 */
export interface PeriodicVestingAccount {
  baseVestingAccount?: BaseVestingAccount;
  startTime: Long;
  vestingPeriods: Period[];
}

/**
 * PermanentLockedAccount implements the VestingAccount interface. It does
 * not ever release coins, locking them indefinitely. Coins in this account can
 * still be used for delegating and for governance votes even while locked.
 *
 * Since: cosmos-sdk 0.43
 */
export interface PermanentLockedAccount {
  baseVestingAccount?: BaseVestingAccount;
}

const baseBaseVestingAccount: object = { endTime: Long.ZERO };

export const BaseVestingAccount = {
  encode(message: BaseVestingAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseAccount !== undefined) {
      BaseAccount.encode(message.baseAccount, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.originalVesting) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.delegatedFree) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.delegatedVesting) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (!message.endTime.isZero()) {
      writer.uint32(40).int64(message.endTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseVestingAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBaseVestingAccount } as BaseVestingAccount;
    message.originalVesting = [];
    message.delegatedFree = [];
    message.delegatedVesting = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseAccount = BaseAccount.decode(reader, reader.uint32());
          break;
        case 2:
          message.originalVesting.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.delegatedFree.push(Coin.decode(reader, reader.uint32()));
          break;
        case 4:
          message.delegatedVesting.push(Coin.decode(reader, reader.uint32()));
          break;
        case 5:
          message.endTime = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BaseVestingAccount {
    const message = { ...baseBaseVestingAccount } as BaseVestingAccount;
    message.baseAccount =
      object.baseAccount !== undefined && object.baseAccount !== null
        ? BaseAccount.fromJSON(object.baseAccount)
        : undefined;
    message.originalVesting = (object.originalVesting ?? []).map((e: any) => Coin.fromJSON(e));
    message.delegatedFree = (object.delegatedFree ?? []).map((e: any) => Coin.fromJSON(e));
    message.delegatedVesting = (object.delegatedVesting ?? []).map((e: any) => Coin.fromJSON(e));
    message.endTime =
      object.endTime !== undefined && object.endTime !== null ? Long.fromString(object.endTime) : Long.ZERO;
    return message;
  },

  toJSON(message: BaseVestingAccount): unknown {
    const obj: any = {};
    message.baseAccount !== undefined &&
      (obj.baseAccount = message.baseAccount ? BaseAccount.toJSON(message.baseAccount) : undefined);
    if (message.originalVesting) {
      obj.originalVesting = message.originalVesting.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.originalVesting = [];
    }
    if (message.delegatedFree) {
      obj.delegatedFree = message.delegatedFree.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.delegatedFree = [];
    }
    if (message.delegatedVesting) {
      obj.delegatedVesting = message.delegatedVesting.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.delegatedVesting = [];
    }
    message.endTime !== undefined && (obj.endTime = (message.endTime || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<BaseVestingAccount>): BaseVestingAccount {
    const message = { ...baseBaseVestingAccount } as BaseVestingAccount;
    message.baseAccount =
      object.baseAccount !== undefined && object.baseAccount !== null
        ? BaseAccount.fromPartial(object.baseAccount)
        : undefined;
    message.originalVesting = (object.originalVesting ?? []).map((e) => Coin.fromPartial(e));
    message.delegatedFree = (object.delegatedFree ?? []).map((e) => Coin.fromPartial(e));
    message.delegatedVesting = (object.delegatedVesting ?? []).map((e) => Coin.fromPartial(e));
    message.endTime =
      object.endTime !== undefined && object.endTime !== null ? Long.fromValue(object.endTime) : Long.ZERO;
    return message;
  },
};

const baseContinuousVestingAccount: object = { startTime: Long.ZERO };

export const ContinuousVestingAccount = {
  encode(message: ContinuousVestingAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseVestingAccount !== undefined) {
      BaseVestingAccount.encode(message.baseVestingAccount, writer.uint32(10).fork()).ldelim();
    }
    if (!message.startTime.isZero()) {
      writer.uint32(16).int64(message.startTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContinuousVestingAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseContinuousVestingAccount } as ContinuousVestingAccount;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseVestingAccount = BaseVestingAccount.decode(reader, reader.uint32());
          break;
        case 2:
          message.startTime = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ContinuousVestingAccount {
    const message = { ...baseContinuousVestingAccount } as ContinuousVestingAccount;
    message.baseVestingAccount =
      object.baseVestingAccount !== undefined && object.baseVestingAccount !== null
        ? BaseVestingAccount.fromJSON(object.baseVestingAccount)
        : undefined;
    message.startTime =
      object.startTime !== undefined && object.startTime !== null
        ? Long.fromString(object.startTime)
        : Long.ZERO;
    return message;
  },

  toJSON(message: ContinuousVestingAccount): unknown {
    const obj: any = {};
    message.baseVestingAccount !== undefined &&
      (obj.baseVestingAccount = message.baseVestingAccount
        ? BaseVestingAccount.toJSON(message.baseVestingAccount)
        : undefined);
    message.startTime !== undefined && (obj.startTime = (message.startTime || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<ContinuousVestingAccount>): ContinuousVestingAccount {
    const message = { ...baseContinuousVestingAccount } as ContinuousVestingAccount;
    message.baseVestingAccount =
      object.baseVestingAccount !== undefined && object.baseVestingAccount !== null
        ? BaseVestingAccount.fromPartial(object.baseVestingAccount)
        : undefined;
    message.startTime =
      object.startTime !== undefined && object.startTime !== null
        ? Long.fromValue(object.startTime)
        : Long.ZERO;
    return message;
  },
};

const baseDelayedVestingAccount: object = {};

export const DelayedVestingAccount = {
  encode(message: DelayedVestingAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseVestingAccount !== undefined) {
      BaseVestingAccount.encode(message.baseVestingAccount, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DelayedVestingAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDelayedVestingAccount } as DelayedVestingAccount;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseVestingAccount = BaseVestingAccount.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DelayedVestingAccount {
    const message = { ...baseDelayedVestingAccount } as DelayedVestingAccount;
    message.baseVestingAccount =
      object.baseVestingAccount !== undefined && object.baseVestingAccount !== null
        ? BaseVestingAccount.fromJSON(object.baseVestingAccount)
        : undefined;
    return message;
  },

  toJSON(message: DelayedVestingAccount): unknown {
    const obj: any = {};
    message.baseVestingAccount !== undefined &&
      (obj.baseVestingAccount = message.baseVestingAccount
        ? BaseVestingAccount.toJSON(message.baseVestingAccount)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<DelayedVestingAccount>): DelayedVestingAccount {
    const message = { ...baseDelayedVestingAccount } as DelayedVestingAccount;
    message.baseVestingAccount =
      object.baseVestingAccount !== undefined && object.baseVestingAccount !== null
        ? BaseVestingAccount.fromPartial(object.baseVestingAccount)
        : undefined;
    return message;
  },
};

const basePeriod: object = { length: Long.ZERO };

export const Period = {
  encode(message: Period, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.length.isZero()) {
      writer.uint32(8).int64(message.length);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Period {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePeriod } as Period;
    message.amount = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.length = reader.int64() as Long;
          break;
        case 2:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Period {
    const message = { ...basePeriod } as Period;
    message.length =
      object.length !== undefined && object.length !== null ? Long.fromString(object.length) : Long.ZERO;
    message.amount = (object.amount ?? []).map((e: any) => Coin.fromJSON(e));
    return message;
  },

  toJSON(message: Period): unknown {
    const obj: any = {};
    message.length !== undefined && (obj.length = (message.length || Long.ZERO).toString());
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Period>): Period {
    const message = { ...basePeriod } as Period;
    message.length =
      object.length !== undefined && object.length !== null ? Long.fromValue(object.length) : Long.ZERO;
    message.amount = (object.amount ?? []).map((e) => Coin.fromPartial(e));
    return message;
  },
};

const basePeriodicVestingAccount: object = { startTime: Long.ZERO };

export const PeriodicVestingAccount = {
  encode(message: PeriodicVestingAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseVestingAccount !== undefined) {
      BaseVestingAccount.encode(message.baseVestingAccount, writer.uint32(10).fork()).ldelim();
    }
    if (!message.startTime.isZero()) {
      writer.uint32(16).int64(message.startTime);
    }
    for (const v of message.vestingPeriods) {
      Period.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PeriodicVestingAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePeriodicVestingAccount } as PeriodicVestingAccount;
    message.vestingPeriods = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseVestingAccount = BaseVestingAccount.decode(reader, reader.uint32());
          break;
        case 2:
          message.startTime = reader.int64() as Long;
          break;
        case 3:
          message.vestingPeriods.push(Period.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PeriodicVestingAccount {
    const message = { ...basePeriodicVestingAccount } as PeriodicVestingAccount;
    message.baseVestingAccount =
      object.baseVestingAccount !== undefined && object.baseVestingAccount !== null
        ? BaseVestingAccount.fromJSON(object.baseVestingAccount)
        : undefined;
    message.startTime =
      object.startTime !== undefined && object.startTime !== null
        ? Long.fromString(object.startTime)
        : Long.ZERO;
    message.vestingPeriods = (object.vestingPeriods ?? []).map((e: any) => Period.fromJSON(e));
    return message;
  },

  toJSON(message: PeriodicVestingAccount): unknown {
    const obj: any = {};
    message.baseVestingAccount !== undefined &&
      (obj.baseVestingAccount = message.baseVestingAccount
        ? BaseVestingAccount.toJSON(message.baseVestingAccount)
        : undefined);
    message.startTime !== undefined && (obj.startTime = (message.startTime || Long.ZERO).toString());
    if (message.vestingPeriods) {
      obj.vestingPeriods = message.vestingPeriods.map((e) => (e ? Period.toJSON(e) : undefined));
    } else {
      obj.vestingPeriods = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<PeriodicVestingAccount>): PeriodicVestingAccount {
    const message = { ...basePeriodicVestingAccount } as PeriodicVestingAccount;
    message.baseVestingAccount =
      object.baseVestingAccount !== undefined && object.baseVestingAccount !== null
        ? BaseVestingAccount.fromPartial(object.baseVestingAccount)
        : undefined;
    message.startTime =
      object.startTime !== undefined && object.startTime !== null
        ? Long.fromValue(object.startTime)
        : Long.ZERO;
    message.vestingPeriods = (object.vestingPeriods ?? []).map((e) => Period.fromPartial(e));
    return message;
  },
};

const basePermanentLockedAccount: object = {};

export const PermanentLockedAccount = {
  encode(message: PermanentLockedAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseVestingAccount !== undefined) {
      BaseVestingAccount.encode(message.baseVestingAccount, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PermanentLockedAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePermanentLockedAccount } as PermanentLockedAccount;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseVestingAccount = BaseVestingAccount.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PermanentLockedAccount {
    const message = { ...basePermanentLockedAccount } as PermanentLockedAccount;
    message.baseVestingAccount =
      object.baseVestingAccount !== undefined && object.baseVestingAccount !== null
        ? BaseVestingAccount.fromJSON(object.baseVestingAccount)
        : undefined;
    return message;
  },

  toJSON(message: PermanentLockedAccount): unknown {
    const obj: any = {};
    message.baseVestingAccount !== undefined &&
      (obj.baseVestingAccount = message.baseVestingAccount
        ? BaseVestingAccount.toJSON(message.baseVestingAccount)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<PermanentLockedAccount>): PermanentLockedAccount {
    const message = { ...basePermanentLockedAccount } as PermanentLockedAccount;
    message.baseVestingAccount =
      object.baseVestingAccount !== undefined && object.baseVestingAccount !== null
        ? BaseVestingAccount.fromPartial(object.baseVestingAccount)
        : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
