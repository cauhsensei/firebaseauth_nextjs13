import Permission from '@/components/Permission';
import { APP_ROUTES } from '@/constants/routesConfig';

function UserDashboard() {
    return (
        <Permission routeKey="USER_DASHBOARD">
            <h1>Essa é uma rota que apenas usuarios têm acesso</h1>
        </Permission>
    );
}

export default UserDashboard;