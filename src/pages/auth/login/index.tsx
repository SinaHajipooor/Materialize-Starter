import { useState, MouseEvent, ReactNode } from 'react'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import Typography, { TypographyProps } from '@mui/material/Typography'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import Icon from 'src/@core/components/icon'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useSettings } from 'src/@core/hooks/useSettings'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { toast } from "react-toastify";
import { Controller, useForm } from 'react-hook-form'
import { FormHelperText, Grid, Link, } from '@mui/material'
import { getServerSession } from 'next-auth'
import { options } from 'src/pages/api/auth/options'
import { getAppVersion } from 'src/lib/auth/auth';
import { getCurrentJalaliYear } from 'src/helpers/DateHelper'

interface State {
    password: string
    showPassword: boolean
}

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    padding: theme.spacing(20),
    paddingRight: '0 !important',
    [theme.breakpoints.down('lg')]: {
        padding: theme.spacing(10)
    }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
    maxWidth: '48rem',
    [theme.breakpoints.down('xl')]: {
        maxWidth: '38rem'
    },
    [theme.breakpoints.down('lg')]: {
        maxWidth: '30rem'
    }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.up('md')]: {
        maxWidth: 400
    },
    [theme.breakpoints.up('lg')]: {
        maxWidth: 450
    }
}))

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.down('md')]: {
        maxWidth: 400
    }
}))

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
    fontWeight: 600,
    letterSpacing: '0.18px',
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
    '& .MuiFormControlLabel-label': {
        fontSize: '0.875rem',
        color: theme.palette.text.secondary
    }
}))

const footerText = 'تمامی حقوق برای ';
const linkText = 'شرکت دانش بنیان فاواگستر سپهر  ';
const currentYear = getCurrentJalaliYear()

const LoginV2 = ({ appVersion }: any) => {
    // ** States
    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false
    })

    // ** Hook
    const theme = useTheme()
    const { settings } = useSettings()

    // ** Vars
    const { skin } = settings
    const hidden = useMediaQuery(theme.breakpoints.down('md'))

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }
    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }


    const loginDefaultValues = {
        username: '',
        password: '',
        mobile: ''
    }

    const {
        control: loginControl,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors }
    } = useForm({
        defaultValues: loginDefaultValues,
    });

    // states
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()


    async function onSubmit(values: { username: string, password: string, mobile: string }) {
        setIsLoading(true);
        const response = await signIn('credentials', { username: values.username, password: values.password, redirect: false })
        if (response?.error) {
            if (response.status === 401) {
                toast.error('اطلاعات وارد شده نادرست است');
                setIsLoading(false);

                return;
            }
            toast.error('امکان ورود وجود ندارد');
            setIsLoading(false);

            return;
        } else {
            setIsLoading(false);
            const returnUrl = router.query?.returnUrl || '/admin/dashboard'
            router.replace(returnUrl?.toString());
            toast.success('با موفقیت وارد شدید')
        }
        setIsLoading(false);

    }


    return (
        <Box className='content-right'>
            {!hidden ? (
                <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column', ml: 5, mb: 1 }}>
                    <Box mt={20}>
                        <LoginIllustrationWrapper>
                            <LoginIllustration
                                alt='login-illustration'
                                height={400}
                                width={500}
                                src={`/images/pages/login.png`}
                            />
                        </LoginIllustrationWrapper>
                    </Box>
                    <Box sx={{ flexWrap: 'wrap' }}>
                        <Typography sx={{ mr: 2 }}>
                            {footerText}
                            <Link style={{ textDecorationLine: 'none' }} target='_blank' href='http://sepehr-ict.ir/'>
                                {linkText}
                            </Link>
                            محفوظ است © {currentYear}
                        </Typography>
                    </Box>
                </Box>
            ) : null}
            <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
                <Box
                    sx={{
                        p: 7,
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        backgroundColor: 'background.paper'
                    }}
                >
                    <BoxWrapper>
                        <Box
                            sx={{
                                top: 30,
                                left: 40,
                                display: 'flex',
                                position: 'absolute',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <img src="/images/Logo.png" height={45} width={45} alt="سامانه مدیریت بایگانی مدارک پزشکی" />
                            <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 600, fontSize: '1.2rem !important' }}>
                                سامانه مدیریت بایگانی مدارک پزشکی
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 10, display: 'flex', mt: 20, flexDirection: 'column', alignItems: 'center' }}>
                            {!hidden && (
                                <>
                                    <Box>
                                        <img style={{ marginBottom: 20 }} src="/images/Logo.png" height={164} width={164} alt="سامانه مدیریت بایگانی مدارک پزشکی" />
                                    </Box>
                                    <TypographyStyled textAlign='center' variant='h6'>{`سامانه مدیریت بایگانی مدارک پزشکی`}</TypographyStyled>
                                    <Typography textAlign='center' variant='body2'>لطفا نام کاربری و رمز عبور خود را وارد کنید</Typography>
                                </>
                            )}
                        </Box>

                        <form autoComplete='off' onSubmit={handleLoginSubmit(onSubmit)}>
                            <FormControl fullWidth>
                                <Controller
                                    name='username'
                                    control={loginControl}
                                    rules={{ required: false }}
                                    render={({ field: { value, onChange } }) => (
                                        <TextField
                                            value={value}
                                            onChange={onChange}
                                            autoFocus
                                            fullWidth
                                            id='username'
                                            label='نام کابری'

                                        />
                                    )}
                                />
                                {loginErrors.username && (
                                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                                        نام کاربری اجباری است
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <Grid mt={5} xs={12} sm={12} item></Grid>
                            <FormControl fullWidth>
                                <Controller
                                    name='password'
                                    control={loginControl}
                                    rules={{ required: false }}
                                    render={({ field: { value, onChange } }) => (
                                        <>
                                            <InputLabel
                                                htmlFor='auth-login-v2-password'>رمز عبور</InputLabel>
                                            <OutlinedInput
                                                value={value}
                                                label='رمز عبور'
                                                id='auth-login-v2-password'
                                                onChange={onChange}
                                                type={values.showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position='end'>
                                                        <IconButton
                                                            edge='end'
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            aria-label='toggle password visibility'
                                                        >
                                                            <Icon icon={values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </>
                                    )}
                                />
                                {loginErrors.password && (
                                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                                        رمز عبور اجباری است
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <Box
                                sx={{ mb: 4, mt: 3, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
                            >
                                <FormControlLabel
                                    label='بخاطر بسپار'
                                    control={<Checkbox />}
                                    sx={{ '& .MuiFormControlLabel-label': { color: 'text.primary' } }}
                                />
                            </Box>
                            <Button disabled={isLoading} fullWidth size='large' type='submit' variant='contained' sx={{ fontFamily: 'inherit' }}>
                                ورود
                            </Button>
                            <Box mt={5}>
                                <Typography textAlign='center' variant='body2'>نسخه {appVersion}</Typography>
                            </Box>
                        </form>
                    </BoxWrapper>
                </Box>
            </RightWrapper >
        </Box >
    )
}

LoginV2.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginV2


export async function getServerSideProps(context: any) {

    const session: any = await getServerSession(context.req, context.res, options);
    const token = session?.myToken;

    const appVersion = await getAppVersion();

    if (token) {
        return {
            redirect: {
                destination: '/admin/dashboard',
                permanent: false,
            },
        };

    }

    return {
        props: {
            appVersion,
        },

    };

}