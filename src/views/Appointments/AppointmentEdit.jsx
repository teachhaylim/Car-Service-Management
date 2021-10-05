import { Avatar, Button, Card, CardActions, CardContent, Chip, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import basicConfig from 'utils/basicConfig';
import { checkFile } from 'utils/generalFunc';
import * as Yup from "yup";

const validateSchema = Yup.object({
    userId: Yup.string(),
    sellCompany: Yup.string(),
    service: Yup.array(),
    status: Yup.array(),
    remark: Yup.string(),
    totalAmount: Yup.number(),
    isActive: Yup.bool(),
})

const data = [
    { id: 1, name: "Service 1", qty: 1, unitPrice: 1.2 },
    { id: 1, name: "Service 2", qty: 2, unitPrice: 2 },
    { id: 1, name: "Service 3", qty: 4, unitPrice: 1.5 },
    { id: 1, name: "Service 4", qty: 6, unitPrice: 5.8 },
    { id: 1, name: "Service 5", qty: 2, unitPrice: 5 },
]

const AppointmentEdit = () => {
    const shopInfo = useSelector(store => store.shop, shallowEqual);
    const appointment = useLocation().state.object;
    const isEdit = useLocation().state.isEdit;

    return (
        <>
            <Card>
                <CardContent>
                    <Grid item container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Grid item container alignItems="center">
                                <Avatar src={checkFile(shopInfo.logo)} variant="rounded" sx={{ width: 52, height: 52 }} />

                                <Typography variant="h6" sx={{ ml: 1 }}>{shopInfo.name}</Typography>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid item container justifyContent="end" alignItems="center">
                                <Chip color="primary" label={appointment.status[0].type} />
                            </Grid>

                            <Grid item sx={{ mt: 1 }}>
                                <Typography variant="h6">Invoice number: {appointment.id}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item container xs={12} py={2}>
                        <Grid item xs={12} sm={6}>
                            <Grid item>
                                <Typography>Invoice from</Typography>
                            </Grid>

                            <Grid item mt={2}>
                                <Typography>{shopInfo.name}</Typography>
                                <Typography>address</Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6} textAlign="end">
                            <Grid item>
                                <Typography>Invoice to</Typography>
                            </Grid>

                            <Grid item mt={2}>
                                <Typography>{`${appointment.userId.firstName} ${appointment.userId.lastName}`}</Typography>
                                <Typography>address</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item container xs={12} py={2}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell width="80">#</TableCell>
                                        <TableCell>Service name</TableCell>
                                        <TableCell align="right" width="150">Qty</TableCell>
                                        <TableCell align="right" width="180">Unit Price</TableCell>
                                        <TableCell align="right" width="180">Total Amount</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {
                                        appointment.services.map((item, key) => (
                                            <TableRow>
                                                <TableCell width="80">{item.id}</TableCell>
                                                <TableCell>{item.item.name}</TableCell>
                                                <TableCell align="right" width="150">{item.qty}</TableCell>
                                                <TableCell align="right" width="180">$ {item.item.price}</TableCell>
                                                <TableCell align="right" width="180">$ {item.item.price * item.qty}</TableCell>
                                            </TableRow>
                                        ))
                                    }

                                    <TableRow>
                                        <TableCell colSpan={3}>&nbsp;</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                        <TableCell align="right">
                                            $ {
                                                appointment.services.reduce((pre, cur) => (
                                                    pre + (cur.qty * cur.item.price)
                                                ), 0)
                                            }
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </CardContent>

                <CardActions>
                    <Grid item container justifyContent="end" alignItems="center">
                        <Button variant="contained" color="primary" sx={{ mr: 2 }}>Submit</Button>

                        <Button variant="outlined" color="error">Cancel</Button>
                    </Grid>
                </CardActions>
            </Card>
        </>
    )
}

export default AppointmentEdit;
