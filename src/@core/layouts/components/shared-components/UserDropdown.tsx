// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'


// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { logout } from 'src/lib/auth/auth'
import { toast } from 'react-toastify'

interface Props {
    settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = (props: Props) => {
    // ** Props
    const { settings } = props

    // ** States
    const [anchorEl, setAnchorEl] = useState<Element | null>(null)

    // ** Hooks
    const router = useRouter()
    const sessions: any = useSession();



    // ** Vars
    const { direction } = settings

    const handleDropdownOpen = (event: SyntheticEvent) => {
        setAnchorEl(event.currentTarget)
    }

    const handleDropdownClose = (url?: string) => {
        if (url) {
            router.push(url)
        }
        setAnchorEl(null)
    }


    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true)
        const response = await logout(sessions?.data?.myToken);
        if (response) {
            await signOut({ redirect: false });

            // Store the current URL (or the one you want to return to) as a query parameter
            const returnUrl = encodeURIComponent(window.location.pathname);
            router.replace(`/auth/login?returnUrl=${returnUrl}`, undefined, { shallow: true });
            handleDropdownClose();
            setIsLoading(false);
        }
        else {
            setIsLoading(false)
            toast.error('امکان خروج از حساب وجود ندارد')
        }
    }





    return (
        <Fragment>
            <Badge
                overlap='circular'
                onClick={handleDropdownOpen}
                sx={{ ml: 2, cursor: 'pointer' }}
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            >
                <Avatar
                    alt={sessions?.data?.user?.admin?.first_name}
                    onClick={handleDropdownOpen}
                    sx={{ width: 32, height: 32 }}
                    src={sessions?.data?.user?.admin?.image}
                />
            </Badge>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleDropdownClose()}
                sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
                anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
            >
                <Box sx={{ pt: 2, pb: 3, px: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link href='/admin/profile' onClick={() => {
                            handleDropdownClose()
                        }}>
                            <Badge
                                overlap='circular'
                                badgeContent={<BadgeContentSpan />}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                            >
                                <Avatar alt={sessions?.data?.user?.admin?.first_name ?? ''} src={sessions?.data?.user?.admin?.image} sx={{ width: '2.5rem', height: '2.5rem' }} />
                            </Badge>
                        </Link>
                        <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Link style={{ textDecoration: 'none' }} onClick={() => {
                                handleDropdownClose()
                            }} href='/admin/profile'><Typography sx={{ fontWeight: 700 }} variant='body1'>
                                    {sessions?.data?.user?.admin?.first_name} {sessions?.data?.user?.admin?.last_name}
                                </Typography>
                            </Link>
                            <Typography mt={1} fontWeight={500} sx={{ fontSize: '0.7rem' }}>
                                {sessions?.data?.user?.admin?.organization?.name}
                            </Typography>
                            <Typography mt={1} variant='caption' sx={{ fontSize: '0.7rem', color: 'text.disabled' }}>
                                {sessions?.data?.user?.admin?.roles?.map((role: any) => role?.title)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ mt: '0 !important' }} />
                <MenuItem
                    disabled={isLoading}
                    onClick={handleLogout}
                    sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
                >
                    <Icon icon='mdi:logout-variant' />
                    خروج
                </MenuItem>
            </Menu>
        </Fragment>
    )
}

export default UserDropdown
