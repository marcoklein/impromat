import { DevPage } from "./dev-page";

/**
 * Mocks login capabilities for testing.
 */
export class AuthFixture extends DevPage {
  async loginAsRandomUser() {
    await this.loginAsUser(`user-${Date.now()}-${Math.random() % 1000}`);
  }
  async loginAsUser(userId: string) {
    if (!process.env.REACT_APP_API_URL) {
      throw new Error("REACT_APP_API_URL undefined");
    }
    await this.page.goto(
      `http://localhost:${process.env.PORT}/auth/testlogin?redirectUrl=http://localhost:${process.env.REACT_APP_PORT}&userId=${userId}`,
    );
  }
}
