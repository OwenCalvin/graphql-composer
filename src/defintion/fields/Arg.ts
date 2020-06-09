import { GQLField } from "./GQLField";
import { GraphQLArgument } from "graphql";
import { TypeParser } from "../../helpers/TypeParser";
import { InputFieldType } from "../../types/InputFieldType";
import { StringKeyOf } from "../../types/StringKeyOf";

export class Arg<NameType = string> extends GQLField<GraphQLArgument> {
  protected _name: NameType & string;
  protected _defaultValue: string | number | boolean;
  protected _type: InputFieldType;

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }

  protected constructor(name: string, type: InputFieldType) {
    super(name, type);
  }

  static create<NameType = any>(
    name: StringKeyOf<NameType>,
    type: InputFieldType,
  ): Arg<StringKeyOf<NameType>> {
    return new Arg(name, type);
  }

  build(): GraphQLArgument {
    return {
      name: this._name,
      type: TypeParser.parse(this._type),
      description: this._description,
      defaultValue: this._defaultValue,
      astNode: undefined,
      extensions: [],
    };
  }
}