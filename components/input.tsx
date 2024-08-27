
import TextField from '@mui/material/TextField';

export default function Input( { props }: { props: any } ) {
// export default function AuthorInfo( { id, label, variant, defaultValue, slotProps, value, on }: { id: string, label: string, variant: string, defaultValue: string, slotProps: any } ) {


    return (
        <TextField {...props} />
    )
  }