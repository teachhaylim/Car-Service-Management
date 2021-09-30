import { Autocomplete, Card, CardContent, FormLabel, Grid, Paper, TextField } from '@mui/material';
import { styled } from '@mui/styles';
import { QueryCategory } from 'api/category.api';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const StyledPaper = styled(Paper)(({theme}) => {
    return {
        borderRadius: 4,
        border: "1px solid rgba(0, 0, 0, 0.5)",
        padding: 8,
    };
});

const ShopEdit = () => {
    const [category, setCategory] = useState([]);

    const FetchCategory = () => {
        QueryCategory({ limit: -1 })
            .then(res => {
                if (res.meta === 200) {
                    const temp = res.results.map((item) => {
                        return {
                            label: item.name,
                            value: item.id,
                        }
                    })

                    setCategory(temp);
                }
            })
            .catch(err => {
                toast.error(err.message);
                console.log("Query Category Error", err);
            })
    }

    useEffect(() => {
        FetchCategory();

    }, []);

    return (
        <Card>
            <CardContent>
                <Grid item container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StyledPaper elevation={0}>
                            Left
                        </StyledPaper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={9}>
                        <StyledPaper elevation={0}>
                            Right
                        </StyledPaper>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ShopEdit;

{/* <Grid item>
    <FormLabel>Category</FormLabel>

    <Autocomplete
        multiple
        limitTags={3}
        options={category}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
            <TextField
                {...params}
                variant="outlined"
                label=""
            />
        )}
    />
</Grid> */}