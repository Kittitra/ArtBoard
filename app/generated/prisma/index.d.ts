
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model Authenticator
 * 
 */
export type Authenticator = $Result.DefaultSelection<Prisma.$AuthenticatorPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Script
 * 
 */
export type Script = $Result.DefaultSelection<Prisma.$ScriptPayload>
/**
 * Model Scene
 * 
 */
export type Scene = $Result.DefaultSelection<Prisma.$ScenePayload>
/**
 * Model DesignCategory
 * 
 */
export type DesignCategory = $Result.DefaultSelection<Prisma.$DesignCategoryPayload>
/**
 * Model DesignSubClass
 * 
 */
export type DesignSubClass = $Result.DefaultSelection<Prisma.$DesignSubClassPayload>
/**
 * Model DesignSubClassVersion
 * 
 */
export type DesignSubClassVersion = $Result.DefaultSelection<Prisma.$DesignSubClassVersionPayload>
/**
 * Model UserProject
 * 
 */
export type UserProject = $Result.DefaultSelection<Prisma.$UserProjectPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ScriptStatus: {
  DRAFT: 'DRAFT',
  IN_REVIEW: 'IN_REVIEW',
  FINAL: 'FINAL',
  ARCHIVED: 'ARCHIVED'
};

export type ScriptStatus = (typeof ScriptStatus)[keyof typeof ScriptStatus]

}

export type ScriptStatus = $Enums.ScriptStatus

