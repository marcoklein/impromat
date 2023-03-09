import { DevPage } from "./dev-page";

/**
 * Mocks login capabilities for testing.
 */
export class AuthFixture extends DevPage {
  async loginAsRandomUser() {
    const randomUserName = `user-${Date.now()}-${Math.random() % 1000}`;
    await this.loginAsUser(randomUserName);
    return randomUserName;
  }
  async loginAsUser(userId: string) {
    if (!process.env.REACT_APP_API_URL) {
      throw new Error("REACT_APP_API_URL undefined");
    }
    await this.page.goto(
      `${process.env.REACT_APP_API_URL}/auth/testlogin?redirectUrl=http://localhost:${process.env.PORT}&userId=${userId}`,
    );
  }
}
