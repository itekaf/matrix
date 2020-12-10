import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("Item1CModel")
export class Item1CModel {
  @JsonProperty("ID", Number, true)
  public id: number = 0;

  @JsonProperty("Наименование", String, true)
  public name: string = undefined;

  @JsonProperty("Категория", String, true)
  public categories: string  = undefined;

  @JsonProperty("Артикул", String, true)
  public article: string = undefined;

  @JsonProperty("Поставщик", String, true)
  public customer: string = undefined;

  @JsonProperty("Штрихкод", String, true)
  public barcode: string = undefined;

  @JsonProperty("Количество", Number, true)
  public count: number = 0;

  @JsonProperty("Склад", String, true)
  public stock: string = undefined;

  @JsonProperty("Цена без НДС", Number, true)
  public priceWithoutNDS: number = 0;

  @JsonProperty("Ставка НДС", Number, true)
  public ndsCount: number = 0;

  @JsonProperty("Учетная цена с НДС", Number, true)
  public priceWithNDS: number = 0;

  @JsonProperty("Вид цен", String, true)
  public priceView: string = undefined;

  @JsonProperty("Розничная цена 2 с НДС", Number, true)
  public priceRetailWithNDS: number = 0;

  @JsonProperty("Вид цен 2", String, true)
  public priceView2: string = undefined;

  @JsonProperty("Розничная  фул-прайс с НДС", Number, true)
  public priceRetailWithNDSFull: number = 0;

  @JsonProperty("Вид цен", String, true)
  public priceView3: string = undefined;

  @JsonProperty("Ед", String, true)
  public units: string = undefined;

  @JsonProperty("Страна происхождения", String, true)
  public country: string = undefined;
}
