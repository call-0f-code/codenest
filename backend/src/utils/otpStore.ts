type OtpData = {
    otp:string;
    expiresAt:Date;
    attempts:number;
}

class OtpStorage {
    private storage =  new Map<string,OtpData>();

    constructor() {
      setInterval(()=>this.cleanupExpiredOtps(), 5*60*1000);
    }

    store(email: string, otp: string, expiryMinutes = 3): void {
      const expiresAt = new Date(Date.now() + expiryMinutes * 60000);
      this.storage.set(email, { otp, expiresAt, attempts: 0 });
    }

  verify(email: string, otp: string): boolean {
    const data = this.storage.get(email);
    if (!data) return false;

    if (new Date() > data.expiresAt || data.attempts >= 5) {
      this.storage.delete(email);
      return false;
    }

    data.attempts++;
    const isValid = data.otp === otp;
    if (isValid) this.storage.delete(email);
    return isValid;
  }

  exists(email: string): boolean {
    const data = this.storage.get(email);
    if (!data || new Date() > data.expiresAt) {
      this.storage.delete(email);
      return false;
    }
    return true;
  }

  getRemainingTime(email: string): number {
    const data = this.storage.get(email);
    if (!data || new Date() > data.expiresAt) return 0;
    return Math.floor((data.expiresAt.getTime() - Date.now()) / 1000);
  }

  remove(email: string): void {
    this.storage.delete(email);
  }

  clear(): void {
    this.storage.clear();
  }

  getSize(): number {
    return this.storage.size;
  }

  private cleanupExpiredOtps(): void {
    const now = new Date();
    for (const [email, data] of this.storage.entries()) {
      if (now > data.expiresAt) this.storage.delete(email);
    }
  }
}

export const otpStorage = new OtpStorage();