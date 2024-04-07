// ** Type Import
import { Icon, IconProps } from '@iconify/react'

// ** Custom Icon Import
// import Icon from 'src/@core/components/icon'

const UserIcon = ({ icon, ...rest }: IconProps) => {

    return <Icon icon={icon} {...rest} height={20} />

    //     return <FontAwesomeIcon icon={icon} {...rest} />
}

export default UserIcon
