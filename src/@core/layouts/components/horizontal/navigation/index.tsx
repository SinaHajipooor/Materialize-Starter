// ** MUI Imports
import Box from '@mui/material/Box'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Menu Components
import HorizontalNavItems from './HorizontalNavItems'
import { useSession } from 'next-auth/react'

// ** Types
interface Props {
    settings: LayoutProps['settings']
    horizontalNavItems: NonNullable<NonNullable<LayoutProps['horizontalLayoutProps']>['navMenu']>['navItems']
}

const Navigation = (props: Props) => {

    const session: any = useSession();
    const permissions = session?.data?.user?.permissions;


    return (
        <Box
            className='menu-content'
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                '& > *': {
                    '&:not(:last-child)': { mr: 2 },
                    ...(themeConfig.menuTextTruncate && { maxWidth: 220 })
                }
            }}
        >
            <HorizontalNavItems permissions={permissions} {...props} />
        </Box>
    )
}

export default Navigation
