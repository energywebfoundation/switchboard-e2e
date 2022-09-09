import { CONFIG } from '../config';

export const navigateTo = async (url: string = '') => {
  await page.goto(CONFIG.page + url, {
    waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'],
  });
};
