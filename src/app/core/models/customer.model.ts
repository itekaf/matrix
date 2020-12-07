import { IDatabaseModel } from "../interfaces/database.iterface";

export class CustomerModel implements IDatabaseModel {
    public id: number;
    public name: string;
}
