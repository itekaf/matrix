import { IDatabaseModel } from "../interfaces/database.iterface";
import { customersEnum } from "../enum/customer.enum";

export class CustomerModel implements IDatabaseModel {
    public id: number;
    public name: customersEnum;
    public priceCoefficient: number = 140;
    public priceCoefficient2: number = 140;
}
