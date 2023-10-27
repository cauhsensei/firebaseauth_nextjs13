// app/(dashboards)/company/dashboard/page.js

import Permission from '@/components/Permission';
import { APP_ROUTES } from '@/constants/routesConfig';

function CompanyDashboard() {
    return (
        <Permission routeKey="COMPANY_DASHBOARD">
            <h1>Essa é uma rota que apenas empresas têm acesso</h1>
        </Permission>
    );
}

export default CompanyDashboard;
