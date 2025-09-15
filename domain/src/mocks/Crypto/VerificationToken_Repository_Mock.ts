import { DNIVerificationToken } from "../../entities/DniVerificationToken";
import { VerificationTokenRepository } from "../../services/VerificationTokenRepository";

export interface MockedVerificationTokenRepository
  extends VerificationTokenRepository {
  tokens: DNIVerificationToken[];
  sendTokens: Array<{ DNI: string; token: string }>;
}

export function createVerificationTokenRepositoryMock(): MockedVerificationTokenRepository {
  return {
    tokens: [],
    sendTokens: [],

    async saveVerificationToken(
      DNI: string,
      token: string,
      expiresAt: Date
    ): Promise<void> {
      this.tokens = this.tokens.filter((t) => t.DNI !== DNI);
      this.tokens.push({ DNI, token, expiresAt });
    },

    async findVerificationToken(
      token: string
    ): Promise<{ DNI: string; expiresAt: Date } | null> {
      const tokenData = this.tokens.find((t) => t.token === token);
      if (!tokenData) return null;

      return {
        DNI: tokenData.DNI,
        expiresAt: tokenData.expiresAt,
      };
    },

    async deleteVerificationToken(token: string): Promise<void> {
      this.tokens = this.tokens.filter((t) => t.token !== token);
    },

    async sendVerificationToken(DNI: string, token: string): Promise<void> {
      this.sendTokens.push({ DNI, token });
    },
  };
}
