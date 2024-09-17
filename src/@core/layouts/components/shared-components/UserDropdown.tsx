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
import { logout } from '../../../../libs/auth/auth'
import { Button } from '@mui/material'
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

    const styles = {
        py: 2,
        px: 4,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        color: 'text.primary',
        textDecoration: 'none',
        '& svg': {
            mr: 2,
            fontSize: '1.375rem',
            color: 'text.primary'
        }
    }

    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);
        const response = await logout();
        if (response) {
            await signOut({ redirect: false });

            // Store the current URL (or the one you want to return to) as a query parameter
            router.replace(`/landing`, undefined, { shallow: true });
            handleDropdownClose();
            setIsLoading(false);
        } else {
            setIsLoading(false);
            toast.error('امکان خروج از حساب وجود ندارد');
        }
    };

    const userName = sessions.data?.user?.user?.first_name + ' ' + sessions.data?.user?.user?.last_name



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
                    alt='John Doe'
                    onClick={handleDropdownOpen}
                    sx={{ width: 35, height: 35 }}
                    src={sessions.data?.user?.user?.image}
                />
            </Badge>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleDropdownClose()}
                sx={{ '& .MuiMenu-paper': { width: 220, mt: 4 } }}
                anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
            >
                <Box sx={{ pt: 2, pb: 3, px: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link href='/admin/base/profile' onClick={() => {
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
                                <Avatar alt='John Doe' src={sessions.data?.user?.user?.image} sx={{ width: '2.5rem', height: '2.5rem' }} />
                            </Badge>
                        </Link>
                        <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Link style={{ textDecoration: 'none' }} onClick={() => {
                                handleDropdownClose()
                            }} href='/admin/base/profile'><Typography variant='body2' color={settings.mode === 'dark' ? 'white' : "black"}>
                                    {sessions?.status === 'authenticated' ? userName : ''}
                                </Typography>
                            </Link>
                            <Typography mt={1} variant='body1' sx={{ fontSize: '0.65rem' }}>
                                {sessions.data?.user?.user?.organization?.name}
                            </Typography>
                            <Typography mt={1} variant='caption' sx={{ fontSize: '0.6rem' }}>
                                {sessions.data?.user?.user?.roles?.map((role: any) => `${role?.title}`).join(' - ')}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ mt: '0 !important' }} />
                <MenuItem sx={{ p: 0 }} href='/admin/base/profile' LinkComponent={Link} onClick={() => {
                    handleDropdownClose()
                    router.push('/admin/base/profile')
                }}>
                    <Box sx={styles}>
                        <Icon icon='system-uicons:user-male' height={19} />
                        <Typography ml={1} variant='body1' fontSize={12}>
                            پروفایل
                        </Typography>
                    </Box>
                </MenuItem>
                <Box display='flex' justifyContent='center' pl={2} pr={2} mt={3} mb={2}>
                    <Button
                        fullWidth
                        disabled={isLoading}
                        variant='contained'
                        color='error'
                        size='small'
                        endIcon={<Icon icon="mdi:logout" height={15} />}
                        onClick={handleLogout}
                        sx={{ '& .MuiButton-endIcon': { marginInlineStart: 1.5 }, fontFamily: 'inherit' }}
                    >
                        خروج
                    </Button>
                </Box>
            </Menu>
        </Fragment>
    )
}

export default UserDropdown
