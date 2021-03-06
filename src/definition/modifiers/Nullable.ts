import { FieldType, InputFieldType } from "../..";

/**
 * Create a nullable type from an existing one
 * @param type The type to convert
 */
export function N<Type extends FieldType | InputFieldType = FieldType>(
  type: Type,
) {
  return new NullableType<Type>(type);
}

/**
 * Create a nullable type from an existing one
 * @param type The type to convert
 */
export function Nullable<Type extends FieldType | InputFieldType = FieldType>(
  type: Type,
) {
  return new NullableType<Type>(type);
}

export class NullableType<Type extends FieldType | InputFieldType = FieldType> {
  private _type: Type;

  get type() {
    return this._type;
  }

  constructor(type: Type) {
    this._type = type;
  }
}
