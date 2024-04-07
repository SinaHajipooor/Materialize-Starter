import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { Settings } from 'src/@core/context/settingsContext'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import { Icon } from '@iconify/react';
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown, {
    NotificationsType
} from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import ShortcutsDropdown from 'src/@core/layouts/components/shared-components/ShortcutsDropdown'
import { faBuilding, faChartLine, faDatabase, faHospital, faKey, faNewspaper, faShieldHalved, faUserNurse, faUserTie } from '@fortawesome/free-solid-svg-icons'

interface Props {
    hidden: boolean
    settings: Settings
    toggleNavVisibility: () => void
    saveSettings: (values: Settings) => void
}

const notifications: NotificationsType[] = [
    {
        meta: 'Today',
        avatarAlt: 'Flora',
        title: 'Congratulation Flora! 🎉',
        avatarImg: '/images/avatars/4.png',
        subtitle: 'Won the monthly best seller badge'
    },
    {
        meta: 'Yesterday',
        avatarColor: 'primary',
        subtitle: '5 hours ago',
        avatarText: 'Robert Austin',
        title: 'New user registered.'
    },
    {
        meta: '11 Aug',
        avatarAlt: 'message',
        title: 'New message received 👋🏻',
        avatarImg: '/images/avatars/5.png',
        subtitle: 'You have 10 unread messages'
    },
    {
        meta: '25 May',
        title: 'Paypal',
        avatarAlt: 'paypal',
        subtitle: 'Received Payment',
        avatarImg: '/images/misc/paypal.png'
    },
    {
        meta: '19 Mar',
        avatarAlt: 'order',
        title: 'Received Order 📦',
        avatarImg: '/images/avatars/3.png',
        subtitle: 'New order received from John'
    },
    {
        meta: '27 Dec',
        avatarAlt: 'chart',
        subtitle: '25 hrs ago',
        avatarImg: '/images/misc/chart.png',
        title: 'Finance report has been generated'
    }
]

const shortcuts: any = [
    {
        title: 'مدیران',
        url: '/admin/membership/admins',
        subtitle: 'مدیریت کاربران مدیر',
        icon: faUserTie
    },
    {
        title: 'پزشکان',
        url: '/admin/membership/doctors',
        subtitle: 'مدیریت پزشکان',
        icon: faUserNurse
    },

    {
        title: 'سازمان ها',
        url: '/admin/membership/organizations/',
        subtitle: 'مدیریت سازمان ها',
        icon: faBuilding
    },
    {
        title: 'بیمارستان ها',
        url: '/admin/membership/hospitals/',
        subtitle: 'مدیریت بیمارستان ها',
        icon: faHospital
    },
    {
        url: '/admin/membership/roles',
        title: 'نقش ها',
        icon: faShieldHalved,
        subtitle: 'مدیریت نقش ها'
    },
    {
        icon: faKey,
        url: '/admin/membership/permissions',
        title: 'مجوز ها',
        subtitle: 'مدیریت مجوز ها',

    },
    {
        title: 'فعالیت ها',
        icon: faChartLine,
        subtitle: 'گزارش فعالیت کاربران',
        url: '/admin/membership/activities'
    },
    {
        title: 'لاگ سیستم',
        icon: faNewspaper,
        subtitle: 'مدیریت لاگ های سیستم',
        url: '/admin/activities'
    },
    {
        title: 'سرور‌های خارجی',
        url: '/admin/membership/externalServers/',
        subtitle: 'مدیریت سرور‌های خارجی',
        icon: faDatabase
    },
]

const AppBarContent = (props: Props) => {
    // ** Props
    const { hidden, settings, saveSettings, toggleNavVisibility } = props

    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                {hidden && !settings.navHidden ? (
                    <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
                        <Icon icon='mdi:menu' />
                    </IconButton>
                ) : null}
                {/* <Autocomplete hidden={hidden} settings={settings} /> */}
            </Box>
            <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }
            }>
                <ModeToggler settings={settings} saveSettings={saveSettings} />
                <ShortcutsDropdown settings={settings} shortcuts={shortcuts} />
                <NotificationDropdown settings={settings} notifications={notifications} />
                <UserDropdown settings={settings} />
            </Box>
        </Box >
    )
}

export default AppBarContent
