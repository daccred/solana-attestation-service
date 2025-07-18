/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlySignerAccount,
  type TransactionSigner,
} from '@solana/kit';
import { SOLANA_ATTESTATION_SERVICE_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const EMIT_EVENT_DISCRIMINATOR = 228;

export function getEmitEventDiscriminatorBytes() {
  return getU8Encoder().encode(EMIT_EVENT_DISCRIMINATOR);
}

export type EmitEventInstruction<
  TProgram extends string = typeof SOLANA_ATTESTATION_SERVICE_PROGRAM_ADDRESS,
  TAccountEventAuthority extends
    | string
    | IAccountMeta<string> = 'DzSpKpST2TSyrxokMXchFz3G2yn5WEGoxzpGEUDjCX4g',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountEventAuthority extends string
        ? ReadonlySignerAccount<TAccountEventAuthority> &
            IAccountSignerMeta<TAccountEventAuthority>
        : TAccountEventAuthority,
      ...TRemainingAccounts,
    ]
  >;

export type EmitEventInstructionData = { discriminator: number };

export type EmitEventInstructionDataArgs = {};

export function getEmitEventInstructionDataEncoder(): Encoder<EmitEventInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: EMIT_EVENT_DISCRIMINATOR })
  );
}

export function getEmitEventInstructionDataDecoder(): Decoder<EmitEventInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getEmitEventInstructionDataCodec(): Codec<
  EmitEventInstructionDataArgs,
  EmitEventInstructionData
> {
  return combineCodec(
    getEmitEventInstructionDataEncoder(),
    getEmitEventInstructionDataDecoder()
  );
}

export type EmitEventInput<TAccountEventAuthority extends string = string> = {
  eventAuthority?: TransactionSigner<TAccountEventAuthority>;
};

export function getEmitEventInstruction<
  TAccountEventAuthority extends string,
  TProgramAddress extends
    Address = typeof SOLANA_ATTESTATION_SERVICE_PROGRAM_ADDRESS,
>(
  input: EmitEventInput<TAccountEventAuthority>,
  config?: { programAddress?: TProgramAddress }
): EmitEventInstruction<TProgramAddress, TAccountEventAuthority> {
  // Program address.
  const programAddress =
    config?.programAddress ?? SOLANA_ATTESTATION_SERVICE_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    eventAuthority: { value: input.eventAuthority ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.eventAuthority.value) {
    accounts.eventAuthority.value =
      'DzSpKpST2TSyrxokMXchFz3G2yn5WEGoxzpGEUDjCX4g' as Address<'DzSpKpST2TSyrxokMXchFz3G2yn5WEGoxzpGEUDjCX4g'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [getAccountMeta(accounts.eventAuthority)],
    programAddress,
    data: getEmitEventInstructionDataEncoder().encode({}),
  } as EmitEventInstruction<TProgramAddress, TAccountEventAuthority>;

  return instruction;
}

export type ParsedEmitEventInstruction<
  TProgram extends string = typeof SOLANA_ATTESTATION_SERVICE_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    eventAuthority: TAccountMetas[0];
  };
  data: EmitEventInstructionData;
};

export function parseEmitEventInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedEmitEventInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 1) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      eventAuthority: getNextAccount(),
    },
    data: getEmitEventInstructionDataDecoder().decode(instruction.data),
  };
}
