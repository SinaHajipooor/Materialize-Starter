// ** MUI Imports
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { getCurrentJalaliYear } from 'src/helpers/DateHelper';

const FooterContent = () => {


    const footerText = 'تمامی حقوق برای ';
    const linkText = 'شرکت دانش بنیان فلان  ';
    const currentYear = getCurrentJalaliYear()


    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ mr: 2 }} textAlign='center'>
                {footerText}
                <Link style={{ textDecorationLine: 'none' }} target='_blank' href='http://sepehr-ict.ir/'>
                    {linkText}
                </Link>
                محفوظ است © {currentYear}
            </Typography>
        </Box >
    )
}

export default FooterContent
