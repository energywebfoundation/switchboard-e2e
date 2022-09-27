import { CONFIG } from '../config';

export class Router {
  static async navigateTo(url: string = '') {
    await page.goto(CONFIG.page + url, {
      waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'],
    });
  }
}
