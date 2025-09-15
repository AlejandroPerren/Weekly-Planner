export interface VerificationTokenRepository {
    [x: string]: any;
    saveVerificationToken(DNI: string, token: string, expiresAt: Date): Promise<void>;
    findVerificationToken(token: string): Promise<{ DNI: string; expiresAt: Date } | null>;
    deleteVerificationToken(token: string): Promise<void>;
}