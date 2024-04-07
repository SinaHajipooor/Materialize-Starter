// ** React Imports
import { ReactNode } from 'react'

// ** Component Imports
// import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Types
import { NavGroup } from 'src/@core/layouts/types'

interface Props {
    navGroup?: NavGroup
    children: ReactNode
}

const CanViewNavGroup = (props: Props) => {
    // ** Props
    const { children } = props

    // ** Hook
    //     const ability = useContext(AbilityContext)

    //     const checkForVisibleChild = (arr: NavLink[] | NavGroup[]): boolean => {
    //         return arr.some((i: NavGroup) => {
    //             if (i.children) {
    //                 return checkForVisibleChild(i.children)
    //             } else {
    //                 return ability?.can(i.action, i.subject)
    //             }
    //         })
    //     }

    //     const canViewMenuGroup = (item: NavGroup) => {
    //         const hasAnyVisibleChild = item.children && checkForVisibleChild(item.children)

    //         if (!(item.action && item.subject)) {
    //             return hasAnyVisibleChild
    //         }

    //         return ability && ability.can(item.action, item.subject) && hasAnyVisibleChild
    //     }

    //   return navGroup && canViewMenuGroup(navGroup) ? <>{children}</> : null
    return <>{children}</>

}

export default CanViewNavGroup
