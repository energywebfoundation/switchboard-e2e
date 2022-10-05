import { fillInput, Selector } from '../../../utils';

export interface Period{
  years?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export class ValidityPeriod {
  private readonly YEARS = Selector.byQaId('years');
  private readonly DAYS = Selector.byQaId('days');
  private readonly HOURS = Selector.byQaId('hours');
  private readonly MINUTES = Selector.byQaId('minutes');
  private readonly SECONDS = Selector.byQaId('seconds');

  async setPeriod(period: Period) {
    if (period.years) {
      await this.setValue(period.years.toString(), this.YEARS);
    }
    if (period.days) {
      await this.setValue(period.days.toString(), this.DAYS);
    }
    if (period.hours) {
      await this.setValue(period.hours.toString(), this.HOURS);
    }
    if (period.minutes) {
      await this.setValue(period.minutes.toString(), this.MINUTES);
    }
    if (period.seconds) {
      await this.setValue(period.seconds.toString(), this.SECONDS);
    }
  }

  async setValue(value: string, selector: string) {
    await page.waitForSelector(selector);
    await fillInput(value, selector);
  }
}
