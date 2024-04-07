// ** Type Imports
import { NavLink, NavGroup, LayoutProps, NavSectionTitle } from 'src/@core/layouts/types'

// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavGroup from './VerticalNavGroup'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'

interface Props {
    parent?: NavGroup
    navHover?: boolean
    navVisible?: boolean
    groupActive: string[]
    isSubToSub?: NavGroup
    currentActiveGroup: string[]
    navigationBorderWidth: number
    settings: LayoutProps['settings']
    saveSettings: LayoutProps['saveSettings']
    setGroupActive: (value: string[]) => void
    setCurrentActiveGroup: (item: string[]) => void
    verticalNavItems?: LayoutProps['verticalLayoutProps']['navMenu']['navItems']
    permissions?: any
}

const resolveNavItemComponent = (item: NavGroup | NavLink | NavSectionTitle) => {
    if ((item as NavSectionTitle).sectionTitle) return VerticalNavSectionTitle
    if ((item as NavGroup).children) return VerticalNavGroup

    return VerticalNavLink
}

const VerticalNavItems = (props: Props) => {
    // ** Props
    const { verticalNavItems, permissions } = props

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

    const RenderMenuItems = verticalNavItems?.map((item: any, index: number) => {
        const TagName: any = resolveNavItemComponent(item)

        if (shouldRenderItem(item)) {
            return null
        }
        if (item.title === 'گزارشات' && !permissions?.includes('report_file') && !permissions?.includes('report_reception') && !permissions?.includes('report_document')) return <></>

        if (item.title === 'اطلاعات پایه' && !permissions?.includes('tag_index') && !permissions?.includes('insurance_index') && !permissions?.includes('ready_text_index')) return <></>

        return <TagName {...props} key={index} item={item} />
    })

    return <>{RenderMenuItems}</>
}

export default VerticalNavItems
