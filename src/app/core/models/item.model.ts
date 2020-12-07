import { JsonObject, JsonProperty } from 'json2typescript';
import { IDatabaseModel } from 'app/core/interfaces/database.iterface';

@JsonObject("ItemModel")
export class ItemModel implements IDatabaseModel {
  @JsonProperty("product_id", Number)
  public id: number = 0;

  @JsonProperty("name(ru-ru)", String)
  public name: string = undefined;

  @JsonProperty("categories", String)
  public categories: string  = undefined;

  @JsonProperty("sku", String, true)
  public sku: string = '';

  @JsonProperty("model", String)
  public model: string  = undefined;

  @JsonProperty("manufacturer", String)
  public customer: string  = undefined;

  @JsonProperty("price", Number)
  public price: number = 0;

  @JsonProperty("weight", Number)
  public weight: number = 0;

  @JsonProperty("weight_unit", String)
  public weightUnit: string = undefined;

  @JsonProperty("length", Number)
  public length: number = 0;

  @JsonProperty("width", Number)
  public width: number = 0;

  @JsonProperty("height", Number)
  public height: number = 0;

  @JsonProperty("length_unit", String)
  public lengthUnit: string = undefined;

  @JsonProperty("description(ru-ru)", String)
  public description: string = undefined;

  @JsonProperty("meta_title(ru-ru)", String)
  public metaTitle: string = undefined;

  @JsonProperty("meta_description(ru-ru)", String)
  public metaDescription: string = undefined;

  public stock: string = undefined;

  public barcode: number = 0;

  public count: number = 0;

  public priceWithoutNDS: number = 0;
  public ndsCount: number = 0;
  public priceWithNDS: number = 0;
  public priceView: string = undefined;
  public priceRetailWithNDS: number = 0;
  public priceView2: string = undefined;
  public priceRetailWithNDSFull: number = 0;
  public priceView3: string = undefined;
  public units: string = undefined;
  public country: string = undefined;
}
