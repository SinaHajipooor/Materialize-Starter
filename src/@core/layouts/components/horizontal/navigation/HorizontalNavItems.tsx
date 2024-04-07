// ** Types
import { NavLink, NavGroup, HorizontalNavItemsType } from 'src/@core/layouts/types'

// ** Custom Navigation Components
import HorizontalNavLink from './HorizontalNavLink'
import HorizontalNavGroup from './HorizontalNavGroup'

interface Props {
    hasParent?: boolean
    horizontalNavItems?: HorizontalNavItemsType
    permissions: any
}
const resolveComponent = (item: NavGroup | NavLink) => {
    if ((item as NavGroup).children) return HorizontalNavGroup

    return HorizontalNavLink
}

const HorizontalNavItems = (props: Props) => {

    const permissions = props.permissions;

    const shouldRenderItem = (item: any) => {
        switch (item.path) {
            case '/admin/dashboard':
                return !permissions?.includes('dashboard_index')
            case '/admin/HISInformation':
                return !permissions?.includes('his_index')
            case '/admin/FileInformation':
                return !permissions?.includes('reception_file_import_index')
            case '/admin/patientsAndReceptions':
                return !permissions?.includes('patient_index')
            case '/admin/reports/documentReports':
                return !permissions?.includes('report_document')
            case '/admin/reports/receptionReports':
                return !permissions?.includes('report_reception')
            case '/admin/base/insurances':
                return !permissions?.includes('insurance_index')
            case '/admin/base/readyTexts':
                return !permissions?.includes('ready_text_index')
            case '/admin/base/tags':
                return !permissions?.includes('tag_index')

            default:
                return false
        }
    }

    const RenderMenuItems = props.horizontalNavItems?.map((item: any, index: number) => {
        const TagName: any = resolveComponent(item)

        if (shouldRenderItem(item)) {
            return null
        }
        if (item.title === 'گزارشات' && !permissions?.includes('report_file') && !permissions?.includes('report_reception') && !permissions?.includes('report_document')) return <></>

        if (item.title === 'اطلاعات پایه' && !permissions?.includes('tag_index') && !permissions?.includes('insurance_index') && !permissions?.includes('ready_text_index')) return <></>

        return <TagName {...props} key={index} item={item} />
    })

    return <>{RenderMenuItems}</>

}

export default HorizontalNavItems
