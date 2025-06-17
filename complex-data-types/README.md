### Time to complete the task: 3 hours

# Complex Data Types

In TypeScript, complex data types are integral for efficiently grouping and managing larger data sets. These include arrays, which store multiple variables of the same type, and tuples, which can store variables of different types. TypeScript also features enumerations (enums), which organize a collection of related values, enabling developers to create more readable and maintainable code. Furthermore, TypeScript supports advanced types like union, intersection, literal, and mapped, allowing operations with complex structures to be more flexible.

In this lesson, you will learn how to use two operators: "typeof" to check types and "keyof" to write your own types to make code more robust. Also, you will explore different techniques that can help you with edge cases. You will learn how to work with indexed access types and how to extract metadata from existing types. This knowledge you gain will make it much easier to choose the correct type in almost any case.

## After completing this lesson, you will be able to:

- Explain how to benefit from "keyof" and "typeof" operators
- Work with indexed access types and use the Record type like a pro
- Extend existing types and use template literal types

It will take you about **3 hours** to complete this lesson: 1 hour and 40 minutes to go through the **theoretical material** and 1 hour to complete the **practice**.

## Theoretical material

You can use the following resources to solve the practical task:

- [Defining types using type aliases](https://www.linkedin.com/learning/typescript-essential-training-14687057/defining-types-using-type-aliases) (duration: 2.5 min)
- [Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases) (study time: 5 min)
- [Defining a meta type using generics](https://www.linkedin.com/learning/typescript-essential-training-14687057/defining-a-metatype-using-generics) (duration: 7 min)
- [Combining multiple types with union types](https://www.linkedin.com/learning/typescript-essential-training-14687057/combining-multiple-types-with-union-types) (duration: 5.5 min)
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) (study time: 20 min)
- [Keyof operator](https://www.linkedin.com/learning/typescript-essential-training-14687057/keyof-operator) (duration: 6 min)
- [Keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html) (study time: 5 min)
- [Typeof operator](https://www.linkedin.com/learning/typescript-essential-training-14687057/typeof-operator) (duration: 6 min)
- [Typeof Type Operator](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html) (study time: 5 min)
- [Indexed access types](https://www.linkedin.com/learning/typescript-essential-training-14687057/indexed-access-types) (duration: 5.5 min)
- [Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html) (study time: 5 min)
- [Defining dynamic but limited types with records](https://www.linkedin.com/learning/typescript-essential-training-14687057/defining-dynamic-but-limited-types-with-records) (duration: 6 min)
- [Extending and modifying existing types](https://www.linkedin.com/learning/typescript-essential-training-14687057/extending-and-modifying-existing-types) (duration: 5.5 min)
- [Extracting metadata from existing types](https://www.linkedin.com/learning/typescript-essential-training-14687057/extracting-metadata-from-existing-types) (duration: 4.5 min)
- [String Unions in Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#string-unions-in-types) (study time: 10 min)

## Task Description

- Please put all your code into the `src/index.ts` file.
- Please export types/functions according to the instructions in the task description.

### 1. The Basic `Product` type

In this section, you will create a type for a product item object for an e-commerce website.
Please don't forget to export all required types.

1. Using the `type` alias, define and export a type called `Product` with the following properties:

   - `id`, `price`, `discount`: with the number type
   - `name`: with the string type
   - `limitForOnePurchase`: the union type for number and null

2. Using the `type` alias, define and export a union type called `ProductState` for the two strings `"inStock"` and `"reservation"`. This property will be used to understand whether the product is available for purchase.

3. Add a `Product` type and a new property called `state` with a `ProductState` type.

### 2. The Function getFormattedProductProperty

Create and export a function called `getFormattedProductProperty`, which should return formatted product number properties.

1. It takes three parameters:

   - `product`: a product object with the type `Product` you created in the previous task
   - `propertyName`: the name of a property from the `Product` object passed as a string
     For instance, if `"price"` is passed, the `product.price` value should be formatted.
   - `propertyName` should stick only to `Product` type properties, but not with the union type `;)`
   - `formatSymbol`: a special symbol used as a suffix in a formatted string

2. A function always returns a string.
   - If the passed property value has a string type, it returns a formatted string: `22.00$`, where `22.00` - is a number value with two decimals and `$`: is a value from the `formatSymbol` parameter.
   - If the passed property value has a type different from the string type, it returns an empty string.

**Example:**

```ts
let product: Product = {
  id: 1,
  name: "Cool Hat",
  price: 10.4,
  discount: 0,
  state: "inStock",
  limitForOnePurchase: null,
};

getFormattedProductProperty(product, "price", "$"); // Returns: "10.40$"
getFormattedProductProperty(product, "discount", "%"); // Returns: "0.00%"
getFormattedProductProperty(product, "name", "||"); // Returns: ""
getFormattedProductProperty(product, "limitForOnePurchase", "$"); // Returns: ""
```

### 3. The Function groupProductsByState

Create and export a function called `groupProductsByState`, which should return products grouped by the `state` property.

1. It takes one parameter: an array of product objects, each with the type `Product` you created earlier.
2. It returns a `Record` with `state` properties used as keys and an array of products as values.

**Example:**

```ts
let products: Product[] = [
  {
    id: 1,
    name: "Cool Hat",
    price: 10.4,
    discount: 0,
    state: "inStock",
    limitForOnePurchase: null,
  },
  {
    id: 2,
    name: "Nice Bag",
    price: 11,
    discount: 2,
    state: "reservation",
    limitForOnePurchase: 5,
  },
  {
    id: 3,
    name: "Perfect Shoes",
    price: 210,
    discount: 2,
    state: "reservation",
    limitForOnePurchase: null,
  },
  {
    id: 4,
    name: "Normal Glasses",
    price: 50,
    discount: 20,
    state: "inStock",
    limitForOnePurchase: 7,
  },
];

groupProductsByState(products); // Returns
/* 
{ 
    "inStock": [{ id: 1, name: "Cool Hat", ... }, { id: 4, name: "Normal Glasses", ...}], 
    "reservation": [{ id: 2, name: "Nice Bag", ... }, { id: 3, name: "Perfect Shoes", ... }] 
} 
*/
```

### 4. ProductCore and ProductUpdate

Using the original `Product` type, create and export two new types: `ProductCore` and `ProductUpdate`.

1. `ProductCore`: Should be the same type as `Product`, only without the `limitForOnePurchase`, `state`, and `discount` properties.

2. `ProductUpdate` will be used to update products. So, by extending the `Product` type, make all properties optional and omit the `id` property (the `id` property value is expected to be unique and set only once).

### 5. The User type

Using the `type` alias, create and export a type called `User` for storing user data.

This type should declare three properties:

- `id`: with the number type
- `name`: a string that always starts with a capital letter
- `login`: a string that is always lowercase

**Example:**

```ts
let validUser: User = {
  id: 11,
  name: "Bob", // valid name: starts with a capital "B"
  login: "bob_the_man", // valid login: all characters are lowercase
};

let invalidUser: User = {
  id: 22,
  name: "john", // Type Error: doesn't start with a capital letter
  login: "theMasterOfUniverse", // Type Error: not all characters are lowercase
};
```

## General Instructions

1. This practical task will be verified automatically with tests.
2. Please put all TypeScript code in the `src/index.ts` file. If you use any other file, we will not be able to verify it.
3. To transpile TypeScript, you have set up a tsconfig.json file with a set of rules. Please don't change it; this could affect your grade for the task. This configuration file includes a set of compilerOptions:

- ["strict"](https://www.typescriptlang.org/tsconfig#strict)
- ["forceConsistentCasingInFileNames"](https://www.typescriptlang.org/tsconfig#forceConsistentCasingInFileNames)
- ["strictFunctionTypes"](https://www.typescriptlang.org/tsconfig#strictFunctionTypes)
- ["noUnusedLocals"](https://www.typescriptlang.org/tsconfig#noUnusedLocals)
- ["noUnusedParameters"](https://www.typescriptlang.org/tsconfig#noUnusedParameters)
- ["noImplicitReturns"](https://www.typescriptlang.org/tsconfig#noImplicitReturns)
- Also we disallow using `any`.

## Verify your solution 

To be sure your solution is correct before submitting it, you can verify it locally, but this will require some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).
