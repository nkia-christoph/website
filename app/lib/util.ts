import {
  IArticle,
  IVersion
} from "../interfaces.ts"


//https://stackoverflow.com/questions/45670705/iterate-over-interface-properties-in-typescript
//https://stackoverflow.com/questions/58666092/get-typescript-interface-property-type-given-property-name-only#58666561


/**
 * expand object to meet type specifications
 * 
 * @remarks
 * Help was found here:
 * @link https://stackoverflow.com/a/53995901
 * @link https://stackoverflow.com/a/58666561
 * @link https://stackoverflow.com/a/61722773
 * 
 * @typeParam T type to assert on returned object
 * @param inputObj obect to be expanded to meet type 'T' specifications
 * 
 * @return object meeting specifications of type 'T'
 */
/*
export function expandObj<T>( inputObj: object ): T{
  const defaultObj: T = keys<T>().reduce( (obj:T, key: keyof T) => {
    type propType = T[typeof key]
    switch (typeof propType) {
      case "string":
        return { ...obj, key: "" }
        break;
      case "number":
        return { ...obj, key: -1 }
        break;
      case "boolean":
        obj[key] = false
        break;
      default:
          throw(`ERROR: unexpected datatype '${typeof propType}' in object property with key '${String(key)}' `)
    }
    return obj
  })
  return { ...defaultObj, inputObj } as T
}


export function localizeData<T>( lang:string, data: T): T {
  const localizedData = Object.entries(data).map([key: toString, value: string|number|boolean] => {
    if (old_key !== new_key) {
      Object.defineProperty(o, new_key,
          Object.getOwnPropertyDescriptor(o, old_key));
      delete o[old_keyo;
    }
  })
}
*/

/**
 * load cached json to render page at requested route
 * 
 * @param route page route 
 * @returns json loaded from cache
 */
export function loadPage<T>(route: Record<string, any>): T|null {
  const page: T|null = JSON.parse( Deno.readTextFileSync(
    `./cache/pages/${route.name}/${route.id}.json`
  )) || null
  return page
}
