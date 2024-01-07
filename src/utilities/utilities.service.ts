import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilitiesService {

  public calculateTax(price : string){

    const priceWithTax = Number(price)  * 0.15 + Number(price);
		return Math.round((priceWithTax + Number.EPSILON) * 100) / 100;
     
  }

  public extractTax(price: number): number {
		return price / (0.15 + 1);
	}


	public getPercentageOfTax(): string {
		return `${0.15 * 100}%`;
	}
}
