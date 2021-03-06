import {
  GraphQLUnionType,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLInputType,
} from "graphql";
import {
  Schema,
  ObjectType,
  UnionType,
  InterfaceType,
  InputType,
  Wrapper,
  Field,
  InputField,
} from "../../src";

const animal = ObjectType.create("Animal").addFields(Field.create("a", String));
const human = ObjectType.create("Human").addFields(Field.create("b", String));

const union = UnionType.create("AnimalOrHuman", animal).addTypes(human);

const obj = ObjectType.create("Object").addFields(Field.create("union", union));
const interf = InterfaceType.create("Interface").addFields(
  Field.create("union", union),
);
const input = InputType.create("Input").addFields(
  InputField.create("input", String),
);

describe("Wrapper", () => {
  it("Should create a Wrapper", async () => {
    const wrapperA = Wrapper.create(animal, human);
    const wrapperB = Wrapper.create(union);
    const wrapperC = Wrapper.create(obj, interf, input);

    wrapperA
      .transform(ObjectType, (t) => t.setDescription("test"))
      .transformFields(ObjectType, (f) => f.required());

    const schema = Schema.create(wrapperA, wrapperB, wrapperC);

    const built = schema.build();
    const typeMap = built.getTypeMap();

    const objectType = typeMap.Object as GraphQLObjectType;
    const interfaceType = typeMap.Interface as GraphQLInterfaceType;
    const inputType = typeMap.Input as GraphQLInputType;
    const animalType = typeMap.Animal as GraphQLObjectType;
    const humanType = typeMap.Human as GraphQLObjectType;
    const unionType = typeMap.AnimalOrHuman as GraphQLUnionType;

    expect(objectType).toBeDefined();
    expect(interfaceType).toBeDefined();
    expect(inputType).toBeDefined();
    expect(animalType).toBeDefined();
    expect(humanType).toBeDefined();
    expect(unionType).toBeDefined();
  });
});
