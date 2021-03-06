import { GraphQLEnumValue } from "graphql";
import { StringKeyOf, KeyValue } from "../../../..";
import { GQLElement } from "../../../../classes/GQLElement";

export class EnumValue<
  NameType = string,
  ExtensionsType = any
> extends GQLElement<any, any, ExtensionsType> {
  protected _name: NameType & string;
  private _value: any;
  private _deprecationReason: string;

  get name(): NameType & string {
    return this._name;
  }

  get value() {
    return this._value;
  }

  /**
   * The teh value deprecation reason
   * @param deprecationReason The deprecation reason
   */
  setDeprecationReason(deprecationReason: string) {
    this._deprecationReason = deprecationReason;
  }

  /**
   * Set the value
   * @param value The value
   */
  setValue(value: any) {
    this._value = value;
  }

  /**
   * Create a new EnumValue
   * @param name The value name
   * @param value The value
   */
  static create<NameType = any>(
    name: StringKeyOf<NameType>,
    value: any,
  ): EnumValue<StringKeyOf<NameType>> {
    return new EnumValue(name, value);
  }

  protected constructor(name: string, value: any) {
    super(name);
    this.setValue(value);
  }

  build(): GraphQLEnumValue {
    this._built = {
      name: this.name,
      value: this.value,
      deprecationReason: this._deprecationReason,
      description: this._description,
      isDeprecated: !!this._deprecationReason,
      extensions: this.extensions,
    };

    return { ...this._built };
  }
}
