export function ConfigResponse(code?: number, msg?: string, data?: any) {
    return {
        code,
        data,
        msg
    };
}