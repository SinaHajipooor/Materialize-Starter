// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
    return [
        {
            title: 'داشبورد',
            path: '/admin/dashboard',
            icon: 'mdi:view-dashboard-outline',
        },
    ]
}

export default navigation
