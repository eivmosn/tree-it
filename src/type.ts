export type PropertyName = string | number | symbol

export type PropertyPath = PropertyName

export type Fn<T = void> = () => T

export type Nullable<T> = T | null | undefined

export type Many<T> = T | ReadonlyArray<T>

export type Loose = any

export type LooseObject = Record<any, any>

export type LooseArray = any[]
