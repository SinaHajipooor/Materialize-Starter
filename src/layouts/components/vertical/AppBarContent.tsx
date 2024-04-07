// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown, {
    NotificationsType
} from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import ShortcutsDropdown, { ShortcutsType } from 'src/@core/layouts/components/shared-components/ShortcutsDropdown'
import { faHospital, faKey, faNewspaper, faShieldHalved, faUserNurse, faUserTie } from '@fortawesome/free-solid-svg-icons'

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





const AppBarContent = (props: Props) => {


    // ** Props
    const { hidden, settings, saveSettings, toggleNavVisibility } = props;


    const shortcuts: ShortcutsType[] = [
        {
            title: 'مدیران',
            url: '/admin/membership/admins',
            subtitle: 'فهرست مدیران',
            icon: faUserTie
        },
        {
            title: 'پزشکان',
            url: '/admin/membership/doctors',
            subtitle: 'فهرست پزشکان',
            icon: faUserNurse
        },
        {
            title: 'بیمارستان ها',
            url: '/admin/membership/hospitals',
            subtitle: 'فهرست بیمارستان ها',
            icon: faHospital
        },
        {
            title: 'لاگ سیستم',
            icon: faNewspaper,
            subtitle: 'مدیریت لاگ های سیستم',
            url: '/systemLog'
        },
        {
            url: '/admin/membership/roles',
            title: 'نقش ها',
            icon: faShieldHalved,
            subtitle: 'فهرست نقش ها'
        },
        {
            url: '/admin/membership/permissions',
            title: 'مجوزها',
            subtitle: 'فهرست مجوزها',
            icon: faKey
        },


        // {
        //     title: 'فعالیت ها',
        //     icon: "devicon:githubactions",
        //     subtitle: 'گزارش فعالیت کاربران',
        //     url: ''
        // },


    ]


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
            <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
                <ModeToggler settings={settings} saveSettings={saveSettings} />
                <NotificationDropdown settings={settings} notifications={notifications} />
                <ShortcutsDropdown settings={settings} shortcuts={shortcuts} />
                <UserDropdown settings={settings} />
            </Box>
        </Box>
    )
}

export default AppBarContent