export const ScriptStatus: typeof $Enums.ScriptStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.authenticator`: Exposes CRUD operations for the **Authenticator** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Authenticators
    * const authenticators = await prisma.authenticator.findMany()
    * ```
    */
  get authenticator(): Prisma.AuthenticatorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.script`: Exposes CRUD operations for the **Script** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Scripts
    * const scripts = await prisma.script.findMany()
    * ```
    */
  get script(): Prisma.ScriptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scene`: Exposes CRUD operations for the **Scene** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Scenes
    * const scenes = await prisma.scene.findMany()
    * ```
    */
  get scene(): Prisma.SceneDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.designCategory`: Exposes CRUD operations for the **DesignCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DesignCategories
    * const designCategories = await prisma.designCategory.findMany()
    * ```
    */
  get designCategory(): Prisma.DesignCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.designSubClass`: Exposes CRUD operations for the **DesignSubClass** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DesignSubClasses
    * const designSubClasses = await prisma.designSubClass.findMany()
    * ```
    */
  get designSubClass(): Prisma.DesignSubClassDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.designSubClassVersion`: Exposes CRUD operations for the **DesignSubClassVersion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DesignSubClassVersions
    * const designSubClassVersions = await prisma.designSubClassVersion.findMany()
    * ```
    */
  get designSubClassVersion(): Prisma.DesignSubClassVersionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userProject`: Exposes CRUD operations for the **UserProject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserProjects
    * const userProjects = await prisma.userProject.findMany()
    * ```
    */
  get userProject(): Prisma.UserProjectDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken',
    Authenticator: 'Authenticator',
    Project: 'Project',
    Script: 'Script',
    Scene: 'Scene',
    DesignCategory: 'DesignCategory',
    DesignSubClass: 'DesignSubClass',
    DesignSubClassVersion: 'DesignSubClassVersion',
    UserProject: 'UserProject'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "account" | "session" | "verificationToken" | "authenticator" | "project" | "script" | "scene" | "designCategory" | "designSubClass" | "designSubClassVersion" | "userProject"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      Authenticator: {
        payload: Prisma.$AuthenticatorPayload<ExtArgs>
        fields: Prisma.AuthenticatorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthenticatorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthenticatorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>
          }
          findFirst: {
            args: Prisma.AuthenticatorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthenticatorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>
          }
          findMany: {
            args: Prisma.AuthenticatorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>[]
          }
          create: {
            args: Prisma.AuthenticatorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>
          }
          createMany: {
            args: Prisma.AuthenticatorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthenticatorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>[]
          }
          delete: {
            args: Prisma.AuthenticatorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>
          }
          update: {
            args: Prisma.AuthenticatorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>
          }
          deleteMany: {
            args: Prisma.AuthenticatorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthenticatorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuthenticatorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>[]
          }
          upsert: {
            args: Prisma.AuthenticatorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthenticatorPayload>
          }
          aggregate: {
            args: Prisma.AuthenticatorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthenticator>
          }
          groupBy: {
            args: Prisma.AuthenticatorGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthenticatorGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthenticatorCountArgs<ExtArgs>
            result: $Utils.Optional<AuthenticatorCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Script: {
        payload: Prisma.$ScriptPayload<ExtArgs>
        fields: Prisma.ScriptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScriptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScriptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScriptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScriptPayload>
          }
          findFirst: {
            args: Prisma.ScriptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScriptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScriptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScriptPayload>
          }
          findMany: {
            args: Prisma.ScriptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScriptPayload>[]
          }
          create: {
            args: Prisma.ScriptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScriptPayload>
          }
          createMany: {
            args: Prisma.ScriptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScriptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScriptPayload>[]
          }
          delete: {
            args: Prisma.ScriptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScriptPayload>
          }
          update: {
            args: Prisma.ScriptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScriptPayload>
          }
          deleteMany: {
            args: Prisma.ScriptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScriptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScriptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScriptPayload>[]
          }
          upsert: {
            args: Prisma.ScriptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScriptPayload>
          }
          aggregate: {
            args: Prisma.ScriptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScript>
          }
          groupBy: {
            args: Prisma.ScriptGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScriptGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScriptCountArgs<ExtArgs>
            result: $Utils.Optional<ScriptCountAggregateOutputType> | number
          }
        }
      }
      Scene: {
        payload: Prisma.$ScenePayload<ExtArgs>
        fields: Prisma.SceneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SceneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SceneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          findFirst: {
            args: Prisma.SceneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SceneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          findMany: {
            args: Prisma.SceneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>[]
          }
          create: {
            args: Prisma.SceneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          createMany: {
            args: Prisma.SceneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SceneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>[]
          }
          delete: {
            args: Prisma.SceneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          update: {
            args: Prisma.SceneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          deleteMany: {
            args: Prisma.SceneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SceneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SceneUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>[]
          }
          upsert: {
            args: Prisma.SceneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScenePayload>
          }
          aggregate: {
            args: Prisma.SceneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScene>
          }
          groupBy: {
            args: Prisma.SceneGroupByArgs<ExtArgs>
            result: $Utils.Optional<SceneGroupByOutputType>[]
          }
          count: {
            args: Prisma.SceneCountArgs<ExtArgs>
            result: $Utils.Optional<SceneCountAggregateOutputType> | number
          }
        }
      }
      DesignCategory: {
        payload: Prisma.$DesignCategoryPayload<ExtArgs>
        fields: Prisma.DesignCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DesignCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DesignCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignCategoryPayload>
          }
          findFirst: {
            args: Prisma.DesignCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DesignCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignCategoryPayload>
          }
          findMany: {
            args: Prisma.DesignCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignCategoryPayload>[]
          }
          create: {
            args: Prisma.DesignCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignCategoryPayload>
          }
          createMany: {
            args: Prisma.DesignCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DesignCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignCategoryPayload>[]
          }
          delete: {
            args: Prisma.DesignCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignCategoryPayload>
          }
          update: {
            args: Prisma.DesignCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignCategoryPayload>
          }
          deleteMany: {
            args: Prisma.DesignCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DesignCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DesignCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignCategoryPayload>[]
          }
          upsert: {
            args: Prisma.DesignCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignCategoryPayload>
          }
          aggregate: {
            args: Prisma.DesignCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDesignCategory>
          }
          groupBy: {
            args: Prisma.DesignCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<DesignCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.DesignCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<DesignCategoryCountAggregateOutputType> | number
          }
        }
      }
      DesignSubClass: {
        payload: Prisma.$DesignSubClassPayload<ExtArgs>
        fields: Prisma.DesignSubClassFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DesignSubClassFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DesignSubClassFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassPayload>
          }
          findFirst: {
            args: Prisma.DesignSubClassFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DesignSubClassFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassPayload>
          }
          findMany: {
            args: Prisma.DesignSubClassFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassPayload>[]
          }
          create: {
            args: Prisma.DesignSubClassCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassPayload>
          }
          createMany: {
            args: Prisma.DesignSubClassCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DesignSubClassCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassPayload>[]
          }
          delete: {
            args: Prisma.DesignSubClassDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassPayload>
          }
          update: {
            args: Prisma.DesignSubClassUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassPayload>
          }
          deleteMany: {
            args: Prisma.DesignSubClassDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DesignSubClassUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DesignSubClassUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassPayload>[]
          }
          upsert: {
            args: Prisma.DesignSubClassUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassPayload>
          }
          aggregate: {
            args: Prisma.DesignSubClassAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDesignSubClass>
          }
          groupBy: {
            args: Prisma.DesignSubClassGroupByArgs<ExtArgs>
            result: $Utils.Optional<DesignSubClassGroupByOutputType>[]
          }
          count: {
            args: Prisma.DesignSubClassCountArgs<ExtArgs>
            result: $Utils.Optional<DesignSubClassCountAggregateOutputType> | number
          }
        }
      }
      DesignSubClassVersion: {
        payload: Prisma.$DesignSubClassVersionPayload<ExtArgs>
        fields: Prisma.DesignSubClassVersionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DesignSubClassVersionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassVersionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DesignSubClassVersionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassVersionPayload>
          }
          findFirst: {
            args: Prisma.DesignSubClassVersionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassVersionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DesignSubClassVersionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassVersionPayload>
          }
          findMany: {
            args: Prisma.DesignSubClassVersionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassVersionPayload>[]
          }
          create: {
            args: Prisma.DesignSubClassVersionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassVersionPayload>
          }
          createMany: {
            args: Prisma.DesignSubClassVersionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DesignSubClassVersionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassVersionPayload>[]
          }
          delete: {
            args: Prisma.DesignSubClassVersionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassVersionPayload>
          }
          update: {
            args: Prisma.DesignSubClassVersionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassVersionPayload>
          }
          deleteMany: {
            args: Prisma.DesignSubClassVersionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DesignSubClassVersionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DesignSubClassVersionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassVersionPayload>[]
          }
          upsert: {
            args: Prisma.DesignSubClassVersionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSubClassVersionPayload>
          }
          aggregate: {
            args: Prisma.DesignSubClassVersionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDesignSubClassVersion>
          }
          groupBy: {
            args: Prisma.DesignSubClassVersionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DesignSubClassVersionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DesignSubClassVersionCountArgs<ExtArgs>
            result: $Utils.Optional<DesignSubClassVersionCountAggregateOutputType> | number
          }
        }
      }
      UserProject: {
        payload: Prisma.$UserProjectPayload<ExtArgs>
        fields: Prisma.UserProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProjectPayload>
          }
          findFirst: {
            args: Prisma.UserProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProjectPayload>
          }
          findMany: {
            args: Prisma.UserProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProjectPayload>[]
          }
          create: {
            args: Prisma.UserProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProjectPayload>
          }
          createMany: {
            args: Prisma.UserProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProjectPayload>[]
          }
          delete: {
            args: Prisma.UserProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProjectPayload>
          }
          update: {
            args: Prisma.UserProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProjectPayload>
          }
          deleteMany: {
            args: Prisma.UserProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProjectPayload>[]
          }
          upsert: {
            args: Prisma.UserProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProjectPayload>
          }
          aggregate: {
            args: Prisma.UserProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserProject>
          }
          groupBy: {
            args: Prisma.UserProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserProjectCountArgs<ExtArgs>
            result: $Utils.Optional<UserProjectCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    account?: AccountOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
    authenticator?: AuthenticatorOmit
    project?: ProjectOmit
    script?: ScriptOmit
    scene?: SceneOmit
    designCategory?: DesignCategoryOmit
    designSubClass?: DesignSubClassOmit
    designSubClassVersion?: DesignSubClassVersionOmit
    userProject?: UserProjectOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
    Authenticator: number
    scriptOwner: number
    projectMembers: number
    DesignCategoryOwner: number
    DesignOwner: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    Authenticator?: boolean | UserCountOutputTypeCountAuthenticatorArgs
    scriptOwner?: boolean | UserCountOutputTypeCountScriptOwnerArgs
    projectMembers?: boolean | UserCountOutputTypeCountProjectMembersArgs
    DesignCategoryOwner?: boolean | UserCountOutputTypeCountDesignCategoryOwnerArgs
    DesignOwner?: boolean | UserCountOutputTypeCountDesignOwnerArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuthenticatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthenticatorWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountScriptOwnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScriptWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDesignCategoryOwnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DesignCategoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDesignOwnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DesignSubClassWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    projectMembers: number
    scripts: number
    designCategories: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projectMembers?: boolean | ProjectCountOutputTypeCountProjectMembersArgs
    scripts?: boolean | ProjectCountOutputTypeCountScriptsArgs
    designCategories?: boolean | ProjectCountOutputTypeCountDesignCategoriesArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountProjectMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProjectWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountScriptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScriptWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountDesignCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DesignCategoryWhereInput
  }


  /**
   * Count Type ScriptCountOutputType
   */

  export type ScriptCountOutputType = {
    scenes: number
  }

  export type ScriptCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scenes?: boolean | ScriptCountOutputTypeCountScenesArgs
  }

  // Custom InputTypes
  /**
   * ScriptCountOutputType without action
   */
  export type ScriptCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScriptCountOutputType
     */
    select?: ScriptCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ScriptCountOutputType without action
   */
  export type ScriptCountOutputTypeCountScenesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SceneWhereInput
  }


  /**
   * Count Type DesignCategoryCountOutputType
   */

  export type DesignCategoryCountOutputType = {
    designs: number
  }

  export type DesignCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    designs?: boolean | DesignCategoryCountOutputTypeCountDesignsArgs
  }

  // Custom InputTypes
  /**
   * DesignCategoryCountOutputType without action
   */
  export type DesignCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignCategoryCountOutputType
     */
    select?: DesignCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DesignCategoryCountOutputType without action
   */
  export type DesignCategoryCountOutputTypeCountDesignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DesignSubClassWhereInput
  }


  /**
   * Count Type DesignSubClassCountOutputType
   */

  export type DesignSubClassCountOutputType = {
    versions: number
  }

  export type DesignSubClassCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    versions?: boolean | DesignSubClassCountOutputTypeCountVersionsArgs
  }

  // Custom InputTypes
  /**
   * DesignSubClassCountOutputType without action
   */
  export type DesignSubClassCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClassCountOutputType
     */
    select?: DesignSubClassCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DesignSubClassCountOutputType without action
   */
  export type DesignSubClassCountOutputTypeCountVersionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DesignSubClassVersionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string
    password: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    Authenticator?: boolean | User$AuthenticatorArgs<ExtArgs>
    scriptOwner?: boolean | User$scriptOwnerArgs<ExtArgs>
    projectMembers?: boolean | User$projectMembersArgs<ExtArgs>
    DesignCategoryOwner?: boolean | User$DesignCategoryOwnerArgs<ExtArgs>
    DesignOwner?: boolean | User$DesignOwnerArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "emailVerified" | "image" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    Authenticator?: boolean | User$AuthenticatorArgs<ExtArgs>
    scriptOwner?: boolean | User$scriptOwnerArgs<ExtArgs>
    projectMembers?: boolean | User$projectMembersArgs<ExtArgs>
    DesignCategoryOwner?: boolean | User$DesignCategoryOwnerArgs<ExtArgs>
    DesignOwner?: boolean | User$DesignOwnerArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      Authenticator: Prisma.$AuthenticatorPayload<ExtArgs>[]
      scriptOwner: Prisma.$ScriptPayload<ExtArgs>[]
      projectMembers: Prisma.$UserProjectPayload<ExtArgs>[]
      DesignCategoryOwner: Prisma.$DesignCategoryPayload<ExtArgs>[]
      DesignOwner: Prisma.$DesignSubClassPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string
      password: string | null
      emailVerified: Date | null
      image: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Authenticator<T extends User$AuthenticatorArgs<ExtArgs> = {}>(args?: Subset<T, User$AuthenticatorArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    scriptOwner<T extends User$scriptOwnerArgs<ExtArgs> = {}>(args?: Subset<T, User$scriptOwnerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScriptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projectMembers<T extends User$projectMembersArgs<ExtArgs> = {}>(args?: Subset<T, User$projectMembersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    DesignCategoryOwner<T extends User$DesignCategoryOwnerArgs<ExtArgs> = {}>(args?: Subset<T, User$DesignCategoryOwnerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    DesignOwner<T extends User$DesignOwnerArgs<ExtArgs> = {}>(args?: Subset<T, User$DesignOwnerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignSubClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.Authenticator
   */
  export type User$AuthenticatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    where?: AuthenticatorWhereInput
    orderBy?: AuthenticatorOrderByWithRelationInput | AuthenticatorOrderByWithRelationInput[]
    cursor?: AuthenticatorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuthenticatorScalarFieldEnum | AuthenticatorScalarFieldEnum[]
  }

  /**
   * User.scriptOwner
   */
  export type User$scriptOwnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Script
     */
    select?: ScriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Script
     */
    omit?: ScriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScriptInclude<ExtArgs> | null
    where?: ScriptWhereInput
    orderBy?: ScriptOrderByWithRelationInput | ScriptOrderByWithRelationInput[]
    cursor?: ScriptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScriptScalarFieldEnum | ScriptScalarFieldEnum[]
  }

  /**
   * User.projectMembers
   */
  export type User$projectMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProject
     */
    select?: UserProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProject
     */
    omit?: UserProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProjectInclude<ExtArgs> | null
    where?: UserProjectWhereInput
    orderBy?: UserProjectOrderByWithRelationInput | UserProjectOrderByWithRelationInput[]
    cursor?: UserProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserProjectScalarFieldEnum | UserProjectScalarFieldEnum[]
  }

  /**
   * User.DesignCategoryOwner
   */
  export type User$DesignCategoryOwnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignCategory
     */
    select?: DesignCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignCategory
     */
    omit?: DesignCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignCategoryInclude<ExtArgs> | null
    where?: DesignCategoryWhereInput
    orderBy?: DesignCategoryOrderByWithRelationInput | DesignCategoryOrderByWithRelationInput[]
    cursor?: DesignCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DesignCategoryScalarFieldEnum | DesignCategoryScalarFieldEnum[]
  }

  /**
   * User.DesignOwner
   */
  export type User$DesignOwnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClass
     */
    select?: DesignSubClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClass
     */
    omit?: DesignSubClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassInclude<ExtArgs> | null
    where?: DesignSubClassWhereInput
    orderBy?: DesignSubClassOrderByWithRelationInput | DesignSubClassOrderByWithRelationInput[]
    cursor?: DesignSubClassWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DesignSubClassScalarFieldEnum | DesignSubClassScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const accountWithUserIdOnly = await prisma.account.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `userId`
     * const accountWithUserIdOnly = await prisma.account.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `userId`
     * const accountWithUserIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    sessionToken: string | null
    userId: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    sessionToken: string | null
    userId: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    sessionToken: number
    userId: number
    expires: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    sessionToken?: true
    userId?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    sessionToken?: true
    userId?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionCountAggregateInputType = {
    sessionToken?: true
    userId?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    sessionToken: string
    userId: string
    expires: Date
    createdAt: Date
    updatedAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"sessionToken" | "userId" | "expires" | "createdAt" | "updatedAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      sessionToken: string
      userId: string
      expires: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `sessionToken`
     * const sessionWithSessionTokenOnly = await prisma.session.findMany({ select: { sessionToken: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `sessionToken`
     * const sessionWithSessionTokenOnly = await prisma.session.createManyAndReturn({
     *   select: { sessionToken: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `sessionToken`
     * const sessionWithSessionTokenOnly = await prisma.session.updateManyAndReturn({
     *   select: { sessionToken: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model Authenticator
   */

  export type AggregateAuthenticator = {
    _count: AuthenticatorCountAggregateOutputType | null
    _avg: AuthenticatorAvgAggregateOutputType | null
    _sum: AuthenticatorSumAggregateOutputType | null
    _min: AuthenticatorMinAggregateOutputType | null
    _max: AuthenticatorMaxAggregateOutputType | null
  }

  export type AuthenticatorAvgAggregateOutputType = {
    counter: number | null
  }

  export type AuthenticatorSumAggregateOutputType = {
    counter: number | null
  }

  export type AuthenticatorMinAggregateOutputType = {
    credentialID: string | null
    userId: string | null
    providerAccountId: string | null
    credentialPublicKey: string | null
    counter: number | null
    credentialDeviceType: string | null
    credentialBackedUp: boolean | null
    transports: string | null
  }

  export type AuthenticatorMaxAggregateOutputType = {
    credentialID: string | null
    userId: string | null
    providerAccountId: string | null
    credentialPublicKey: string | null
    counter: number | null
    credentialDeviceType: string | null
    credentialBackedUp: boolean | null
    transports: string | null
  }

  export type AuthenticatorCountAggregateOutputType = {
    credentialID: number
    userId: number
    providerAccountId: number
    credentialPublicKey: number
    counter: number
    credentialDeviceType: number
    credentialBackedUp: number
    transports: number
    _all: number
  }


  export type AuthenticatorAvgAggregateInputType = {
    counter?: true
  }

  export type AuthenticatorSumAggregateInputType = {
    counter?: true
  }

  export type AuthenticatorMinAggregateInputType = {
    credentialID?: true
    userId?: true
    providerAccountId?: true
    credentialPublicKey?: true
    counter?: true
    credentialDeviceType?: true
    credentialBackedUp?: true
    transports?: true
  }

  export type AuthenticatorMaxAggregateInputType = {
    credentialID?: true
    userId?: true
    providerAccountId?: true
    credentialPublicKey?: true
    counter?: true
    credentialDeviceType?: true
    credentialBackedUp?: true
    transports?: true
  }

  export type AuthenticatorCountAggregateInputType = {
    credentialID?: true
    userId?: true
    providerAccountId?: true
    credentialPublicKey?: true
    counter?: true
    credentialDeviceType?: true
    credentialBackedUp?: true
    transports?: true
    _all?: true
  }

  export type AuthenticatorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Authenticator to aggregate.
     */
    where?: AuthenticatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authenticators to fetch.
     */
    orderBy?: AuthenticatorOrderByWithRelationInput | AuthenticatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthenticatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authenticators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authenticators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Authenticators
    **/
    _count?: true | AuthenticatorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuthenticatorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuthenticatorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthenticatorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthenticatorMaxAggregateInputType
  }

  export type GetAuthenticatorAggregateType<T extends AuthenticatorAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthenticator]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthenticator[P]>
      : GetScalarType<T[P], AggregateAuthenticator[P]>
  }




  export type AuthenticatorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthenticatorWhereInput
    orderBy?: AuthenticatorOrderByWithAggregationInput | AuthenticatorOrderByWithAggregationInput[]
    by: AuthenticatorScalarFieldEnum[] | AuthenticatorScalarFieldEnum
    having?: AuthenticatorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthenticatorCountAggregateInputType | true
    _avg?: AuthenticatorAvgAggregateInputType
    _sum?: AuthenticatorSumAggregateInputType
    _min?: AuthenticatorMinAggregateInputType
    _max?: AuthenticatorMaxAggregateInputType
  }

  export type AuthenticatorGroupByOutputType = {
    credentialID: string
    userId: string
    providerAccountId: string
    credentialPublicKey: string
    counter: number
    credentialDeviceType: string
    credentialBackedUp: boolean
    transports: string | null
    _count: AuthenticatorCountAggregateOutputType | null
    _avg: AuthenticatorAvgAggregateOutputType | null
    _sum: AuthenticatorSumAggregateOutputType | null
    _min: AuthenticatorMinAggregateOutputType | null
    _max: AuthenticatorMaxAggregateOutputType | null
  }

  type GetAuthenticatorGroupByPayload<T extends AuthenticatorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthenticatorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthenticatorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthenticatorGroupByOutputType[P]>
            : GetScalarType<T[P], AuthenticatorGroupByOutputType[P]>
        }
      >
    >


  export type AuthenticatorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    credentialID?: boolean
    userId?: boolean
    providerAccountId?: boolean
    credentialPublicKey?: boolean
    counter?: boolean
    credentialDeviceType?: boolean
    credentialBackedUp?: boolean
    transports?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authenticator"]>

  export type AuthenticatorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    credentialID?: boolean
    userId?: boolean
    providerAccountId?: boolean
    credentialPublicKey?: boolean
    counter?: boolean
    credentialDeviceType?: boolean
    credentialBackedUp?: boolean
    transports?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authenticator"]>

  export type AuthenticatorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    credentialID?: boolean
    userId?: boolean
    providerAccountId?: boolean
    credentialPublicKey?: boolean
    counter?: boolean
    credentialDeviceType?: boolean
    credentialBackedUp?: boolean
    transports?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authenticator"]>

  export type AuthenticatorSelectScalar = {
    credentialID?: boolean
    userId?: boolean
    providerAccountId?: boolean
    credentialPublicKey?: boolean
    counter?: boolean
    credentialDeviceType?: boolean
    credentialBackedUp?: boolean
    transports?: boolean
  }

  export type AuthenticatorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"credentialID" | "userId" | "providerAccountId" | "credentialPublicKey" | "counter" | "credentialDeviceType" | "credentialBackedUp" | "transports", ExtArgs["result"]["authenticator"]>
  export type AuthenticatorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuthenticatorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuthenticatorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuthenticatorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Authenticator"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      credentialID: string
      userId: string
      providerAccountId: string
      credentialPublicKey: string
      counter: number
      credentialDeviceType: string
      credentialBackedUp: boolean
      transports: string | null
    }, ExtArgs["result"]["authenticator"]>
    composites: {}
  }

  type AuthenticatorGetPayload<S extends boolean | null | undefined | AuthenticatorDefaultArgs> = $Result.GetResult<Prisma.$AuthenticatorPayload, S>

  type AuthenticatorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthenticatorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthenticatorCountAggregateInputType | true
    }

  export interface AuthenticatorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Authenticator'], meta: { name: 'Authenticator' } }
    /**
     * Find zero or one Authenticator that matches the filter.
     * @param {AuthenticatorFindUniqueArgs} args - Arguments to find a Authenticator
     * @example
     * // Get one Authenticator
     * const authenticator = await prisma.authenticator.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthenticatorFindUniqueArgs>(args: SelectSubset<T, AuthenticatorFindUniqueArgs<ExtArgs>>): Prisma__AuthenticatorClient<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Authenticator that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthenticatorFindUniqueOrThrowArgs} args - Arguments to find a Authenticator
     * @example
     * // Get one Authenticator
     * const authenticator = await prisma.authenticator.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthenticatorFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthenticatorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthenticatorClient<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Authenticator that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorFindFirstArgs} args - Arguments to find a Authenticator
     * @example
     * // Get one Authenticator
     * const authenticator = await prisma.authenticator.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthenticatorFindFirstArgs>(args?: SelectSubset<T, AuthenticatorFindFirstArgs<ExtArgs>>): Prisma__AuthenticatorClient<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Authenticator that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorFindFirstOrThrowArgs} args - Arguments to find a Authenticator
     * @example
     * // Get one Authenticator
     * const authenticator = await prisma.authenticator.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthenticatorFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthenticatorFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthenticatorClient<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Authenticators that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Authenticators
     * const authenticators = await prisma.authenticator.findMany()
     * 
     * // Get first 10 Authenticators
     * const authenticators = await prisma.authenticator.findMany({ take: 10 })
     * 
     * // Only select the `credentialID`
     * const authenticatorWithCredentialIDOnly = await prisma.authenticator.findMany({ select: { credentialID: true } })
     * 
     */
    findMany<T extends AuthenticatorFindManyArgs>(args?: SelectSubset<T, AuthenticatorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Authenticator.
     * @param {AuthenticatorCreateArgs} args - Arguments to create a Authenticator.
     * @example
     * // Create one Authenticator
     * const Authenticator = await prisma.authenticator.create({
     *   data: {
     *     // ... data to create a Authenticator
     *   }
     * })
     * 
     */
    create<T extends AuthenticatorCreateArgs>(args: SelectSubset<T, AuthenticatorCreateArgs<ExtArgs>>): Prisma__AuthenticatorClient<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Authenticators.
     * @param {AuthenticatorCreateManyArgs} args - Arguments to create many Authenticators.
     * @example
     * // Create many Authenticators
     * const authenticator = await prisma.authenticator.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthenticatorCreateManyArgs>(args?: SelectSubset<T, AuthenticatorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Authenticators and returns the data saved in the database.
     * @param {AuthenticatorCreateManyAndReturnArgs} args - Arguments to create many Authenticators.
     * @example
     * // Create many Authenticators
     * const authenticator = await prisma.authenticator.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Authenticators and only return the `credentialID`
     * const authenticatorWithCredentialIDOnly = await prisma.authenticator.createManyAndReturn({
     *   select: { credentialID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthenticatorCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthenticatorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Authenticator.
     * @param {AuthenticatorDeleteArgs} args - Arguments to delete one Authenticator.
     * @example
     * // Delete one Authenticator
     * const Authenticator = await prisma.authenticator.delete({
     *   where: {
     *     // ... filter to delete one Authenticator
     *   }
     * })
     * 
     */
    delete<T extends AuthenticatorDeleteArgs>(args: SelectSubset<T, AuthenticatorDeleteArgs<ExtArgs>>): Prisma__AuthenticatorClient<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Authenticator.
     * @param {AuthenticatorUpdateArgs} args - Arguments to update one Authenticator.
     * @example
     * // Update one Authenticator
     * const authenticator = await prisma.authenticator.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthenticatorUpdateArgs>(args: SelectSubset<T, AuthenticatorUpdateArgs<ExtArgs>>): Prisma__AuthenticatorClient<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Authenticators.
     * @param {AuthenticatorDeleteManyArgs} args - Arguments to filter Authenticators to delete.
     * @example
     * // Delete a few Authenticators
     * const { count } = await prisma.authenticator.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthenticatorDeleteManyArgs>(args?: SelectSubset<T, AuthenticatorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Authenticators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Authenticators
     * const authenticator = await prisma.authenticator.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthenticatorUpdateManyArgs>(args: SelectSubset<T, AuthenticatorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Authenticators and returns the data updated in the database.
     * @param {AuthenticatorUpdateManyAndReturnArgs} args - Arguments to update many Authenticators.
     * @example
     * // Update many Authenticators
     * const authenticator = await prisma.authenticator.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Authenticators and only return the `credentialID`
     * const authenticatorWithCredentialIDOnly = await prisma.authenticator.updateManyAndReturn({
     *   select: { credentialID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuthenticatorUpdateManyAndReturnArgs>(args: SelectSubset<T, AuthenticatorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Authenticator.
     * @param {AuthenticatorUpsertArgs} args - Arguments to update or create a Authenticator.
     * @example
     * // Update or create a Authenticator
     * const authenticator = await prisma.authenticator.upsert({
     *   create: {
     *     // ... data to create a Authenticator
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Authenticator we want to update
     *   }
     * })
     */
    upsert<T extends AuthenticatorUpsertArgs>(args: SelectSubset<T, AuthenticatorUpsertArgs<ExtArgs>>): Prisma__AuthenticatorClient<$Result.GetResult<Prisma.$AuthenticatorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Authenticators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorCountArgs} args - Arguments to filter Authenticators to count.
     * @example
     * // Count the number of Authenticators
     * const count = await prisma.authenticator.count({
     *   where: {
     *     // ... the filter for the Authenticators we want to count
     *   }
     * })
    **/
    count<T extends AuthenticatorCountArgs>(
      args?: Subset<T, AuthenticatorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthenticatorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Authenticator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthenticatorAggregateArgs>(args: Subset<T, AuthenticatorAggregateArgs>): Prisma.PrismaPromise<GetAuthenticatorAggregateType<T>>

    /**
     * Group by Authenticator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthenticatorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthenticatorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthenticatorGroupByArgs['orderBy'] }
        : { orderBy?: AuthenticatorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthenticatorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthenticatorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Authenticator model
   */
  readonly fields: AuthenticatorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Authenticator.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthenticatorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Authenticator model
   */
  interface AuthenticatorFieldRefs {
    readonly credentialID: FieldRef<"Authenticator", 'String'>
    readonly userId: FieldRef<"Authenticator", 'String'>
    readonly providerAccountId: FieldRef<"Authenticator", 'String'>
    readonly credentialPublicKey: FieldRef<"Authenticator", 'String'>
    readonly counter: FieldRef<"Authenticator", 'Int'>
    readonly credentialDeviceType: FieldRef<"Authenticator", 'String'>
    readonly credentialBackedUp: FieldRef<"Authenticator", 'Boolean'>
    readonly transports: FieldRef<"Authenticator", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Authenticator findUnique
   */
  export type AuthenticatorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    /**
     * Filter, which Authenticator to fetch.
     */
    where: AuthenticatorWhereUniqueInput
  }

  /**
   * Authenticator findUniqueOrThrow
   */
  export type AuthenticatorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    /**
     * Filter, which Authenticator to fetch.
     */
    where: AuthenticatorWhereUniqueInput
  }

  /**
   * Authenticator findFirst
   */
  export type AuthenticatorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    /**
     * Filter, which Authenticator to fetch.
     */
    where?: AuthenticatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authenticators to fetch.
     */
    orderBy?: AuthenticatorOrderByWithRelationInput | AuthenticatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Authenticators.
     */
    cursor?: AuthenticatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authenticators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authenticators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Authenticators.
     */
    distinct?: AuthenticatorScalarFieldEnum | AuthenticatorScalarFieldEnum[]
  }

  /**
   * Authenticator findFirstOrThrow
   */
  export type AuthenticatorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    /**
     * Filter, which Authenticator to fetch.
     */
    where?: AuthenticatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authenticators to fetch.
     */
    orderBy?: AuthenticatorOrderByWithRelationInput | AuthenticatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Authenticators.
     */
    cursor?: AuthenticatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authenticators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authenticators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Authenticators.
     */
    distinct?: AuthenticatorScalarFieldEnum | AuthenticatorScalarFieldEnum[]
  }

  /**
   * Authenticator findMany
   */
  export type AuthenticatorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    /**
     * Filter, which Authenticators to fetch.
     */
    where?: AuthenticatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authenticators to fetch.
     */
    orderBy?: AuthenticatorOrderByWithRelationInput | AuthenticatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Authenticators.
     */
    cursor?: AuthenticatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authenticators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authenticators.
     */
    skip?: number
    distinct?: AuthenticatorScalarFieldEnum | AuthenticatorScalarFieldEnum[]
  }

  /**
   * Authenticator create
   */
  export type AuthenticatorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    /**
     * The data needed to create a Authenticator.
     */
    data: XOR<AuthenticatorCreateInput, AuthenticatorUncheckedCreateInput>
  }

  /**
   * Authenticator createMany
   */
  export type AuthenticatorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Authenticators.
     */
    data: AuthenticatorCreateManyInput | AuthenticatorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Authenticator createManyAndReturn
   */
  export type AuthenticatorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * The data used to create many Authenticators.
     */
    data: AuthenticatorCreateManyInput | AuthenticatorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Authenticator update
   */
  export type AuthenticatorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    /**
     * The data needed to update a Authenticator.
     */
    data: XOR<AuthenticatorUpdateInput, AuthenticatorUncheckedUpdateInput>
    /**
     * Choose, which Authenticator to update.
     */
    where: AuthenticatorWhereUniqueInput
  }

  /**
   * Authenticator updateMany
   */
  export type AuthenticatorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Authenticators.
     */
    data: XOR<AuthenticatorUpdateManyMutationInput, AuthenticatorUncheckedUpdateManyInput>
    /**
     * Filter which Authenticators to update
     */
    where?: AuthenticatorWhereInput
    /**
     * Limit how many Authenticators to update.
     */
    limit?: number
  }

  /**
   * Authenticator updateManyAndReturn
   */
  export type AuthenticatorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * The data used to update Authenticators.
     */
    data: XOR<AuthenticatorUpdateManyMutationInput, AuthenticatorUncheckedUpdateManyInput>
    /**
     * Filter which Authenticators to update
     */
    where?: AuthenticatorWhereInput
    /**
     * Limit how many Authenticators to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Authenticator upsert
   */
  export type AuthenticatorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    /**
     * The filter to search for the Authenticator to update in case it exists.
     */
    where: AuthenticatorWhereUniqueInput
    /**
     * In case the Authenticator found by the `where` argument doesn't exist, create a new Authenticator with this data.
     */
    create: XOR<AuthenticatorCreateInput, AuthenticatorUncheckedCreateInput>
    /**
     * In case the Authenticator was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthenticatorUpdateInput, AuthenticatorUncheckedUpdateInput>
  }

  /**
   * Authenticator delete
   */
  export type AuthenticatorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
    /**
     * Filter which Authenticator to delete.
     */
    where: AuthenticatorWhereUniqueInput
  }

  /**
   * Authenticator deleteMany
   */
  export type AuthenticatorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Authenticators to delete
     */
    where?: AuthenticatorWhereInput
    /**
     * Limit how many Authenticators to delete.
     */
    limit?: number
  }

  /**
   * Authenticator without action
   */
  export type AuthenticatorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authenticator
     */
    select?: AuthenticatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authenticator
     */
    omit?: AuthenticatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthenticatorInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectMembers?: boolean | Project$projectMembersArgs<ExtArgs>
    scripts?: boolean | Project$scriptsArgs<ExtArgs>
    designCategories?: boolean | Project$designCategoriesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projectMembers?: boolean | Project$projectMembersArgs<ExtArgs>
    scripts?: boolean | Project$scriptsArgs<ExtArgs>
    designCategories?: boolean | Project$designCategoriesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      projectMembers: Prisma.$UserProjectPayload<ExtArgs>[]
      scripts: Prisma.$ScriptPayload<ExtArgs>[]
      designCategories: Prisma.$DesignCategoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projectMembers<T extends Project$projectMembersArgs<ExtArgs> = {}>(args?: Subset<T, Project$projectMembersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    scripts<T extends Project$scriptsArgs<ExtArgs> = {}>(args?: Subset<T, Project$scriptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScriptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    designCategories<T extends Project$designCategoriesArgs<ExtArgs> = {}>(args?: Subset<T, Project$designCategoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.projectMembers
   */
  export type Project$projectMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProject
     */
    select?: UserProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProject
     */
    omit?: UserProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProjectInclude<ExtArgs> | null
    where?: UserProjectWhereInput
    orderBy?: UserProjectOrderByWithRelationInput | UserProjectOrderByWithRelationInput[]
    cursor?: UserProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserProjectScalarFieldEnum | UserProjectScalarFieldEnum[]
  }

  /**
   * Project.scripts
   */
  export type Project$scriptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Script
     */
    select?: ScriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Script
     */
    omit?: ScriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScriptInclude<ExtArgs> | null
    where?: ScriptWhereInput
    orderBy?: ScriptOrderByWithRelationInput | ScriptOrderByWithRelationInput[]
    cursor?: ScriptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScriptScalarFieldEnum | ScriptScalarFieldEnum[]
  }

  /**
   * Project.designCategories
   */
  export type Project$designCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignCategory
     */
    select?: DesignCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignCategory
     */
    omit?: DesignCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignCategoryInclude<ExtArgs> | null
    where?: DesignCategoryWhereInput
    orderBy?: DesignCategoryOrderByWithRelationInput | DesignCategoryOrderByWithRelationInput[]
    cursor?: DesignCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DesignCategoryScalarFieldEnum | DesignCategoryScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Script
   */

  export type AggregateScript = {
    _count: ScriptCountAggregateOutputType | null
    _avg: ScriptAvgAggregateOutputType | null
    _sum: ScriptSumAggregateOutputType | null
    _min: ScriptMinAggregateOutputType | null
    _max: ScriptMaxAggregateOutputType | null
  }

  export type ScriptAvgAggregateOutputType = {
    version: number | null
  }

  export type ScriptSumAggregateOutputType = {
    version: number | null
  }

  export type ScriptMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    author: string | null
    status: $Enums.ScriptStatus | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: string | null
    projectId: string | null
  }

  export type ScriptMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    author: string | null
    status: $Enums.ScriptStatus | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: string | null
    projectId: string | null
  }

  export type ScriptCountAggregateOutputType = {
    id: number
    title: number
    description: number
    author: number
    content: number
    status: number
    version: number
    createdAt: number
    updatedAt: number
    ownerId: number
    projectId: number
    _all: number
  }


  export type ScriptAvgAggregateInputType = {
    version?: true
  }

  export type ScriptSumAggregateInputType = {
    version?: true
  }

  export type ScriptMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    author?: true
    status?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    projectId?: true
  }

  export type ScriptMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    author?: true
    status?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    projectId?: true
  }

  export type ScriptCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    author?: true
    content?: true
    status?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    projectId?: true
    _all?: true
  }

  export type ScriptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Script to aggregate.
     */
    where?: ScriptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scripts to fetch.
     */
    orderBy?: ScriptOrderByWithRelationInput | ScriptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScriptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scripts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scripts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Scripts
    **/
    _count?: true | ScriptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScriptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScriptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScriptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScriptMaxAggregateInputType
  }

  export type GetScriptAggregateType<T extends ScriptAggregateArgs> = {
        [P in keyof T & keyof AggregateScript]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScript[P]>
      : GetScalarType<T[P], AggregateScript[P]>
  }




  export type ScriptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScriptWhereInput
    orderBy?: ScriptOrderByWithAggregationInput | ScriptOrderByWithAggregationInput[]
    by: ScriptScalarFieldEnum[] | ScriptScalarFieldEnum
    having?: ScriptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScriptCountAggregateInputType | true
    _avg?: ScriptAvgAggregateInputType
    _sum?: ScriptSumAggregateInputType
    _min?: ScriptMinAggregateInputType
    _max?: ScriptMaxAggregateInputType
  }

  export type ScriptGroupByOutputType = {
    id: string
    title: string
    description: string | null
    author: string | null
    content: JsonValue
    status: $Enums.ScriptStatus
    version: number
    createdAt: Date
    updatedAt: Date
    ownerId: string
    projectId: string | null
    _count: ScriptCountAggregateOutputType | null
    _avg: ScriptAvgAggregateOutputType | null
    _sum: ScriptSumAggregateOutputType | null
    _min: ScriptMinAggregateOutputType | null
    _max: ScriptMaxAggregateOutputType | null
  }

  type GetScriptGroupByPayload<T extends ScriptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScriptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScriptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScriptGroupByOutputType[P]>
            : GetScalarType<T[P], ScriptGroupByOutputType[P]>
        }
      >
    >


  export type ScriptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    author?: boolean
    content?: boolean
    status?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    projectId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | Script$projectArgs<ExtArgs>
    scenes?: boolean | Script$scenesArgs<ExtArgs>
    _count?: boolean | ScriptCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["script"]>

  export type ScriptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    author?: boolean
    content?: boolean
    status?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    projectId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | Script$projectArgs<ExtArgs>
  }, ExtArgs["result"]["script"]>

  export type ScriptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    author?: boolean
    content?: boolean
    status?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    projectId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | Script$projectArgs<ExtArgs>
  }, ExtArgs["result"]["script"]>

  export type ScriptSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    author?: boolean
    content?: boolean
    status?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    projectId?: boolean
  }

  export type ScriptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "author" | "content" | "status" | "version" | "createdAt" | "updatedAt" | "ownerId" | "projectId", ExtArgs["result"]["script"]>
  export type ScriptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | Script$projectArgs<ExtArgs>
    scenes?: boolean | Script$scenesArgs<ExtArgs>
    _count?: boolean | ScriptCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ScriptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | Script$projectArgs<ExtArgs>
  }
  export type ScriptIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | Script$projectArgs<ExtArgs>
  }

  export type $ScriptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Script"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs> | null
      scenes: Prisma.$ScenePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      author: string | null
      content: Prisma.JsonValue
      status: $Enums.ScriptStatus
      version: number
      createdAt: Date
      updatedAt: Date
      ownerId: string
      projectId: string | null
    }, ExtArgs["result"]["script"]>
    composites: {}
  }

  type ScriptGetPayload<S extends boolean | null | undefined | ScriptDefaultArgs> = $Result.GetResult<Prisma.$ScriptPayload, S>

  type ScriptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScriptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScriptCountAggregateInputType | true
    }

  export interface ScriptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Script'], meta: { name: 'Script' } }
    /**
     * Find zero or one Script that matches the filter.
     * @param {ScriptFindUniqueArgs} args - Arguments to find a Script
     * @example
     * // Get one Script
     * const script = await prisma.script.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScriptFindUniqueArgs>(args: SelectSubset<T, ScriptFindUniqueArgs<ExtArgs>>): Prisma__ScriptClient<$Result.GetResult<Prisma.$ScriptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Script that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScriptFindUniqueOrThrowArgs} args - Arguments to find a Script
     * @example
     * // Get one Script
     * const script = await prisma.script.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScriptFindUniqueOrThrowArgs>(args: SelectSubset<T, ScriptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScriptClient<$Result.GetResult<Prisma.$ScriptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Script that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScriptFindFirstArgs} args - Arguments to find a Script
     * @example
     * // Get one Script
     * const script = await prisma.script.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScriptFindFirstArgs>(args?: SelectSubset<T, ScriptFindFirstArgs<ExtArgs>>): Prisma__ScriptClient<$Result.GetResult<Prisma.$ScriptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Script that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScriptFindFirstOrThrowArgs} args - Arguments to find a Script
     * @example
     * // Get one Script
     * const script = await prisma.script.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScriptFindFirstOrThrowArgs>(args?: SelectSubset<T, ScriptFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScriptClient<$Result.GetResult<Prisma.$ScriptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Scripts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScriptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Scripts
     * const scripts = await prisma.script.findMany()
     * 
     * // Get first 10 Scripts
     * const scripts = await prisma.script.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scriptWithIdOnly = await prisma.script.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScriptFindManyArgs>(args?: SelectSubset<T, ScriptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScriptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Script.
     * @param {ScriptCreateArgs} args - Arguments to create a Script.
     * @example
     * // Create one Script
     * const Script = await prisma.script.create({
     *   data: {
     *     // ... data to create a Script
     *   }
     * })
     * 
     */
    create<T extends ScriptCreateArgs>(args: SelectSubset<T, ScriptCreateArgs<ExtArgs>>): Prisma__ScriptClient<$Result.GetResult<Prisma.$ScriptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Scripts.
     * @param {ScriptCreateManyArgs} args - Arguments to create many Scripts.
     * @example
     * // Create many Scripts
     * const script = await prisma.script.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScriptCreateManyArgs>(args?: SelectSubset<T, ScriptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Scripts and returns the data saved in the database.
     * @param {ScriptCreateManyAndReturnArgs} args - Arguments to create many Scripts.
     * @example
     * // Create many Scripts
     * const script = await prisma.script.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Scripts and only return the `id`
     * const scriptWithIdOnly = await prisma.script.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScriptCreateManyAndReturnArgs>(args?: SelectSubset<T, ScriptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScriptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Script.
     * @param {ScriptDeleteArgs} args - Arguments to delete one Script.
     * @example
     * // Delete one Script
     * const Script = await prisma.script.delete({
     *   where: {
     *     // ... filter to delete one Script
     *   }
     * })
     * 
     */
    delete<T extends ScriptDeleteArgs>(args: SelectSubset<T, ScriptDeleteArgs<ExtArgs>>): Prisma__ScriptClient<$Result.GetResult<Prisma.$ScriptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Script.
     * @param {ScriptUpdateArgs} args - Arguments to update one Script.
     * @example
     * // Update one Script
     * const script = await prisma.script.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScriptUpdateArgs>(args: SelectSubset<T, ScriptUpdateArgs<ExtArgs>>): Prisma__ScriptClient<$Result.GetResult<Prisma.$ScriptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Scripts.
     * @param {ScriptDeleteManyArgs} args - Arguments to filter Scripts to delete.
     * @example
     * // Delete a few Scripts
     * const { count } = await prisma.script.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScriptDeleteManyArgs>(args?: SelectSubset<T, ScriptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Scripts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScriptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Scripts
     * const script = await prisma.script.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScriptUpdateManyArgs>(args: SelectSubset<T, ScriptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Scripts and returns the data updated in the database.
     * @param {ScriptUpdateManyAndReturnArgs} args - Arguments to update many Scripts.
     * @example
     * // Update many Scripts
     * const script = await prisma.script.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Scripts and only return the `id`
     * const scriptWithIdOnly = await prisma.script.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScriptUpdateManyAndReturnArgs>(args: SelectSubset<T, ScriptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScriptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Script.
     * @param {ScriptUpsertArgs} args - Arguments to update or create a Script.
     * @example
     * // Update or create a Script
     * const script = await prisma.script.upsert({
     *   create: {
     *     // ... data to create a Script
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Script we want to update
     *   }
     * })
     */
    upsert<T extends ScriptUpsertArgs>(args: SelectSubset<T, ScriptUpsertArgs<ExtArgs>>): Prisma__ScriptClient<$Result.GetResult<Prisma.$ScriptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Scripts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScriptCountArgs} args - Arguments to filter Scripts to count.
     * @example
     * // Count the number of Scripts
     * const count = await prisma.script.count({
     *   where: {
     *     // ... the filter for the Scripts we want to count
     *   }
     * })
    **/
    count<T extends ScriptCountArgs>(
      args?: Subset<T, ScriptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScriptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Script.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScriptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScriptAggregateArgs>(args: Subset<T, ScriptAggregateArgs>): Prisma.PrismaPromise<GetScriptAggregateType<T>>

    /**
     * Group by Script.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScriptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScriptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScriptGroupByArgs['orderBy'] }
        : { orderBy?: ScriptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScriptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScriptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Script model
   */
  readonly fields: ScriptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Script.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScriptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends Script$projectArgs<ExtArgs> = {}>(args?: Subset<T, Script$projectArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    scenes<T extends Script$scenesArgs<ExtArgs> = {}>(args?: Subset<T, Script$scenesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Script model
   */
  interface ScriptFieldRefs {
    readonly id: FieldRef<"Script", 'String'>
    readonly title: FieldRef<"Script", 'String'>
    readonly description: FieldRef<"Script", 'String'>
    readonly author: FieldRef<"Script", 'String'>
    readonly content: FieldRef<"Script", 'Json'>
    readonly status: FieldRef<"Script", 'ScriptStatus'>
    readonly version: FieldRef<"Script", 'Int'>
    readonly createdAt: FieldRef<"Script", 'DateTime'>
    readonly updatedAt: FieldRef<"Script", 'DateTime'>
    readonly ownerId: FieldRef<"Script", 'String'>
    readonly projectId: FieldRef<"Script", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Script findUnique
   */
  export type ScriptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Script
     */
    select?: ScriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Script
     */
    omit?: ScriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScriptInclude<ExtArgs> | null
    /**
     * Filter, which Script to fetch.
     */
    where: ScriptWhereUniqueInput
  }

  /**
   * Script findUniqueOrThrow
   */
  export type ScriptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Script
     */
    select?: ScriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Script
     */
    omit?: ScriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScriptInclude<ExtArgs> | null
    /**
     * Filter, which Script to fetch.
     */
    where: ScriptWhereUniqueInput
  }

  /**
   * Script findFirst
   */
  export type ScriptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Script
     */
    select?: ScriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Script
     */
    omit?: ScriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScriptInclude<ExtArgs> | null
    /**
     * Filter, which Script to fetch.
     */
    where?: ScriptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scripts to fetch.
     */
    orderBy?: ScriptOrderByWithRelationInput | ScriptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scripts.
     */
    cursor?: ScriptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scripts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scripts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scripts.
     */
    distinct?: ScriptScalarFieldEnum | ScriptScalarFieldEnum[]
  }

  /**
   * Script findFirstOrThrow
   */
  export type ScriptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Script
     */
    select?: ScriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Script
     */
    omit?: ScriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScriptInclude<ExtArgs> | null
    /**
     * Filter, which Script to fetch.
     */
    where?: ScriptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scripts to fetch.
     */
    orderBy?: ScriptOrderByWithRelationInput | ScriptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scripts.
     */
    cursor?: ScriptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scripts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scripts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scripts.
     */
    distinct?: ScriptScalarFieldEnum | ScriptScalarFieldEnum[]
  }

  /**
   * Script findMany
   */
  export type ScriptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Script
     */
    select?: ScriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Script
     */
    omit?: ScriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScriptInclude<ExtArgs> | null
    /**
     * Filter, which Scripts to fetch.
     */
    where?: ScriptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scripts to fetch.
     */
    orderBy?: ScriptOrderByWithRelationInput | ScriptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Scripts.
     */
    cursor?: ScriptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scripts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scripts.
     */
    skip?: number
    distinct?: ScriptScalarFieldEnum | ScriptScalarFieldEnum[]
  }

  /**
   * Script create
   */
  export type ScriptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Script
     */
    select?: ScriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Script
     */
    omit?: ScriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScriptInclude<ExtArgs> | null
    /**
     * The data needed to create a Script.
     */
    data: XOR<ScriptCreateInput, ScriptUncheckedCreateInput>
  }

  /**
   * Script createMany
   */
  export type ScriptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Scripts.
     */
    data: ScriptCreateManyInput | ScriptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Script createManyAndReturn
   */
  export type ScriptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Script
     */
    select?: ScriptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Script
     */
    omit?: ScriptOmit<ExtArgs> | null
    /**
     * The data used to create many Scripts.
     */
    data: ScriptCreateManyInput | ScriptCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScriptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Script update
   */
  export type ScriptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Script
     */
    select?: ScriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Script
     */
    omit?: ScriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScriptInclude<ExtArgs> | null
    /**
     * The data needed to update a Script.
     */
    data: XOR<ScriptUpdateInput, ScriptUncheckedUpdateInput>
    /**
     * Choose, which Script to update.
     */
    where: ScriptWhereUniqueInput
  }

  /**
   * Script updateMany
   */
  export type ScriptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Scripts.
     */
    data: XOR<ScriptUpdateManyMutationInput, ScriptUncheckedUpdateManyInput>
    /**
     * Filter which Scripts to update
     */
    where?: ScriptWhereInput
    /**
     * Limit how many Scripts to update.
     */
    limit?: number
  }

  /**
   * Script updateManyAndReturn
   */
  export type ScriptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Script
     */
    select?: ScriptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Script
     */
    omit?: ScriptOmit<ExtArgs> | null
    /**
     * The data used to update Scripts.
     */
    data: XOR<ScriptUpdateManyMutationInput, ScriptUncheckedUpdateManyInput>
    /**
     * Filter which Scripts to update
     */
    where?: ScriptWhereInput
    /**
     * Limit how many Scripts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScriptIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Script upsert
   */
  export type ScriptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Script
     */
    select?: ScriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Script
     */
    omit?: ScriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScriptInclude<ExtArgs> | null
    /**
     * The filter to search for the Script to update in case it exists.
     */
    where: ScriptWhereUniqueInput
    /**
     * In case the Script found by the `where` argument doesn't exist, create a new Script with this data.
     */
    create: XOR<ScriptCreateInput, ScriptUncheckedCreateInput>
    /**
     * In case the Script was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScriptUpdateInput, ScriptUncheckedUpdateInput>
  }

  /**
   * Script delete
   */
  export type ScriptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Script
     */
    select?: ScriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Script
     */
    omit?: ScriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScriptInclude<ExtArgs> | null
    /**
     * Filter which Script to delete.
     */
    where: ScriptWhereUniqueInput
  }

  /**
   * Script deleteMany
   */
  export type ScriptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Scripts to delete
     */
    where?: ScriptWhereInput
    /**
     * Limit how many Scripts to delete.
     */
    limit?: number
  }

  /**
   * Script.project
   */
  export type Script$projectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
  }

  /**
   * Script.scenes
   */
  export type Script$scenesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    where?: SceneWhereInput
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    cursor?: SceneWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SceneScalarFieldEnum | SceneScalarFieldEnum[]
  }

  /**
   * Script without action
   */
  export type ScriptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Script
     */
    select?: ScriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Script
     */
    omit?: ScriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScriptInclude<ExtArgs> | null
  }


  /**
   * Model Scene
   */

  export type AggregateScene = {
    _count: SceneCountAggregateOutputType | null
    _avg: SceneAvgAggregateOutputType | null
    _sum: SceneSumAggregateOutputType | null
    _min: SceneMinAggregateOutputType | null
    _max: SceneMaxAggregateOutputType | null
  }

  export type SceneAvgAggregateOutputType = {
    sceneNumber: number | null
    pageStart: number | null
  }

  export type SceneSumAggregateOutputType = {
    sceneNumber: number | null
    pageStart: number | null
  }

  export type SceneMinAggregateOutputType = {
    id: string | null
    sceneNumber: number | null
    heading: string | null
    pageStart: number | null
    scriptId: string | null
  }

  export type SceneMaxAggregateOutputType = {
    id: string | null
    sceneNumber: number | null
    heading: string | null
    pageStart: number | null
    scriptId: string | null
  }

  export type SceneCountAggregateOutputType = {
    id: number
    sceneNumber: number
    heading: number
    pageStart: number
    scriptId: number
    _all: number
  }


  export type SceneAvgAggregateInputType = {
    sceneNumber?: true
    pageStart?: true
  }

  export type SceneSumAggregateInputType = {
    sceneNumber?: true
    pageStart?: true
  }

  export type SceneMinAggregateInputType = {
    id?: true
    sceneNumber?: true
    heading?: true
    pageStart?: true
    scriptId?: true
  }

  export type SceneMaxAggregateInputType = {
    id?: true
    sceneNumber?: true
    heading?: true
    pageStart?: true
    scriptId?: true
  }

  export type SceneCountAggregateInputType = {
    id?: true
    sceneNumber?: true
    heading?: true
    pageStart?: true
    scriptId?: true
    _all?: true
  }

  export type SceneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Scene to aggregate.
     */
    where?: SceneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scenes to fetch.
     */
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SceneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scenes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scenes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Scenes
    **/
    _count?: true | SceneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SceneAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SceneSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SceneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SceneMaxAggregateInputType
  }

  export type GetSceneAggregateType<T extends SceneAggregateArgs> = {
        [P in keyof T & keyof AggregateScene]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScene[P]>
      : GetScalarType<T[P], AggregateScene[P]>
  }




  export type SceneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SceneWhereInput
    orderBy?: SceneOrderByWithAggregationInput | SceneOrderByWithAggregationInput[]
    by: SceneScalarFieldEnum[] | SceneScalarFieldEnum
    having?: SceneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SceneCountAggregateInputType | true
    _avg?: SceneAvgAggregateInputType
    _sum?: SceneSumAggregateInputType
    _min?: SceneMinAggregateInputType
    _max?: SceneMaxAggregateInputType
  }

  export type SceneGroupByOutputType = {
    id: string
    sceneNumber: number
    heading: string
    pageStart: number | null
    scriptId: string
    _count: SceneCountAggregateOutputType | null
    _avg: SceneAvgAggregateOutputType | null
    _sum: SceneSumAggregateOutputType | null
    _min: SceneMinAggregateOutputType | null
    _max: SceneMaxAggregateOutputType | null
  }

  type GetSceneGroupByPayload<T extends SceneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SceneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SceneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SceneGroupByOutputType[P]>
            : GetScalarType<T[P], SceneGroupByOutputType[P]>
        }
      >
    >


  export type SceneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sceneNumber?: boolean
    heading?: boolean
    pageStart?: boolean
    scriptId?: boolean
    script?: boolean | ScriptDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scene"]>

  export type SceneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sceneNumber?: boolean
    heading?: boolean
    pageStart?: boolean
    scriptId?: boolean
    script?: boolean | ScriptDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scene"]>

  export type SceneSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sceneNumber?: boolean
    heading?: boolean
    pageStart?: boolean
    scriptId?: boolean
    script?: boolean | ScriptDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scene"]>

  export type SceneSelectScalar = {
    id?: boolean
    sceneNumber?: boolean
    heading?: boolean
    pageStart?: boolean
    scriptId?: boolean
  }

  export type SceneOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sceneNumber" | "heading" | "pageStart" | "scriptId", ExtArgs["result"]["scene"]>
  export type SceneInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    script?: boolean | ScriptDefaultArgs<ExtArgs>
  }
  export type SceneIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    script?: boolean | ScriptDefaultArgs<ExtArgs>
  }
  export type SceneIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    script?: boolean | ScriptDefaultArgs<ExtArgs>
  }

  export type $ScenePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Scene"
    objects: {
      script: Prisma.$ScriptPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sceneNumber: number
      heading: string
      pageStart: number | null
      scriptId: string
    }, ExtArgs["result"]["scene"]>
    composites: {}
  }

  type SceneGetPayload<S extends boolean | null | undefined | SceneDefaultArgs> = $Result.GetResult<Prisma.$ScenePayload, S>

  type SceneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SceneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SceneCountAggregateInputType | true
    }

  export interface SceneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Scene'], meta: { name: 'Scene' } }
    /**
     * Find zero or one Scene that matches the filter.
     * @param {SceneFindUniqueArgs} args - Arguments to find a Scene
     * @example
     * // Get one Scene
     * const scene = await prisma.scene.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SceneFindUniqueArgs>(args: SelectSubset<T, SceneFindUniqueArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Scene that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SceneFindUniqueOrThrowArgs} args - Arguments to find a Scene
     * @example
     * // Get one Scene
     * const scene = await prisma.scene.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SceneFindUniqueOrThrowArgs>(args: SelectSubset<T, SceneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Scene that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneFindFirstArgs} args - Arguments to find a Scene
     * @example
     * // Get one Scene
     * const scene = await prisma.scene.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SceneFindFirstArgs>(args?: SelectSubset<T, SceneFindFirstArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Scene that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneFindFirstOrThrowArgs} args - Arguments to find a Scene
     * @example
     * // Get one Scene
     * const scene = await prisma.scene.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SceneFindFirstOrThrowArgs>(args?: SelectSubset<T, SceneFindFirstOrThrowArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Scenes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Scenes
     * const scenes = await prisma.scene.findMany()
     * 
     * // Get first 10 Scenes
     * const scenes = await prisma.scene.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sceneWithIdOnly = await prisma.scene.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SceneFindManyArgs>(args?: SelectSubset<T, SceneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Scene.
     * @param {SceneCreateArgs} args - Arguments to create a Scene.
     * @example
     * // Create one Scene
     * const Scene = await prisma.scene.create({
     *   data: {
     *     // ... data to create a Scene
     *   }
     * })
     * 
     */
    create<T extends SceneCreateArgs>(args: SelectSubset<T, SceneCreateArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Scenes.
     * @param {SceneCreateManyArgs} args - Arguments to create many Scenes.
     * @example
     * // Create many Scenes
     * const scene = await prisma.scene.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SceneCreateManyArgs>(args?: SelectSubset<T, SceneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Scenes and returns the data saved in the database.
     * @param {SceneCreateManyAndReturnArgs} args - Arguments to create many Scenes.
     * @example
     * // Create many Scenes
     * const scene = await prisma.scene.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Scenes and only return the `id`
     * const sceneWithIdOnly = await prisma.scene.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SceneCreateManyAndReturnArgs>(args?: SelectSubset<T, SceneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Scene.
     * @param {SceneDeleteArgs} args - Arguments to delete one Scene.
     * @example
     * // Delete one Scene
     * const Scene = await prisma.scene.delete({
     *   where: {
     *     // ... filter to delete one Scene
     *   }
     * })
     * 
     */
    delete<T extends SceneDeleteArgs>(args: SelectSubset<T, SceneDeleteArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Scene.
     * @param {SceneUpdateArgs} args - Arguments to update one Scene.
     * @example
     * // Update one Scene
     * const scene = await prisma.scene.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SceneUpdateArgs>(args: SelectSubset<T, SceneUpdateArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Scenes.
     * @param {SceneDeleteManyArgs} args - Arguments to filter Scenes to delete.
     * @example
     * // Delete a few Scenes
     * const { count } = await prisma.scene.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SceneDeleteManyArgs>(args?: SelectSubset<T, SceneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Scenes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Scenes
     * const scene = await prisma.scene.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SceneUpdateManyArgs>(args: SelectSubset<T, SceneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Scenes and returns the data updated in the database.
     * @param {SceneUpdateManyAndReturnArgs} args - Arguments to update many Scenes.
     * @example
     * // Update many Scenes
     * const scene = await prisma.scene.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Scenes and only return the `id`
     * const sceneWithIdOnly = await prisma.scene.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SceneUpdateManyAndReturnArgs>(args: SelectSubset<T, SceneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Scene.
     * @param {SceneUpsertArgs} args - Arguments to update or create a Scene.
     * @example
     * // Update or create a Scene
     * const scene = await prisma.scene.upsert({
     *   create: {
     *     // ... data to create a Scene
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Scene we want to update
     *   }
     * })
     */
    upsert<T extends SceneUpsertArgs>(args: SelectSubset<T, SceneUpsertArgs<ExtArgs>>): Prisma__SceneClient<$Result.GetResult<Prisma.$ScenePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Scenes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneCountArgs} args - Arguments to filter Scenes to count.
     * @example
     * // Count the number of Scenes
     * const count = await prisma.scene.count({
     *   where: {
     *     // ... the filter for the Scenes we want to count
     *   }
     * })
    **/
    count<T extends SceneCountArgs>(
      args?: Subset<T, SceneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SceneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Scene.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SceneAggregateArgs>(args: Subset<T, SceneAggregateArgs>): Prisma.PrismaPromise<GetSceneAggregateType<T>>

    /**
     * Group by Scene.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SceneGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SceneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SceneGroupByArgs['orderBy'] }
        : { orderBy?: SceneGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SceneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSceneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Scene model
   */
  readonly fields: SceneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Scene.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SceneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    script<T extends ScriptDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ScriptDefaultArgs<ExtArgs>>): Prisma__ScriptClient<$Result.GetResult<Prisma.$ScriptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Scene model
   */
  interface SceneFieldRefs {
    readonly id: FieldRef<"Scene", 'String'>
    readonly sceneNumber: FieldRef<"Scene", 'Int'>
    readonly heading: FieldRef<"Scene", 'String'>
    readonly pageStart: FieldRef<"Scene", 'Int'>
    readonly scriptId: FieldRef<"Scene", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Scene findUnique
   */
  export type SceneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scene to fetch.
     */
    where: SceneWhereUniqueInput
  }

  /**
   * Scene findUniqueOrThrow
   */
  export type SceneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scene to fetch.
     */
    where: SceneWhereUniqueInput
  }

  /**
   * Scene findFirst
   */
  export type SceneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scene to fetch.
     */
    where?: SceneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scenes to fetch.
     */
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scenes.
     */
    cursor?: SceneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scenes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scenes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scenes.
     */
    distinct?: SceneScalarFieldEnum | SceneScalarFieldEnum[]
  }

  /**
   * Scene findFirstOrThrow
   */
  export type SceneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scene to fetch.
     */
    where?: SceneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scenes to fetch.
     */
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scenes.
     */
    cursor?: SceneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scenes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scenes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scenes.
     */
    distinct?: SceneScalarFieldEnum | SceneScalarFieldEnum[]
  }

  /**
   * Scene findMany
   */
  export type SceneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter, which Scenes to fetch.
     */
    where?: SceneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scenes to fetch.
     */
    orderBy?: SceneOrderByWithRelationInput | SceneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Scenes.
     */
    cursor?: SceneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scenes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scenes.
     */
    skip?: number
    distinct?: SceneScalarFieldEnum | SceneScalarFieldEnum[]
  }

  /**
   * Scene create
   */
  export type SceneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * The data needed to create a Scene.
     */
    data: XOR<SceneCreateInput, SceneUncheckedCreateInput>
  }

  /**
   * Scene createMany
   */
  export type SceneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Scenes.
     */
    data: SceneCreateManyInput | SceneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Scene createManyAndReturn
   */
  export type SceneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * The data used to create many Scenes.
     */
    data: SceneCreateManyInput | SceneCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Scene update
   */
  export type SceneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * The data needed to update a Scene.
     */
    data: XOR<SceneUpdateInput, SceneUncheckedUpdateInput>
    /**
     * Choose, which Scene to update.
     */
    where: SceneWhereUniqueInput
  }

  /**
   * Scene updateMany
   */
  export type SceneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Scenes.
     */
    data: XOR<SceneUpdateManyMutationInput, SceneUncheckedUpdateManyInput>
    /**
     * Filter which Scenes to update
     */
    where?: SceneWhereInput
    /**
     * Limit how many Scenes to update.
     */
    limit?: number
  }

  /**
   * Scene updateManyAndReturn
   */
  export type SceneUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * The data used to update Scenes.
     */
    data: XOR<SceneUpdateManyMutationInput, SceneUncheckedUpdateManyInput>
    /**
     * Filter which Scenes to update
     */
    where?: SceneWhereInput
    /**
     * Limit how many Scenes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Scene upsert
   */
  export type SceneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * The filter to search for the Scene to update in case it exists.
     */
    where: SceneWhereUniqueInput
    /**
     * In case the Scene found by the `where` argument doesn't exist, create a new Scene with this data.
     */
    create: XOR<SceneCreateInput, SceneUncheckedCreateInput>
    /**
     * In case the Scene was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SceneUpdateInput, SceneUncheckedUpdateInput>
  }

  /**
   * Scene delete
   */
  export type SceneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
    /**
     * Filter which Scene to delete.
     */
    where: SceneWhereUniqueInput
  }

  /**
   * Scene deleteMany
   */
  export type SceneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Scenes to delete
     */
    where?: SceneWhereInput
    /**
     * Limit how many Scenes to delete.
     */
    limit?: number
  }

  /**
   * Scene without action
   */
  export type SceneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scene
     */
    select?: SceneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scene
     */
    omit?: SceneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SceneInclude<ExtArgs> | null
  }


  /**
   * Model DesignCategory
   */

  export type AggregateDesignCategory = {
    _count: DesignCategoryCountAggregateOutputType | null
    _min: DesignCategoryMinAggregateOutputType | null
    _max: DesignCategoryMaxAggregateOutputType | null
  }

  export type DesignCategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: string | null
    projectId: string | null
  }

  export type DesignCategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: string | null
    projectId: string | null
  }

  export type DesignCategoryCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    ownerId: number
    projectId: number
    _all: number
  }


  export type DesignCategoryMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    projectId?: true
  }

  export type DesignCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    projectId?: true
  }

  export type DesignCategoryCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    projectId?: true
    _all?: true
  }

  export type DesignCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DesignCategory to aggregate.
     */
    where?: DesignCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignCategories to fetch.
     */
    orderBy?: DesignCategoryOrderByWithRelationInput | DesignCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DesignCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DesignCategories
    **/
    _count?: true | DesignCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DesignCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DesignCategoryMaxAggregateInputType
  }

  export type GetDesignCategoryAggregateType<T extends DesignCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateDesignCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDesignCategory[P]>
      : GetScalarType<T[P], AggregateDesignCategory[P]>
  }




  export type DesignCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DesignCategoryWhereInput
    orderBy?: DesignCategoryOrderByWithAggregationInput | DesignCategoryOrderByWithAggregationInput[]
    by: DesignCategoryScalarFieldEnum[] | DesignCategoryScalarFieldEnum
    having?: DesignCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DesignCategoryCountAggregateInputType | true
    _min?: DesignCategoryMinAggregateInputType
    _max?: DesignCategoryMaxAggregateInputType
  }

  export type DesignCategoryGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    ownerId: string
    projectId: string
    _count: DesignCategoryCountAggregateOutputType | null
    _min: DesignCategoryMinAggregateOutputType | null
    _max: DesignCategoryMaxAggregateOutputType | null
  }

  type GetDesignCategoryGroupByPayload<T extends DesignCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DesignCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DesignCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DesignCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], DesignCategoryGroupByOutputType[P]>
        }
      >
    >


  export type DesignCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    projectId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    designs?: boolean | DesignCategory$designsArgs<ExtArgs>
    _count?: boolean | DesignCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["designCategory"]>

  export type DesignCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    projectId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["designCategory"]>

  export type DesignCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    projectId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["designCategory"]>

  export type DesignCategorySelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    projectId?: boolean
  }

  export type DesignCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt" | "ownerId" | "projectId", ExtArgs["result"]["designCategory"]>
  export type DesignCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    designs?: boolean | DesignCategory$designsArgs<ExtArgs>
    _count?: boolean | DesignCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DesignCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type DesignCategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $DesignCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DesignCategory"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs>
      designs: Prisma.$DesignSubClassPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
      ownerId: string
      projectId: string
    }, ExtArgs["result"]["designCategory"]>
    composites: {}
  }

  type DesignCategoryGetPayload<S extends boolean | null | undefined | DesignCategoryDefaultArgs> = $Result.GetResult<Prisma.$DesignCategoryPayload, S>

  type DesignCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DesignCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DesignCategoryCountAggregateInputType | true
    }

  export interface DesignCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DesignCategory'], meta: { name: 'DesignCategory' } }
    /**
     * Find zero or one DesignCategory that matches the filter.
     * @param {DesignCategoryFindUniqueArgs} args - Arguments to find a DesignCategory
     * @example
     * // Get one DesignCategory
     * const designCategory = await prisma.designCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DesignCategoryFindUniqueArgs>(args: SelectSubset<T, DesignCategoryFindUniqueArgs<ExtArgs>>): Prisma__DesignCategoryClient<$Result.GetResult<Prisma.$DesignCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DesignCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DesignCategoryFindUniqueOrThrowArgs} args - Arguments to find a DesignCategory
     * @example
     * // Get one DesignCategory
     * const designCategory = await prisma.designCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DesignCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, DesignCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DesignCategoryClient<$Result.GetResult<Prisma.$DesignCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DesignCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignCategoryFindFirstArgs} args - Arguments to find a DesignCategory
     * @example
     * // Get one DesignCategory
     * const designCategory = await prisma.designCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DesignCategoryFindFirstArgs>(args?: SelectSubset<T, DesignCategoryFindFirstArgs<ExtArgs>>): Prisma__DesignCategoryClient<$Result.GetResult<Prisma.$DesignCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DesignCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignCategoryFindFirstOrThrowArgs} args - Arguments to find a DesignCategory
     * @example
     * // Get one DesignCategory
     * const designCategory = await prisma.designCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DesignCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, DesignCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__DesignCategoryClient<$Result.GetResult<Prisma.$DesignCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DesignCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DesignCategories
     * const designCategories = await prisma.designCategory.findMany()
     * 
     * // Get first 10 DesignCategories
     * const designCategories = await prisma.designCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const designCategoryWithIdOnly = await prisma.designCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DesignCategoryFindManyArgs>(args?: SelectSubset<T, DesignCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DesignCategory.
     * @param {DesignCategoryCreateArgs} args - Arguments to create a DesignCategory.
     * @example
     * // Create one DesignCategory
     * const DesignCategory = await prisma.designCategory.create({
     *   data: {
     *     // ... data to create a DesignCategory
     *   }
     * })
     * 
     */
    create<T extends DesignCategoryCreateArgs>(args: SelectSubset<T, DesignCategoryCreateArgs<ExtArgs>>): Prisma__DesignCategoryClient<$Result.GetResult<Prisma.$DesignCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DesignCategories.
     * @param {DesignCategoryCreateManyArgs} args - Arguments to create many DesignCategories.
     * @example
     * // Create many DesignCategories
     * const designCategory = await prisma.designCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DesignCategoryCreateManyArgs>(args?: SelectSubset<T, DesignCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DesignCategories and returns the data saved in the database.
     * @param {DesignCategoryCreateManyAndReturnArgs} args - Arguments to create many DesignCategories.
     * @example
     * // Create many DesignCategories
     * const designCategory = await prisma.designCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DesignCategories and only return the `id`
     * const designCategoryWithIdOnly = await prisma.designCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DesignCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, DesignCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DesignCategory.
     * @param {DesignCategoryDeleteArgs} args - Arguments to delete one DesignCategory.
     * @example
     * // Delete one DesignCategory
     * const DesignCategory = await prisma.designCategory.delete({
     *   where: {
     *     // ... filter to delete one DesignCategory
     *   }
     * })
     * 
     */
    delete<T extends DesignCategoryDeleteArgs>(args: SelectSubset<T, DesignCategoryDeleteArgs<ExtArgs>>): Prisma__DesignCategoryClient<$Result.GetResult<Prisma.$DesignCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DesignCategory.
     * @param {DesignCategoryUpdateArgs} args - Arguments to update one DesignCategory.
     * @example
     * // Update one DesignCategory
     * const designCategory = await prisma.designCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DesignCategoryUpdateArgs>(args: SelectSubset<T, DesignCategoryUpdateArgs<ExtArgs>>): Prisma__DesignCategoryClient<$Result.GetResult<Prisma.$DesignCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DesignCategories.
     * @param {DesignCategoryDeleteManyArgs} args - Arguments to filter DesignCategories to delete.
     * @example
     * // Delete a few DesignCategories
     * const { count } = await prisma.designCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DesignCategoryDeleteManyArgs>(args?: SelectSubset<T, DesignCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DesignCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DesignCategories
     * const designCategory = await prisma.designCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DesignCategoryUpdateManyArgs>(args: SelectSubset<T, DesignCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DesignCategories and returns the data updated in the database.
     * @param {DesignCategoryUpdateManyAndReturnArgs} args - Arguments to update many DesignCategories.
     * @example
     * // Update many DesignCategories
     * const designCategory = await prisma.designCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DesignCategories and only return the `id`
     * const designCategoryWithIdOnly = await prisma.designCategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DesignCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, DesignCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DesignCategory.
     * @param {DesignCategoryUpsertArgs} args - Arguments to update or create a DesignCategory.
     * @example
     * // Update or create a DesignCategory
     * const designCategory = await prisma.designCategory.upsert({
     *   create: {
     *     // ... data to create a DesignCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DesignCategory we want to update
     *   }
     * })
     */
    upsert<T extends DesignCategoryUpsertArgs>(args: SelectSubset<T, DesignCategoryUpsertArgs<ExtArgs>>): Prisma__DesignCategoryClient<$Result.GetResult<Prisma.$DesignCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DesignCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignCategoryCountArgs} args - Arguments to filter DesignCategories to count.
     * @example
     * // Count the number of DesignCategories
     * const count = await prisma.designCategory.count({
     *   where: {
     *     // ... the filter for the DesignCategories we want to count
     *   }
     * })
    **/
    count<T extends DesignCategoryCountArgs>(
      args?: Subset<T, DesignCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DesignCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DesignCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DesignCategoryAggregateArgs>(args: Subset<T, DesignCategoryAggregateArgs>): Prisma.PrismaPromise<GetDesignCategoryAggregateType<T>>

    /**
     * Group by DesignCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DesignCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DesignCategoryGroupByArgs['orderBy'] }
        : { orderBy?: DesignCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DesignCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDesignCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DesignCategory model
   */
  readonly fields: DesignCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DesignCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DesignCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    designs<T extends DesignCategory$designsArgs<ExtArgs> = {}>(args?: Subset<T, DesignCategory$designsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignSubClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DesignCategory model
   */
  interface DesignCategoryFieldRefs {
    readonly id: FieldRef<"DesignCategory", 'String'>
    readonly name: FieldRef<"DesignCategory", 'String'>
    readonly createdAt: FieldRef<"DesignCategory", 'DateTime'>
    readonly updatedAt: FieldRef<"DesignCategory", 'DateTime'>
    readonly ownerId: FieldRef<"DesignCategory", 'String'>
    readonly projectId: FieldRef<"DesignCategory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DesignCategory findUnique
   */
  export type DesignCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignCategory
     */
    select?: DesignCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignCategory
     */
    omit?: DesignCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignCategoryInclude<ExtArgs> | null
    /**
     * Filter, which DesignCategory to fetch.
     */
    where: DesignCategoryWhereUniqueInput
  }

  /**
   * DesignCategory findUniqueOrThrow
   */
  export type DesignCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignCategory
     */
    select?: DesignCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignCategory
     */
    omit?: DesignCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignCategoryInclude<ExtArgs> | null
    /**
     * Filter, which DesignCategory to fetch.
     */
    where: DesignCategoryWhereUniqueInput
  }

  /**
   * DesignCategory findFirst
   */
  export type DesignCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignCategory
     */
    select?: DesignCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignCategory
     */
    omit?: DesignCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignCategoryInclude<ExtArgs> | null
    /**
     * Filter, which DesignCategory to fetch.
     */
    where?: DesignCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignCategories to fetch.
     */
    orderBy?: DesignCategoryOrderByWithRelationInput | DesignCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DesignCategories.
     */
    cursor?: DesignCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DesignCategories.
     */
    distinct?: DesignCategoryScalarFieldEnum | DesignCategoryScalarFieldEnum[]
  }

  /**
   * DesignCategory findFirstOrThrow
   */
  export type DesignCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignCategory
     */
    select?: DesignCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignCategory
     */
    omit?: DesignCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignCategoryInclude<ExtArgs> | null
    /**
     * Filter, which DesignCategory to fetch.
     */
    where?: DesignCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignCategories to fetch.
     */
    orderBy?: DesignCategoryOrderByWithRelationInput | DesignCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DesignCategories.
     */
    cursor?: DesignCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DesignCategories.
     */
    distinct?: DesignCategoryScalarFieldEnum | DesignCategoryScalarFieldEnum[]
  }

  /**
   * DesignCategory findMany
   */
  export type DesignCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignCategory
     */
    select?: DesignCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignCategory
     */
    omit?: DesignCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignCategoryInclude<ExtArgs> | null
    /**
     * Filter, which DesignCategories to fetch.
     */
    where?: DesignCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignCategories to fetch.
     */
    orderBy?: DesignCategoryOrderByWithRelationInput | DesignCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DesignCategories.
     */
    cursor?: DesignCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignCategories.
     */
    skip?: number
    distinct?: DesignCategoryScalarFieldEnum | DesignCategoryScalarFieldEnum[]
  }

  /**
   * DesignCategory create
   */
  export type DesignCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignCategory
     */
    select?: DesignCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignCategory
     */
    omit?: DesignCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a DesignCategory.
     */
    data: XOR<DesignCategoryCreateInput, DesignCategoryUncheckedCreateInput>
  }

  /**
   * DesignCategory createMany
   */
  export type DesignCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DesignCategories.
     */
    data: DesignCategoryCreateManyInput | DesignCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DesignCategory createManyAndReturn
   */
  export type DesignCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignCategory
     */
    select?: DesignCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DesignCategory
     */
    omit?: DesignCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many DesignCategories.
     */
    data: DesignCategoryCreateManyInput | DesignCategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignCategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DesignCategory update
   */
  export type DesignCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignCategory
     */
    select?: DesignCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignCategory
     */
    omit?: DesignCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a DesignCategory.
     */
    data: XOR<DesignCategoryUpdateInput, DesignCategoryUncheckedUpdateInput>
    /**
     * Choose, which DesignCategory to update.
     */
    where: DesignCategoryWhereUniqueInput
  }

  /**
   * DesignCategory updateMany
   */
  export type DesignCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DesignCategories.
     */
    data: XOR<DesignCategoryUpdateManyMutationInput, DesignCategoryUncheckedUpdateManyInput>
    /**
     * Filter which DesignCategories to update
     */
    where?: DesignCategoryWhereInput
    /**
     * Limit how many DesignCategories to update.
     */
    limit?: number
  }

  /**
   * DesignCategory updateManyAndReturn
   */
  export type DesignCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignCategory
     */
    select?: DesignCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DesignCategory
     */
    omit?: DesignCategoryOmit<ExtArgs> | null
    /**
     * The data used to update DesignCategories.
     */
    data: XOR<DesignCategoryUpdateManyMutationInput, DesignCategoryUncheckedUpdateManyInput>
    /**
     * Filter which DesignCategories to update
     */
    where?: DesignCategoryWhereInput
    /**
     * Limit how many DesignCategories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignCategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DesignCategory upsert
   */
  export type DesignCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignCategory
     */
    select?: DesignCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignCategory
     */
    omit?: DesignCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the DesignCategory to update in case it exists.
     */
    where: DesignCategoryWhereUniqueInput
    /**
     * In case the DesignCategory found by the `where` argument doesn't exist, create a new DesignCategory with this data.
     */
    create: XOR<DesignCategoryCreateInput, DesignCategoryUncheckedCreateInput>
    /**
     * In case the DesignCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DesignCategoryUpdateInput, DesignCategoryUncheckedUpdateInput>
  }

  /**
   * DesignCategory delete
   */
  export type DesignCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignCategory
     */
    select?: DesignCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignCategory
     */
    omit?: DesignCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignCategoryInclude<ExtArgs> | null
    /**
     * Filter which DesignCategory to delete.
     */
    where: DesignCategoryWhereUniqueInput
  }

  /**
   * DesignCategory deleteMany
   */
  export type DesignCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DesignCategories to delete
     */
    where?: DesignCategoryWhereInput
    /**
     * Limit how many DesignCategories to delete.
     */
    limit?: number
  }

  /**
   * DesignCategory.designs
   */
  export type DesignCategory$designsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClass
     */
    select?: DesignSubClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClass
     */
    omit?: DesignSubClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassInclude<ExtArgs> | null
    where?: DesignSubClassWhereInput
    orderBy?: DesignSubClassOrderByWithRelationInput | DesignSubClassOrderByWithRelationInput[]
    cursor?: DesignSubClassWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DesignSubClassScalarFieldEnum | DesignSubClassScalarFieldEnum[]
  }

  /**
   * DesignCategory without action
   */
  export type DesignCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignCategory
     */
    select?: DesignCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignCategory
     */
    omit?: DesignCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignCategoryInclude<ExtArgs> | null
  }


  /**
   * Model DesignSubClass
   */

  export type AggregateDesignSubClass = {
    _count: DesignSubClassCountAggregateOutputType | null
    _min: DesignSubClassMinAggregateOutputType | null
    _max: DesignSubClassMaxAggregateOutputType | null
  }

  export type DesignSubClassMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: string | null
    categoryId: string | null
  }

  export type DesignSubClassMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: string | null
    categoryId: string | null
  }

  export type DesignSubClassCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    ownerId: number
    categoryId: number
    _all: number
  }


  export type DesignSubClassMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    categoryId?: true
  }

  export type DesignSubClassMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    categoryId?: true
  }

  export type DesignSubClassCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    categoryId?: true
    _all?: true
  }

  export type DesignSubClassAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DesignSubClass to aggregate.
     */
    where?: DesignSubClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignSubClasses to fetch.
     */
    orderBy?: DesignSubClassOrderByWithRelationInput | DesignSubClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DesignSubClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignSubClasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignSubClasses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DesignSubClasses
    **/
    _count?: true | DesignSubClassCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DesignSubClassMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DesignSubClassMaxAggregateInputType
  }

  export type GetDesignSubClassAggregateType<T extends DesignSubClassAggregateArgs> = {
        [P in keyof T & keyof AggregateDesignSubClass]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDesignSubClass[P]>
      : GetScalarType<T[P], AggregateDesignSubClass[P]>
  }




  export type DesignSubClassGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DesignSubClassWhereInput
    orderBy?: DesignSubClassOrderByWithAggregationInput | DesignSubClassOrderByWithAggregationInput[]
    by: DesignSubClassScalarFieldEnum[] | DesignSubClassScalarFieldEnum
    having?: DesignSubClassScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DesignSubClassCountAggregateInputType | true
    _min?: DesignSubClassMinAggregateInputType
    _max?: DesignSubClassMaxAggregateInputType
  }

  export type DesignSubClassGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    ownerId: string
    categoryId: string | null
    _count: DesignSubClassCountAggregateOutputType | null
    _min: DesignSubClassMinAggregateOutputType | null
    _max: DesignSubClassMaxAggregateOutputType | null
  }

  type GetDesignSubClassGroupByPayload<T extends DesignSubClassGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DesignSubClassGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DesignSubClassGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DesignSubClassGroupByOutputType[P]>
            : GetScalarType<T[P], DesignSubClassGroupByOutputType[P]>
        }
      >
    >


  export type DesignSubClassSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    categoryId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | DesignSubClass$categoryArgs<ExtArgs>
    versions?: boolean | DesignSubClass$versionsArgs<ExtArgs>
    _count?: boolean | DesignSubClassCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["designSubClass"]>

  export type DesignSubClassSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    categoryId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | DesignSubClass$categoryArgs<ExtArgs>
  }, ExtArgs["result"]["designSubClass"]>

  export type DesignSubClassSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    categoryId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | DesignSubClass$categoryArgs<ExtArgs>
  }, ExtArgs["result"]["designSubClass"]>

  export type DesignSubClassSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    categoryId?: boolean
  }

  export type DesignSubClassOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt" | "ownerId" | "categoryId", ExtArgs["result"]["designSubClass"]>
  export type DesignSubClassInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | DesignSubClass$categoryArgs<ExtArgs>
    versions?: boolean | DesignSubClass$versionsArgs<ExtArgs>
    _count?: boolean | DesignSubClassCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DesignSubClassIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | DesignSubClass$categoryArgs<ExtArgs>
  }
  export type DesignSubClassIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | DesignSubClass$categoryArgs<ExtArgs>
  }

  export type $DesignSubClassPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DesignSubClass"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      category: Prisma.$DesignCategoryPayload<ExtArgs> | null
      versions: Prisma.$DesignSubClassVersionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
      ownerId: string
      categoryId: string | null
    }, ExtArgs["result"]["designSubClass"]>
    composites: {}
  }

  type DesignSubClassGetPayload<S extends boolean | null | undefined | DesignSubClassDefaultArgs> = $Result.GetResult<Prisma.$DesignSubClassPayload, S>

  type DesignSubClassCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DesignSubClassFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DesignSubClassCountAggregateInputType | true
    }

  export interface DesignSubClassDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DesignSubClass'], meta: { name: 'DesignSubClass' } }
    /**
     * Find zero or one DesignSubClass that matches the filter.
     * @param {DesignSubClassFindUniqueArgs} args - Arguments to find a DesignSubClass
     * @example
     * // Get one DesignSubClass
     * const designSubClass = await prisma.designSubClass.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DesignSubClassFindUniqueArgs>(args: SelectSubset<T, DesignSubClassFindUniqueArgs<ExtArgs>>): Prisma__DesignSubClassClient<$Result.GetResult<Prisma.$DesignSubClassPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DesignSubClass that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DesignSubClassFindUniqueOrThrowArgs} args - Arguments to find a DesignSubClass
     * @example
     * // Get one DesignSubClass
     * const designSubClass = await prisma.designSubClass.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DesignSubClassFindUniqueOrThrowArgs>(args: SelectSubset<T, DesignSubClassFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DesignSubClassClient<$Result.GetResult<Prisma.$DesignSubClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DesignSubClass that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSubClassFindFirstArgs} args - Arguments to find a DesignSubClass
     * @example
     * // Get one DesignSubClass
     * const designSubClass = await prisma.designSubClass.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DesignSubClassFindFirstArgs>(args?: SelectSubset<T, DesignSubClassFindFirstArgs<ExtArgs>>): Prisma__DesignSubClassClient<$Result.GetResult<Prisma.$DesignSubClassPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DesignSubClass that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSubClassFindFirstOrThrowArgs} args - Arguments to find a DesignSubClass
     * @example
     * // Get one DesignSubClass
     * const designSubClass = await prisma.designSubClass.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DesignSubClassFindFirstOrThrowArgs>(args?: SelectSubset<T, DesignSubClassFindFirstOrThrowArgs<ExtArgs>>): Prisma__DesignSubClassClient<$Result.GetResult<Prisma.$DesignSubClassPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DesignSubClasses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSubClassFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DesignSubClasses
     * const designSubClasses = await prisma.designSubClass.findMany()
     * 
     * // Get first 10 DesignSubClasses
     * const designSubClasses = await prisma.designSubClass.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const designSubClassWithIdOnly = await prisma.designSubClass.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DesignSubClassFindManyArgs>(args?: SelectSubset<T, DesignSubClassFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignSubClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DesignSubClass.
     * @param {DesignSubClassCreateArgs} args - Arguments to create a DesignSubClass.
     * @example
     * // Create one DesignSubClass
     * const DesignSubClass = await prisma.designSubClass.create({
     *   data: {
     *     // ... data to create a DesignSubClass
     *   }
     * })
     * 
     */
    create<T extends DesignSubClassCreateArgs>(args: SelectSubset<T, DesignSubClassCreateArgs<ExtArgs>>): Prisma__DesignSubClassClient<$Result.GetResult<Prisma.$DesignSubClassPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DesignSubClasses.
     * @param {DesignSubClassCreateManyArgs} args - Arguments to create many DesignSubClasses.
     * @example
     * // Create many DesignSubClasses
     * const designSubClass = await prisma.designSubClass.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DesignSubClassCreateManyArgs>(args?: SelectSubset<T, DesignSubClassCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DesignSubClasses and returns the data saved in the database.
     * @param {DesignSubClassCreateManyAndReturnArgs} args - Arguments to create many DesignSubClasses.
     * @example
     * // Create many DesignSubClasses
     * const designSubClass = await prisma.designSubClass.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DesignSubClasses and only return the `id`
     * const designSubClassWithIdOnly = await prisma.designSubClass.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DesignSubClassCreateManyAndReturnArgs>(args?: SelectSubset<T, DesignSubClassCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignSubClassPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DesignSubClass.
     * @param {DesignSubClassDeleteArgs} args - Arguments to delete one DesignSubClass.
     * @example
     * // Delete one DesignSubClass
     * const DesignSubClass = await prisma.designSubClass.delete({
     *   where: {
     *     // ... filter to delete one DesignSubClass
     *   }
     * })
     * 
     */
    delete<T extends DesignSubClassDeleteArgs>(args: SelectSubset<T, DesignSubClassDeleteArgs<ExtArgs>>): Prisma__DesignSubClassClient<$Result.GetResult<Prisma.$DesignSubClassPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DesignSubClass.
     * @param {DesignSubClassUpdateArgs} args - Arguments to update one DesignSubClass.
     * @example
     * // Update one DesignSubClass
     * const designSubClass = await prisma.designSubClass.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DesignSubClassUpdateArgs>(args: SelectSubset<T, DesignSubClassUpdateArgs<ExtArgs>>): Prisma__DesignSubClassClient<$Result.GetResult<Prisma.$DesignSubClassPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DesignSubClasses.
     * @param {DesignSubClassDeleteManyArgs} args - Arguments to filter DesignSubClasses to delete.
     * @example
     * // Delete a few DesignSubClasses
     * const { count } = await prisma.designSubClass.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DesignSubClassDeleteManyArgs>(args?: SelectSubset<T, DesignSubClassDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DesignSubClasses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSubClassUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DesignSubClasses
     * const designSubClass = await prisma.designSubClass.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DesignSubClassUpdateManyArgs>(args: SelectSubset<T, DesignSubClassUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DesignSubClasses and returns the data updated in the database.
     * @param {DesignSubClassUpdateManyAndReturnArgs} args - Arguments to update many DesignSubClasses.
     * @example
     * // Update many DesignSubClasses
     * const designSubClass = await prisma.designSubClass.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DesignSubClasses and only return the `id`
     * const designSubClassWithIdOnly = await prisma.designSubClass.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DesignSubClassUpdateManyAndReturnArgs>(args: SelectSubset<T, DesignSubClassUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignSubClassPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DesignSubClass.
     * @param {DesignSubClassUpsertArgs} args - Arguments to update or create a DesignSubClass.
     * @example
     * // Update or create a DesignSubClass
     * const designSubClass = await prisma.designSubClass.upsert({
     *   create: {
     *     // ... data to create a DesignSubClass
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DesignSubClass we want to update
     *   }
     * })
     */
    upsert<T extends DesignSubClassUpsertArgs>(args: SelectSubset<T, DesignSubClassUpsertArgs<ExtArgs>>): Prisma__DesignSubClassClient<$Result.GetResult<Prisma.$DesignSubClassPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DesignSubClasses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSubClassCountArgs} args - Arguments to filter DesignSubClasses to count.
     * @example
     * // Count the number of DesignSubClasses
     * const count = await prisma.designSubClass.count({
     *   where: {
     *     // ... the filter for the DesignSubClasses we want to count
     *   }
     * })
    **/
    count<T extends DesignSubClassCountArgs>(
      args?: Subset<T, DesignSubClassCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DesignSubClassCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DesignSubClass.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSubClassAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DesignSubClassAggregateArgs>(args: Subset<T, DesignSubClassAggregateArgs>): Prisma.PrismaPromise<GetDesignSubClassAggregateType<T>>

    /**
     * Group by DesignSubClass.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSubClassGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DesignSubClassGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DesignSubClassGroupByArgs['orderBy'] }
        : { orderBy?: DesignSubClassGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DesignSubClassGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDesignSubClassGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DesignSubClass model
   */
  readonly fields: DesignSubClassFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DesignSubClass.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DesignSubClassClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends DesignSubClass$categoryArgs<ExtArgs> = {}>(args?: Subset<T, DesignSubClass$categoryArgs<ExtArgs>>): Prisma__DesignCategoryClient<$Result.GetResult<Prisma.$DesignCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    versions<T extends DesignSubClass$versionsArgs<ExtArgs> = {}>(args?: Subset<T, DesignSubClass$versionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignSubClassVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DesignSubClass model
   */
  interface DesignSubClassFieldRefs {
    readonly id: FieldRef<"DesignSubClass", 'String'>
    readonly name: FieldRef<"DesignSubClass", 'String'>
    readonly createdAt: FieldRef<"DesignSubClass", 'DateTime'>
    readonly updatedAt: FieldRef<"DesignSubClass", 'DateTime'>
    readonly ownerId: FieldRef<"DesignSubClass", 'String'>
    readonly categoryId: FieldRef<"DesignSubClass", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DesignSubClass findUnique
   */
  export type DesignSubClassFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClass
     */
    select?: DesignSubClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClass
     */
    omit?: DesignSubClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassInclude<ExtArgs> | null
    /**
     * Filter, which DesignSubClass to fetch.
     */
    where: DesignSubClassWhereUniqueInput
  }

  /**
   * DesignSubClass findUniqueOrThrow
   */
  export type DesignSubClassFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClass
     */
    select?: DesignSubClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClass
     */
    omit?: DesignSubClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassInclude<ExtArgs> | null
    /**
     * Filter, which DesignSubClass to fetch.
     */
    where: DesignSubClassWhereUniqueInput
  }

  /**
   * DesignSubClass findFirst
   */
  export type DesignSubClassFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClass
     */
    select?: DesignSubClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClass
     */
    omit?: DesignSubClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassInclude<ExtArgs> | null
    /**
     * Filter, which DesignSubClass to fetch.
     */
    where?: DesignSubClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignSubClasses to fetch.
     */
    orderBy?: DesignSubClassOrderByWithRelationInput | DesignSubClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DesignSubClasses.
     */
    cursor?: DesignSubClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignSubClasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignSubClasses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DesignSubClasses.
     */
    distinct?: DesignSubClassScalarFieldEnum | DesignSubClassScalarFieldEnum[]
  }

  /**
   * DesignSubClass findFirstOrThrow
   */
  export type DesignSubClassFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClass
     */
    select?: DesignSubClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClass
     */
    omit?: DesignSubClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassInclude<ExtArgs> | null
    /**
     * Filter, which DesignSubClass to fetch.
     */
    where?: DesignSubClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignSubClasses to fetch.
     */
    orderBy?: DesignSubClassOrderByWithRelationInput | DesignSubClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DesignSubClasses.
     */
    cursor?: DesignSubClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignSubClasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignSubClasses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DesignSubClasses.
     */
    distinct?: DesignSubClassScalarFieldEnum | DesignSubClassScalarFieldEnum[]
  }

  /**
   * DesignSubClass findMany
   */
  export type DesignSubClassFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClass
     */
    select?: DesignSubClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClass
     */
    omit?: DesignSubClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassInclude<ExtArgs> | null
    /**
     * Filter, which DesignSubClasses to fetch.
     */
    where?: DesignSubClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignSubClasses to fetch.
     */
    orderBy?: DesignSubClassOrderByWithRelationInput | DesignSubClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DesignSubClasses.
     */
    cursor?: DesignSubClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignSubClasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignSubClasses.
     */
    skip?: number
    distinct?: DesignSubClassScalarFieldEnum | DesignSubClassScalarFieldEnum[]
  }

  /**
   * DesignSubClass create
   */
  export type DesignSubClassCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClass
     */
    select?: DesignSubClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClass
     */
    omit?: DesignSubClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassInclude<ExtArgs> | null
    /**
     * The data needed to create a DesignSubClass.
     */
    data: XOR<DesignSubClassCreateInput, DesignSubClassUncheckedCreateInput>
  }

  /**
   * DesignSubClass createMany
   */
  export type DesignSubClassCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DesignSubClasses.
     */
    data: DesignSubClassCreateManyInput | DesignSubClassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DesignSubClass createManyAndReturn
   */
  export type DesignSubClassCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClass
     */
    select?: DesignSubClassSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClass
     */
    omit?: DesignSubClassOmit<ExtArgs> | null
    /**
     * The data used to create many DesignSubClasses.
     */
    data: DesignSubClassCreateManyInput | DesignSubClassCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DesignSubClass update
   */
  export type DesignSubClassUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClass
     */
    select?: DesignSubClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClass
     */
    omit?: DesignSubClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassInclude<ExtArgs> | null
    /**
     * The data needed to update a DesignSubClass.
     */
    data: XOR<DesignSubClassUpdateInput, DesignSubClassUncheckedUpdateInput>
    /**
     * Choose, which DesignSubClass to update.
     */
    where: DesignSubClassWhereUniqueInput
  }

  /**
   * DesignSubClass updateMany
   */
  export type DesignSubClassUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DesignSubClasses.
     */
    data: XOR<DesignSubClassUpdateManyMutationInput, DesignSubClassUncheckedUpdateManyInput>
    /**
     * Filter which DesignSubClasses to update
     */
    where?: DesignSubClassWhereInput
    /**
     * Limit how many DesignSubClasses to update.
     */
    limit?: number
  }

  /**
   * DesignSubClass updateManyAndReturn
   */
  export type DesignSubClassUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClass
     */
    select?: DesignSubClassSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClass
     */
    omit?: DesignSubClassOmit<ExtArgs> | null
    /**
     * The data used to update DesignSubClasses.
     */
    data: XOR<DesignSubClassUpdateManyMutationInput, DesignSubClassUncheckedUpdateManyInput>
    /**
     * Filter which DesignSubClasses to update
     */
    where?: DesignSubClassWhereInput
    /**
     * Limit how many DesignSubClasses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DesignSubClass upsert
   */
  export type DesignSubClassUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClass
     */
    select?: DesignSubClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClass
     */
    omit?: DesignSubClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassInclude<ExtArgs> | null
    /**
     * The filter to search for the DesignSubClass to update in case it exists.
     */
    where: DesignSubClassWhereUniqueInput
    /**
     * In case the DesignSubClass found by the `where` argument doesn't exist, create a new DesignSubClass with this data.
     */
    create: XOR<DesignSubClassCreateInput, DesignSubClassUncheckedCreateInput>
    /**
     * In case the DesignSubClass was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DesignSubClassUpdateInput, DesignSubClassUncheckedUpdateInput>
  }

  /**
   * DesignSubClass delete
   */
  export type DesignSubClassDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClass
     */
    select?: DesignSubClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClass
     */
    omit?: DesignSubClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassInclude<ExtArgs> | null
    /**
     * Filter which DesignSubClass to delete.
     */
    where: DesignSubClassWhereUniqueInput
  }

  /**
   * DesignSubClass deleteMany
   */
  export type DesignSubClassDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DesignSubClasses to delete
     */
    where?: DesignSubClassWhereInput
    /**
     * Limit how many DesignSubClasses to delete.
     */
    limit?: number
  }

  /**
   * DesignSubClass.category
   */
  export type DesignSubClass$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignCategory
     */
    select?: DesignCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignCategory
     */
    omit?: DesignCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignCategoryInclude<ExtArgs> | null
    where?: DesignCategoryWhereInput
  }

  /**
   * DesignSubClass.versions
   */
  export type DesignSubClass$versionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClassVersion
     */
    select?: DesignSubClassVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClassVersion
     */
    omit?: DesignSubClassVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassVersionInclude<ExtArgs> | null
    where?: DesignSubClassVersionWhereInput
    orderBy?: DesignSubClassVersionOrderByWithRelationInput | DesignSubClassVersionOrderByWithRelationInput[]
    cursor?: DesignSubClassVersionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DesignSubClassVersionScalarFieldEnum | DesignSubClassVersionScalarFieldEnum[]
  }

  /**
   * DesignSubClass without action
   */
  export type DesignSubClassDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClass
     */
    select?: DesignSubClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClass
     */
    omit?: DesignSubClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassInclude<ExtArgs> | null
  }


  /**
   * Model DesignSubClassVersion
   */

  export type AggregateDesignSubClassVersion = {
    _count: DesignSubClassVersionCountAggregateOutputType | null
    _min: DesignSubClassVersionMinAggregateOutputType | null
    _max: DesignSubClassVersionMaxAggregateOutputType | null
  }

  export type DesignSubClassVersionMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: string | null
    DesignSubClassId: string | null
  }

  export type DesignSubClassVersionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: string | null
    DesignSubClassId: string | null
  }

  export type DesignSubClassVersionCountAggregateOutputType = {
    id: number
    name: number
    content: number
    createdAt: number
    updatedAt: number
    ownerId: number
    DesignSubClassId: number
    _all: number
  }


  export type DesignSubClassVersionMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    DesignSubClassId?: true
  }

  export type DesignSubClassVersionMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    DesignSubClassId?: true
  }

  export type DesignSubClassVersionCountAggregateInputType = {
    id?: true
    name?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    DesignSubClassId?: true
    _all?: true
  }

  export type DesignSubClassVersionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DesignSubClassVersion to aggregate.
     */
    where?: DesignSubClassVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignSubClassVersions to fetch.
     */
    orderBy?: DesignSubClassVersionOrderByWithRelationInput | DesignSubClassVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DesignSubClassVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignSubClassVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignSubClassVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DesignSubClassVersions
    **/
    _count?: true | DesignSubClassVersionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DesignSubClassVersionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DesignSubClassVersionMaxAggregateInputType
  }

  export type GetDesignSubClassVersionAggregateType<T extends DesignSubClassVersionAggregateArgs> = {
        [P in keyof T & keyof AggregateDesignSubClassVersion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDesignSubClassVersion[P]>
      : GetScalarType<T[P], AggregateDesignSubClassVersion[P]>
  }




  export type DesignSubClassVersionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DesignSubClassVersionWhereInput
    orderBy?: DesignSubClassVersionOrderByWithAggregationInput | DesignSubClassVersionOrderByWithAggregationInput[]
    by: DesignSubClassVersionScalarFieldEnum[] | DesignSubClassVersionScalarFieldEnum
    having?: DesignSubClassVersionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DesignSubClassVersionCountAggregateInputType | true
    _min?: DesignSubClassVersionMinAggregateInputType
    _max?: DesignSubClassVersionMaxAggregateInputType
  }

  export type DesignSubClassVersionGroupByOutputType = {
    id: string
    name: string
    content: JsonValue
    createdAt: Date
    updatedAt: Date
    ownerId: string
    DesignSubClassId: string | null
    _count: DesignSubClassVersionCountAggregateOutputType | null
    _min: DesignSubClassVersionMinAggregateOutputType | null
    _max: DesignSubClassVersionMaxAggregateOutputType | null
  }

  type GetDesignSubClassVersionGroupByPayload<T extends DesignSubClassVersionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DesignSubClassVersionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DesignSubClassVersionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DesignSubClassVersionGroupByOutputType[P]>
            : GetScalarType<T[P], DesignSubClassVersionGroupByOutputType[P]>
        }
      >
    >


  export type DesignSubClassVersionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    DesignSubClassId?: boolean
    DesignSubClass?: boolean | DesignSubClassVersion$DesignSubClassArgs<ExtArgs>
  }, ExtArgs["result"]["designSubClassVersion"]>

  export type DesignSubClassVersionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    DesignSubClassId?: boolean
    DesignSubClass?: boolean | DesignSubClassVersion$DesignSubClassArgs<ExtArgs>
  }, ExtArgs["result"]["designSubClassVersion"]>

  export type DesignSubClassVersionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    DesignSubClassId?: boolean
    DesignSubClass?: boolean | DesignSubClassVersion$DesignSubClassArgs<ExtArgs>
  }, ExtArgs["result"]["designSubClassVersion"]>

  export type DesignSubClassVersionSelectScalar = {
    id?: boolean
    name?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    DesignSubClassId?: boolean
  }

  export type DesignSubClassVersionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "content" | "createdAt" | "updatedAt" | "ownerId" | "DesignSubClassId", ExtArgs["result"]["designSubClassVersion"]>
  export type DesignSubClassVersionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    DesignSubClass?: boolean | DesignSubClassVersion$DesignSubClassArgs<ExtArgs>
  }
  export type DesignSubClassVersionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    DesignSubClass?: boolean | DesignSubClassVersion$DesignSubClassArgs<ExtArgs>
  }
  export type DesignSubClassVersionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    DesignSubClass?: boolean | DesignSubClassVersion$DesignSubClassArgs<ExtArgs>
  }

  export type $DesignSubClassVersionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DesignSubClassVersion"
    objects: {
      DesignSubClass: Prisma.$DesignSubClassPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      content: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
      ownerId: string
      DesignSubClassId: string | null
    }, ExtArgs["result"]["designSubClassVersion"]>
    composites: {}
  }

  type DesignSubClassVersionGetPayload<S extends boolean | null | undefined | DesignSubClassVersionDefaultArgs> = $Result.GetResult<Prisma.$DesignSubClassVersionPayload, S>

  type DesignSubClassVersionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DesignSubClassVersionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DesignSubClassVersionCountAggregateInputType | true
    }

  export interface DesignSubClassVersionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DesignSubClassVersion'], meta: { name: 'DesignSubClassVersion' } }
    /**
     * Find zero or one DesignSubClassVersion that matches the filter.
     * @param {DesignSubClassVersionFindUniqueArgs} args - Arguments to find a DesignSubClassVersion
     * @example
     * // Get one DesignSubClassVersion
     * const designSubClassVersion = await prisma.designSubClassVersion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DesignSubClassVersionFindUniqueArgs>(args: SelectSubset<T, DesignSubClassVersionFindUniqueArgs<ExtArgs>>): Prisma__DesignSubClassVersionClient<$Result.GetResult<Prisma.$DesignSubClassVersionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DesignSubClassVersion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DesignSubClassVersionFindUniqueOrThrowArgs} args - Arguments to find a DesignSubClassVersion
     * @example
     * // Get one DesignSubClassVersion
     * const designSubClassVersion = await prisma.designSubClassVersion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DesignSubClassVersionFindUniqueOrThrowArgs>(args: SelectSubset<T, DesignSubClassVersionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DesignSubClassVersionClient<$Result.GetResult<Prisma.$DesignSubClassVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DesignSubClassVersion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSubClassVersionFindFirstArgs} args - Arguments to find a DesignSubClassVersion
     * @example
     * // Get one DesignSubClassVersion
     * const designSubClassVersion = await prisma.designSubClassVersion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DesignSubClassVersionFindFirstArgs>(args?: SelectSubset<T, DesignSubClassVersionFindFirstArgs<ExtArgs>>): Prisma__DesignSubClassVersionClient<$Result.GetResult<Prisma.$DesignSubClassVersionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DesignSubClassVersion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSubClassVersionFindFirstOrThrowArgs} args - Arguments to find a DesignSubClassVersion
     * @example
     * // Get one DesignSubClassVersion
     * const designSubClassVersion = await prisma.designSubClassVersion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DesignSubClassVersionFindFirstOrThrowArgs>(args?: SelectSubset<T, DesignSubClassVersionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DesignSubClassVersionClient<$Result.GetResult<Prisma.$DesignSubClassVersionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DesignSubClassVersions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSubClassVersionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DesignSubClassVersions
     * const designSubClassVersions = await prisma.designSubClassVersion.findMany()
     * 
     * // Get first 10 DesignSubClassVersions
     * const designSubClassVersions = await prisma.designSubClassVersion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const designSubClassVersionWithIdOnly = await prisma.designSubClassVersion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DesignSubClassVersionFindManyArgs>(args?: SelectSubset<T, DesignSubClassVersionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignSubClassVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DesignSubClassVersion.
     * @param {DesignSubClassVersionCreateArgs} args - Arguments to create a DesignSubClassVersion.
     * @example
     * // Create one DesignSubClassVersion
     * const DesignSubClassVersion = await prisma.designSubClassVersion.create({
     *   data: {
     *     // ... data to create a DesignSubClassVersion
     *   }
     * })
     * 
     */
    create<T extends DesignSubClassVersionCreateArgs>(args: SelectSubset<T, DesignSubClassVersionCreateArgs<ExtArgs>>): Prisma__DesignSubClassVersionClient<$Result.GetResult<Prisma.$DesignSubClassVersionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DesignSubClassVersions.
     * @param {DesignSubClassVersionCreateManyArgs} args - Arguments to create many DesignSubClassVersions.
     * @example
     * // Create many DesignSubClassVersions
     * const designSubClassVersion = await prisma.designSubClassVersion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DesignSubClassVersionCreateManyArgs>(args?: SelectSubset<T, DesignSubClassVersionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DesignSubClassVersions and returns the data saved in the database.
     * @param {DesignSubClassVersionCreateManyAndReturnArgs} args - Arguments to create many DesignSubClassVersions.
     * @example
     * // Create many DesignSubClassVersions
     * const designSubClassVersion = await prisma.designSubClassVersion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DesignSubClassVersions and only return the `id`
     * const designSubClassVersionWithIdOnly = await prisma.designSubClassVersion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DesignSubClassVersionCreateManyAndReturnArgs>(args?: SelectSubset<T, DesignSubClassVersionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignSubClassVersionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DesignSubClassVersion.
     * @param {DesignSubClassVersionDeleteArgs} args - Arguments to delete one DesignSubClassVersion.
     * @example
     * // Delete one DesignSubClassVersion
     * const DesignSubClassVersion = await prisma.designSubClassVersion.delete({
     *   where: {
     *     // ... filter to delete one DesignSubClassVersion
     *   }
     * })
     * 
     */
    delete<T extends DesignSubClassVersionDeleteArgs>(args: SelectSubset<T, DesignSubClassVersionDeleteArgs<ExtArgs>>): Prisma__DesignSubClassVersionClient<$Result.GetResult<Prisma.$DesignSubClassVersionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DesignSubClassVersion.
     * @param {DesignSubClassVersionUpdateArgs} args - Arguments to update one DesignSubClassVersion.
     * @example
     * // Update one DesignSubClassVersion
     * const designSubClassVersion = await prisma.designSubClassVersion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DesignSubClassVersionUpdateArgs>(args: SelectSubset<T, DesignSubClassVersionUpdateArgs<ExtArgs>>): Prisma__DesignSubClassVersionClient<$Result.GetResult<Prisma.$DesignSubClassVersionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DesignSubClassVersions.
     * @param {DesignSubClassVersionDeleteManyArgs} args - Arguments to filter DesignSubClassVersions to delete.
     * @example
     * // Delete a few DesignSubClassVersions
     * const { count } = await prisma.designSubClassVersion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DesignSubClassVersionDeleteManyArgs>(args?: SelectSubset<T, DesignSubClassVersionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DesignSubClassVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSubClassVersionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DesignSubClassVersions
     * const designSubClassVersion = await prisma.designSubClassVersion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DesignSubClassVersionUpdateManyArgs>(args: SelectSubset<T, DesignSubClassVersionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DesignSubClassVersions and returns the data updated in the database.
     * @param {DesignSubClassVersionUpdateManyAndReturnArgs} args - Arguments to update many DesignSubClassVersions.
     * @example
     * // Update many DesignSubClassVersions
     * const designSubClassVersion = await prisma.designSubClassVersion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DesignSubClassVersions and only return the `id`
     * const designSubClassVersionWithIdOnly = await prisma.designSubClassVersion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DesignSubClassVersionUpdateManyAndReturnArgs>(args: SelectSubset<T, DesignSubClassVersionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignSubClassVersionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DesignSubClassVersion.
     * @param {DesignSubClassVersionUpsertArgs} args - Arguments to update or create a DesignSubClassVersion.
     * @example
     * // Update or create a DesignSubClassVersion
     * const designSubClassVersion = await prisma.designSubClassVersion.upsert({
     *   create: {
     *     // ... data to create a DesignSubClassVersion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DesignSubClassVersion we want to update
     *   }
     * })
     */
    upsert<T extends DesignSubClassVersionUpsertArgs>(args: SelectSubset<T, DesignSubClassVersionUpsertArgs<ExtArgs>>): Prisma__DesignSubClassVersionClient<$Result.GetResult<Prisma.$DesignSubClassVersionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DesignSubClassVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSubClassVersionCountArgs} args - Arguments to filter DesignSubClassVersions to count.
     * @example
     * // Count the number of DesignSubClassVersions
     * const count = await prisma.designSubClassVersion.count({
     *   where: {
     *     // ... the filter for the DesignSubClassVersions we want to count
     *   }
     * })
    **/
    count<T extends DesignSubClassVersionCountArgs>(
      args?: Subset<T, DesignSubClassVersionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DesignSubClassVersionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DesignSubClassVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSubClassVersionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DesignSubClassVersionAggregateArgs>(args: Subset<T, DesignSubClassVersionAggregateArgs>): Prisma.PrismaPromise<GetDesignSubClassVersionAggregateType<T>>

    /**
     * Group by DesignSubClassVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSubClassVersionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DesignSubClassVersionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DesignSubClassVersionGroupByArgs['orderBy'] }
        : { orderBy?: DesignSubClassVersionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DesignSubClassVersionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDesignSubClassVersionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DesignSubClassVersion model
   */
  readonly fields: DesignSubClassVersionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DesignSubClassVersion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DesignSubClassVersionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    DesignSubClass<T extends DesignSubClassVersion$DesignSubClassArgs<ExtArgs> = {}>(args?: Subset<T, DesignSubClassVersion$DesignSubClassArgs<ExtArgs>>): Prisma__DesignSubClassClient<$Result.GetResult<Prisma.$DesignSubClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DesignSubClassVersion model
   */
  interface DesignSubClassVersionFieldRefs {
    readonly id: FieldRef<"DesignSubClassVersion", 'String'>
    readonly name: FieldRef<"DesignSubClassVersion", 'String'>
    readonly content: FieldRef<"DesignSubClassVersion", 'Json'>
    readonly createdAt: FieldRef<"DesignSubClassVersion", 'DateTime'>
    readonly updatedAt: FieldRef<"DesignSubClassVersion", 'DateTime'>
    readonly ownerId: FieldRef<"DesignSubClassVersion", 'String'>
    readonly DesignSubClassId: FieldRef<"DesignSubClassVersion", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DesignSubClassVersion findUnique
   */
  export type DesignSubClassVersionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClassVersion
     */
    select?: DesignSubClassVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClassVersion
     */
    omit?: DesignSubClassVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassVersionInclude<ExtArgs> | null
    /**
     * Filter, which DesignSubClassVersion to fetch.
     */
    where: DesignSubClassVersionWhereUniqueInput
  }

  /**
   * DesignSubClassVersion findUniqueOrThrow
   */
  export type DesignSubClassVersionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClassVersion
     */
    select?: DesignSubClassVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClassVersion
     */
    omit?: DesignSubClassVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassVersionInclude<ExtArgs> | null
    /**
     * Filter, which DesignSubClassVersion to fetch.
     */
    where: DesignSubClassVersionWhereUniqueInput
  }

  /**
   * DesignSubClassVersion findFirst
   */
  export type DesignSubClassVersionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClassVersion
     */
    select?: DesignSubClassVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClassVersion
     */
    omit?: DesignSubClassVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassVersionInclude<ExtArgs> | null
    /**
     * Filter, which DesignSubClassVersion to fetch.
     */
    where?: DesignSubClassVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignSubClassVersions to fetch.
     */
    orderBy?: DesignSubClassVersionOrderByWithRelationInput | DesignSubClassVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DesignSubClassVersions.
     */
    cursor?: DesignSubClassVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignSubClassVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignSubClassVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DesignSubClassVersions.
     */
    distinct?: DesignSubClassVersionScalarFieldEnum | DesignSubClassVersionScalarFieldEnum[]
  }

  /**
   * DesignSubClassVersion findFirstOrThrow
   */
  export type DesignSubClassVersionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClassVersion
     */
    select?: DesignSubClassVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClassVersion
     */
    omit?: DesignSubClassVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassVersionInclude<ExtArgs> | null
    /**
     * Filter, which DesignSubClassVersion to fetch.
     */
    where?: DesignSubClassVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignSubClassVersions to fetch.
     */
    orderBy?: DesignSubClassVersionOrderByWithRelationInput | DesignSubClassVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DesignSubClassVersions.
     */
    cursor?: DesignSubClassVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignSubClassVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignSubClassVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DesignSubClassVersions.
     */
    distinct?: DesignSubClassVersionScalarFieldEnum | DesignSubClassVersionScalarFieldEnum[]
  }

  /**
   * DesignSubClassVersion findMany
   */
  export type DesignSubClassVersionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClassVersion
     */
    select?: DesignSubClassVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClassVersion
     */
    omit?: DesignSubClassVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassVersionInclude<ExtArgs> | null
    /**
     * Filter, which DesignSubClassVersions to fetch.
     */
    where?: DesignSubClassVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignSubClassVersions to fetch.
     */
    orderBy?: DesignSubClassVersionOrderByWithRelationInput | DesignSubClassVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DesignSubClassVersions.
     */
    cursor?: DesignSubClassVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignSubClassVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignSubClassVersions.
     */
    skip?: number
    distinct?: DesignSubClassVersionScalarFieldEnum | DesignSubClassVersionScalarFieldEnum[]
  }

  /**
   * DesignSubClassVersion create
   */
  export type DesignSubClassVersionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClassVersion
     */
    select?: DesignSubClassVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClassVersion
     */
    omit?: DesignSubClassVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassVersionInclude<ExtArgs> | null
    /**
     * The data needed to create a DesignSubClassVersion.
     */
    data: XOR<DesignSubClassVersionCreateInput, DesignSubClassVersionUncheckedCreateInput>
  }

  /**
   * DesignSubClassVersion createMany
   */
  export type DesignSubClassVersionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DesignSubClassVersions.
     */
    data: DesignSubClassVersionCreateManyInput | DesignSubClassVersionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DesignSubClassVersion createManyAndReturn
   */
  export type DesignSubClassVersionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClassVersion
     */
    select?: DesignSubClassVersionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClassVersion
     */
    omit?: DesignSubClassVersionOmit<ExtArgs> | null
    /**
     * The data used to create many DesignSubClassVersions.
     */
    data: DesignSubClassVersionCreateManyInput | DesignSubClassVersionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassVersionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DesignSubClassVersion update
   */
  export type DesignSubClassVersionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClassVersion
     */
    select?: DesignSubClassVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClassVersion
     */
    omit?: DesignSubClassVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassVersionInclude<ExtArgs> | null
    /**
     * The data needed to update a DesignSubClassVersion.
     */
    data: XOR<DesignSubClassVersionUpdateInput, DesignSubClassVersionUncheckedUpdateInput>
    /**
     * Choose, which DesignSubClassVersion to update.
     */
    where: DesignSubClassVersionWhereUniqueInput
  }

  /**
   * DesignSubClassVersion updateMany
   */
  export type DesignSubClassVersionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DesignSubClassVersions.
     */
    data: XOR<DesignSubClassVersionUpdateManyMutationInput, DesignSubClassVersionUncheckedUpdateManyInput>
    /**
     * Filter which DesignSubClassVersions to update
     */
    where?: DesignSubClassVersionWhereInput
    /**
     * Limit how many DesignSubClassVersions to update.
     */
    limit?: number
  }

  /**
   * DesignSubClassVersion updateManyAndReturn
   */
  export type DesignSubClassVersionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClassVersion
     */
    select?: DesignSubClassVersionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClassVersion
     */
    omit?: DesignSubClassVersionOmit<ExtArgs> | null
    /**
     * The data used to update DesignSubClassVersions.
     */
    data: XOR<DesignSubClassVersionUpdateManyMutationInput, DesignSubClassVersionUncheckedUpdateManyInput>
    /**
     * Filter which DesignSubClassVersions to update
     */
    where?: DesignSubClassVersionWhereInput
    /**
     * Limit how many DesignSubClassVersions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassVersionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DesignSubClassVersion upsert
   */
  export type DesignSubClassVersionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClassVersion
     */
    select?: DesignSubClassVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClassVersion
     */
    omit?: DesignSubClassVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassVersionInclude<ExtArgs> | null
    /**
     * The filter to search for the DesignSubClassVersion to update in case it exists.
     */
    where: DesignSubClassVersionWhereUniqueInput
    /**
     * In case the DesignSubClassVersion found by the `where` argument doesn't exist, create a new DesignSubClassVersion with this data.
     */
    create: XOR<DesignSubClassVersionCreateInput, DesignSubClassVersionUncheckedCreateInput>
    /**
     * In case the DesignSubClassVersion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DesignSubClassVersionUpdateInput, DesignSubClassVersionUncheckedUpdateInput>
  }

  /**
   * DesignSubClassVersion delete
   */
  export type DesignSubClassVersionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClassVersion
     */
    select?: DesignSubClassVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClassVersion
     */
    omit?: DesignSubClassVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassVersionInclude<ExtArgs> | null
    /**
     * Filter which DesignSubClassVersion to delete.
     */
    where: DesignSubClassVersionWhereUniqueInput
  }

  /**
   * DesignSubClassVersion deleteMany
   */
  export type DesignSubClassVersionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DesignSubClassVersions to delete
     */
    where?: DesignSubClassVersionWhereInput
    /**
     * Limit how many DesignSubClassVersions to delete.
     */
    limit?: number
  }

  /**
   * DesignSubClassVersion.DesignSubClass
   */
  export type DesignSubClassVersion$DesignSubClassArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClass
     */
    select?: DesignSubClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClass
     */
    omit?: DesignSubClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassInclude<ExtArgs> | null
    where?: DesignSubClassWhereInput
  }

  /**
   * DesignSubClassVersion without action
   */
  export type DesignSubClassVersionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSubClassVersion
     */
    select?: DesignSubClassVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSubClassVersion
     */
    omit?: DesignSubClassVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSubClassVersionInclude<ExtArgs> | null
  }


  /**
   * Model UserProject
   */

  export type AggregateUserProject = {
    _count: UserProjectCountAggregateOutputType | null
    _min: UserProjectMinAggregateOutputType | null
    _max: UserProjectMaxAggregateOutputType | null
  }

  export type UserProjectMinAggregateOutputType = {
    userId: string | null
    projectId: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserProjectMaxAggregateOutputType = {
    userId: string | null
    projectId: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserProjectCountAggregateOutputType = {
    userId: number
    projectId: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserProjectMinAggregateInputType = {
    userId?: true
    projectId?: true
    role?: true
    createdAt?: true
  }

  export type UserProjectMaxAggregateInputType = {
    userId?: true
    projectId?: true
    role?: true
    createdAt?: true
  }

  export type UserProjectCountAggregateInputType = {
    userId?: true
    projectId?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type UserProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProject to aggregate.
     */
    where?: UserProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProjects to fetch.
     */
    orderBy?: UserProjectOrderByWithRelationInput | UserProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserProjects
    **/
    _count?: true | UserProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserProjectMaxAggregateInputType
  }

  export type GetUserProjectAggregateType<T extends UserProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateUserProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserProject[P]>
      : GetScalarType<T[P], AggregateUserProject[P]>
  }




  export type UserProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProjectWhereInput
    orderBy?: UserProjectOrderByWithAggregationInput | UserProjectOrderByWithAggregationInput[]
    by: UserProjectScalarFieldEnum[] | UserProjectScalarFieldEnum
    having?: UserProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserProjectCountAggregateInputType | true
    _min?: UserProjectMinAggregateInputType
    _max?: UserProjectMaxAggregateInputType
  }

  export type UserProjectGroupByOutputType = {
    userId: string
    projectId: string
    role: string
    createdAt: Date
    _count: UserProjectCountAggregateOutputType | null
    _min: UserProjectMinAggregateOutputType | null
    _max: UserProjectMaxAggregateOutputType | null
  }

  type GetUserProjectGroupByPayload<T extends UserProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserProjectGroupByOutputType[P]>
            : GetScalarType<T[P], UserProjectGroupByOutputType[P]>
        }
      >
    >


  export type UserProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    projectId?: boolean
    role?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProject"]>

  export type UserProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    projectId?: boolean
    role?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProject"]>

  export type UserProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    projectId?: boolean
    role?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProject"]>

  export type UserProjectSelectScalar = {
    userId?: boolean
    projectId?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "projectId" | "role" | "createdAt", ExtArgs["result"]["userProject"]>
  export type UserProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserProject"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      projectId: string
      role: string
      createdAt: Date
    }, ExtArgs["result"]["userProject"]>
    composites: {}
  }

  type UserProjectGetPayload<S extends boolean | null | undefined | UserProjectDefaultArgs> = $Result.GetResult<Prisma.$UserProjectPayload, S>

  type UserProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserProjectCountAggregateInputType | true
    }

  export interface UserProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserProject'], meta: { name: 'UserProject' } }
    /**
     * Find zero or one UserProject that matches the filter.
     * @param {UserProjectFindUniqueArgs} args - Arguments to find a UserProject
     * @example
     * // Get one UserProject
     * const userProject = await prisma.userProject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserProjectFindUniqueArgs>(args: SelectSubset<T, UserProjectFindUniqueArgs<ExtArgs>>): Prisma__UserProjectClient<$Result.GetResult<Prisma.$UserProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserProject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserProjectFindUniqueOrThrowArgs} args - Arguments to find a UserProject
     * @example
     * // Get one UserProject
     * const userProject = await prisma.userProject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, UserProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserProjectClient<$Result.GetResult<Prisma.$UserProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProjectFindFirstArgs} args - Arguments to find a UserProject
     * @example
     * // Get one UserProject
     * const userProject = await prisma.userProject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserProjectFindFirstArgs>(args?: SelectSubset<T, UserProjectFindFirstArgs<ExtArgs>>): Prisma__UserProjectClient<$Result.GetResult<Prisma.$UserProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProjectFindFirstOrThrowArgs} args - Arguments to find a UserProject
     * @example
     * // Get one UserProject
     * const userProject = await prisma.userProject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, UserProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserProjectClient<$Result.GetResult<Prisma.$UserProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserProjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserProjects
     * const userProjects = await prisma.userProject.findMany()
     * 
     * // Get first 10 UserProjects
     * const userProjects = await prisma.userProject.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userProjectWithUserIdOnly = await prisma.userProject.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserProjectFindManyArgs>(args?: SelectSubset<T, UserProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserProject.
     * @param {UserProjectCreateArgs} args - Arguments to create a UserProject.
     * @example
     * // Create one UserProject
     * const UserProject = await prisma.userProject.create({
     *   data: {
     *     // ... data to create a UserProject
     *   }
     * })
     * 
     */
    create<T extends UserProjectCreateArgs>(args: SelectSubset<T, UserProjectCreateArgs<ExtArgs>>): Prisma__UserProjectClient<$Result.GetResult<Prisma.$UserProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserProjects.
     * @param {UserProjectCreateManyArgs} args - Arguments to create many UserProjects.
     * @example
     * // Create many UserProjects
     * const userProject = await prisma.userProject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserProjectCreateManyArgs>(args?: SelectSubset<T, UserProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserProjects and returns the data saved in the database.
     * @param {UserProjectCreateManyAndReturnArgs} args - Arguments to create many UserProjects.
     * @example
     * // Create many UserProjects
     * const userProject = await prisma.userProject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserProjects and only return the `userId`
     * const userProjectWithUserIdOnly = await prisma.userProject.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, UserProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserProject.
     * @param {UserProjectDeleteArgs} args - Arguments to delete one UserProject.
     * @example
     * // Delete one UserProject
     * const UserProject = await prisma.userProject.delete({
     *   where: {
     *     // ... filter to delete one UserProject
     *   }
     * })
     * 
     */
    delete<T extends UserProjectDeleteArgs>(args: SelectSubset<T, UserProjectDeleteArgs<ExtArgs>>): Prisma__UserProjectClient<$Result.GetResult<Prisma.$UserProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserProject.
     * @param {UserProjectUpdateArgs} args - Arguments to update one UserProject.
     * @example
     * // Update one UserProject
     * const userProject = await prisma.userProject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserProjectUpdateArgs>(args: SelectSubset<T, UserProjectUpdateArgs<ExtArgs>>): Prisma__UserProjectClient<$Result.GetResult<Prisma.$UserProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserProjects.
     * @param {UserProjectDeleteManyArgs} args - Arguments to filter UserProjects to delete.
     * @example
     * // Delete a few UserProjects
     * const { count } = await prisma.userProject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserProjectDeleteManyArgs>(args?: SelectSubset<T, UserProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserProjects
     * const userProject = await prisma.userProject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserProjectUpdateManyArgs>(args: SelectSubset<T, UserProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProjects and returns the data updated in the database.
     * @param {UserProjectUpdateManyAndReturnArgs} args - Arguments to update many UserProjects.
     * @example
     * // Update many UserProjects
     * const userProject = await prisma.userProject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserProjects and only return the `userId`
     * const userProjectWithUserIdOnly = await prisma.userProject.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, UserProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserProject.
     * @param {UserProjectUpsertArgs} args - Arguments to update or create a UserProject.
     * @example
     * // Update or create a UserProject
     * const userProject = await prisma.userProject.upsert({
     *   create: {
     *     // ... data to create a UserProject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserProject we want to update
     *   }
     * })
     */
    upsert<T extends UserProjectUpsertArgs>(args: SelectSubset<T, UserProjectUpsertArgs<ExtArgs>>): Prisma__UserProjectClient<$Result.GetResult<Prisma.$UserProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProjectCountArgs} args - Arguments to filter UserProjects to count.
     * @example
     * // Count the number of UserProjects
     * const count = await prisma.userProject.count({
     *   where: {
     *     // ... the filter for the UserProjects we want to count
     *   }
     * })
    **/
    count<T extends UserProjectCountArgs>(
      args?: Subset<T, UserProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserProjectAggregateArgs>(args: Subset<T, UserProjectAggregateArgs>): Prisma.PrismaPromise<GetUserProjectAggregateType<T>>

    /**
     * Group by UserProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserProjectGroupByArgs['orderBy'] }
        : { orderBy?: UserProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserProject model
   */
  readonly fields: UserProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserProject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserProject model
   */
  interface UserProjectFieldRefs {
    readonly userId: FieldRef<"UserProject", 'String'>
    readonly projectId: FieldRef<"UserProject", 'String'>
    readonly role: FieldRef<"UserProject", 'String'>
    readonly createdAt: FieldRef<"UserProject", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserProject findUnique
   */
  export type UserProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProject
     */
    select?: UserProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProject
     */
    omit?: UserProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProjectInclude<ExtArgs> | null
    /**
     * Filter, which UserProject to fetch.
     */
    where: UserProjectWhereUniqueInput
  }

  /**
   * UserProject findUniqueOrThrow
   */
  export type UserProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProject
     */
    select?: UserProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProject
     */
    omit?: UserProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProjectInclude<ExtArgs> | null
    /**
     * Filter, which UserProject to fetch.
     */
    where: UserProjectWhereUniqueInput
  }

  /**
   * UserProject findFirst
   */
  export type UserProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProject
     */
    select?: UserProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProject
     */
    omit?: UserProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProjectInclude<ExtArgs> | null
    /**
     * Filter, which UserProject to fetch.
     */
    where?: UserProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProjects to fetch.
     */
    orderBy?: UserProjectOrderByWithRelationInput | UserProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProjects.
     */
    cursor?: UserProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProjects.
     */
    distinct?: UserProjectScalarFieldEnum | UserProjectScalarFieldEnum[]
  }

  /**
   * UserProject findFirstOrThrow
   */
  export type UserProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProject
     */
    select?: UserProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProject
     */
    omit?: UserProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProjectInclude<ExtArgs> | null
    /**
     * Filter, which UserProject to fetch.
     */
    where?: UserProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProjects to fetch.
     */
    orderBy?: UserProjectOrderByWithRelationInput | UserProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProjects.
     */
    cursor?: UserProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProjects.
     */
    distinct?: UserProjectScalarFieldEnum | UserProjectScalarFieldEnum[]
  }

  /**
   * UserProject findMany
   */
  export type UserProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProject
     */
    select?: UserProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProject
     */
    omit?: UserProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProjectInclude<ExtArgs> | null
    /**
     * Filter, which UserProjects to fetch.
     */
    where?: UserProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProjects to fetch.
     */
    orderBy?: UserProjectOrderByWithRelationInput | UserProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserProjects.
     */
    cursor?: UserProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProjects.
     */
    skip?: number
    distinct?: UserProjectScalarFieldEnum | UserProjectScalarFieldEnum[]
  }

  /**
   * UserProject create
   */
  export type UserProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProject
     */
    select?: UserProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProject
     */
    omit?: UserProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a UserProject.
     */
    data: XOR<UserProjectCreateInput, UserProjectUncheckedCreateInput>
  }

  /**
   * UserProject createMany
   */
  export type UserProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserProjects.
     */
    data: UserProjectCreateManyInput | UserProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProject createManyAndReturn
   */
  export type UserProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProject
     */
    select?: UserProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProject
     */
    omit?: UserProjectOmit<ExtArgs> | null
    /**
     * The data used to create many UserProjects.
     */
    data: UserProjectCreateManyInput | UserProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserProject update
   */
  export type UserProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProject
     */
    select?: UserProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProject
     */
    omit?: UserProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a UserProject.
     */
    data: XOR<UserProjectUpdateInput, UserProjectUncheckedUpdateInput>
    /**
     * Choose, which UserProject to update.
     */
    where: UserProjectWhereUniqueInput
  }

  /**
   * UserProject updateMany
   */
  export type UserProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserProjects.
     */
    data: XOR<UserProjectUpdateManyMutationInput, UserProjectUncheckedUpdateManyInput>
    /**
     * Filter which UserProjects to update
     */
    where?: UserProjectWhereInput
    /**
     * Limit how many UserProjects to update.
     */
    limit?: number
  }

  /**
   * UserProject updateManyAndReturn
   */
  export type UserProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProject
     */
    select?: UserProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProject
     */
    omit?: UserProjectOmit<ExtArgs> | null
    /**
     * The data used to update UserProjects.
     */
    data: XOR<UserProjectUpdateManyMutationInput, UserProjectUncheckedUpdateManyInput>
    /**
     * Filter which UserProjects to update
     */
    where?: UserProjectWhereInput
    /**
     * Limit how many UserProjects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserProject upsert
   */
  export type UserProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProject
     */
    select?: UserProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProject
     */
    omit?: UserProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the UserProject to update in case it exists.
     */
    where: UserProjectWhereUniqueInput
    /**
     * In case the UserProject found by the `where` argument doesn't exist, create a new UserProject with this data.
     */
    create: XOR<UserProjectCreateInput, UserProjectUncheckedCreateInput>
    /**
     * In case the UserProject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserProjectUpdateInput, UserProjectUncheckedUpdateInput>
  }

  /**
   * UserProject delete
   */
  export type UserProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProject
     */
    select?: UserProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProject
     */
    omit?: UserProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProjectInclude<ExtArgs> | null
    /**
     * Filter which UserProject to delete.
     */
    where: UserProjectWhereUniqueInput
  }

  /**
   * UserProject deleteMany
   */
  export type UserProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProjects to delete
     */
    where?: UserProjectWhereInput
    /**
     * Limit how many UserProjects to delete.
     */
    limit?: number
  }

  /**
   * UserProject without action
   */
  export type UserProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProject
     */
    select?: UserProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProject
     */
    omit?: UserProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProjectInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const AuthenticatorScalarFieldEnum: {
    credentialID: 'credentialID',
    userId: 'userId',
    providerAccountId: 'providerAccountId',
    credentialPublicKey: 'credentialPublicKey',
    counter: 'counter',
    credentialDeviceType: 'credentialDeviceType',
    credentialBackedUp: 'credentialBackedUp',
    transports: 'transports'
  };

  export type AuthenticatorScalarFieldEnum = (typeof AuthenticatorScalarFieldEnum)[keyof typeof AuthenticatorScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ScriptScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    author: 'author',
    content: 'content',
    status: 'status',
    version: 'version',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ownerId: 'ownerId',
    projectId: 'projectId'
  };

  export type ScriptScalarFieldEnum = (typeof ScriptScalarFieldEnum)[keyof typeof ScriptScalarFieldEnum]


  export const SceneScalarFieldEnum: {
    id: 'id',
    sceneNumber: 'sceneNumber',
    heading: 'heading',
    pageStart: 'pageStart',
    scriptId: 'scriptId'
  };

  export type SceneScalarFieldEnum = (typeof SceneScalarFieldEnum)[keyof typeof SceneScalarFieldEnum]


  export const DesignCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ownerId: 'ownerId',
    projectId: 'projectId'
  };

  export type DesignCategoryScalarFieldEnum = (typeof DesignCategoryScalarFieldEnum)[keyof typeof DesignCategoryScalarFieldEnum]


  export const DesignSubClassScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ownerId: 'ownerId',
    categoryId: 'categoryId'
  };

  export type DesignSubClassScalarFieldEnum = (typeof DesignSubClassScalarFieldEnum)[keyof typeof DesignSubClassScalarFieldEnum]


  export const DesignSubClassVersionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ownerId: 'ownerId',
    DesignSubClassId: 'DesignSubClassId'
  };

  export type DesignSubClassVersionScalarFieldEnum = (typeof DesignSubClassVersionScalarFieldEnum)[keyof typeof DesignSubClassVersionScalarFieldEnum]


  export const UserProjectScalarFieldEnum: {
    userId: 'userId',
    projectId: 'projectId',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserProjectScalarFieldEnum = (typeof UserProjectScalarFieldEnum)[keyof typeof UserProjectScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'ScriptStatus'
   */
  export type EnumScriptStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScriptStatus'>
    


  /**
   * Reference to a field of type 'ScriptStatus[]'
   */
  export type ListEnumScriptStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScriptStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    Authenticator?: AuthenticatorListRelationFilter
    scriptOwner?: ScriptListRelationFilter
    projectMembers?: UserProjectListRelationFilter
    DesignCategoryOwner?: DesignCategoryListRelationFilter
    DesignOwner?: DesignSubClassListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    Authenticator?: AuthenticatorOrderByRelationAggregateInput
    scriptOwner?: ScriptOrderByRelationAggregateInput
    projectMembers?: UserProjectOrderByRelationAggregateInput
    DesignCategoryOwner?: DesignCategoryOrderByRelationAggregateInput
    DesignOwner?: DesignSubClassOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    Authenticator?: AuthenticatorListRelationFilter
    scriptOwner?: ScriptListRelationFilter
    projectMembers?: UserProjectListRelationFilter
    DesignCategoryOwner?: DesignCategoryListRelationFilter
    DesignOwner?: DesignSubClassListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type AuthenticatorWhereInput = {
    AND?: AuthenticatorWhereInput | AuthenticatorWhereInput[]
    OR?: AuthenticatorWhereInput[]
    NOT?: AuthenticatorWhereInput | AuthenticatorWhereInput[]
    credentialID?: StringFilter<"Authenticator"> | string
    userId?: StringFilter<"Authenticator"> | string
    providerAccountId?: StringFilter<"Authenticator"> | string
    credentialPublicKey?: StringFilter<"Authenticator"> | string
    counter?: IntFilter<"Authenticator"> | number
    credentialDeviceType?: StringFilter<"Authenticator"> | string
    credentialBackedUp?: BoolFilter<"Authenticator"> | boolean
    transports?: StringNullableFilter<"Authenticator"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AuthenticatorOrderByWithRelationInput = {
    credentialID?: SortOrder
    userId?: SortOrder
    providerAccountId?: SortOrder
    credentialPublicKey?: SortOrder
    counter?: SortOrder
    credentialDeviceType?: SortOrder
    credentialBackedUp?: SortOrder
    transports?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuthenticatorWhereUniqueInput = Prisma.AtLeast<{
    credentialID?: string
    userId_credentialID?: AuthenticatorUserIdCredentialIDCompoundUniqueInput
    AND?: AuthenticatorWhereInput | AuthenticatorWhereInput[]
    OR?: AuthenticatorWhereInput[]
    NOT?: AuthenticatorWhereInput | AuthenticatorWhereInput[]
    userId?: StringFilter<"Authenticator"> | string
    providerAccountId?: StringFilter<"Authenticator"> | string
    credentialPublicKey?: StringFilter<"Authenticator"> | string
    counter?: IntFilter<"Authenticator"> | number
    credentialDeviceType?: StringFilter<"Authenticator"> | string
    credentialBackedUp?: BoolFilter<"Authenticator"> | boolean
    transports?: StringNullableFilter<"Authenticator"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "userId_credentialID" | "credentialID">

  export type AuthenticatorOrderByWithAggregationInput = {
    credentialID?: SortOrder
    userId?: SortOrder
    providerAccountId?: SortOrder
    credentialPublicKey?: SortOrder
    counter?: SortOrder
    credentialDeviceType?: SortOrder
    credentialBackedUp?: SortOrder
    transports?: SortOrderInput | SortOrder
    _count?: AuthenticatorCountOrderByAggregateInput
    _avg?: AuthenticatorAvgOrderByAggregateInput
    _max?: AuthenticatorMaxOrderByAggregateInput
    _min?: AuthenticatorMinOrderByAggregateInput
    _sum?: AuthenticatorSumOrderByAggregateInput
  }

  export type AuthenticatorScalarWhereWithAggregatesInput = {
    AND?: AuthenticatorScalarWhereWithAggregatesInput | AuthenticatorScalarWhereWithAggregatesInput[]
    OR?: AuthenticatorScalarWhereWithAggregatesInput[]
    NOT?: AuthenticatorScalarWhereWithAggregatesInput | AuthenticatorScalarWhereWithAggregatesInput[]
    credentialID?: StringWithAggregatesFilter<"Authenticator"> | string
    userId?: StringWithAggregatesFilter<"Authenticator"> | string
    providerAccountId?: StringWithAggregatesFilter<"Authenticator"> | string
    credentialPublicKey?: StringWithAggregatesFilter<"Authenticator"> | string
    counter?: IntWithAggregatesFilter<"Authenticator"> | number
    credentialDeviceType?: StringWithAggregatesFilter<"Authenticator"> | string
    credentialBackedUp?: BoolWithAggregatesFilter<"Authenticator"> | boolean
    transports?: StringNullableWithAggregatesFilter<"Authenticator"> | string | null
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    projectMembers?: UserProjectListRelationFilter
    scripts?: ScriptListRelationFilter
    designCategories?: DesignCategoryListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectMembers?: UserProjectOrderByRelationAggregateInput
    scripts?: ScriptOrderByRelationAggregateInput
    designCategories?: DesignCategoryOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    projectMembers?: UserProjectListRelationFilter
    scripts?: ScriptListRelationFilter
    designCategories?: DesignCategoryListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type ScriptWhereInput = {
    AND?: ScriptWhereInput | ScriptWhereInput[]
    OR?: ScriptWhereInput[]
    NOT?: ScriptWhereInput | ScriptWhereInput[]
    id?: StringFilter<"Script"> | string
    title?: StringFilter<"Script"> | string
    description?: StringNullableFilter<"Script"> | string | null
    author?: StringNullableFilter<"Script"> | string | null
    content?: JsonFilter<"Script">
    status?: EnumScriptStatusFilter<"Script"> | $Enums.ScriptStatus
    version?: IntFilter<"Script"> | number
    createdAt?: DateTimeFilter<"Script"> | Date | string
    updatedAt?: DateTimeFilter<"Script"> | Date | string
    ownerId?: StringFilter<"Script"> | string
    projectId?: StringNullableFilter<"Script"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    scenes?: SceneListRelationFilter
  }

  export type ScriptOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    author?: SortOrderInput | SortOrder
    content?: SortOrder
    status?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    projectId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
    scenes?: SceneOrderByRelationAggregateInput
  }

  export type ScriptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScriptWhereInput | ScriptWhereInput[]
    OR?: ScriptWhereInput[]
    NOT?: ScriptWhereInput | ScriptWhereInput[]
    title?: StringFilter<"Script"> | string
    description?: StringNullableFilter<"Script"> | string | null
    author?: StringNullableFilter<"Script"> | string | null
    content?: JsonFilter<"Script">
    status?: EnumScriptStatusFilter<"Script"> | $Enums.ScriptStatus
    version?: IntFilter<"Script"> | number
    createdAt?: DateTimeFilter<"Script"> | Date | string
    updatedAt?: DateTimeFilter<"Script"> | Date | string
    ownerId?: StringFilter<"Script"> | string
    projectId?: StringNullableFilter<"Script"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    scenes?: SceneListRelationFilter
  }, "id">

  export type ScriptOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    author?: SortOrderInput | SortOrder
    content?: SortOrder
    status?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    projectId?: SortOrderInput | SortOrder
    _count?: ScriptCountOrderByAggregateInput
    _avg?: ScriptAvgOrderByAggregateInput
    _max?: ScriptMaxOrderByAggregateInput
    _min?: ScriptMinOrderByAggregateInput
    _sum?: ScriptSumOrderByAggregateInput
  }

  export type ScriptScalarWhereWithAggregatesInput = {
    AND?: ScriptScalarWhereWithAggregatesInput | ScriptScalarWhereWithAggregatesInput[]
    OR?: ScriptScalarWhereWithAggregatesInput[]
    NOT?: ScriptScalarWhereWithAggregatesInput | ScriptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Script"> | string
    title?: StringWithAggregatesFilter<"Script"> | string
    description?: StringNullableWithAggregatesFilter<"Script"> | string | null
    author?: StringNullableWithAggregatesFilter<"Script"> | string | null
    content?: JsonWithAggregatesFilter<"Script">
    status?: EnumScriptStatusWithAggregatesFilter<"Script"> | $Enums.ScriptStatus
    version?: IntWithAggregatesFilter<"Script"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Script"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Script"> | Date | string
    ownerId?: StringWithAggregatesFilter<"Script"> | string
    projectId?: StringNullableWithAggregatesFilter<"Script"> | string | null
  }

  export type SceneWhereInput = {
    AND?: SceneWhereInput | SceneWhereInput[]
    OR?: SceneWhereInput[]
    NOT?: SceneWhereInput | SceneWhereInput[]
    id?: StringFilter<"Scene"> | string
    sceneNumber?: IntFilter<"Scene"> | number
    heading?: StringFilter<"Scene"> | string
    pageStart?: IntNullableFilter<"Scene"> | number | null
    scriptId?: StringFilter<"Scene"> | string
    script?: XOR<ScriptScalarRelationFilter, ScriptWhereInput>
  }

  export type SceneOrderByWithRelationInput = {
    id?: SortOrder
    sceneNumber?: SortOrder
    heading?: SortOrder
    pageStart?: SortOrderInput | SortOrder
    scriptId?: SortOrder
    script?: ScriptOrderByWithRelationInput
  }

  export type SceneWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SceneWhereInput | SceneWhereInput[]
    OR?: SceneWhereInput[]
    NOT?: SceneWhereInput | SceneWhereInput[]
    sceneNumber?: IntFilter<"Scene"> | number
    heading?: StringFilter<"Scene"> | string
    pageStart?: IntNullableFilter<"Scene"> | number | null
    scriptId?: StringFilter<"Scene"> | string
    script?: XOR<ScriptScalarRelationFilter, ScriptWhereInput>
  }, "id">

  export type SceneOrderByWithAggregationInput = {
    id?: SortOrder
    sceneNumber?: SortOrder
    heading?: SortOrder
    pageStart?: SortOrderInput | SortOrder
    scriptId?: SortOrder
    _count?: SceneCountOrderByAggregateInput
    _avg?: SceneAvgOrderByAggregateInput
    _max?: SceneMaxOrderByAggregateInput
    _min?: SceneMinOrderByAggregateInput
    _sum?: SceneSumOrderByAggregateInput
  }

  export type SceneScalarWhereWithAggregatesInput = {
    AND?: SceneScalarWhereWithAggregatesInput | SceneScalarWhereWithAggregatesInput[]
    OR?: SceneScalarWhereWithAggregatesInput[]
    NOT?: SceneScalarWhereWithAggregatesInput | SceneScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Scene"> | string
    sceneNumber?: IntWithAggregatesFilter<"Scene"> | number
    heading?: StringWithAggregatesFilter<"Scene"> | string
    pageStart?: IntNullableWithAggregatesFilter<"Scene"> | number | null
    scriptId?: StringWithAggregatesFilter<"Scene"> | string
  }

  export type DesignCategoryWhereInput = {
    AND?: DesignCategoryWhereInput | DesignCategoryWhereInput[]
    OR?: DesignCategoryWhereInput[]
    NOT?: DesignCategoryWhereInput | DesignCategoryWhereInput[]
    id?: StringFilter<"DesignCategory"> | string
    name?: StringFilter<"DesignCategory"> | string
    createdAt?: DateTimeFilter<"DesignCategory"> | Date | string
    updatedAt?: DateTimeFilter<"DesignCategory"> | Date | string
    ownerId?: StringFilter<"DesignCategory"> | string
    projectId?: StringFilter<"DesignCategory"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    designs?: DesignSubClassListRelationFilter
  }

  export type DesignCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    projectId?: SortOrder
    user?: UserOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
    designs?: DesignSubClassOrderByRelationAggregateInput
  }

  export type DesignCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DesignCategoryWhereInput | DesignCategoryWhereInput[]
    OR?: DesignCategoryWhereInput[]
    NOT?: DesignCategoryWhereInput | DesignCategoryWhereInput[]
    name?: StringFilter<"DesignCategory"> | string
    createdAt?: DateTimeFilter<"DesignCategory"> | Date | string
    updatedAt?: DateTimeFilter<"DesignCategory"> | Date | string
    ownerId?: StringFilter<"DesignCategory"> | string
    projectId?: StringFilter<"DesignCategory"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    designs?: DesignSubClassListRelationFilter
  }, "id">

  export type DesignCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    projectId?: SortOrder
    _count?: DesignCategoryCountOrderByAggregateInput
    _max?: DesignCategoryMaxOrderByAggregateInput
    _min?: DesignCategoryMinOrderByAggregateInput
  }

  export type DesignCategoryScalarWhereWithAggregatesInput = {
    AND?: DesignCategoryScalarWhereWithAggregatesInput | DesignCategoryScalarWhereWithAggregatesInput[]
    OR?: DesignCategoryScalarWhereWithAggregatesInput[]
    NOT?: DesignCategoryScalarWhereWithAggregatesInput | DesignCategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DesignCategory"> | string
    name?: StringWithAggregatesFilter<"DesignCategory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DesignCategory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DesignCategory"> | Date | string
    ownerId?: StringWithAggregatesFilter<"DesignCategory"> | string
    projectId?: StringWithAggregatesFilter<"DesignCategory"> | string
  }

  export type DesignSubClassWhereInput = {
    AND?: DesignSubClassWhereInput | DesignSubClassWhereInput[]
    OR?: DesignSubClassWhereInput[]
    NOT?: DesignSubClassWhereInput | DesignSubClassWhereInput[]
    id?: StringFilter<"DesignSubClass"> | string
    name?: StringFilter<"DesignSubClass"> | string
    createdAt?: DateTimeFilter<"DesignSubClass"> | Date | string
    updatedAt?: DateTimeFilter<"DesignSubClass"> | Date | string
    ownerId?: StringFilter<"DesignSubClass"> | string
    categoryId?: StringNullableFilter<"DesignSubClass"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    category?: XOR<DesignCategoryNullableScalarRelationFilter, DesignCategoryWhereInput> | null
    versions?: DesignSubClassVersionListRelationFilter
  }

  export type DesignSubClassOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    category?: DesignCategoryOrderByWithRelationInput
    versions?: DesignSubClassVersionOrderByRelationAggregateInput
  }

  export type DesignSubClassWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DesignSubClassWhereInput | DesignSubClassWhereInput[]
    OR?: DesignSubClassWhereInput[]
    NOT?: DesignSubClassWhereInput | DesignSubClassWhereInput[]
    name?: StringFilter<"DesignSubClass"> | string
    createdAt?: DateTimeFilter<"DesignSubClass"> | Date | string
    updatedAt?: DateTimeFilter<"DesignSubClass"> | Date | string
    ownerId?: StringFilter<"DesignSubClass"> | string
    categoryId?: StringNullableFilter<"DesignSubClass"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    category?: XOR<DesignCategoryNullableScalarRelationFilter, DesignCategoryWhereInput> | null
    versions?: DesignSubClassVersionListRelationFilter
  }, "id">

  export type DesignSubClassOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    _count?: DesignSubClassCountOrderByAggregateInput
    _max?: DesignSubClassMaxOrderByAggregateInput
    _min?: DesignSubClassMinOrderByAggregateInput
  }

  export type DesignSubClassScalarWhereWithAggregatesInput = {
    AND?: DesignSubClassScalarWhereWithAggregatesInput | DesignSubClassScalarWhereWithAggregatesInput[]
    OR?: DesignSubClassScalarWhereWithAggregatesInput[]
    NOT?: DesignSubClassScalarWhereWithAggregatesInput | DesignSubClassScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DesignSubClass"> | string
    name?: StringWithAggregatesFilter<"DesignSubClass"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DesignSubClass"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DesignSubClass"> | Date | string
    ownerId?: StringWithAggregatesFilter<"DesignSubClass"> | string
    categoryId?: StringNullableWithAggregatesFilter<"DesignSubClass"> | string | null
  }

  export type DesignSubClassVersionWhereInput = {
    AND?: DesignSubClassVersionWhereInput | DesignSubClassVersionWhereInput[]
    OR?: DesignSubClassVersionWhereInput[]
    NOT?: DesignSubClassVersionWhereInput | DesignSubClassVersionWhereInput[]
    id?: StringFilter<"DesignSubClassVersion"> | string
    name?: StringFilter<"DesignSubClassVersion"> | string
    content?: JsonFilter<"DesignSubClassVersion">
    createdAt?: DateTimeFilter<"DesignSubClassVersion"> | Date | string
    updatedAt?: DateTimeFilter<"DesignSubClassVersion"> | Date | string
    ownerId?: StringFilter<"DesignSubClassVersion"> | string
    DesignSubClassId?: StringNullableFilter<"DesignSubClassVersion"> | string | null
    DesignSubClass?: XOR<DesignSubClassNullableScalarRelationFilter, DesignSubClassWhereInput> | null
  }

  export type DesignSubClassVersionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    DesignSubClassId?: SortOrderInput | SortOrder
    DesignSubClass?: DesignSubClassOrderByWithRelationInput
  }

  export type DesignSubClassVersionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DesignSubClassVersionWhereInput | DesignSubClassVersionWhereInput[]
    OR?: DesignSubClassVersionWhereInput[]
    NOT?: DesignSubClassVersionWhereInput | DesignSubClassVersionWhereInput[]
    name?: StringFilter<"DesignSubClassVersion"> | string
    content?: JsonFilter<"DesignSubClassVersion">
    createdAt?: DateTimeFilter<"DesignSubClassVersion"> | Date | string
    updatedAt?: DateTimeFilter<"DesignSubClassVersion"> | Date | string
    ownerId?: StringFilter<"DesignSubClassVersion"> | string
    DesignSubClassId?: StringNullableFilter<"DesignSubClassVersion"> | string | null
    DesignSubClass?: XOR<DesignSubClassNullableScalarRelationFilter, DesignSubClassWhereInput> | null
  }, "id">

  export type DesignSubClassVersionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    DesignSubClassId?: SortOrderInput | SortOrder
    _count?: DesignSubClassVersionCountOrderByAggregateInput
    _max?: DesignSubClassVersionMaxOrderByAggregateInput
    _min?: DesignSubClassVersionMinOrderByAggregateInput
  }

  export type DesignSubClassVersionScalarWhereWithAggregatesInput = {
    AND?: DesignSubClassVersionScalarWhereWithAggregatesInput | DesignSubClassVersionScalarWhereWithAggregatesInput[]
    OR?: DesignSubClassVersionScalarWhereWithAggregatesInput[]
    NOT?: DesignSubClassVersionScalarWhereWithAggregatesInput | DesignSubClassVersionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DesignSubClassVersion"> | string
    name?: StringWithAggregatesFilter<"DesignSubClassVersion"> | string
    content?: JsonWithAggregatesFilter<"DesignSubClassVersion">
    createdAt?: DateTimeWithAggregatesFilter<"DesignSubClassVersion"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DesignSubClassVersion"> | Date | string
    ownerId?: StringWithAggregatesFilter<"DesignSubClassVersion"> | string
    DesignSubClassId?: StringNullableWithAggregatesFilter<"DesignSubClassVersion"> | string | null
  }

  export type UserProjectWhereInput = {
    AND?: UserProjectWhereInput | UserProjectWhereInput[]
    OR?: UserProjectWhereInput[]
    NOT?: UserProjectWhereInput | UserProjectWhereInput[]
    userId?: StringFilter<"UserProject"> | string
    projectId?: StringFilter<"UserProject"> | string
    role?: StringFilter<"UserProject"> | string
    createdAt?: DateTimeFilter<"UserProject"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserProjectOrderByWithRelationInput = {
    userId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type UserProjectWhereUniqueInput = Prisma.AtLeast<{
    userId_projectId?: UserProjectUserIdProjectIdCompoundUniqueInput
    AND?: UserProjectWhereInput | UserProjectWhereInput[]
    OR?: UserProjectWhereInput[]
    NOT?: UserProjectWhereInput | UserProjectWhereInput[]
    userId?: StringFilter<"UserProject"> | string
    projectId?: StringFilter<"UserProject"> | string
    role?: StringFilter<"UserProject"> | string
    createdAt?: DateTimeFilter<"UserProject"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "userId_projectId">

  export type UserProjectOrderByWithAggregationInput = {
    userId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserProjectCountOrderByAggregateInput
    _max?: UserProjectMaxOrderByAggregateInput
    _min?: UserProjectMinOrderByAggregateInput
  }

  export type UserProjectScalarWhereWithAggregatesInput = {
    AND?: UserProjectScalarWhereWithAggregatesInput | UserProjectScalarWhereWithAggregatesInput[]
    OR?: UserProjectScalarWhereWithAggregatesInput[]
    NOT?: UserProjectScalarWhereWithAggregatesInput | UserProjectScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"UserProject"> | string
    projectId?: StringWithAggregatesFilter<"UserProject"> | string
    role?: StringWithAggregatesFilter<"UserProject"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserProject"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email: string
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    Authenticator?: AuthenticatorCreateNestedManyWithoutUserInput
    scriptOwner?: ScriptCreateNestedManyWithoutUserInput
    projectMembers?: UserProjectCreateNestedManyWithoutUserInput
    DesignCategoryOwner?: DesignCategoryCreateNestedManyWithoutUserInput
    DesignOwner?: DesignSubClassCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email: string
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    Authenticator?: AuthenticatorUncheckedCreateNestedManyWithoutUserInput
    scriptOwner?: ScriptUncheckedCreateNestedManyWithoutUserInput
    projectMembers?: UserProjectUncheckedCreateNestedManyWithoutUserInput
    DesignCategoryOwner?: DesignCategoryUncheckedCreateNestedManyWithoutUserInput
    DesignOwner?: DesignSubClassUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    Authenticator?: AuthenticatorUpdateManyWithoutUserNestedInput
    scriptOwner?: ScriptUpdateManyWithoutUserNestedInput
    projectMembers?: UserProjectUpdateManyWithoutUserNestedInput
    DesignCategoryOwner?: DesignCategoryUpdateManyWithoutUserNestedInput
    DesignOwner?: DesignSubClassUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    Authenticator?: AuthenticatorUncheckedUpdateManyWithoutUserNestedInput
    scriptOwner?: ScriptUncheckedUpdateManyWithoutUserNestedInput
    projectMembers?: UserProjectUncheckedUpdateManyWithoutUserNestedInput
    DesignCategoryOwner?: DesignCategoryUncheckedUpdateManyWithoutUserNestedInput
    DesignOwner?: DesignSubClassUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email: string
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    sessionToken: string
    userId: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    sessionToken: string
    userId: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthenticatorCreateInput = {
    credentialID: string
    providerAccountId: string
    credentialPublicKey: string
    counter: number
    credentialDeviceType: string
    credentialBackedUp: boolean
    transports?: string | null
    user: UserCreateNestedOneWithoutAuthenticatorInput
  }

  export type AuthenticatorUncheckedCreateInput = {
    credentialID: string
    userId: string
    providerAccountId: string
    credentialPublicKey: string
    counter: number
    credentialDeviceType: string
    credentialBackedUp: boolean
    transports?: string | null
  }

  export type AuthenticatorUpdateInput = {
    credentialID?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    credentialPublicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    credentialDeviceType?: StringFieldUpdateOperationsInput | string
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAuthenticatorNestedInput
  }

  export type AuthenticatorUncheckedUpdateInput = {
    credentialID?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    credentialPublicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    credentialDeviceType?: StringFieldUpdateOperationsInput | string
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthenticatorCreateManyInput = {
    credentialID: string
    userId: string
    providerAccountId: string
    credentialPublicKey: string
    counter: number
    credentialDeviceType: string
    credentialBackedUp: boolean
    transports?: string | null
  }

  export type AuthenticatorUpdateManyMutationInput = {
    credentialID?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    credentialPublicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    credentialDeviceType?: StringFieldUpdateOperationsInput | string
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthenticatorUncheckedUpdateManyInput = {
    credentialID?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    credentialPublicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    credentialDeviceType?: StringFieldUpdateOperationsInput | string
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projectMembers?: UserProjectCreateNestedManyWithoutProjectInput
    scripts?: ScriptCreateNestedManyWithoutProjectInput
    designCategories?: DesignCategoryCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projectMembers?: UserProjectUncheckedCreateNestedManyWithoutProjectInput
    scripts?: ScriptUncheckedCreateNestedManyWithoutProjectInput
    designCategories?: DesignCategoryUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMembers?: UserProjectUpdateManyWithoutProjectNestedInput
    scripts?: ScriptUpdateManyWithoutProjectNestedInput
    designCategories?: DesignCategoryUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMembers?: UserProjectUncheckedUpdateManyWithoutProjectNestedInput
    scripts?: ScriptUncheckedUpdateManyWithoutProjectNestedInput
    designCategories?: DesignCategoryUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScriptCreateInput = {
    id?: string
    title: string
    description?: string | null
    author?: string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: $Enums.ScriptStatus
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutScriptOwnerInput
    project?: ProjectCreateNestedOneWithoutScriptsInput
    scenes?: SceneCreateNestedManyWithoutScriptInput
  }

  export type ScriptUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    author?: string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: $Enums.ScriptStatus
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    projectId?: string | null
    scenes?: SceneUncheckedCreateNestedManyWithoutScriptInput
  }

  export type ScriptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: EnumScriptStatusFieldUpdateOperationsInput | $Enums.ScriptStatus
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutScriptOwnerNestedInput
    project?: ProjectUpdateOneWithoutScriptsNestedInput
    scenes?: SceneUpdateManyWithoutScriptNestedInput
  }

  export type ScriptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: EnumScriptStatusFieldUpdateOperationsInput | $Enums.ScriptStatus
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    scenes?: SceneUncheckedUpdateManyWithoutScriptNestedInput
  }

  export type ScriptCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    author?: string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: $Enums.ScriptStatus
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    projectId?: string | null
  }

  export type ScriptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: EnumScriptStatusFieldUpdateOperationsInput | $Enums.ScriptStatus
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScriptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: EnumScriptStatusFieldUpdateOperationsInput | $Enums.ScriptStatus
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SceneCreateInput = {
    id?: string
    sceneNumber: number
    heading: string
    pageStart?: number | null
    script: ScriptCreateNestedOneWithoutScenesInput
  }

  export type SceneUncheckedCreateInput = {
    id?: string
    sceneNumber: number
    heading: string
    pageStart?: number | null
    scriptId: string
  }

  export type SceneUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sceneNumber?: IntFieldUpdateOperationsInput | number
    heading?: StringFieldUpdateOperationsInput | string
    pageStart?: NullableIntFieldUpdateOperationsInput | number | null
    script?: ScriptUpdateOneRequiredWithoutScenesNestedInput
  }

  export type SceneUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sceneNumber?: IntFieldUpdateOperationsInput | number
    heading?: StringFieldUpdateOperationsInput | string
    pageStart?: NullableIntFieldUpdateOperationsInput | number | null
    scriptId?: StringFieldUpdateOperationsInput | string
  }

  export type SceneCreateManyInput = {
    id?: string
    sceneNumber: number
    heading: string
    pageStart?: number | null
    scriptId: string
  }

  export type SceneUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sceneNumber?: IntFieldUpdateOperationsInput | number
    heading?: StringFieldUpdateOperationsInput | string
    pageStart?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SceneUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sceneNumber?: IntFieldUpdateOperationsInput | number
    heading?: StringFieldUpdateOperationsInput | string
    pageStart?: NullableIntFieldUpdateOperationsInput | number | null
    scriptId?: StringFieldUpdateOperationsInput | string
  }

  export type DesignCategoryCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDesignCategoryOwnerInput
    project: ProjectCreateNestedOneWithoutDesignCategoriesInput
    designs?: DesignSubClassCreateNestedManyWithoutCategoryInput
  }

  export type DesignCategoryUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    projectId: string
    designs?: DesignSubClassUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type DesignCategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDesignCategoryOwnerNestedInput
    project?: ProjectUpdateOneRequiredWithoutDesignCategoriesNestedInput
    designs?: DesignSubClassUpdateManyWithoutCategoryNestedInput
  }

  export type DesignCategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    designs?: DesignSubClassUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type DesignCategoryCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    projectId: string
  }

  export type DesignCategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignCategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type DesignSubClassCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDesignOwnerInput
    category?: DesignCategoryCreateNestedOneWithoutDesignsInput
    versions?: DesignSubClassVersionCreateNestedManyWithoutDesignSubClassInput
  }

  export type DesignSubClassUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    categoryId?: string | null
    versions?: DesignSubClassVersionUncheckedCreateNestedManyWithoutDesignSubClassInput
  }

  export type DesignSubClassUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDesignOwnerNestedInput
    category?: DesignCategoryUpdateOneWithoutDesignsNestedInput
    versions?: DesignSubClassVersionUpdateManyWithoutDesignSubClassNestedInput
  }

  export type DesignSubClassUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    versions?: DesignSubClassVersionUncheckedUpdateManyWithoutDesignSubClassNestedInput
  }

  export type DesignSubClassCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    categoryId?: string | null
  }

  export type DesignSubClassUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignSubClassUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DesignSubClassVersionCreateInput = {
    id?: string
    name: string
    content?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    DesignSubClass?: DesignSubClassCreateNestedOneWithoutVersionsInput
  }

  export type DesignSubClassVersionUncheckedCreateInput = {
    id?: string
    name: string
    content?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    DesignSubClassId?: string | null
  }

  export type DesignSubClassVersionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    DesignSubClass?: DesignSubClassUpdateOneWithoutVersionsNestedInput
  }

  export type DesignSubClassVersionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    DesignSubClassId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DesignSubClassVersionCreateManyInput = {
    id?: string
    name: string
    content?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    DesignSubClassId?: string | null
  }

  export type DesignSubClassVersionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
  }

  export type DesignSubClassVersionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    DesignSubClassId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserProjectCreateInput = {
    role: string
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutProjectMembersInput
    user: UserCreateNestedOneWithoutProjectMembersInput
  }

  export type UserProjectUncheckedCreateInput = {
    userId: string
    projectId: string
    role: string
    createdAt?: Date | string
  }

  export type UserProjectUpdateInput = {
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutProjectMembersNestedInput
    user?: UserUpdateOneRequiredWithoutProjectMembersNestedInput
  }

  export type UserProjectUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProjectCreateManyInput = {
    userId: string
    projectId: string
    role: string
    createdAt?: Date | string
  }

  export type UserProjectUpdateManyMutationInput = {
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProjectUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AuthenticatorListRelationFilter = {
    every?: AuthenticatorWhereInput
    some?: AuthenticatorWhereInput
    none?: AuthenticatorWhereInput
  }

  export type ScriptListRelationFilter = {
    every?: ScriptWhereInput
    some?: ScriptWhereInput
    none?: ScriptWhereInput
  }

  export type UserProjectListRelationFilter = {
    every?: UserProjectWhereInput
    some?: UserProjectWhereInput
    none?: UserProjectWhereInput
  }

  export type DesignCategoryListRelationFilter = {
    every?: DesignCategoryWhereInput
    some?: DesignCategoryWhereInput
    none?: DesignCategoryWhereInput
  }

  export type DesignSubClassListRelationFilter = {
    every?: DesignSubClassWhereInput
    some?: DesignSubClassWhereInput
    none?: DesignSubClassWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuthenticatorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScriptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DesignCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DesignSubClassOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AuthenticatorUserIdCredentialIDCompoundUniqueInput = {
    userId: string
    credentialID: string
  }

  export type AuthenticatorCountOrderByAggregateInput = {
    credentialID?: SortOrder
    userId?: SortOrder
    providerAccountId?: SortOrder
    credentialPublicKey?: SortOrder
    counter?: SortOrder
    credentialDeviceType?: SortOrder
    credentialBackedUp?: SortOrder
    transports?: SortOrder
  }

  export type AuthenticatorAvgOrderByAggregateInput = {
    counter?: SortOrder
  }

  export type AuthenticatorMaxOrderByAggregateInput = {
    credentialID?: SortOrder
    userId?: SortOrder
    providerAccountId?: SortOrder
    credentialPublicKey?: SortOrder
    counter?: SortOrder
    credentialDeviceType?: SortOrder
    credentialBackedUp?: SortOrder
    transports?: SortOrder
  }

  export type AuthenticatorMinOrderByAggregateInput = {
    credentialID?: SortOrder
    userId?: SortOrder
    providerAccountId?: SortOrder
    credentialPublicKey?: SortOrder
    counter?: SortOrder
    credentialDeviceType?: SortOrder
    credentialBackedUp?: SortOrder
    transports?: SortOrder
  }

  export type AuthenticatorSumOrderByAggregateInput = {
    counter?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumScriptStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ScriptStatus | EnumScriptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScriptStatus[] | ListEnumScriptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScriptStatus[] | ListEnumScriptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScriptStatusFilter<$PrismaModel> | $Enums.ScriptStatus
  }

  export type ProjectNullableScalarRelationFilter = {
    is?: ProjectWhereInput | null
    isNot?: ProjectWhereInput | null
  }

  export type SceneListRelationFilter = {
    every?: SceneWhereInput
    some?: SceneWhereInput
    none?: SceneWhereInput
  }

  export type SceneOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScriptCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    author?: SortOrder
    content?: SortOrder
    status?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    projectId?: SortOrder
  }

  export type ScriptAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type ScriptMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    author?: SortOrder
    status?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    projectId?: SortOrder
  }

  export type ScriptMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    author?: SortOrder
    status?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    projectId?: SortOrder
  }

  export type ScriptSumOrderByAggregateInput = {
    version?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumScriptStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScriptStatus | EnumScriptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScriptStatus[] | ListEnumScriptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScriptStatus[] | ListEnumScriptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScriptStatusWithAggregatesFilter<$PrismaModel> | $Enums.ScriptStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScriptStatusFilter<$PrismaModel>
    _max?: NestedEnumScriptStatusFilter<$PrismaModel>
  }

  export type ScriptScalarRelationFilter = {
    is?: ScriptWhereInput
    isNot?: ScriptWhereInput
  }

  export type SceneCountOrderByAggregateInput = {
    id?: SortOrder
    sceneNumber?: SortOrder
    heading?: SortOrder
    pageStart?: SortOrder
    scriptId?: SortOrder
  }

  export type SceneAvgOrderByAggregateInput = {
    sceneNumber?: SortOrder
    pageStart?: SortOrder
  }

  export type SceneMaxOrderByAggregateInput = {
    id?: SortOrder
    sceneNumber?: SortOrder
    heading?: SortOrder
    pageStart?: SortOrder
    scriptId?: SortOrder
  }

  export type SceneMinOrderByAggregateInput = {
    id?: SortOrder
    sceneNumber?: SortOrder
    heading?: SortOrder
    pageStart?: SortOrder
    scriptId?: SortOrder
  }

  export type SceneSumOrderByAggregateInput = {
    sceneNumber?: SortOrder
    pageStart?: SortOrder
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type DesignCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    projectId?: SortOrder
  }

  export type DesignCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    projectId?: SortOrder
  }

  export type DesignCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    projectId?: SortOrder
  }

  export type DesignCategoryNullableScalarRelationFilter = {
    is?: DesignCategoryWhereInput | null
    isNot?: DesignCategoryWhereInput | null
  }

  export type DesignSubClassVersionListRelationFilter = {
    every?: DesignSubClassVersionWhereInput
    some?: DesignSubClassVersionWhereInput
    none?: DesignSubClassVersionWhereInput
  }

  export type DesignSubClassVersionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DesignSubClassCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    categoryId?: SortOrder
  }

  export type DesignSubClassMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    categoryId?: SortOrder
  }

  export type DesignSubClassMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    categoryId?: SortOrder
  }

  export type DesignSubClassNullableScalarRelationFilter = {
    is?: DesignSubClassWhereInput | null
    isNot?: DesignSubClassWhereInput | null
  }

  export type DesignSubClassVersionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    DesignSubClassId?: SortOrder
  }

  export type DesignSubClassVersionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    DesignSubClassId?: SortOrder
  }

  export type DesignSubClassVersionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    DesignSubClassId?: SortOrder
  }

  export type UserProjectUserIdProjectIdCompoundUniqueInput = {
    userId: string
    projectId: string
  }

  export type UserProjectCountOrderByAggregateInput = {
    userId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserProjectMaxOrderByAggregateInput = {
    userId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserProjectMinOrderByAggregateInput = {
    userId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AuthenticatorCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthenticatorCreateWithoutUserInput, AuthenticatorUncheckedCreateWithoutUserInput> | AuthenticatorCreateWithoutUserInput[] | AuthenticatorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthenticatorCreateOrConnectWithoutUserInput | AuthenticatorCreateOrConnectWithoutUserInput[]
    createMany?: AuthenticatorCreateManyUserInputEnvelope
    connect?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
  }

  export type ScriptCreateNestedManyWithoutUserInput = {
    create?: XOR<ScriptCreateWithoutUserInput, ScriptUncheckedCreateWithoutUserInput> | ScriptCreateWithoutUserInput[] | ScriptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScriptCreateOrConnectWithoutUserInput | ScriptCreateOrConnectWithoutUserInput[]
    createMany?: ScriptCreateManyUserInputEnvelope
    connect?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
  }

  export type UserProjectCreateNestedManyWithoutUserInput = {
    create?: XOR<UserProjectCreateWithoutUserInput, UserProjectUncheckedCreateWithoutUserInput> | UserProjectCreateWithoutUserInput[] | UserProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserProjectCreateOrConnectWithoutUserInput | UserProjectCreateOrConnectWithoutUserInput[]
    createMany?: UserProjectCreateManyUserInputEnvelope
    connect?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
  }

  export type DesignCategoryCreateNestedManyWithoutUserInput = {
    create?: XOR<DesignCategoryCreateWithoutUserInput, DesignCategoryUncheckedCreateWithoutUserInput> | DesignCategoryCreateWithoutUserInput[] | DesignCategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DesignCategoryCreateOrConnectWithoutUserInput | DesignCategoryCreateOrConnectWithoutUserInput[]
    createMany?: DesignCategoryCreateManyUserInputEnvelope
    connect?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
  }

  export type DesignSubClassCreateNestedManyWithoutUserInput = {
    create?: XOR<DesignSubClassCreateWithoutUserInput, DesignSubClassUncheckedCreateWithoutUserInput> | DesignSubClassCreateWithoutUserInput[] | DesignSubClassUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DesignSubClassCreateOrConnectWithoutUserInput | DesignSubClassCreateOrConnectWithoutUserInput[]
    createMany?: DesignSubClassCreateManyUserInputEnvelope
    connect?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AuthenticatorUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthenticatorCreateWithoutUserInput, AuthenticatorUncheckedCreateWithoutUserInput> | AuthenticatorCreateWithoutUserInput[] | AuthenticatorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthenticatorCreateOrConnectWithoutUserInput | AuthenticatorCreateOrConnectWithoutUserInput[]
    createMany?: AuthenticatorCreateManyUserInputEnvelope
    connect?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
  }

  export type ScriptUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ScriptCreateWithoutUserInput, ScriptUncheckedCreateWithoutUserInput> | ScriptCreateWithoutUserInput[] | ScriptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScriptCreateOrConnectWithoutUserInput | ScriptCreateOrConnectWithoutUserInput[]
    createMany?: ScriptCreateManyUserInputEnvelope
    connect?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
  }

  export type UserProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserProjectCreateWithoutUserInput, UserProjectUncheckedCreateWithoutUserInput> | UserProjectCreateWithoutUserInput[] | UserProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserProjectCreateOrConnectWithoutUserInput | UserProjectCreateOrConnectWithoutUserInput[]
    createMany?: UserProjectCreateManyUserInputEnvelope
    connect?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
  }

  export type DesignCategoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DesignCategoryCreateWithoutUserInput, DesignCategoryUncheckedCreateWithoutUserInput> | DesignCategoryCreateWithoutUserInput[] | DesignCategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DesignCategoryCreateOrConnectWithoutUserInput | DesignCategoryCreateOrConnectWithoutUserInput[]
    createMany?: DesignCategoryCreateManyUserInputEnvelope
    connect?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
  }

  export type DesignSubClassUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DesignSubClassCreateWithoutUserInput, DesignSubClassUncheckedCreateWithoutUserInput> | DesignSubClassCreateWithoutUserInput[] | DesignSubClassUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DesignSubClassCreateOrConnectWithoutUserInput | DesignSubClassCreateOrConnectWithoutUserInput[]
    createMany?: DesignSubClassCreateManyUserInputEnvelope
    connect?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AuthenticatorUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthenticatorCreateWithoutUserInput, AuthenticatorUncheckedCreateWithoutUserInput> | AuthenticatorCreateWithoutUserInput[] | AuthenticatorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthenticatorCreateOrConnectWithoutUserInput | AuthenticatorCreateOrConnectWithoutUserInput[]
    upsert?: AuthenticatorUpsertWithWhereUniqueWithoutUserInput | AuthenticatorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthenticatorCreateManyUserInputEnvelope
    set?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
    disconnect?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
    delete?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
    connect?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
    update?: AuthenticatorUpdateWithWhereUniqueWithoutUserInput | AuthenticatorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthenticatorUpdateManyWithWhereWithoutUserInput | AuthenticatorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthenticatorScalarWhereInput | AuthenticatorScalarWhereInput[]
  }

  export type ScriptUpdateManyWithoutUserNestedInput = {
    create?: XOR<ScriptCreateWithoutUserInput, ScriptUncheckedCreateWithoutUserInput> | ScriptCreateWithoutUserInput[] | ScriptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScriptCreateOrConnectWithoutUserInput | ScriptCreateOrConnectWithoutUserInput[]
    upsert?: ScriptUpsertWithWhereUniqueWithoutUserInput | ScriptUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ScriptCreateManyUserInputEnvelope
    set?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
    disconnect?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
    delete?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
    connect?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
    update?: ScriptUpdateWithWhereUniqueWithoutUserInput | ScriptUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ScriptUpdateManyWithWhereWithoutUserInput | ScriptUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ScriptScalarWhereInput | ScriptScalarWhereInput[]
  }

  export type UserProjectUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserProjectCreateWithoutUserInput, UserProjectUncheckedCreateWithoutUserInput> | UserProjectCreateWithoutUserInput[] | UserProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserProjectCreateOrConnectWithoutUserInput | UserProjectCreateOrConnectWithoutUserInput[]
    upsert?: UserProjectUpsertWithWhereUniqueWithoutUserInput | UserProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserProjectCreateManyUserInputEnvelope
    set?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
    disconnect?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
    delete?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
    connect?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
    update?: UserProjectUpdateWithWhereUniqueWithoutUserInput | UserProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserProjectUpdateManyWithWhereWithoutUserInput | UserProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserProjectScalarWhereInput | UserProjectScalarWhereInput[]
  }

  export type DesignCategoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<DesignCategoryCreateWithoutUserInput, DesignCategoryUncheckedCreateWithoutUserInput> | DesignCategoryCreateWithoutUserInput[] | DesignCategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DesignCategoryCreateOrConnectWithoutUserInput | DesignCategoryCreateOrConnectWithoutUserInput[]
    upsert?: DesignCategoryUpsertWithWhereUniqueWithoutUserInput | DesignCategoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DesignCategoryCreateManyUserInputEnvelope
    set?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
    disconnect?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
    delete?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
    connect?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
    update?: DesignCategoryUpdateWithWhereUniqueWithoutUserInput | DesignCategoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DesignCategoryUpdateManyWithWhereWithoutUserInput | DesignCategoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DesignCategoryScalarWhereInput | DesignCategoryScalarWhereInput[]
  }

  export type DesignSubClassUpdateManyWithoutUserNestedInput = {
    create?: XOR<DesignSubClassCreateWithoutUserInput, DesignSubClassUncheckedCreateWithoutUserInput> | DesignSubClassCreateWithoutUserInput[] | DesignSubClassUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DesignSubClassCreateOrConnectWithoutUserInput | DesignSubClassCreateOrConnectWithoutUserInput[]
    upsert?: DesignSubClassUpsertWithWhereUniqueWithoutUserInput | DesignSubClassUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DesignSubClassCreateManyUserInputEnvelope
    set?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
    disconnect?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
    delete?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
    connect?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
    update?: DesignSubClassUpdateWithWhereUniqueWithoutUserInput | DesignSubClassUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DesignSubClassUpdateManyWithWhereWithoutUserInput | DesignSubClassUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DesignSubClassScalarWhereInput | DesignSubClassScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AuthenticatorUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthenticatorCreateWithoutUserInput, AuthenticatorUncheckedCreateWithoutUserInput> | AuthenticatorCreateWithoutUserInput[] | AuthenticatorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthenticatorCreateOrConnectWithoutUserInput | AuthenticatorCreateOrConnectWithoutUserInput[]
    upsert?: AuthenticatorUpsertWithWhereUniqueWithoutUserInput | AuthenticatorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthenticatorCreateManyUserInputEnvelope
    set?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
    disconnect?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
    delete?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
    connect?: AuthenticatorWhereUniqueInput | AuthenticatorWhereUniqueInput[]
    update?: AuthenticatorUpdateWithWhereUniqueWithoutUserInput | AuthenticatorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthenticatorUpdateManyWithWhereWithoutUserInput | AuthenticatorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthenticatorScalarWhereInput | AuthenticatorScalarWhereInput[]
  }

  export type ScriptUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ScriptCreateWithoutUserInput, ScriptUncheckedCreateWithoutUserInput> | ScriptCreateWithoutUserInput[] | ScriptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScriptCreateOrConnectWithoutUserInput | ScriptCreateOrConnectWithoutUserInput[]
    upsert?: ScriptUpsertWithWhereUniqueWithoutUserInput | ScriptUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ScriptCreateManyUserInputEnvelope
    set?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
    disconnect?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
    delete?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
    connect?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
    update?: ScriptUpdateWithWhereUniqueWithoutUserInput | ScriptUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ScriptUpdateManyWithWhereWithoutUserInput | ScriptUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ScriptScalarWhereInput | ScriptScalarWhereInput[]
  }

  export type UserProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserProjectCreateWithoutUserInput, UserProjectUncheckedCreateWithoutUserInput> | UserProjectCreateWithoutUserInput[] | UserProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserProjectCreateOrConnectWithoutUserInput | UserProjectCreateOrConnectWithoutUserInput[]
    upsert?: UserProjectUpsertWithWhereUniqueWithoutUserInput | UserProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserProjectCreateManyUserInputEnvelope
    set?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
    disconnect?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
    delete?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
    connect?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
    update?: UserProjectUpdateWithWhereUniqueWithoutUserInput | UserProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserProjectUpdateManyWithWhereWithoutUserInput | UserProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserProjectScalarWhereInput | UserProjectScalarWhereInput[]
  }

  export type DesignCategoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DesignCategoryCreateWithoutUserInput, DesignCategoryUncheckedCreateWithoutUserInput> | DesignCategoryCreateWithoutUserInput[] | DesignCategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DesignCategoryCreateOrConnectWithoutUserInput | DesignCategoryCreateOrConnectWithoutUserInput[]
    upsert?: DesignCategoryUpsertWithWhereUniqueWithoutUserInput | DesignCategoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DesignCategoryCreateManyUserInputEnvelope
    set?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
    disconnect?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
    delete?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
    connect?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
    update?: DesignCategoryUpdateWithWhereUniqueWithoutUserInput | DesignCategoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DesignCategoryUpdateManyWithWhereWithoutUserInput | DesignCategoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DesignCategoryScalarWhereInput | DesignCategoryScalarWhereInput[]
  }

  export type DesignSubClassUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DesignSubClassCreateWithoutUserInput, DesignSubClassUncheckedCreateWithoutUserInput> | DesignSubClassCreateWithoutUserInput[] | DesignSubClassUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DesignSubClassCreateOrConnectWithoutUserInput | DesignSubClassCreateOrConnectWithoutUserInput[]
    upsert?: DesignSubClassUpsertWithWhereUniqueWithoutUserInput | DesignSubClassUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DesignSubClassCreateManyUserInputEnvelope
    set?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
    disconnect?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
    delete?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
    connect?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
    update?: DesignSubClassUpdateWithWhereUniqueWithoutUserInput | DesignSubClassUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DesignSubClassUpdateManyWithWhereWithoutUserInput | DesignSubClassUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DesignSubClassScalarWhereInput | DesignSubClassScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAuthenticatorInput = {
    create?: XOR<UserCreateWithoutAuthenticatorInput, UserUncheckedCreateWithoutAuthenticatorInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthenticatorInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutAuthenticatorNestedInput = {
    create?: XOR<UserCreateWithoutAuthenticatorInput, UserUncheckedCreateWithoutAuthenticatorInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthenticatorInput
    upsert?: UserUpsertWithoutAuthenticatorInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuthenticatorInput, UserUpdateWithoutAuthenticatorInput>, UserUncheckedUpdateWithoutAuthenticatorInput>
  }

  export type UserProjectCreateNestedManyWithoutProjectInput = {
    create?: XOR<UserProjectCreateWithoutProjectInput, UserProjectUncheckedCreateWithoutProjectInput> | UserProjectCreateWithoutProjectInput[] | UserProjectUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: UserProjectCreateOrConnectWithoutProjectInput | UserProjectCreateOrConnectWithoutProjectInput[]
    createMany?: UserProjectCreateManyProjectInputEnvelope
    connect?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
  }

  export type ScriptCreateNestedManyWithoutProjectInput = {
    create?: XOR<ScriptCreateWithoutProjectInput, ScriptUncheckedCreateWithoutProjectInput> | ScriptCreateWithoutProjectInput[] | ScriptUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ScriptCreateOrConnectWithoutProjectInput | ScriptCreateOrConnectWithoutProjectInput[]
    createMany?: ScriptCreateManyProjectInputEnvelope
    connect?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
  }

  export type DesignCategoryCreateNestedManyWithoutProjectInput = {
    create?: XOR<DesignCategoryCreateWithoutProjectInput, DesignCategoryUncheckedCreateWithoutProjectInput> | DesignCategoryCreateWithoutProjectInput[] | DesignCategoryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DesignCategoryCreateOrConnectWithoutProjectInput | DesignCategoryCreateOrConnectWithoutProjectInput[]
    createMany?: DesignCategoryCreateManyProjectInputEnvelope
    connect?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
  }

  export type UserProjectUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<UserProjectCreateWithoutProjectInput, UserProjectUncheckedCreateWithoutProjectInput> | UserProjectCreateWithoutProjectInput[] | UserProjectUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: UserProjectCreateOrConnectWithoutProjectInput | UserProjectCreateOrConnectWithoutProjectInput[]
    createMany?: UserProjectCreateManyProjectInputEnvelope
    connect?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
  }

  export type ScriptUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ScriptCreateWithoutProjectInput, ScriptUncheckedCreateWithoutProjectInput> | ScriptCreateWithoutProjectInput[] | ScriptUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ScriptCreateOrConnectWithoutProjectInput | ScriptCreateOrConnectWithoutProjectInput[]
    createMany?: ScriptCreateManyProjectInputEnvelope
    connect?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
  }

  export type DesignCategoryUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<DesignCategoryCreateWithoutProjectInput, DesignCategoryUncheckedCreateWithoutProjectInput> | DesignCategoryCreateWithoutProjectInput[] | DesignCategoryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DesignCategoryCreateOrConnectWithoutProjectInput | DesignCategoryCreateOrConnectWithoutProjectInput[]
    createMany?: DesignCategoryCreateManyProjectInputEnvelope
    connect?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
  }

  export type UserProjectUpdateManyWithoutProjectNestedInput = {
    create?: XOR<UserProjectCreateWithoutProjectInput, UserProjectUncheckedCreateWithoutProjectInput> | UserProjectCreateWithoutProjectInput[] | UserProjectUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: UserProjectCreateOrConnectWithoutProjectInput | UserProjectCreateOrConnectWithoutProjectInput[]
    upsert?: UserProjectUpsertWithWhereUniqueWithoutProjectInput | UserProjectUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: UserProjectCreateManyProjectInputEnvelope
    set?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
    disconnect?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
    delete?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
    connect?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
    update?: UserProjectUpdateWithWhereUniqueWithoutProjectInput | UserProjectUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: UserProjectUpdateManyWithWhereWithoutProjectInput | UserProjectUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: UserProjectScalarWhereInput | UserProjectScalarWhereInput[]
  }

  export type ScriptUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ScriptCreateWithoutProjectInput, ScriptUncheckedCreateWithoutProjectInput> | ScriptCreateWithoutProjectInput[] | ScriptUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ScriptCreateOrConnectWithoutProjectInput | ScriptCreateOrConnectWithoutProjectInput[]
    upsert?: ScriptUpsertWithWhereUniqueWithoutProjectInput | ScriptUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ScriptCreateManyProjectInputEnvelope
    set?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
    disconnect?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
    delete?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
    connect?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
    update?: ScriptUpdateWithWhereUniqueWithoutProjectInput | ScriptUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ScriptUpdateManyWithWhereWithoutProjectInput | ScriptUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ScriptScalarWhereInput | ScriptScalarWhereInput[]
  }

  export type DesignCategoryUpdateManyWithoutProjectNestedInput = {
    create?: XOR<DesignCategoryCreateWithoutProjectInput, DesignCategoryUncheckedCreateWithoutProjectInput> | DesignCategoryCreateWithoutProjectInput[] | DesignCategoryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DesignCategoryCreateOrConnectWithoutProjectInput | DesignCategoryCreateOrConnectWithoutProjectInput[]
    upsert?: DesignCategoryUpsertWithWhereUniqueWithoutProjectInput | DesignCategoryUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: DesignCategoryCreateManyProjectInputEnvelope
    set?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
    disconnect?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
    delete?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
    connect?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
    update?: DesignCategoryUpdateWithWhereUniqueWithoutProjectInput | DesignCategoryUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: DesignCategoryUpdateManyWithWhereWithoutProjectInput | DesignCategoryUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: DesignCategoryScalarWhereInput | DesignCategoryScalarWhereInput[]
  }

  export type UserProjectUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<UserProjectCreateWithoutProjectInput, UserProjectUncheckedCreateWithoutProjectInput> | UserProjectCreateWithoutProjectInput[] | UserProjectUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: UserProjectCreateOrConnectWithoutProjectInput | UserProjectCreateOrConnectWithoutProjectInput[]
    upsert?: UserProjectUpsertWithWhereUniqueWithoutProjectInput | UserProjectUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: UserProjectCreateManyProjectInputEnvelope
    set?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
    disconnect?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
    delete?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
    connect?: UserProjectWhereUniqueInput | UserProjectWhereUniqueInput[]
    update?: UserProjectUpdateWithWhereUniqueWithoutProjectInput | UserProjectUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: UserProjectUpdateManyWithWhereWithoutProjectInput | UserProjectUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: UserProjectScalarWhereInput | UserProjectScalarWhereInput[]
  }

  export type ScriptUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ScriptCreateWithoutProjectInput, ScriptUncheckedCreateWithoutProjectInput> | ScriptCreateWithoutProjectInput[] | ScriptUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ScriptCreateOrConnectWithoutProjectInput | ScriptCreateOrConnectWithoutProjectInput[]
    upsert?: ScriptUpsertWithWhereUniqueWithoutProjectInput | ScriptUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ScriptCreateManyProjectInputEnvelope
    set?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
    disconnect?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
    delete?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
    connect?: ScriptWhereUniqueInput | ScriptWhereUniqueInput[]
    update?: ScriptUpdateWithWhereUniqueWithoutProjectInput | ScriptUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ScriptUpdateManyWithWhereWithoutProjectInput | ScriptUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ScriptScalarWhereInput | ScriptScalarWhereInput[]
  }

  export type DesignCategoryUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<DesignCategoryCreateWithoutProjectInput, DesignCategoryUncheckedCreateWithoutProjectInput> | DesignCategoryCreateWithoutProjectInput[] | DesignCategoryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DesignCategoryCreateOrConnectWithoutProjectInput | DesignCategoryCreateOrConnectWithoutProjectInput[]
    upsert?: DesignCategoryUpsertWithWhereUniqueWithoutProjectInput | DesignCategoryUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: DesignCategoryCreateManyProjectInputEnvelope
    set?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
    disconnect?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
    delete?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
    connect?: DesignCategoryWhereUniqueInput | DesignCategoryWhereUniqueInput[]
    update?: DesignCategoryUpdateWithWhereUniqueWithoutProjectInput | DesignCategoryUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: DesignCategoryUpdateManyWithWhereWithoutProjectInput | DesignCategoryUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: DesignCategoryScalarWhereInput | DesignCategoryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutScriptOwnerInput = {
    create?: XOR<UserCreateWithoutScriptOwnerInput, UserUncheckedCreateWithoutScriptOwnerInput>
    connectOrCreate?: UserCreateOrConnectWithoutScriptOwnerInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutScriptsInput = {
    create?: XOR<ProjectCreateWithoutScriptsInput, ProjectUncheckedCreateWithoutScriptsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutScriptsInput
    connect?: ProjectWhereUniqueInput
  }

  export type SceneCreateNestedManyWithoutScriptInput = {
    create?: XOR<SceneCreateWithoutScriptInput, SceneUncheckedCreateWithoutScriptInput> | SceneCreateWithoutScriptInput[] | SceneUncheckedCreateWithoutScriptInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutScriptInput | SceneCreateOrConnectWithoutScriptInput[]
    createMany?: SceneCreateManyScriptInputEnvelope
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
  }

  export type SceneUncheckedCreateNestedManyWithoutScriptInput = {
    create?: XOR<SceneCreateWithoutScriptInput, SceneUncheckedCreateWithoutScriptInput> | SceneCreateWithoutScriptInput[] | SceneUncheckedCreateWithoutScriptInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutScriptInput | SceneCreateOrConnectWithoutScriptInput[]
    createMany?: SceneCreateManyScriptInputEnvelope
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
  }

  export type EnumScriptStatusFieldUpdateOperationsInput = {
    set?: $Enums.ScriptStatus
  }

  export type UserUpdateOneRequiredWithoutScriptOwnerNestedInput = {
    create?: XOR<UserCreateWithoutScriptOwnerInput, UserUncheckedCreateWithoutScriptOwnerInput>
    connectOrCreate?: UserCreateOrConnectWithoutScriptOwnerInput
    upsert?: UserUpsertWithoutScriptOwnerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutScriptOwnerInput, UserUpdateWithoutScriptOwnerInput>, UserUncheckedUpdateWithoutScriptOwnerInput>
  }

  export type ProjectUpdateOneWithoutScriptsNestedInput = {
    create?: XOR<ProjectCreateWithoutScriptsInput, ProjectUncheckedCreateWithoutScriptsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutScriptsInput
    upsert?: ProjectUpsertWithoutScriptsInput
    disconnect?: ProjectWhereInput | boolean
    delete?: ProjectWhereInput | boolean
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutScriptsInput, ProjectUpdateWithoutScriptsInput>, ProjectUncheckedUpdateWithoutScriptsInput>
  }

  export type SceneUpdateManyWithoutScriptNestedInput = {
    create?: XOR<SceneCreateWithoutScriptInput, SceneUncheckedCreateWithoutScriptInput> | SceneCreateWithoutScriptInput[] | SceneUncheckedCreateWithoutScriptInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutScriptInput | SceneCreateOrConnectWithoutScriptInput[]
    upsert?: SceneUpsertWithWhereUniqueWithoutScriptInput | SceneUpsertWithWhereUniqueWithoutScriptInput[]
    createMany?: SceneCreateManyScriptInputEnvelope
    set?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    disconnect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    delete?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    update?: SceneUpdateWithWhereUniqueWithoutScriptInput | SceneUpdateWithWhereUniqueWithoutScriptInput[]
    updateMany?: SceneUpdateManyWithWhereWithoutScriptInput | SceneUpdateManyWithWhereWithoutScriptInput[]
    deleteMany?: SceneScalarWhereInput | SceneScalarWhereInput[]
  }

  export type SceneUncheckedUpdateManyWithoutScriptNestedInput = {
    create?: XOR<SceneCreateWithoutScriptInput, SceneUncheckedCreateWithoutScriptInput> | SceneCreateWithoutScriptInput[] | SceneUncheckedCreateWithoutScriptInput[]
    connectOrCreate?: SceneCreateOrConnectWithoutScriptInput | SceneCreateOrConnectWithoutScriptInput[]
    upsert?: SceneUpsertWithWhereUniqueWithoutScriptInput | SceneUpsertWithWhereUniqueWithoutScriptInput[]
    createMany?: SceneCreateManyScriptInputEnvelope
    set?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    disconnect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    delete?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    connect?: SceneWhereUniqueInput | SceneWhereUniqueInput[]
    update?: SceneUpdateWithWhereUniqueWithoutScriptInput | SceneUpdateWithWhereUniqueWithoutScriptInput[]
    updateMany?: SceneUpdateManyWithWhereWithoutScriptInput | SceneUpdateManyWithWhereWithoutScriptInput[]
    deleteMany?: SceneScalarWhereInput | SceneScalarWhereInput[]
  }

  export type ScriptCreateNestedOneWithoutScenesInput = {
    create?: XOR<ScriptCreateWithoutScenesInput, ScriptUncheckedCreateWithoutScenesInput>
    connectOrCreate?: ScriptCreateOrConnectWithoutScenesInput
    connect?: ScriptWhereUniqueInput
  }

  export type ScriptUpdateOneRequiredWithoutScenesNestedInput = {
    create?: XOR<ScriptCreateWithoutScenesInput, ScriptUncheckedCreateWithoutScenesInput>
    connectOrCreate?: ScriptCreateOrConnectWithoutScenesInput
    upsert?: ScriptUpsertWithoutScenesInput
    connect?: ScriptWhereUniqueInput
    update?: XOR<XOR<ScriptUpdateToOneWithWhereWithoutScenesInput, ScriptUpdateWithoutScenesInput>, ScriptUncheckedUpdateWithoutScenesInput>
  }

  export type UserCreateNestedOneWithoutDesignCategoryOwnerInput = {
    create?: XOR<UserCreateWithoutDesignCategoryOwnerInput, UserUncheckedCreateWithoutDesignCategoryOwnerInput>
    connectOrCreate?: UserCreateOrConnectWithoutDesignCategoryOwnerInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutDesignCategoriesInput = {
    create?: XOR<ProjectCreateWithoutDesignCategoriesInput, ProjectUncheckedCreateWithoutDesignCategoriesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutDesignCategoriesInput
    connect?: ProjectWhereUniqueInput
  }

  export type DesignSubClassCreateNestedManyWithoutCategoryInput = {
    create?: XOR<DesignSubClassCreateWithoutCategoryInput, DesignSubClassUncheckedCreateWithoutCategoryInput> | DesignSubClassCreateWithoutCategoryInput[] | DesignSubClassUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: DesignSubClassCreateOrConnectWithoutCategoryInput | DesignSubClassCreateOrConnectWithoutCategoryInput[]
    createMany?: DesignSubClassCreateManyCategoryInputEnvelope
    connect?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
  }

  export type DesignSubClassUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<DesignSubClassCreateWithoutCategoryInput, DesignSubClassUncheckedCreateWithoutCategoryInput> | DesignSubClassCreateWithoutCategoryInput[] | DesignSubClassUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: DesignSubClassCreateOrConnectWithoutCategoryInput | DesignSubClassCreateOrConnectWithoutCategoryInput[]
    createMany?: DesignSubClassCreateManyCategoryInputEnvelope
    connect?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutDesignCategoryOwnerNestedInput = {
    create?: XOR<UserCreateWithoutDesignCategoryOwnerInput, UserUncheckedCreateWithoutDesignCategoryOwnerInput>
    connectOrCreate?: UserCreateOrConnectWithoutDesignCategoryOwnerInput
    upsert?: UserUpsertWithoutDesignCategoryOwnerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDesignCategoryOwnerInput, UserUpdateWithoutDesignCategoryOwnerInput>, UserUncheckedUpdateWithoutDesignCategoryOwnerInput>
  }

  export type ProjectUpdateOneRequiredWithoutDesignCategoriesNestedInput = {
    create?: XOR<ProjectCreateWithoutDesignCategoriesInput, ProjectUncheckedCreateWithoutDesignCategoriesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutDesignCategoriesInput
    upsert?: ProjectUpsertWithoutDesignCategoriesInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutDesignCategoriesInput, ProjectUpdateWithoutDesignCategoriesInput>, ProjectUncheckedUpdateWithoutDesignCategoriesInput>
  }

  export type DesignSubClassUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<DesignSubClassCreateWithoutCategoryInput, DesignSubClassUncheckedCreateWithoutCategoryInput> | DesignSubClassCreateWithoutCategoryInput[] | DesignSubClassUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: DesignSubClassCreateOrConnectWithoutCategoryInput | DesignSubClassCreateOrConnectWithoutCategoryInput[]
    upsert?: DesignSubClassUpsertWithWhereUniqueWithoutCategoryInput | DesignSubClassUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: DesignSubClassCreateManyCategoryInputEnvelope
    set?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
    disconnect?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
    delete?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
    connect?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
    update?: DesignSubClassUpdateWithWhereUniqueWithoutCategoryInput | DesignSubClassUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: DesignSubClassUpdateManyWithWhereWithoutCategoryInput | DesignSubClassUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: DesignSubClassScalarWhereInput | DesignSubClassScalarWhereInput[]
  }

  export type DesignSubClassUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<DesignSubClassCreateWithoutCategoryInput, DesignSubClassUncheckedCreateWithoutCategoryInput> | DesignSubClassCreateWithoutCategoryInput[] | DesignSubClassUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: DesignSubClassCreateOrConnectWithoutCategoryInput | DesignSubClassCreateOrConnectWithoutCategoryInput[]
    upsert?: DesignSubClassUpsertWithWhereUniqueWithoutCategoryInput | DesignSubClassUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: DesignSubClassCreateManyCategoryInputEnvelope
    set?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
    disconnect?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
    delete?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
    connect?: DesignSubClassWhereUniqueInput | DesignSubClassWhereUniqueInput[]
    update?: DesignSubClassUpdateWithWhereUniqueWithoutCategoryInput | DesignSubClassUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: DesignSubClassUpdateManyWithWhereWithoutCategoryInput | DesignSubClassUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: DesignSubClassScalarWhereInput | DesignSubClassScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDesignOwnerInput = {
    create?: XOR<UserCreateWithoutDesignOwnerInput, UserUncheckedCreateWithoutDesignOwnerInput>
    connectOrCreate?: UserCreateOrConnectWithoutDesignOwnerInput
    connect?: UserWhereUniqueInput
  }

  export type DesignCategoryCreateNestedOneWithoutDesignsInput = {
    create?: XOR<DesignCategoryCreateWithoutDesignsInput, DesignCategoryUncheckedCreateWithoutDesignsInput>
    connectOrCreate?: DesignCategoryCreateOrConnectWithoutDesignsInput
    connect?: DesignCategoryWhereUniqueInput
  }

  export type DesignSubClassVersionCreateNestedManyWithoutDesignSubClassInput = {
    create?: XOR<DesignSubClassVersionCreateWithoutDesignSubClassInput, DesignSubClassVersionUncheckedCreateWithoutDesignSubClassInput> | DesignSubClassVersionCreateWithoutDesignSubClassInput[] | DesignSubClassVersionUncheckedCreateWithoutDesignSubClassInput[]
    connectOrCreate?: DesignSubClassVersionCreateOrConnectWithoutDesignSubClassInput | DesignSubClassVersionCreateOrConnectWithoutDesignSubClassInput[]
    createMany?: DesignSubClassVersionCreateManyDesignSubClassInputEnvelope
    connect?: DesignSubClassVersionWhereUniqueInput | DesignSubClassVersionWhereUniqueInput[]
  }

  export type DesignSubClassVersionUncheckedCreateNestedManyWithoutDesignSubClassInput = {
    create?: XOR<DesignSubClassVersionCreateWithoutDesignSubClassInput, DesignSubClassVersionUncheckedCreateWithoutDesignSubClassInput> | DesignSubClassVersionCreateWithoutDesignSubClassInput[] | DesignSubClassVersionUncheckedCreateWithoutDesignSubClassInput[]
    connectOrCreate?: DesignSubClassVersionCreateOrConnectWithoutDesignSubClassInput | DesignSubClassVersionCreateOrConnectWithoutDesignSubClassInput[]
    createMany?: DesignSubClassVersionCreateManyDesignSubClassInputEnvelope
    connect?: DesignSubClassVersionWhereUniqueInput | DesignSubClassVersionWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutDesignOwnerNestedInput = {
    create?: XOR<UserCreateWithoutDesignOwnerInput, UserUncheckedCreateWithoutDesignOwnerInput>
    connectOrCreate?: UserCreateOrConnectWithoutDesignOwnerInput
    upsert?: UserUpsertWithoutDesignOwnerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDesignOwnerInput, UserUpdateWithoutDesignOwnerInput>, UserUncheckedUpdateWithoutDesignOwnerInput>
  }

  export type DesignCategoryUpdateOneWithoutDesignsNestedInput = {
    create?: XOR<DesignCategoryCreateWithoutDesignsInput, DesignCategoryUncheckedCreateWithoutDesignsInput>
    connectOrCreate?: DesignCategoryCreateOrConnectWithoutDesignsInput
    upsert?: DesignCategoryUpsertWithoutDesignsInput
    disconnect?: DesignCategoryWhereInput | boolean
    delete?: DesignCategoryWhereInput | boolean
    connect?: DesignCategoryWhereUniqueInput
    update?: XOR<XOR<DesignCategoryUpdateToOneWithWhereWithoutDesignsInput, DesignCategoryUpdateWithoutDesignsInput>, DesignCategoryUncheckedUpdateWithoutDesignsInput>
  }

  export type DesignSubClassVersionUpdateManyWithoutDesignSubClassNestedInput = {
    create?: XOR<DesignSubClassVersionCreateWithoutDesignSubClassInput, DesignSubClassVersionUncheckedCreateWithoutDesignSubClassInput> | DesignSubClassVersionCreateWithoutDesignSubClassInput[] | DesignSubClassVersionUncheckedCreateWithoutDesignSubClassInput[]
    connectOrCreate?: DesignSubClassVersionCreateOrConnectWithoutDesignSubClassInput | DesignSubClassVersionCreateOrConnectWithoutDesignSubClassInput[]
    upsert?: DesignSubClassVersionUpsertWithWhereUniqueWithoutDesignSubClassInput | DesignSubClassVersionUpsertWithWhereUniqueWithoutDesignSubClassInput[]
    createMany?: DesignSubClassVersionCreateManyDesignSubClassInputEnvelope
    set?: DesignSubClassVersionWhereUniqueInput | DesignSubClassVersionWhereUniqueInput[]
    disconnect?: DesignSubClassVersionWhereUniqueInput | DesignSubClassVersionWhereUniqueInput[]
    delete?: DesignSubClassVersionWhereUniqueInput | DesignSubClassVersionWhereUniqueInput[]
    connect?: DesignSubClassVersionWhereUniqueInput | DesignSubClassVersionWhereUniqueInput[]
    update?: DesignSubClassVersionUpdateWithWhereUniqueWithoutDesignSubClassInput | DesignSubClassVersionUpdateWithWhereUniqueWithoutDesignSubClassInput[]
    updateMany?: DesignSubClassVersionUpdateManyWithWhereWithoutDesignSubClassInput | DesignSubClassVersionUpdateManyWithWhereWithoutDesignSubClassInput[]
    deleteMany?: DesignSubClassVersionScalarWhereInput | DesignSubClassVersionScalarWhereInput[]
  }

  export type DesignSubClassVersionUncheckedUpdateManyWithoutDesignSubClassNestedInput = {
    create?: XOR<DesignSubClassVersionCreateWithoutDesignSubClassInput, DesignSubClassVersionUncheckedCreateWithoutDesignSubClassInput> | DesignSubClassVersionCreateWithoutDesignSubClassInput[] | DesignSubClassVersionUncheckedCreateWithoutDesignSubClassInput[]
    connectOrCreate?: DesignSubClassVersionCreateOrConnectWithoutDesignSubClassInput | DesignSubClassVersionCreateOrConnectWithoutDesignSubClassInput[]
    upsert?: DesignSubClassVersionUpsertWithWhereUniqueWithoutDesignSubClassInput | DesignSubClassVersionUpsertWithWhereUniqueWithoutDesignSubClassInput[]
    createMany?: DesignSubClassVersionCreateManyDesignSubClassInputEnvelope
    set?: DesignSubClassVersionWhereUniqueInput | DesignSubClassVersionWhereUniqueInput[]
    disconnect?: DesignSubClassVersionWhereUniqueInput | DesignSubClassVersionWhereUniqueInput[]
    delete?: DesignSubClassVersionWhereUniqueInput | DesignSubClassVersionWhereUniqueInput[]
    connect?: DesignSubClassVersionWhereUniqueInput | DesignSubClassVersionWhereUniqueInput[]
    update?: DesignSubClassVersionUpdateWithWhereUniqueWithoutDesignSubClassInput | DesignSubClassVersionUpdateWithWhereUniqueWithoutDesignSubClassInput[]
    updateMany?: DesignSubClassVersionUpdateManyWithWhereWithoutDesignSubClassInput | DesignSubClassVersionUpdateManyWithWhereWithoutDesignSubClassInput[]
    deleteMany?: DesignSubClassVersionScalarWhereInput | DesignSubClassVersionScalarWhereInput[]
  }

  export type DesignSubClassCreateNestedOneWithoutVersionsInput = {
    create?: XOR<DesignSubClassCreateWithoutVersionsInput, DesignSubClassUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: DesignSubClassCreateOrConnectWithoutVersionsInput
    connect?: DesignSubClassWhereUniqueInput
  }

  export type DesignSubClassUpdateOneWithoutVersionsNestedInput = {
    create?: XOR<DesignSubClassCreateWithoutVersionsInput, DesignSubClassUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: DesignSubClassCreateOrConnectWithoutVersionsInput
    upsert?: DesignSubClassUpsertWithoutVersionsInput
    disconnect?: DesignSubClassWhereInput | boolean
    delete?: DesignSubClassWhereInput | boolean
    connect?: DesignSubClassWhereUniqueInput
    update?: XOR<XOR<DesignSubClassUpdateToOneWithWhereWithoutVersionsInput, DesignSubClassUpdateWithoutVersionsInput>, DesignSubClassUncheckedUpdateWithoutVersionsInput>
  }

  export type ProjectCreateNestedOneWithoutProjectMembersInput = {
    create?: XOR<ProjectCreateWithoutProjectMembersInput, ProjectUncheckedCreateWithoutProjectMembersInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutProjectMembersInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProjectMembersInput = {
    create?: XOR<UserCreateWithoutProjectMembersInput, UserUncheckedCreateWithoutProjectMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectMembersInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutProjectMembersNestedInput = {
    create?: XOR<ProjectCreateWithoutProjectMembersInput, ProjectUncheckedCreateWithoutProjectMembersInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutProjectMembersInput
    upsert?: ProjectUpsertWithoutProjectMembersInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutProjectMembersInput, ProjectUpdateWithoutProjectMembersInput>, ProjectUncheckedUpdateWithoutProjectMembersInput>
  }

  export type UserUpdateOneRequiredWithoutProjectMembersNestedInput = {
    create?: XOR<UserCreateWithoutProjectMembersInput, UserUncheckedCreateWithoutProjectMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectMembersInput
    upsert?: UserUpsertWithoutProjectMembersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectMembersInput, UserUpdateWithoutProjectMembersInput>, UserUncheckedUpdateWithoutProjectMembersInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumScriptStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ScriptStatus | EnumScriptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScriptStatus[] | ListEnumScriptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScriptStatus[] | ListEnumScriptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScriptStatusFilter<$PrismaModel> | $Enums.ScriptStatus
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumScriptStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScriptStatus | EnumScriptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScriptStatus[] | ListEnumScriptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScriptStatus[] | ListEnumScriptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScriptStatusWithAggregatesFilter<$PrismaModel> | $Enums.ScriptStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScriptStatusFilter<$PrismaModel>
    _max?: NestedEnumScriptStatusFilter<$PrismaModel>
  }

  export type AccountCreateWithoutUserInput = {
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuthenticatorCreateWithoutUserInput = {
    credentialID: string
    providerAccountId: string
    credentialPublicKey: string
    counter: number
    credentialDeviceType: string
    credentialBackedUp: boolean
    transports?: string | null
  }

  export type AuthenticatorUncheckedCreateWithoutUserInput = {
    credentialID: string
    providerAccountId: string
    credentialPublicKey: string
    counter: number
    credentialDeviceType: string
    credentialBackedUp: boolean
    transports?: string | null
  }

  export type AuthenticatorCreateOrConnectWithoutUserInput = {
    where: AuthenticatorWhereUniqueInput
    create: XOR<AuthenticatorCreateWithoutUserInput, AuthenticatorUncheckedCreateWithoutUserInput>
  }

  export type AuthenticatorCreateManyUserInputEnvelope = {
    data: AuthenticatorCreateManyUserInput | AuthenticatorCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ScriptCreateWithoutUserInput = {
    id?: string
    title: string
    description?: string | null
    author?: string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: $Enums.ScriptStatus
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    project?: ProjectCreateNestedOneWithoutScriptsInput
    scenes?: SceneCreateNestedManyWithoutScriptInput
  }

  export type ScriptUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    description?: string | null
    author?: string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: $Enums.ScriptStatus
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    projectId?: string | null
    scenes?: SceneUncheckedCreateNestedManyWithoutScriptInput
  }

  export type ScriptCreateOrConnectWithoutUserInput = {
    where: ScriptWhereUniqueInput
    create: XOR<ScriptCreateWithoutUserInput, ScriptUncheckedCreateWithoutUserInput>
  }

  export type ScriptCreateManyUserInputEnvelope = {
    data: ScriptCreateManyUserInput | ScriptCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserProjectCreateWithoutUserInput = {
    role: string
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutProjectMembersInput
  }

  export type UserProjectUncheckedCreateWithoutUserInput = {
    projectId: string
    role: string
    createdAt?: Date | string
  }

  export type UserProjectCreateOrConnectWithoutUserInput = {
    where: UserProjectWhereUniqueInput
    create: XOR<UserProjectCreateWithoutUserInput, UserProjectUncheckedCreateWithoutUserInput>
  }

  export type UserProjectCreateManyUserInputEnvelope = {
    data: UserProjectCreateManyUserInput | UserProjectCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DesignCategoryCreateWithoutUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutDesignCategoriesInput
    designs?: DesignSubClassCreateNestedManyWithoutCategoryInput
  }

  export type DesignCategoryUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projectId: string
    designs?: DesignSubClassUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type DesignCategoryCreateOrConnectWithoutUserInput = {
    where: DesignCategoryWhereUniqueInput
    create: XOR<DesignCategoryCreateWithoutUserInput, DesignCategoryUncheckedCreateWithoutUserInput>
  }

  export type DesignCategoryCreateManyUserInputEnvelope = {
    data: DesignCategoryCreateManyUserInput | DesignCategoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DesignSubClassCreateWithoutUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: DesignCategoryCreateNestedOneWithoutDesignsInput
    versions?: DesignSubClassVersionCreateNestedManyWithoutDesignSubClassInput
  }

  export type DesignSubClassUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId?: string | null
    versions?: DesignSubClassVersionUncheckedCreateNestedManyWithoutDesignSubClassInput
  }

  export type DesignSubClassCreateOrConnectWithoutUserInput = {
    where: DesignSubClassWhereUniqueInput
    create: XOR<DesignSubClassCreateWithoutUserInput, DesignSubClassUncheckedCreateWithoutUserInput>
  }

  export type DesignSubClassCreateManyUserInputEnvelope = {
    data: DesignSubClassCreateManyUserInput | DesignSubClassCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type AuthenticatorUpsertWithWhereUniqueWithoutUserInput = {
    where: AuthenticatorWhereUniqueInput
    update: XOR<AuthenticatorUpdateWithoutUserInput, AuthenticatorUncheckedUpdateWithoutUserInput>
    create: XOR<AuthenticatorCreateWithoutUserInput, AuthenticatorUncheckedCreateWithoutUserInput>
  }

  export type AuthenticatorUpdateWithWhereUniqueWithoutUserInput = {
    where: AuthenticatorWhereUniqueInput
    data: XOR<AuthenticatorUpdateWithoutUserInput, AuthenticatorUncheckedUpdateWithoutUserInput>
  }

  export type AuthenticatorUpdateManyWithWhereWithoutUserInput = {
    where: AuthenticatorScalarWhereInput
    data: XOR<AuthenticatorUpdateManyMutationInput, AuthenticatorUncheckedUpdateManyWithoutUserInput>
  }

  export type AuthenticatorScalarWhereInput = {
    AND?: AuthenticatorScalarWhereInput | AuthenticatorScalarWhereInput[]
    OR?: AuthenticatorScalarWhereInput[]
    NOT?: AuthenticatorScalarWhereInput | AuthenticatorScalarWhereInput[]
    credentialID?: StringFilter<"Authenticator"> | string
    userId?: StringFilter<"Authenticator"> | string
    providerAccountId?: StringFilter<"Authenticator"> | string
    credentialPublicKey?: StringFilter<"Authenticator"> | string
    counter?: IntFilter<"Authenticator"> | number
    credentialDeviceType?: StringFilter<"Authenticator"> | string
    credentialBackedUp?: BoolFilter<"Authenticator"> | boolean
    transports?: StringNullableFilter<"Authenticator"> | string | null
  }

  export type ScriptUpsertWithWhereUniqueWithoutUserInput = {
    where: ScriptWhereUniqueInput
    update: XOR<ScriptUpdateWithoutUserInput, ScriptUncheckedUpdateWithoutUserInput>
    create: XOR<ScriptCreateWithoutUserInput, ScriptUncheckedCreateWithoutUserInput>
  }

  export type ScriptUpdateWithWhereUniqueWithoutUserInput = {
    where: ScriptWhereUniqueInput
    data: XOR<ScriptUpdateWithoutUserInput, ScriptUncheckedUpdateWithoutUserInput>
  }

  export type ScriptUpdateManyWithWhereWithoutUserInput = {
    where: ScriptScalarWhereInput
    data: XOR<ScriptUpdateManyMutationInput, ScriptUncheckedUpdateManyWithoutUserInput>
  }

  export type ScriptScalarWhereInput = {
    AND?: ScriptScalarWhereInput | ScriptScalarWhereInput[]
    OR?: ScriptScalarWhereInput[]
    NOT?: ScriptScalarWhereInput | ScriptScalarWhereInput[]
    id?: StringFilter<"Script"> | string
    title?: StringFilter<"Script"> | string
    description?: StringNullableFilter<"Script"> | string | null
    author?: StringNullableFilter<"Script"> | string | null
    content?: JsonFilter<"Script">
    status?: EnumScriptStatusFilter<"Script"> | $Enums.ScriptStatus
    version?: IntFilter<"Script"> | number
    createdAt?: DateTimeFilter<"Script"> | Date | string
    updatedAt?: DateTimeFilter<"Script"> | Date | string
    ownerId?: StringFilter<"Script"> | string
    projectId?: StringNullableFilter<"Script"> | string | null
  }

  export type UserProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: UserProjectWhereUniqueInput
    update: XOR<UserProjectUpdateWithoutUserInput, UserProjectUncheckedUpdateWithoutUserInput>
    create: XOR<UserProjectCreateWithoutUserInput, UserProjectUncheckedCreateWithoutUserInput>
  }

  export type UserProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: UserProjectWhereUniqueInput
    data: XOR<UserProjectUpdateWithoutUserInput, UserProjectUncheckedUpdateWithoutUserInput>
  }

  export type UserProjectUpdateManyWithWhereWithoutUserInput = {
    where: UserProjectScalarWhereInput
    data: XOR<UserProjectUpdateManyMutationInput, UserProjectUncheckedUpdateManyWithoutUserInput>
  }

  export type UserProjectScalarWhereInput = {
    AND?: UserProjectScalarWhereInput | UserProjectScalarWhereInput[]
    OR?: UserProjectScalarWhereInput[]
    NOT?: UserProjectScalarWhereInput | UserProjectScalarWhereInput[]
    userId?: StringFilter<"UserProject"> | string
    projectId?: StringFilter<"UserProject"> | string
    role?: StringFilter<"UserProject"> | string
    createdAt?: DateTimeFilter<"UserProject"> | Date | string
  }

  export type DesignCategoryUpsertWithWhereUniqueWithoutUserInput = {
    where: DesignCategoryWhereUniqueInput
    update: XOR<DesignCategoryUpdateWithoutUserInput, DesignCategoryUncheckedUpdateWithoutUserInput>
    create: XOR<DesignCategoryCreateWithoutUserInput, DesignCategoryUncheckedCreateWithoutUserInput>
  }

  export type DesignCategoryUpdateWithWhereUniqueWithoutUserInput = {
    where: DesignCategoryWhereUniqueInput
    data: XOR<DesignCategoryUpdateWithoutUserInput, DesignCategoryUncheckedUpdateWithoutUserInput>
  }

  export type DesignCategoryUpdateManyWithWhereWithoutUserInput = {
    where: DesignCategoryScalarWhereInput
    data: XOR<DesignCategoryUpdateManyMutationInput, DesignCategoryUncheckedUpdateManyWithoutUserInput>
  }

  export type DesignCategoryScalarWhereInput = {
    AND?: DesignCategoryScalarWhereInput | DesignCategoryScalarWhereInput[]
    OR?: DesignCategoryScalarWhereInput[]
    NOT?: DesignCategoryScalarWhereInput | DesignCategoryScalarWhereInput[]
    id?: StringFilter<"DesignCategory"> | string
    name?: StringFilter<"DesignCategory"> | string
    createdAt?: DateTimeFilter<"DesignCategory"> | Date | string
    updatedAt?: DateTimeFilter<"DesignCategory"> | Date | string
    ownerId?: StringFilter<"DesignCategory"> | string
    projectId?: StringFilter<"DesignCategory"> | string
  }

  export type DesignSubClassUpsertWithWhereUniqueWithoutUserInput = {
    where: DesignSubClassWhereUniqueInput
    update: XOR<DesignSubClassUpdateWithoutUserInput, DesignSubClassUncheckedUpdateWithoutUserInput>
    create: XOR<DesignSubClassCreateWithoutUserInput, DesignSubClassUncheckedCreateWithoutUserInput>
  }

  export type DesignSubClassUpdateWithWhereUniqueWithoutUserInput = {
    where: DesignSubClassWhereUniqueInput
    data: XOR<DesignSubClassUpdateWithoutUserInput, DesignSubClassUncheckedUpdateWithoutUserInput>
  }

  export type DesignSubClassUpdateManyWithWhereWithoutUserInput = {
    where: DesignSubClassScalarWhereInput
    data: XOR<DesignSubClassUpdateManyMutationInput, DesignSubClassUncheckedUpdateManyWithoutUserInput>
  }

  export type DesignSubClassScalarWhereInput = {
    AND?: DesignSubClassScalarWhereInput | DesignSubClassScalarWhereInput[]
    OR?: DesignSubClassScalarWhereInput[]
    NOT?: DesignSubClassScalarWhereInput | DesignSubClassScalarWhereInput[]
    id?: StringFilter<"DesignSubClass"> | string
    name?: StringFilter<"DesignSubClass"> | string
    createdAt?: DateTimeFilter<"DesignSubClass"> | Date | string
    updatedAt?: DateTimeFilter<"DesignSubClass"> | Date | string
    ownerId?: StringFilter<"DesignSubClass"> | string
    categoryId?: StringNullableFilter<"DesignSubClass"> | string | null
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email: string
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    Authenticator?: AuthenticatorCreateNestedManyWithoutUserInput
    scriptOwner?: ScriptCreateNestedManyWithoutUserInput
    projectMembers?: UserProjectCreateNestedManyWithoutUserInput
    DesignCategoryOwner?: DesignCategoryCreateNestedManyWithoutUserInput
    DesignOwner?: DesignSubClassCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email: string
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    Authenticator?: AuthenticatorUncheckedCreateNestedManyWithoutUserInput
    scriptOwner?: ScriptUncheckedCreateNestedManyWithoutUserInput
    projectMembers?: UserProjectUncheckedCreateNestedManyWithoutUserInput
    DesignCategoryOwner?: DesignCategoryUncheckedCreateNestedManyWithoutUserInput
    DesignOwner?: DesignSubClassUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    Authenticator?: AuthenticatorUpdateManyWithoutUserNestedInput
    scriptOwner?: ScriptUpdateManyWithoutUserNestedInput
    projectMembers?: UserProjectUpdateManyWithoutUserNestedInput
    DesignCategoryOwner?: DesignCategoryUpdateManyWithoutUserNestedInput
    DesignOwner?: DesignSubClassUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    Authenticator?: AuthenticatorUncheckedUpdateManyWithoutUserNestedInput
    scriptOwner?: ScriptUncheckedUpdateManyWithoutUserNestedInput
    projectMembers?: UserProjectUncheckedUpdateManyWithoutUserNestedInput
    DesignCategoryOwner?: DesignCategoryUncheckedUpdateManyWithoutUserNestedInput
    DesignOwner?: DesignSubClassUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email: string
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    Authenticator?: AuthenticatorCreateNestedManyWithoutUserInput
    scriptOwner?: ScriptCreateNestedManyWithoutUserInput
    projectMembers?: UserProjectCreateNestedManyWithoutUserInput
    DesignCategoryOwner?: DesignCategoryCreateNestedManyWithoutUserInput
    DesignOwner?: DesignSubClassCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email: string
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    Authenticator?: AuthenticatorUncheckedCreateNestedManyWithoutUserInput
    scriptOwner?: ScriptUncheckedCreateNestedManyWithoutUserInput
    projectMembers?: UserProjectUncheckedCreateNestedManyWithoutUserInput
    DesignCategoryOwner?: DesignCategoryUncheckedCreateNestedManyWithoutUserInput
    DesignOwner?: DesignSubClassUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    Authenticator?: AuthenticatorUpdateManyWithoutUserNestedInput
    scriptOwner?: ScriptUpdateManyWithoutUserNestedInput
    projectMembers?: UserProjectUpdateManyWithoutUserNestedInput
    DesignCategoryOwner?: DesignCategoryUpdateManyWithoutUserNestedInput
    DesignOwner?: DesignSubClassUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    Authenticator?: AuthenticatorUncheckedUpdateManyWithoutUserNestedInput
    scriptOwner?: ScriptUncheckedUpdateManyWithoutUserNestedInput
    projectMembers?: UserProjectUncheckedUpdateManyWithoutUserNestedInput
    DesignCategoryOwner?: DesignCategoryUncheckedUpdateManyWithoutUserNestedInput
    DesignOwner?: DesignSubClassUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAuthenticatorInput = {
    id?: string
    name?: string | null
    email: string
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    scriptOwner?: ScriptCreateNestedManyWithoutUserInput
    projectMembers?: UserProjectCreateNestedManyWithoutUserInput
    DesignCategoryOwner?: DesignCategoryCreateNestedManyWithoutUserInput
    DesignOwner?: DesignSubClassCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuthenticatorInput = {
    id?: string
    name?: string | null
    email: string
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    scriptOwner?: ScriptUncheckedCreateNestedManyWithoutUserInput
    projectMembers?: UserProjectUncheckedCreateNestedManyWithoutUserInput
    DesignCategoryOwner?: DesignCategoryUncheckedCreateNestedManyWithoutUserInput
    DesignOwner?: DesignSubClassUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuthenticatorInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuthenticatorInput, UserUncheckedCreateWithoutAuthenticatorInput>
  }

  export type UserUpsertWithoutAuthenticatorInput = {
    update: XOR<UserUpdateWithoutAuthenticatorInput, UserUncheckedUpdateWithoutAuthenticatorInput>
    create: XOR<UserCreateWithoutAuthenticatorInput, UserUncheckedCreateWithoutAuthenticatorInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuthenticatorInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuthenticatorInput, UserUncheckedUpdateWithoutAuthenticatorInput>
  }

  export type UserUpdateWithoutAuthenticatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    scriptOwner?: ScriptUpdateManyWithoutUserNestedInput
    projectMembers?: UserProjectUpdateManyWithoutUserNestedInput
    DesignCategoryOwner?: DesignCategoryUpdateManyWithoutUserNestedInput
    DesignOwner?: DesignSubClassUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuthenticatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    scriptOwner?: ScriptUncheckedUpdateManyWithoutUserNestedInput
    projectMembers?: UserProjectUncheckedUpdateManyWithoutUserNestedInput
    DesignCategoryOwner?: DesignCategoryUncheckedUpdateManyWithoutUserNestedInput
    DesignOwner?: DesignSubClassUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserProjectCreateWithoutProjectInput = {
    role: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutProjectMembersInput
  }

  export type UserProjectUncheckedCreateWithoutProjectInput = {
    userId: string
    role: string
    createdAt?: Date | string
  }

  export type UserProjectCreateOrConnectWithoutProjectInput = {
    where: UserProjectWhereUniqueInput
    create: XOR<UserProjectCreateWithoutProjectInput, UserProjectUncheckedCreateWithoutProjectInput>
  }

  export type UserProjectCreateManyProjectInputEnvelope = {
    data: UserProjectCreateManyProjectInput | UserProjectCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ScriptCreateWithoutProjectInput = {
    id?: string
    title: string
    description?: string | null
    author?: string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: $Enums.ScriptStatus
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutScriptOwnerInput
    scenes?: SceneCreateNestedManyWithoutScriptInput
  }

  export type ScriptUncheckedCreateWithoutProjectInput = {
    id?: string
    title: string
    description?: string | null
    author?: string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: $Enums.ScriptStatus
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    scenes?: SceneUncheckedCreateNestedManyWithoutScriptInput
  }

  export type ScriptCreateOrConnectWithoutProjectInput = {
    where: ScriptWhereUniqueInput
    create: XOR<ScriptCreateWithoutProjectInput, ScriptUncheckedCreateWithoutProjectInput>
  }

  export type ScriptCreateManyProjectInputEnvelope = {
    data: ScriptCreateManyProjectInput | ScriptCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type DesignCategoryCreateWithoutProjectInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDesignCategoryOwnerInput
    designs?: DesignSubClassCreateNestedManyWithoutCategoryInput
  }

  export type DesignCategoryUncheckedCreateWithoutProjectInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    designs?: DesignSubClassUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type DesignCategoryCreateOrConnectWithoutProjectInput = {
    where: DesignCategoryWhereUniqueInput
    create: XOR<DesignCategoryCreateWithoutProjectInput, DesignCategoryUncheckedCreateWithoutProjectInput>
  }

  export type DesignCategoryCreateManyProjectInputEnvelope = {
    data: DesignCategoryCreateManyProjectInput | DesignCategoryCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UserProjectUpsertWithWhereUniqueWithoutProjectInput = {
    where: UserProjectWhereUniqueInput
    update: XOR<UserProjectUpdateWithoutProjectInput, UserProjectUncheckedUpdateWithoutProjectInput>
    create: XOR<UserProjectCreateWithoutProjectInput, UserProjectUncheckedCreateWithoutProjectInput>
  }

  export type UserProjectUpdateWithWhereUniqueWithoutProjectInput = {
    where: UserProjectWhereUniqueInput
    data: XOR<UserProjectUpdateWithoutProjectInput, UserProjectUncheckedUpdateWithoutProjectInput>
  }

  export type UserProjectUpdateManyWithWhereWithoutProjectInput = {
    where: UserProjectScalarWhereInput
    data: XOR<UserProjectUpdateManyMutationInput, UserProjectUncheckedUpdateManyWithoutProjectInput>
  }

  export type ScriptUpsertWithWhereUniqueWithoutProjectInput = {
    where: ScriptWhereUniqueInput
    update: XOR<ScriptUpdateWithoutProjectInput, ScriptUncheckedUpdateWithoutProjectInput>
    create: XOR<ScriptCreateWithoutProjectInput, ScriptUncheckedCreateWithoutProjectInput>
  }

  export type ScriptUpdateWithWhereUniqueWithoutProjectInput = {
    where: ScriptWhereUniqueInput
    data: XOR<ScriptUpdateWithoutProjectInput, ScriptUncheckedUpdateWithoutProjectInput>
  }

  export type ScriptUpdateManyWithWhereWithoutProjectInput = {
    where: ScriptScalarWhereInput
    data: XOR<ScriptUpdateManyMutationInput, ScriptUncheckedUpdateManyWithoutProjectInput>
  }

  export type DesignCategoryUpsertWithWhereUniqueWithoutProjectInput = {
    where: DesignCategoryWhereUniqueInput
    update: XOR<DesignCategoryUpdateWithoutProjectInput, DesignCategoryUncheckedUpdateWithoutProjectInput>
    create: XOR<DesignCategoryCreateWithoutProjectInput, DesignCategoryUncheckedCreateWithoutProjectInput>
  }

  export type DesignCategoryUpdateWithWhereUniqueWithoutProjectInput = {
    where: DesignCategoryWhereUniqueInput
    data: XOR<DesignCategoryUpdateWithoutProjectInput, DesignCategoryUncheckedUpdateWithoutProjectInput>
  }

  export type DesignCategoryUpdateManyWithWhereWithoutProjectInput = {
    where: DesignCategoryScalarWhereInput
    data: XOR<DesignCategoryUpdateManyMutationInput, DesignCategoryUncheckedUpdateManyWithoutProjectInput>
  }

  export type UserCreateWithoutScriptOwnerInput = {
    id?: string
    name?: string | null
    email: string
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    Authenticator?: AuthenticatorCreateNestedManyWithoutUserInput
    projectMembers?: UserProjectCreateNestedManyWithoutUserInput
    DesignCategoryOwner?: DesignCategoryCreateNestedManyWithoutUserInput
    DesignOwner?: DesignSubClassCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutScriptOwnerInput = {
    id?: string
    name?: string | null
    email: string
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    Authenticator?: AuthenticatorUncheckedCreateNestedManyWithoutUserInput
    projectMembers?: UserProjectUncheckedCreateNestedManyWithoutUserInput
    DesignCategoryOwner?: DesignCategoryUncheckedCreateNestedManyWithoutUserInput
    DesignOwner?: DesignSubClassUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutScriptOwnerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutScriptOwnerInput, UserUncheckedCreateWithoutScriptOwnerInput>
  }

  export type ProjectCreateWithoutScriptsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projectMembers?: UserProjectCreateNestedManyWithoutProjectInput
    designCategories?: DesignCategoryCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutScriptsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projectMembers?: UserProjectUncheckedCreateNestedManyWithoutProjectInput
    designCategories?: DesignCategoryUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutScriptsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutScriptsInput, ProjectUncheckedCreateWithoutScriptsInput>
  }

  export type SceneCreateWithoutScriptInput = {
    id?: string
    sceneNumber: number
    heading: string
    pageStart?: number | null
  }

  export type SceneUncheckedCreateWithoutScriptInput = {
    id?: string
    sceneNumber: number
    heading: string
    pageStart?: number | null
  }

  export type SceneCreateOrConnectWithoutScriptInput = {
    where: SceneWhereUniqueInput
    create: XOR<SceneCreateWithoutScriptInput, SceneUncheckedCreateWithoutScriptInput>
  }

  export type SceneCreateManyScriptInputEnvelope = {
    data: SceneCreateManyScriptInput | SceneCreateManyScriptInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutScriptOwnerInput = {
    update: XOR<UserUpdateWithoutScriptOwnerInput, UserUncheckedUpdateWithoutScriptOwnerInput>
    create: XOR<UserCreateWithoutScriptOwnerInput, UserUncheckedCreateWithoutScriptOwnerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutScriptOwnerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutScriptOwnerInput, UserUncheckedUpdateWithoutScriptOwnerInput>
  }

  export type UserUpdateWithoutScriptOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    Authenticator?: AuthenticatorUpdateManyWithoutUserNestedInput
    projectMembers?: UserProjectUpdateManyWithoutUserNestedInput
    DesignCategoryOwner?: DesignCategoryUpdateManyWithoutUserNestedInput
    DesignOwner?: DesignSubClassUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutScriptOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    Authenticator?: AuthenticatorUncheckedUpdateManyWithoutUserNestedInput
    projectMembers?: UserProjectUncheckedUpdateManyWithoutUserNestedInput
    DesignCategoryOwner?: DesignCategoryUncheckedUpdateManyWithoutUserNestedInput
    DesignOwner?: DesignSubClassUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectUpsertWithoutScriptsInput = {
    update: XOR<ProjectUpdateWithoutScriptsInput, ProjectUncheckedUpdateWithoutScriptsInput>
    create: XOR<ProjectCreateWithoutScriptsInput, ProjectUncheckedCreateWithoutScriptsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutScriptsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutScriptsInput, ProjectUncheckedUpdateWithoutScriptsInput>
  }

  export type ProjectUpdateWithoutScriptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMembers?: UserProjectUpdateManyWithoutProjectNestedInput
    designCategories?: DesignCategoryUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutScriptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMembers?: UserProjectUncheckedUpdateManyWithoutProjectNestedInput
    designCategories?: DesignCategoryUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type SceneUpsertWithWhereUniqueWithoutScriptInput = {
    where: SceneWhereUniqueInput
    update: XOR<SceneUpdateWithoutScriptInput, SceneUncheckedUpdateWithoutScriptInput>
    create: XOR<SceneCreateWithoutScriptInput, SceneUncheckedCreateWithoutScriptInput>
  }

  export type SceneUpdateWithWhereUniqueWithoutScriptInput = {
    where: SceneWhereUniqueInput
    data: XOR<SceneUpdateWithoutScriptInput, SceneUncheckedUpdateWithoutScriptInput>
  }

  export type SceneUpdateManyWithWhereWithoutScriptInput = {
    where: SceneScalarWhereInput
    data: XOR<SceneUpdateManyMutationInput, SceneUncheckedUpdateManyWithoutScriptInput>
  }

  export type SceneScalarWhereInput = {
    AND?: SceneScalarWhereInput | SceneScalarWhereInput[]
    OR?: SceneScalarWhereInput[]
    NOT?: SceneScalarWhereInput | SceneScalarWhereInput[]
    id?: StringFilter<"Scene"> | string
    sceneNumber?: IntFilter<"Scene"> | number
    heading?: StringFilter<"Scene"> | string
    pageStart?: IntNullableFilter<"Scene"> | number | null
    scriptId?: StringFilter<"Scene"> | string
  }

  export type ScriptCreateWithoutScenesInput = {
    id?: string
    title: string
    description?: string | null
    author?: string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: $Enums.ScriptStatus
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutScriptOwnerInput
    project?: ProjectCreateNestedOneWithoutScriptsInput
  }

  export type ScriptUncheckedCreateWithoutScenesInput = {
    id?: string
    title: string
    description?: string | null
    author?: string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: $Enums.ScriptStatus
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    projectId?: string | null
  }

  export type ScriptCreateOrConnectWithoutScenesInput = {
    where: ScriptWhereUniqueInput
    create: XOR<ScriptCreateWithoutScenesInput, ScriptUncheckedCreateWithoutScenesInput>
  }

  export type ScriptUpsertWithoutScenesInput = {
    update: XOR<ScriptUpdateWithoutScenesInput, ScriptUncheckedUpdateWithoutScenesInput>
    create: XOR<ScriptCreateWithoutScenesInput, ScriptUncheckedCreateWithoutScenesInput>
    where?: ScriptWhereInput
  }

  export type ScriptUpdateToOneWithWhereWithoutScenesInput = {
    where?: ScriptWhereInput
    data: XOR<ScriptUpdateWithoutScenesInput, ScriptUncheckedUpdateWithoutScenesInput>
  }

  export type ScriptUpdateWithoutScenesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: EnumScriptStatusFieldUpdateOperationsInput | $Enums.ScriptStatus
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutScriptOwnerNestedInput
    project?: ProjectUpdateOneWithoutScriptsNestedInput
  }

  export type ScriptUncheckedUpdateWithoutScenesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: EnumScriptStatusFieldUpdateOperationsInput | $Enums.ScriptStatus
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateWithoutDesignCategoryOwnerInput = {
    id?: string
    name?: string | null
    email: string
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    Authenticator?: AuthenticatorCreateNestedManyWithoutUserInput
    scriptOwner?: ScriptCreateNestedManyWithoutUserInput
    projectMembers?: UserProjectCreateNestedManyWithoutUserInput
    DesignOwner?: DesignSubClassCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDesignCategoryOwnerInput = {
    id?: string
    name?: string | null
    email: string
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    Authenticator?: AuthenticatorUncheckedCreateNestedManyWithoutUserInput
    scriptOwner?: ScriptUncheckedCreateNestedManyWithoutUserInput
    projectMembers?: UserProjectUncheckedCreateNestedManyWithoutUserInput
    DesignOwner?: DesignSubClassUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDesignCategoryOwnerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDesignCategoryOwnerInput, UserUncheckedCreateWithoutDesignCategoryOwnerInput>
  }

  export type ProjectCreateWithoutDesignCategoriesInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projectMembers?: UserProjectCreateNestedManyWithoutProjectInput
    scripts?: ScriptCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutDesignCategoriesInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projectMembers?: UserProjectUncheckedCreateNestedManyWithoutProjectInput
    scripts?: ScriptUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutDesignCategoriesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutDesignCategoriesInput, ProjectUncheckedCreateWithoutDesignCategoriesInput>
  }

  export type DesignSubClassCreateWithoutCategoryInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDesignOwnerInput
    versions?: DesignSubClassVersionCreateNestedManyWithoutDesignSubClassInput
  }

  export type DesignSubClassUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    versions?: DesignSubClassVersionUncheckedCreateNestedManyWithoutDesignSubClassInput
  }

  export type DesignSubClassCreateOrConnectWithoutCategoryInput = {
    where: DesignSubClassWhereUniqueInput
    create: XOR<DesignSubClassCreateWithoutCategoryInput, DesignSubClassUncheckedCreateWithoutCategoryInput>
  }

  export type DesignSubClassCreateManyCategoryInputEnvelope = {
    data: DesignSubClassCreateManyCategoryInput | DesignSubClassCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDesignCategoryOwnerInput = {
    update: XOR<UserUpdateWithoutDesignCategoryOwnerInput, UserUncheckedUpdateWithoutDesignCategoryOwnerInput>
    create: XOR<UserCreateWithoutDesignCategoryOwnerInput, UserUncheckedCreateWithoutDesignCategoryOwnerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDesignCategoryOwnerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDesignCategoryOwnerInput, UserUncheckedUpdateWithoutDesignCategoryOwnerInput>
  }

  export type UserUpdateWithoutDesignCategoryOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    Authenticator?: AuthenticatorUpdateManyWithoutUserNestedInput
    scriptOwner?: ScriptUpdateManyWithoutUserNestedInput
    projectMembers?: UserProjectUpdateManyWithoutUserNestedInput
    DesignOwner?: DesignSubClassUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDesignCategoryOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    Authenticator?: AuthenticatorUncheckedUpdateManyWithoutUserNestedInput
    scriptOwner?: ScriptUncheckedUpdateManyWithoutUserNestedInput
    projectMembers?: UserProjectUncheckedUpdateManyWithoutUserNestedInput
    DesignOwner?: DesignSubClassUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectUpsertWithoutDesignCategoriesInput = {
    update: XOR<ProjectUpdateWithoutDesignCategoriesInput, ProjectUncheckedUpdateWithoutDesignCategoriesInput>
    create: XOR<ProjectCreateWithoutDesignCategoriesInput, ProjectUncheckedCreateWithoutDesignCategoriesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutDesignCategoriesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutDesignCategoriesInput, ProjectUncheckedUpdateWithoutDesignCategoriesInput>
  }

  export type ProjectUpdateWithoutDesignCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMembers?: UserProjectUpdateManyWithoutProjectNestedInput
    scripts?: ScriptUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutDesignCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMembers?: UserProjectUncheckedUpdateManyWithoutProjectNestedInput
    scripts?: ScriptUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type DesignSubClassUpsertWithWhereUniqueWithoutCategoryInput = {
    where: DesignSubClassWhereUniqueInput
    update: XOR<DesignSubClassUpdateWithoutCategoryInput, DesignSubClassUncheckedUpdateWithoutCategoryInput>
    create: XOR<DesignSubClassCreateWithoutCategoryInput, DesignSubClassUncheckedCreateWithoutCategoryInput>
  }

  export type DesignSubClassUpdateWithWhereUniqueWithoutCategoryInput = {
    where: DesignSubClassWhereUniqueInput
    data: XOR<DesignSubClassUpdateWithoutCategoryInput, DesignSubClassUncheckedUpdateWithoutCategoryInput>
  }

  export type DesignSubClassUpdateManyWithWhereWithoutCategoryInput = {
    where: DesignSubClassScalarWhereInput
    data: XOR<DesignSubClassUpdateManyMutationInput, DesignSubClassUncheckedUpdateManyWithoutCategoryInput>
  }

  export type UserCreateWithoutDesignOwnerInput = {
    id?: string
    name?: string | null
    email: string
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    Authenticator?: AuthenticatorCreateNestedManyWithoutUserInput
    scriptOwner?: ScriptCreateNestedManyWithoutUserInput
    projectMembers?: UserProjectCreateNestedManyWithoutUserInput
    DesignCategoryOwner?: DesignCategoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDesignOwnerInput = {
    id?: string
    name?: string | null
    email: string
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    Authenticator?: AuthenticatorUncheckedCreateNestedManyWithoutUserInput
    scriptOwner?: ScriptUncheckedCreateNestedManyWithoutUserInput
    projectMembers?: UserProjectUncheckedCreateNestedManyWithoutUserInput
    DesignCategoryOwner?: DesignCategoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDesignOwnerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDesignOwnerInput, UserUncheckedCreateWithoutDesignOwnerInput>
  }

  export type DesignCategoryCreateWithoutDesignsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDesignCategoryOwnerInput
    project: ProjectCreateNestedOneWithoutDesignCategoriesInput
  }

  export type DesignCategoryUncheckedCreateWithoutDesignsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    projectId: string
  }

  export type DesignCategoryCreateOrConnectWithoutDesignsInput = {
    where: DesignCategoryWhereUniqueInput
    create: XOR<DesignCategoryCreateWithoutDesignsInput, DesignCategoryUncheckedCreateWithoutDesignsInput>
  }

  export type DesignSubClassVersionCreateWithoutDesignSubClassInput = {
    id?: string
    name: string
    content?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
  }

  export type DesignSubClassVersionUncheckedCreateWithoutDesignSubClassInput = {
    id?: string
    name: string
    content?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
  }

  export type DesignSubClassVersionCreateOrConnectWithoutDesignSubClassInput = {
    where: DesignSubClassVersionWhereUniqueInput
    create: XOR<DesignSubClassVersionCreateWithoutDesignSubClassInput, DesignSubClassVersionUncheckedCreateWithoutDesignSubClassInput>
  }

  export type DesignSubClassVersionCreateManyDesignSubClassInputEnvelope = {
    data: DesignSubClassVersionCreateManyDesignSubClassInput | DesignSubClassVersionCreateManyDesignSubClassInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDesignOwnerInput = {
    update: XOR<UserUpdateWithoutDesignOwnerInput, UserUncheckedUpdateWithoutDesignOwnerInput>
    create: XOR<UserCreateWithoutDesignOwnerInput, UserUncheckedCreateWithoutDesignOwnerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDesignOwnerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDesignOwnerInput, UserUncheckedUpdateWithoutDesignOwnerInput>
  }

  export type UserUpdateWithoutDesignOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    Authenticator?: AuthenticatorUpdateManyWithoutUserNestedInput
    scriptOwner?: ScriptUpdateManyWithoutUserNestedInput
    projectMembers?: UserProjectUpdateManyWithoutUserNestedInput
    DesignCategoryOwner?: DesignCategoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDesignOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    Authenticator?: AuthenticatorUncheckedUpdateManyWithoutUserNestedInput
    scriptOwner?: ScriptUncheckedUpdateManyWithoutUserNestedInput
    projectMembers?: UserProjectUncheckedUpdateManyWithoutUserNestedInput
    DesignCategoryOwner?: DesignCategoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DesignCategoryUpsertWithoutDesignsInput = {
    update: XOR<DesignCategoryUpdateWithoutDesignsInput, DesignCategoryUncheckedUpdateWithoutDesignsInput>
    create: XOR<DesignCategoryCreateWithoutDesignsInput, DesignCategoryUncheckedCreateWithoutDesignsInput>
    where?: DesignCategoryWhereInput
  }

  export type DesignCategoryUpdateToOneWithWhereWithoutDesignsInput = {
    where?: DesignCategoryWhereInput
    data: XOR<DesignCategoryUpdateWithoutDesignsInput, DesignCategoryUncheckedUpdateWithoutDesignsInput>
  }

  export type DesignCategoryUpdateWithoutDesignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDesignCategoryOwnerNestedInput
    project?: ProjectUpdateOneRequiredWithoutDesignCategoriesNestedInput
  }

  export type DesignCategoryUncheckedUpdateWithoutDesignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type DesignSubClassVersionUpsertWithWhereUniqueWithoutDesignSubClassInput = {
    where: DesignSubClassVersionWhereUniqueInput
    update: XOR<DesignSubClassVersionUpdateWithoutDesignSubClassInput, DesignSubClassVersionUncheckedUpdateWithoutDesignSubClassInput>
    create: XOR<DesignSubClassVersionCreateWithoutDesignSubClassInput, DesignSubClassVersionUncheckedCreateWithoutDesignSubClassInput>
  }

  export type DesignSubClassVersionUpdateWithWhereUniqueWithoutDesignSubClassInput = {
    where: DesignSubClassVersionWhereUniqueInput
    data: XOR<DesignSubClassVersionUpdateWithoutDesignSubClassInput, DesignSubClassVersionUncheckedUpdateWithoutDesignSubClassInput>
  }

  export type DesignSubClassVersionUpdateManyWithWhereWithoutDesignSubClassInput = {
    where: DesignSubClassVersionScalarWhereInput
    data: XOR<DesignSubClassVersionUpdateManyMutationInput, DesignSubClassVersionUncheckedUpdateManyWithoutDesignSubClassInput>
  }

  export type DesignSubClassVersionScalarWhereInput = {
    AND?: DesignSubClassVersionScalarWhereInput | DesignSubClassVersionScalarWhereInput[]
    OR?: DesignSubClassVersionScalarWhereInput[]
    NOT?: DesignSubClassVersionScalarWhereInput | DesignSubClassVersionScalarWhereInput[]
    id?: StringFilter<"DesignSubClassVersion"> | string
    name?: StringFilter<"DesignSubClassVersion"> | string
    content?: JsonFilter<"DesignSubClassVersion">
    createdAt?: DateTimeFilter<"DesignSubClassVersion"> | Date | string
    updatedAt?: DateTimeFilter<"DesignSubClassVersion"> | Date | string
    ownerId?: StringFilter<"DesignSubClassVersion"> | string
    DesignSubClassId?: StringNullableFilter<"DesignSubClassVersion"> | string | null
  }

  export type DesignSubClassCreateWithoutVersionsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDesignOwnerInput
    category?: DesignCategoryCreateNestedOneWithoutDesignsInput
  }

  export type DesignSubClassUncheckedCreateWithoutVersionsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    categoryId?: string | null
  }

  export type DesignSubClassCreateOrConnectWithoutVersionsInput = {
    where: DesignSubClassWhereUniqueInput
    create: XOR<DesignSubClassCreateWithoutVersionsInput, DesignSubClassUncheckedCreateWithoutVersionsInput>
  }

  export type DesignSubClassUpsertWithoutVersionsInput = {
    update: XOR<DesignSubClassUpdateWithoutVersionsInput, DesignSubClassUncheckedUpdateWithoutVersionsInput>
    create: XOR<DesignSubClassCreateWithoutVersionsInput, DesignSubClassUncheckedCreateWithoutVersionsInput>
    where?: DesignSubClassWhereInput
  }

  export type DesignSubClassUpdateToOneWithWhereWithoutVersionsInput = {
    where?: DesignSubClassWhereInput
    data: XOR<DesignSubClassUpdateWithoutVersionsInput, DesignSubClassUncheckedUpdateWithoutVersionsInput>
  }

  export type DesignSubClassUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDesignOwnerNestedInput
    category?: DesignCategoryUpdateOneWithoutDesignsNestedInput
  }

  export type DesignSubClassUncheckedUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectCreateWithoutProjectMembersInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    scripts?: ScriptCreateNestedManyWithoutProjectInput
    designCategories?: DesignCategoryCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutProjectMembersInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    scripts?: ScriptUncheckedCreateNestedManyWithoutProjectInput
    designCategories?: DesignCategoryUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutProjectMembersInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutProjectMembersInput, ProjectUncheckedCreateWithoutProjectMembersInput>
  }

  export type UserCreateWithoutProjectMembersInput = {
    id?: string
    name?: string | null
    email: string
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    Authenticator?: AuthenticatorCreateNestedManyWithoutUserInput
    scriptOwner?: ScriptCreateNestedManyWithoutUserInput
    DesignCategoryOwner?: DesignCategoryCreateNestedManyWithoutUserInput
    DesignOwner?: DesignSubClassCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectMembersInput = {
    id?: string
    name?: string | null
    email: string
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    Authenticator?: AuthenticatorUncheckedCreateNestedManyWithoutUserInput
    scriptOwner?: ScriptUncheckedCreateNestedManyWithoutUserInput
    DesignCategoryOwner?: DesignCategoryUncheckedCreateNestedManyWithoutUserInput
    DesignOwner?: DesignSubClassUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectMembersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectMembersInput, UserUncheckedCreateWithoutProjectMembersInput>
  }

  export type ProjectUpsertWithoutProjectMembersInput = {
    update: XOR<ProjectUpdateWithoutProjectMembersInput, ProjectUncheckedUpdateWithoutProjectMembersInput>
    create: XOR<ProjectCreateWithoutProjectMembersInput, ProjectUncheckedCreateWithoutProjectMembersInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutProjectMembersInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutProjectMembersInput, ProjectUncheckedUpdateWithoutProjectMembersInput>
  }

  export type ProjectUpdateWithoutProjectMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scripts?: ScriptUpdateManyWithoutProjectNestedInput
    designCategories?: DesignCategoryUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutProjectMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scripts?: ScriptUncheckedUpdateManyWithoutProjectNestedInput
    designCategories?: DesignCategoryUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserUpsertWithoutProjectMembersInput = {
    update: XOR<UserUpdateWithoutProjectMembersInput, UserUncheckedUpdateWithoutProjectMembersInput>
    create: XOR<UserCreateWithoutProjectMembersInput, UserUncheckedCreateWithoutProjectMembersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectMembersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectMembersInput, UserUncheckedUpdateWithoutProjectMembersInput>
  }

  export type UserUpdateWithoutProjectMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    Authenticator?: AuthenticatorUpdateManyWithoutUserNestedInput
    scriptOwner?: ScriptUpdateManyWithoutUserNestedInput
    DesignCategoryOwner?: DesignCategoryUpdateManyWithoutUserNestedInput
    DesignOwner?: DesignSubClassUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    Authenticator?: AuthenticatorUncheckedUpdateManyWithoutUserNestedInput
    scriptOwner?: ScriptUncheckedUpdateManyWithoutUserNestedInput
    DesignCategoryOwner?: DesignCategoryUncheckedUpdateManyWithoutUserNestedInput
    DesignOwner?: DesignSubClassUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountCreateManyUserInput = {
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthenticatorCreateManyUserInput = {
    credentialID: string
    providerAccountId: string
    credentialPublicKey: string
    counter: number
    credentialDeviceType: string
    credentialBackedUp: boolean
    transports?: string | null
  }

  export type ScriptCreateManyUserInput = {
    id?: string
    title: string
    description?: string | null
    author?: string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: $Enums.ScriptStatus
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    projectId?: string | null
  }

  export type UserProjectCreateManyUserInput = {
    projectId: string
    role: string
    createdAt?: Date | string
  }

  export type DesignCategoryCreateManyUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projectId: string
  }

  export type DesignSubClassCreateManyUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId?: string | null
  }

  export type AccountUpdateWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthenticatorUpdateWithoutUserInput = {
    credentialID?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    credentialPublicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    credentialDeviceType?: StringFieldUpdateOperationsInput | string
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthenticatorUncheckedUpdateWithoutUserInput = {
    credentialID?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    credentialPublicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    credentialDeviceType?: StringFieldUpdateOperationsInput | string
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthenticatorUncheckedUpdateManyWithoutUserInput = {
    credentialID?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    credentialPublicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    credentialDeviceType?: StringFieldUpdateOperationsInput | string
    credentialBackedUp?: BoolFieldUpdateOperationsInput | boolean
    transports?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScriptUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: EnumScriptStatusFieldUpdateOperationsInput | $Enums.ScriptStatus
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneWithoutScriptsNestedInput
    scenes?: SceneUpdateManyWithoutScriptNestedInput
  }

  export type ScriptUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: EnumScriptStatusFieldUpdateOperationsInput | $Enums.ScriptStatus
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    scenes?: SceneUncheckedUpdateManyWithoutScriptNestedInput
  }

  export type ScriptUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: EnumScriptStatusFieldUpdateOperationsInput | $Enums.ScriptStatus
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserProjectUpdateWithoutUserInput = {
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutProjectMembersNestedInput
  }

  export type UserProjectUncheckedUpdateWithoutUserInput = {
    projectId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProjectUncheckedUpdateManyWithoutUserInput = {
    projectId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignCategoryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutDesignCategoriesNestedInput
    designs?: DesignSubClassUpdateManyWithoutCategoryNestedInput
  }

  export type DesignCategoryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
    designs?: DesignSubClassUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type DesignCategoryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type DesignSubClassUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: DesignCategoryUpdateOneWithoutDesignsNestedInput
    versions?: DesignSubClassVersionUpdateManyWithoutDesignSubClassNestedInput
  }

  export type DesignSubClassUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    versions?: DesignSubClassVersionUncheckedUpdateManyWithoutDesignSubClassNestedInput
  }

  export type DesignSubClassUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserProjectCreateManyProjectInput = {
    userId: string
    role: string
    createdAt?: Date | string
  }

  export type ScriptCreateManyProjectInput = {
    id?: string
    title: string
    description?: string | null
    author?: string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: $Enums.ScriptStatus
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
  }

  export type DesignCategoryCreateManyProjectInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
  }

  export type UserProjectUpdateWithoutProjectInput = {
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectMembersNestedInput
  }

  export type UserProjectUncheckedUpdateWithoutProjectInput = {
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProjectUncheckedUpdateManyWithoutProjectInput = {
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScriptUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: EnumScriptStatusFieldUpdateOperationsInput | $Enums.ScriptStatus
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutScriptOwnerNestedInput
    scenes?: SceneUpdateManyWithoutScriptNestedInput
  }

  export type ScriptUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: EnumScriptStatusFieldUpdateOperationsInput | $Enums.ScriptStatus
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    scenes?: SceneUncheckedUpdateManyWithoutScriptNestedInput
  }

  export type ScriptUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    author?: NullableStringFieldUpdateOperationsInput | string | null
    content?: JsonNullValueInput | InputJsonValue
    status?: EnumScriptStatusFieldUpdateOperationsInput | $Enums.ScriptStatus
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
  }

  export type DesignCategoryUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDesignCategoryOwnerNestedInput
    designs?: DesignSubClassUpdateManyWithoutCategoryNestedInput
  }

  export type DesignCategoryUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    designs?: DesignSubClassUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type DesignCategoryUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
  }

  export type SceneCreateManyScriptInput = {
    id?: string
    sceneNumber: number
    heading: string
    pageStart?: number | null
  }

  export type SceneUpdateWithoutScriptInput = {
    id?: StringFieldUpdateOperationsInput | string
    sceneNumber?: IntFieldUpdateOperationsInput | number
    heading?: StringFieldUpdateOperationsInput | string
    pageStart?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SceneUncheckedUpdateWithoutScriptInput = {
    id?: StringFieldUpdateOperationsInput | string
    sceneNumber?: IntFieldUpdateOperationsInput | number
    heading?: StringFieldUpdateOperationsInput | string
    pageStart?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SceneUncheckedUpdateManyWithoutScriptInput = {
    id?: StringFieldUpdateOperationsInput | string
    sceneNumber?: IntFieldUpdateOperationsInput | number
    heading?: StringFieldUpdateOperationsInput | string
    pageStart?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DesignSubClassCreateManyCategoryInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
  }

  export type DesignSubClassUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDesignOwnerNestedInput
    versions?: DesignSubClassVersionUpdateManyWithoutDesignSubClassNestedInput
  }

  export type DesignSubClassUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    versions?: DesignSubClassVersionUncheckedUpdateManyWithoutDesignSubClassNestedInput
  }

  export type DesignSubClassUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
  }

  export type DesignSubClassVersionCreateManyDesignSubClassInput = {
    id?: string
    name: string
    content?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
  }

  export type DesignSubClassVersionUpdateWithoutDesignSubClassInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
  }

  export type DesignSubClassVersionUncheckedUpdateWithoutDesignSubClassInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
  }

  export type DesignSubClassVersionUncheckedUpdateManyWithoutDesignSubClassInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}