export interface TDictionary<T> {
    [Key: string]: T;
}

export const getEntityDict = <T>(entities: any[], key: string): TDictionary<T> => {
    const dict: TDictionary<any> = {};

    entities.forEach((entity: any) => dict[entity[key] as string] = entity);
    return dict;
};
