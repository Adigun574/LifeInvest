export interface IApiResponse<T> {
    endpint: string;
    message: string;
    data: T;
}