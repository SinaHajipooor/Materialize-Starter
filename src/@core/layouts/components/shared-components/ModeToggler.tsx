

import { useState, useRef } from 'react'
import { styled } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Icon from 'src/@core/components/icon'
import { Mode } from 'src/@core/layouts/types'
import { Settings } from 'src/@core/context/settingsContext'

interface Props {
    settings: Settings
    saveSettings: (values: Settings) => void
}

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    padding: theme.spacing(2, 3),
    margin: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    '&.Mui-selected': {
        color: theme.palette.primary.contrastText,

    },
}))

const ModeToggler = (props: Props) => {
    const { settings, saveSettings } = props
    const [open, setOpen] = useState(false)
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const anchorRef = useRef<HTMLButtonElement>(null)

    const handleClose = () => {
        setOpen(false)
        setTooltipOpen(false)
    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    }

    const handleModeSwitch = (mode: Mode) => {
        if (settings.mode !== mode) {
            saveSettings({ ...settings, mode: mode })
        }
        handleClose()
    }

    const getModeIcon = () => {
        switch (settings.mode) {
            case 'dark':
                return 'mdi:weather-night'
            case 'light':
                return 'mdi:weather-sunny'
            default:
                return 'mdi:laptop'
        }
    }

    return (
        <>
            <Tooltip
                title={settings.mode === 'dark' ? 'حالت تاریک' : 'حالت روشن'}
                onOpen={() => setTooltipOpen(true)}
                onClose={() => setTooltipOpen(false)}
                open={open ? false : tooltipOpen ? true : false}
            >
                <IconButton ref={anchorRef} onClick={handleToggle} color='inherit'>
                    <Icon icon={getModeIcon()} />
                </IconButton>
            </Tooltip>
            <Popper
                open={open}
                transition
                disablePortal
                placement='bottom-start'
                anchorEl={anchorRef.current}
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 14], // Adjust the second value to set the margin from top
                        },
                    },
                ]}
            >
                {({ TransitionProps, placement }) => (
                    <Fade
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'right top' }}
                    >
                        <Paper elevation={4} className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList>
                                    <StyledMenuItem
                                        onClick={() => handleModeSwitch('light')}
                                        selected={settings.mode === 'light'}
                                    >
                                        <ListItemIcon>
                                            <Icon icon='mdi:weather-sunny' />
                                        </ListItemIcon>
                                        <ListItemText primary='حالت روشن' />
                                    </StyledMenuItem>
                                    <StyledMenuItem
                                        onClick={() => handleModeSwitch('dark')}
                                        selected={settings.mode === 'dark'}
                                    >
                                        <ListItemIcon>
                                            <Icon icon='mdi:weather-night' />
                                        </ListItemIcon>
                                        <ListItemText primary='حالت تاریک' />
                                    </StyledMenuItem>
                                    <StyledMenuItem

                                        // @ts-ignore
                                        onClick={() => handleModeSwitch('system')}

                                        // @ts-ignore
                                        selected={settings.mode === 'system'}
                                    >
                                        <ListItemIcon>
                                            <Icon icon='mdi:laptop' />
                                        </ListItemIcon>
                                        <ListItemText primary='حالت سیستم' />
                                    </StyledMenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </>
    )
}

export default ModeToggler
