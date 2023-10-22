export type MaybeObject = Record<any, any>

export type MaybeArray<T = any> = Array<T>

export type PropertyName = string | number | symbol

export type PropertyPath = PropertyName

export type Fn<T = void> = () => T

export type Nullable<T> = T | null | undefined

export type Many<T> = T | ReadonlyArray<T>
