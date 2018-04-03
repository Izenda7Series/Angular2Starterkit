
export class ApiEndpointConfig {
    public static getPath(value: string): string {
        const apiEndPoint = 'http://localhost:3358/';
        switch (value) {
            case 'register':
                return apiEndPoint + 'api/Account/Register';
            case 'login':
                return apiEndPoint + 'Token';
            case 'logout':
                return apiEndPoint + 'api/Account/Logout';
            case 'getizendatoken':
                return apiEndPoint + 'api/IzendaUser/GenerateToken';
            default:
                return '';
        }
    }
}
