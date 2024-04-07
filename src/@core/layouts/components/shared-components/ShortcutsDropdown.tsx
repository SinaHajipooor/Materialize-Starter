// ** React Imports
import { useState, SyntheticEvent, Fragment, ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { Icon } from '@iconify/react'
import { BASE_URL } from 'src/utils/axios'
import { useSession } from 'next-auth/react'

export type ShortcutsType = {
    url: string
    icon: any
    title: string
    subtitle: string
}

interface Props {
    settings: Settings
    shortcuts: ShortcutsType[]
}

// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
    '& .MuiMenu-paper': {
        width: 350,
        overflow: 'hidden',
        marginTop: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    '& .MuiMenu-list': {
        padding: 0
    }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
    }
}))

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
    maxHeight: '30rem'
})

const ScrollWrapper = ({ children, hidden }: { children: ReactNode; hidden: boolean }) => {
    if (hidden) {
        return <Box sx={{ maxHeight: '30rem', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
        return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
    }
}

const ShortcutsDropdown = (props: Props) => {
    // ** Props
    const { shortcuts, settings } = props

    const session: any = useSession();
    const permissions = session.data?.user?.permissions;


    // ** States
    const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

    // ** Hook
    const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

    // ** Vars
    const { direction } = settings

    const handleDropdownOpen = (event: SyntheticEvent) => {
        if (permissions.length) {
            setAnchorEl(event.currentTarget)
        }
    }

    const handleDropdownClose = () => {
        setAnchorEl(null)
    }

    const permissionMap: any = {
        '/admin/membership/admins': 'admin_index',
        '/admin/membership/doctors': 'doctor_index',
        '/admin/membership/hospitals': 'organization_index',
        '/admin/membership/roles': 'role_index',
        '/admin/membership/permissions': 'permission_index',
        '/admin/activities': 'activity_log_index',
        '/systemLog': 'system_log_index'
    };

    const hasPermission = (permission: any) => permissions?.includes(permission);


    return (
        <Fragment>
            <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
                <Icon icon='mdi:view-grid-outline' />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleDropdownClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
            >
                <MenuItem
                    disableRipple
                    disableTouchRipple
                    sx={{ cursor: 'default', userSelect: 'auto', backgroundColor: 'transparent !important' }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Typography sx={{ fontSize: '1.125rem', color: 'text.secondary', fontWeight: 600 }}>تنظیمات</Typography>
                    </Box>
                </MenuItem>
                <Divider sx={{ my: '0 !important' }} />
                <ScrollWrapper hidden={hidden}>
                    <Grid
                        container
                        spacing={0}
                        sx={{
                            '& .MuiGrid-root': {
                                borderBottom: theme => `1px solid ${theme.palette.divider}`,
                                '&:nth-of-type(odd)': { borderRight: theme => `1px solid ${theme.palette.divider}` }
                            }
                        }}
                    >
                        {shortcuts.map(shortcut => {
                            if (shortcut.title === 'لاگ سیستم' && permissions?.includes('system_log_index')) {

                                return (
                                    <Grid
                                        xs={6}
                                        item
                                        key={shortcut.title}
                                        onClick={handleDropdownClose}
                                        sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
                                    >
                                        <a style={{ textDecoration: 'none' }} key={shortcut.title} href={`${BASE_URL}/system-log?key=${session?.data?.user?.encrypted_username}`} rel="noreferrer" target='_blank'>
                                            <Box
                                                sx={{
                                                    p: 6,
                                                    display: 'flex',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                    textDecoration: 'none',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <CustomAvatar skin='light' color='secondary' sx={{ mb: 2, width: 50, height: 50 }}>
                                                    <FontAwesomeIcon icon={shortcut.icon} width={18} />
                                                </CustomAvatar>
                                                <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>{shortcut.title}</Typography>
                                                <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                                                    {shortcut.subtitle}
                                                </Typography>
                                            </Box>
                                        </a>
                                    </Grid>
                                )
                            }

                            const permissionNeeded = permissionMap[shortcut.url];

                            if (permissionNeeded && !hasPermission(permissionNeeded)) {
                                return null;
                            }

                            return (
                                <Grid
                                    item
                                    xs={6}
                                    key={shortcut.title}
                                    onClick={handleDropdownClose}
                                    sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
                                >
                                    <Box

                                        component={Link}
                                        href={shortcut.url}
                                        sx={{
                                            p: 6,
                                            display: 'flex',
                                            textAlign: 'center',
                                            alignItems: 'center',
                                            textDecoration: 'none',
                                            flexDirection: 'column',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <CustomAvatar skin='light' color='secondary' sx={{ mb: 2, width: 50, height: 50 }}>
                                            <FontAwesomeIcon icon={shortcut.icon} width={18} />
                                        </CustomAvatar>
                                        <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>{shortcut.title}</Typography>
                                        <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                                            {shortcut.subtitle}
                                        </Typography>
                                    </Box>
                                </Grid>
                            )
                        })}
                    </Grid>
                </ScrollWrapper>
            </Menu>
        </Fragment >
    )
}

export default ShortcutsDropdown
