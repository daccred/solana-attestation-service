import { assert } from "chai";
import { Address, address, ProgramDerivedAddressBump } from "@solana/kit";
import { deriveAttestationMintPda, deriveAttestationPda, deriveCredentialPda, deriveEventAuthorityAddress, deriveSchemaMintPda, deriveSchemaPda } from "../src";

describe("PDAs", () => {
  describe("PDA derivation", () => {
    it("should derive a credential PDA", async () => {
      const issuer = address('tbFevHibEdBNFJfZ7xKC8k1th8pt2YPEXTk4sGMxCGa');
      const credentialName = 'test';
      const expectedPda = ['CdUAYGvNc7NdtNgXmxTXoUWR5NjpcU4Za4vtoP2AVZD4', 255] as [Address<string>, ProgramDerivedAddressBump];
      const testPda = await deriveCredentialPda({ authority: issuer, name: credentialName })
      assert.deepEqual(testPda, expectedPda);
    });
    it("should derive a schema PDA", async () => {
      const credential = address('2zHazqL3MVayNGkDrTmAC7VsvP5QrSYfiyA7uf29Usmd');
      const schemaName = 'test';
      const version = 1;
      const expectedPda = ['bD7cVGpuTHY43fxtRoqJYi58U6Yi3kMyVck2DyZZRKq', 255] as [Address<string>, ProgramDerivedAddressBump];
      const testPda = await deriveSchemaPda({
        credential,
        version,
        name: schemaName
      })
      assert.deepEqual(testPda, expectedPda);
    });
    it("should derive an attestation PDA", async () => {
      const credential = address('G6QmvUp3a1Kv9rX2LqHDH8AWcKD8yaufcoXEB1h6SzN8');
      const schema = address('GSwz99vWPKnePyeYTM5iionEfArVmfrufV4AaV4SecTH');
      const nonce = address('Bdf3cgpzgboZq95T4AVYNxuYGDVE4pwLNQBhQ2ob8CoG');
      const expectedPda = ['CnhgnrLiawRWitfjrrUfWdR2jpwKbKGDccbk3ne171iu', 255] as [Address<string>, ProgramDerivedAddressBump];
      const testPda = await deriveAttestationPda({
        credential,
        schema,
        nonce
      })
      assert.deepEqual(testPda, expectedPda);
    });
    it("should derive a schema mint PDA", async () => {
      const schema = address('GCVt9SmgLF8bgEVwZAhQ9A2skwj5TvEnyn8Z7eUm583E');
      const expectedPda = ['9JLQQK3zeEjiq2AJ1XPN765bYnLrBWJSFfyjDwdSMmyN', 245] as [Address<string>, ProgramDerivedAddressBump];
      const testPda = await deriveSchemaMintPda({
        schema,
      })
      assert.deepEqual(testPda, expectedPda);
    });
    it("should derive an attestation mint PDA", async () => {
      const attestation = address('3z8EuPHrzhfVWuDomSGjU13ABDgQC75DMHoDNBgxdzKR');
      const expectedPda = ['61FeMtSXR8H22fodXNrTkwmrSmBuTNcAvKzZXvZRPMkX', 253] as [Address<string>, ProgramDerivedAddressBump];
      const testPda = await deriveAttestationMintPda({
        attestation,
      })
      assert.deepEqual(testPda, expectedPda);
    });
    it("should derive event authority pda PDA", async () => {
      const expectedPda = 'DzSpKpST2TSyrxokMXchFz3G2yn5WEGoxzpGEUDjCX4g';
      const testPda = await deriveEventAuthorityAddress()
      assert.deepEqual(testPda, expectedPda);
    });
  });
})