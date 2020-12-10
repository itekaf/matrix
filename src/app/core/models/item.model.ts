import { JsonObject, JsonProperty } from 'json2typescript';
import { IDatabaseModel } from 'app/core/interfaces/database.iterface';

@JsonObject("ItemModel")
export class ItemModel implements IDatabaseModel {
  @JsonProperty("product_id", Number, true)
  public id: number = 0;

  @JsonProperty("name(ru-ru)", String, true)
  public name: string = undefined;

  @JsonProperty("categories", String, true)
  public categories: string  = undefined;

  @JsonProperty("sku", String, true)
  public sku: string = undefined;

  @JsonProperty("model", String, true)
  public article: string  = undefined;

  @JsonProperty("price", Number, true)
  public price: number = 0;

  @JsonProperty("weight", Number, true)
  public weight: number = 0;

  @JsonProperty("weight_unit", String, true)
  public weightUnit: string = undefined;

  @JsonProperty("length", Number, true)
  public length: number = 0;

  @JsonProperty("width", Number, true)
  public width: number = 0;

  @JsonProperty("height", Number, true)
  public height: number = 0;

  @JsonProperty("length_unit", String, true)
  public lengthUnit: string = undefined;

  @JsonProperty("description(ru-ru)", String, true)
  public description: string = undefined;

  @JsonProperty("meta_title(ru-ru)", String, true)
  public metaTitle: string = undefined;

  @JsonProperty("meta_description(ru-ru)", String, true)
  public metaDescription: string = undefined;

  @JsonProperty("manufacturer", String, true)
  public customer: string = undefined;

  @JsonProperty("ean", String, true)
  public barcode: string = undefined;

  @JsonProperty("quantity", Number, true)
  public count: number = 0;

  public stock: string = undefined;
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
  public brand: string = undefined;
}
