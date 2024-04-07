// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'



// ** Types Imports
import { CardStatsCharacterProps } from 'src/@core/components/card-statistics/types'

interface Props {
    data: CardStatsCharacterProps
}

const CardStatsCharacter = ({ data }: Props) => {
    // ** Vars
    const { title, src, stats, width } = data

    return (
        <Card sx={{ overflow: 'visible', position: 'relative' }}>
            <CardContent sx={{ pb: '0 !important' }}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography sx={{ mb: 1.5, fontWeight: 600, whiteSpace: 'nowrap' }}>{title}</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                            <Typography variant='h5' sx={{ mr: 1.5 }}>
                                {stats}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <img src={src} alt={title} height={104} width={width} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CardStatsCharacter
