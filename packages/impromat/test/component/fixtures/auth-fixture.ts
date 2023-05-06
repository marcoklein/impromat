import { randomUUID } from "crypto";
import { DevPage } from "./dev-page.js";

/**
 * Mocks login capabilities for testing.
 */
export class AuthFixture extends DevPage {
  async loginAsRandomUser() {
    const randomUserName = randomUUID();
    await this.loginAsUser(randomUserName);
    return randomUserName;
  }
  async loginAsUser(userId: string) {
    if (!process.env.VITE_API_URL) {
      throw new Error("VITE_API_URL undefined");
    }
    await this.page.goto(
      `${process.env.VITE_API_URL}/auth/testlogin?redirectUrl=http://localhost:${process.env.PORT}&userId=${userId}`,
    );
    await this.page.waitForURL(`http://localhost:${process.env.PORT}/`, {
      waitUntil: "networkidle",
    });
  }
}
