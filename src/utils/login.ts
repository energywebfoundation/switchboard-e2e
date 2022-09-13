import { RouterPathEnum } from '../models/router-path.enum';
import { Router } from './router';

export class Login {

  async prepareForReinitialization() {
    try {
      await page.evaluate(() => {
        localStorage.setItem('ProviderType', 'MetaMask');
        localStorage.setItem('isEthSigner', 'true');
        localStorage.setItem('PublicKey', '0230379d9ecb9d8cc7a41beff5ec8b7382db7f38df0b9d3188ffce57ac0557c755');
      });
    } catch (e) {
      console.log(e)
    }

  }

  async reinitialize(route: RouterPathEnum = RouterPathEnum.Dashboard) {
    await this.prepareForReinitialization();
    await Router.navigateTo();
  }
}
